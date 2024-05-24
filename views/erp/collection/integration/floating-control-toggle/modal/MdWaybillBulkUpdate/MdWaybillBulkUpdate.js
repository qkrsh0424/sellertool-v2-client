import { useState } from 'react';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { CustomDialog } from '../../../../../../../components/dialog/v1/CustomDialog';
import * as St from './MdWaybillBulkUpdate.styled';
import { ErpcWaybillBulkUpdateTemplate } from '../../../../../../../utils/excel-template/erpc/ErpcWaybillBulkUpdateTemplate';
import CustomExcelFileUploader from '../../../../../../modules/uploader/CustomExcelFileUploader';
import { useApiHook } from '../../../hooks/useApiHook';
import { useErpItemFetcherHook } from '../../../hooks/useErpItemFetcherHook';
import { useSelector } from 'react-redux';
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from '../../../contexts/SelectedErpItemListProvider';
import _ from 'lodash';
import { useErpItemActionsHook, useErpItemValueHook } from '../../../contexts/ErpItemProvider';
import { useRouter } from 'next/router';
import { customBackdropController } from '../../../../../../../components/backdrop/default/v1';
import { customToast } from '../../../../../../../components/toast/custom-react-toastify/v1';

export function MdWaybillBulkUpdate({
    open = false,
    toggleWaybillRegistrationModalOpen,
    toggleControlDrawerOpen
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const erpItemFetcherHook = useErpItemFetcherHook();

    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [fileUploaderOpen, setFileUploaderOpen] = useState(false);

    const toggleFileUploaderOpen = (setOpen) => {
        setFileUploaderOpen(setOpen);
    }

    const handleCloseModal = () => {
        toggleWaybillRegistrationModalOpen(false);
    }

    const handleSubmitUpload = async (data) => {
        let targetErpItemIds = selectedErpItemListValueHook?.map(r => r.id);

        data.formData?.append('workspaceId', wsId);
        data.formData?.append('erpItemIds', targetErpItemIds);

        customBackdropController().showBackdrop();
        const updateResult = await apiHook.reqUploadWaybillForm({ formData: data.formData, headers: { wsId: wsId } });

        if (updateResult?.content) {
            const fetchTargetErpItemIds = updateResult?.content?.updatedErpItemIds;
            const fetchResult = await apiHook.reqFetchErpItemListByIds({
                body: {
                    ids: fetchTargetErpItemIds,
                    matchedCode: router?.query?.matchedCode
                },
                headers: { wsId: wsId }
            });

            if (fetchResult?.content) {
                erpItemActionsHook.setContent(prev => {
                    return {
                        ...prev,
                        content: prev.content?.map(prevItem => {
                            let newErpItem = fetchResult?.content?.find(r => r.id === prevItem?.id);
                            if (newErpItem) {
                                return { ...newErpItem };
                            } else {
                                return { ...prevItem };
                            }
                        })
                    };
                })

                selectedErpItemListActionsHook.setValue(prev => {
                    return prev?.map(prevItem => {
                        let newErpItem = fetchResult?.content?.find(r => r.id === prevItem?.id);
                        if (newErpItem) {
                            return { ...newErpItem };
                        } else {
                            return { ...prevItem };
                        }
                    })
                })
            }
            customToast.success(`선택된 데이터 ${updateResult?.content?.tryCount} 건 중 총 ${updateResult?.content?.updatedCount} 건의 운송장번호, 배송방식, 택배사 가 업데이트 되었습니다.`);
        }
        toggleFileUploaderOpen(false);
        toggleWaybillRegistrationModalOpen(false);
        toggleControlDrawerOpen(false);
        customBackdropController().hideBackdrop();
    }

    const handleDownloadCommonExcelSample = () => {
        const url = ErpcWaybillBulkUpdateTemplate.assetUrl;
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', ErpcWaybillBulkUpdateTemplate.assetName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    return (
        <>
            <CustomDialog open={open} onClose={() => handleCloseModal()}>
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <CustomDialog.Title>운송장 일괄등록</CustomDialog.Title>
                <St.BodyContainer>
                    <CustomBlockButton
                        type='button'
                        className='button-item upload-button'
                        onClick={() => toggleFileUploaderOpen(true)}
                    >업로드</CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        className='button-item sample-download-button'
                        onClick={() => handleDownloadCommonExcelSample()}
                    >양식 다운로드</CustomBlockButton>
                </St.BodyContainer>
            </CustomDialog>

            {fileUploaderOpen &&
                <CustomExcelFileUploader
                    open={fileUploaderOpen}
                    onClose={() => toggleFileUploaderOpen(false)}
                    onConfirm={handleSubmitUpload}
                />
            }
        </>
    );
}