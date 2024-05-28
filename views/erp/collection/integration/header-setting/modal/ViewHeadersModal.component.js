import Image from "next/image";
import { useRouter } from "next/router";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import { Container, ContentContainer, ItemBox } from "../styles/ViewHeadersModal.styled";
import { useApiHook } from "../../hooks/useApiHook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSellertoolDatasActionsHook } from "../../../../../../contexts/SellertoolDatasGlobalProvider";

export default function ViewHeadersModalComponent({
    erpCollectionHeader,
    favoriteViewHeaderIdsForErpc,
    onClose,
}) {
    const router = useRouter();
    const classificationType = router?.query?.classificationType || null;
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const sellertoolDatasActionsHook = useSellertoolDatasActionsHook();

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
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div
                    className='title-box'
                >
                    <div className='title'>
                        뷰헤더 선택
                    </div>
                </div>
                <ContentContainer>
                    <h4>즐겨찾기</h4>
                    {favoriteViewHeaderIdsForErpc?.map(favoriteViewHeaderId => {
                        const currErpCollectionHeader = erpCollectionHeaderList?.find(r => r?.id === favoriteViewHeaderId);
                        if (!currErpCollectionHeader) {
                            return null;
                        }

                        return (
                            <ItemBox
                                key={currErpCollectionHeader.id}
                                onClick={() => handleSelectHeader(currErpCollectionHeader)}
                                style={{
                                    border: erpCollectionHeader?.id === currErpCollectionHeader.id ? '1px solid var(--mainColor)' : ''
                                }}
                            >
                                <div>
                                    <div className='name'>{currErpCollectionHeader.name}</div>
                                    <div className='description'>{currErpCollectionHeader.description || '지정된 설명이 없습니다.'}</div>
                                </div>
                                <div className='mgl-flex'>
                                    <SingleBlockButton
                                        type='button'
                                        className='icon-button-item'
                                        onClick={(e) => handleClickSettingButton(e, currErpCollectionHeader.id)}
                                    >
                                        <CustomImage
                                            src='/images/icon/settings_default_808080.svg'
                                        />
                                    </SingleBlockButton>
                                </div>
                            </ItemBox>
                        );
                    })}
                    <h4>목록</h4>
                    {erpCollectionHeaderList?.filter(r => !favoriteViewHeaderIdsForErpc?.includes(r?.id))?.map(r => {
                        return (
                            <ItemBox
                                key={r.id}
                                onClick={() => handleSelectHeader(r)}
                                style={{
                                    border: erpCollectionHeader?.id === r.id ? '1px solid var(--mainColor)' : ''
                                }}
                            >
                                <div>
                                    <div className='name'>{r.name}</div>
                                    <div className='description'>{r.description || '지정된 설명이 없습니다.'}</div>
                                </div>
                                <div className='mgl-flex'>
                                    <SingleBlockButton
                                        type='button'
                                        className='icon-button-item'
                                        onClick={(e) => handleClickSettingButton(e, r.id)}
                                    >
                                        <CustomImage
                                            src='/images/icon/settings_default_808080.svg'
                                        />
                                    </SingleBlockButton>
                                </div>
                            </ItemBox>
                        );
                    })}
                </ContentContainer>
            </Container>
        </>
    );
}