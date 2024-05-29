import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useApiHook } from "../../../hooks/useApiHook";
import { useSellertoolDatasActionsHook, useSellertoolDatasValueHook } from "../../../../../../../contexts/SellertoolDatasGlobalProvider";
import { useEffect, useState } from "react";
import * as St from './MdSelectViewHeader.styled';
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import CustomImage from "../../../../../../../components/image/CustomImage";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";

export function MdSelectViewHeader({
    open = false,
    onClose,
    erpCollectionHeader
}) {
    const router = useRouter();
    const classificationType = router?.query?.classificationType || null;
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const sellertoolDatasValueHook = useSellertoolDatasValueHook();
    const sellertoolDatasActionsHook = useSellertoolDatasActionsHook();
    const bookmarkViewHeaderIds = sellertoolDatasValueHook.bookmarkViewHeaderIdsForErpc || [];

    const [erpCollectionHeaderList, setErpCollectionHeaderList] = useState(null);

    const handleClickSettingButton = (e, erpCollectionHeaderId) => {
        e.stopPropagation();
        router.push({
            pathname: '/erp/collection/edit/view-header',
            query: {
                erpCollectionHeaderId: erpCollectionHeaderId
            }
        })
    }

    const handleBookmark = (erpCollectionHeaderId) => {
        let newBookmarkViewHeaderIds = [...bookmarkViewHeaderIds];

        if (newBookmarkViewHeaderIds?.includes(erpCollectionHeaderId)) {
            newBookmarkViewHeaderIds = newBookmarkViewHeaderIds?.filter(r => r !== erpCollectionHeaderId);
        } else {
            newBookmarkViewHeaderIds.push(erpCollectionHeaderId);
        }

        sellertoolDatasActionsHook.erpcActions.onSetBookmarkViewHeaderIds(newBookmarkViewHeaderIds);
    }

    const handleSelectHeader = (selectedHeader) => {
        switch (classificationType) {
            case 'ALL':
                sellertoolDatasActionsHook.erpcActions.onSetAllHeaderId(selectedHeader?.id);
                break;
            case 'NEW':
                sellertoolDatasActionsHook.erpcActions.onSetOrderHeaderId(selectedHeader?.id);
                break;
            case 'CONFIRM':
                sellertoolDatasActionsHook.erpcActions.onSetSalesHeaderId(selectedHeader?.id);
                break;
            case 'COMPLETE':
                sellertoolDatasActionsHook.erpcActions.onSetReleaseCompleteHeaderId(selectedHeader?.id);
                break;
            case 'POSTPONE':
                sellertoolDatasActionsHook.erpcActions.onSetHoldHeaderId(selectedHeader?.id);
                break;
            default:
                break;

        }
        onClose();
    }

    const handleReqFetchErpCollectionHeaderList = async () => {
        const fetchResult = await apiHook.reqFetchErpCollectionHeaderList({ headers: { wsId: wsId } });

        if (fetchResult?.content) {
            setErpCollectionHeaderList(fetchResult?.content);
        }
    }

    useEffect(() => {
        if (!wsId) {
            return;
        }

        handleReqFetchErpCollectionHeaderList();
    }, [wsId]);


    return (
        <>
            <CustomDialog open={open} onClose={() => onClose()}>
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>뷰헤더 선택</CustomDialog.Title>
                <St.BodyContainer>
                    <h4>즐겨찾기</h4>
                    {bookmarkViewHeaderIds?.map(bookmarkViewHeaderId => {
                        const currErpCollectionHeader = erpCollectionHeaderList?.find(r => r?.id === bookmarkViewHeaderId);
                        if (!currErpCollectionHeader) {
                            return null;
                        }

                        return (
                            <St.ItemBox
                                key={currErpCollectionHeader.id}
                                onClick={() => handleSelectHeader(currErpCollectionHeader)}
                                style={{
                                    border: erpCollectionHeader?.id === currErpCollectionHeader.id ? '1px solid var(--mainColor)' : ''
                                }}
                            >
                                <div>
                                    <CustomBlockButton
                                        type='button'
                                        className='icon-button-item'
                                        onClick={(e) => { e.stopPropagation(); handleBookmark(currErpCollectionHeader?.id) }}
                                    >
                                        <CustomImage
                                            src='/images/icon/star_default_ffdf00.svg'
                                        />
                                    </CustomBlockButton>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className='name'>{currErpCollectionHeader.name}</div>
                                    <div className='description'>{currErpCollectionHeader.description || '지정된 설명이 없습니다.'}</div>
                                </div>
                                <div className='mgl-flex'>
                                    <CustomBlockButton
                                        type='button'
                                        className='icon-button-item'
                                        onClick={(e) => handleClickSettingButton(e, currErpCollectionHeader.id)}
                                    >
                                        <CustomImage
                                            src='/images/icon/settings_default_808080.svg'
                                        />
                                    </CustomBlockButton>
                                </div>
                            </St.ItemBox>
                        );
                    })}
                    <h4>목록</h4>
                    {erpCollectionHeaderList?.filter(r => !bookmarkViewHeaderIds?.includes(r?.id))?.map(r => {
                        return (
                            <St.ItemBox
                                key={r.id}
                                onClick={() => handleSelectHeader(r)}
                                style={{
                                    border: erpCollectionHeader?.id === r.id ? '1px solid var(--mainColor)' : ''
                                }}
                            >
                                <div>
                                    <CustomBlockButton
                                        type='button'
                                        className='icon-button-item'
                                        onClick={(e) => { e.stopPropagation(); handleBookmark(r.id) }}
                                    >
                                        <CustomImage
                                            src='/images/icon/star_border_808080.svg'
                                        />
                                    </CustomBlockButton>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className='name'>{r.name}</div>
                                    <div className='description'>{r.description || '지정된 설명이 없습니다.'}</div>
                                </div>
                                <div className='mgl-flex'>
                                    <CustomBlockButton
                                        type='button'
                                        className='icon-button-item'
                                        onClick={(e) => handleClickSettingButton(e, r.id)}
                                    >
                                        <CustomImage
                                            src='/images/icon/settings_default_808080.svg'
                                        />
                                    </CustomBlockButton>
                                </div>
                            </St.ItemBox>
                        );
                    })}
                </St.BodyContainer>
            </CustomDialog>
        </>
    );
}