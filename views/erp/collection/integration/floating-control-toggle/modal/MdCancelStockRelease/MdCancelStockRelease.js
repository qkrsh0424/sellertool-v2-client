import { useRouter } from "next/router";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import * as St from './MdCancelStockRelease.styled';
import { useSelector } from "react-redux";
import { useApiHook } from "../../../hooks/useApiHook";
import { useErpItemActionsHook, useErpItemValueHook } from "../../../contexts/ErpItemProvider";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../../../contexts/SelectedErpItemListProvider";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import _ from "lodash";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";
import { useState } from "react";

export function MdCancelStockRelease({
    open = false,
    toggleCancelStockReleaseModalOpen,
    toggleControlDrawerOpen
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const [notice, setNotice] = useState('');

    const handleCloseModal = () => {
        toggleCancelStockReleaseModalOpen(false)
    }

    const handleSubmit = async () => {
        setDisabledBtn(true);

        try {
            let stockReflectedItems = [];

            selectedErpItemListValueHook?.forEach(r => {
                if (r.stockReflectYn === 'n') {
                    stockReflectedItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                throw new Error(`재고반영이 되지 않은 데이터가 선택되었습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => `${r.uniqueCode}\n`)?.join().replaceAll(',', '')}`);
            }
        } catch (err) {
            setNotice(err.message);
            return;
        }

        customBackdropController().showBackdrop();
        const erpItemIds = selectedErpItemListValueHook?.map(r => r.id);

        let body = {
            erpItemIds: erpItemIds,
            workspaceId: wsId
        }

        const updateResult = await apiHook.reqCancelStockRelease({ body, headers: { wsId: wsId } })

        if (updateResult?.content) {
            const updateIds = [...updateResult?.content];

            const fetchResult = await apiHook.reqFetchErpItemListByIds({
                body: {
                    ids: updateIds,
                    matchedCode: router?.query?.matchedCode
                },
                headers: { wsId: wsId }
            })

            if (fetchResult?.content) {
                let newErpItemContent = _.cloneDeep(erpItemValueHook?.content);
                let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

                newErpItemContent.content = newErpItemContent?.content?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                newSelectedErpItemList = newSelectedErpItemList?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                erpItemActionsHook.content.onSet(newErpItemContent);
                selectedErpItemListActionsHook.onSet(newSelectedErpItemList);

                toggleCancelStockReleaseModalOpen(false);
                toggleControlDrawerOpen(false);

                customToast.success(`${erpItemIds?.length}개의 주문건에 대한 재고반영이 취소되었습니다.`)
            }
        }
        customBackdropController().hideBackdrop();
    }

    return (
        <>
            <CustomDialog open={open} onClose={() => handleCloseModal()} backgroundColor={'#fff'}>
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <St.BodyContainer>
                    <St.TextFieldWrapper>
                        선택된 주문건의 재고반영을 취소 합니다.
                    </St.TextFieldWrapper>
                    <St.FooterFieldWrapper>
                        <CustomBlockButton
                            type='button'
                            onClick={() => handleSubmit()}
                            disabled={disabledBtn}
                        >
                            재고반영 취소
                        </CustomBlockButton>
                        <div className='noticeBox'>{notice}</div>
                    </St.FooterFieldWrapper>
                </St.BodyContainer>
            </CustomDialog>
        </>
    );
}