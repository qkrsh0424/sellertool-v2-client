import { useRouter } from "next/router";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { CLASSIFICATIONS } from "../../../References";
import * as St from './MdChangeStatus.styled';
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../components/image/CustomImage";
import CustomSelect from "../../../../../../../components/select/default/v1/CustomSelect";
import { useState } from "react";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../../../contexts/SelectedErpItemListProvider";
import { StatusUtils } from "../../../utils/StatusUtils";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";
import { useApiHook } from "../../../hooks/useApiHook";
import { useSelector } from "react-redux";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import { useErpItemFetcherHook } from "../../../hooks/useErpItemFetcherHook";

const statusUtils = StatusUtils();

export function MdChangeStatus({
    open = false,
    onClose = () => { },
    onCloseControlDrawer = () => { }
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const classificationType = router?.query?.classificationType;
    const classification = CLASSIFICATIONS.find(r => r.classificationType === classificationType) || CLASSIFICATIONS[0];

    const apiHook = useApiHook();
    const erpItemFetcherHook = useErpItemFetcherHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [targetClassificationType, setTargetClassificationType] = useState('')

    const handleChangeTargetClassificationType = (e) => {
        let value = e.target.value;

        setTargetClassificationType(value);
    }

    const handleReqChangeStatus = async () => {
        if (!targetClassificationType) {
            customToast.error('변경될 상태를 선택해 주세요.');
            return;
        }

        let newErpItemList = selectedErpItemListValueHook?.map(erpItem => {
            return {
                ...erpItem,
                ...statusUtils.getFlagsForErpItemAndTargetClassificationType({ erpItem, targetClassificationType })
            }
        })

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let body = {
            contentList: newErpItemList?.map(r => {
                return {
                    id: r?.id,
                    createdAt: r?.createdAt,
                    salesYn: r?.salesYn,
                    salesAt: r?.salesAt,
                    releaseYn: r?.releaseYn,
                    releaseAt: r?.releaseAt,
                    holdYn: r?.holdYn,
                    holdAt: r?.holdAt
                }
            })
        }

        onClose();
        onCloseControlDrawer();
        customBackdropController().showBackdrop();
        const changeResult = await apiHook.reqChangeErpItemList_Status({ body, headers });

        if (changeResult?.content) {
            erpItemFetcherHook.reqCountErpItems();
            erpItemFetcherHook.reqFetchErpItemSlice();
            selectedErpItemListActionsHook.onSet([]);
        }

        customBackdropController().hideBackdrop();
    }
    return (
        <>
            <CustomDialog open={open} onClose={() => onClose()}>
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <St.ContentContainer>
                    <St.ContentWrapper>
                        <div className='additionalDescription'>선택된 주문건들의 상태를 변경합니다.</div>
                        <div className='controlWrapper'>
                            <div className='controlWrapper__currentStatus'>{classification?.name}</div>
                            <div className='controlWrapper__iconFigure'>
                                <CustomImage src='/images/icon/arrowRight_chevron_000000.svg' />
                            </div>
                            <div className='controlWrapper__targetStatus'>
                                <CustomSelect value={targetClassificationType} onChange={(e) => handleChangeTargetClassificationType(e)}>
                                    <option value={''}>선택</option>
                                    {CLASSIFICATIONS.filter((r, index) => index !== 0 && r.classificationType !== classificationType).map(r => {
                                        return (
                                            <option key={r.classificationType} value={r.classificationType}>{r.name}</option>
                                        );
                                    })}
                                </CustomSelect>
                            </div>
                        </div>
                        <div className='buttonGroup'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => onClose()}
                            >
                                취소
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='confirm'
                                onClick={() => handleReqChangeStatus()}
                            >
                                적용
                            </CustomBlockButton>
                        </div>
                    </St.ContentWrapper>
                </St.ContentContainer>
            </CustomDialog>
        </>
    );
}