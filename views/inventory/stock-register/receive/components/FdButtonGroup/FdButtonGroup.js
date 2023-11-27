import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdButtonGroup.styled";
import { MdProductOptionList } from "./modals/MdProductOptionList/MdProductOptionList";
import { useRouter } from "next/router";
import { SearchAggregationProvider } from "../../contexts/SearchAggregationProvider";
import CustomPopper from "../../../../../../components/popper/CustomPopper";
import usePopperHook from "../../../../../../hooks/popper/usePopperHook";
import { StockReceiveBulkCreateTemplate } from "../../../../../../utils/excel-template";
import CustomImage from "../../../../../../components/image/CustomImage";
import CustomExcelFileUploader from "../../../../../../components/uploader/CustomExcelFileUploader";
import { useState } from "react";
import { useApiHook } from "../../hooks/useApiHook";
import { useSelector } from "react-redux";
import { customBackdropController } from "../../../../../../components/backdrop/default/v1";
import { usePrepareReceiveItemListActionsHook, usePrepareReceiveItemListValueHook } from "../../contexts/PrepareReceiveItemListProvider";
import { v4 as uuidv4 } from 'uuid';

const customBackdropControl = customBackdropController();

export function FdButtonGroup() {
    const router = useRouter();
    const poListMd = router?.query?.poListMd;
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const prepareReceiveItemListValueHook = usePrepareReceiveItemListValueHook();
    const prepareReceiveItemListActionsHook = usePrepareReceiveItemListActionsHook();

    const apiHook = useApiHook();

    const {
        popperAnchorEl,
        popperOpen,
        onActionOpenPopper,
        onActionClosePopper
    } = usePopperHook();

    const [excelFileUploaderOpen, setExcelFileUploaderOpen] = useState(false);

    const toggleExcelFileUploaderOpen = (bool) => {
        setExcelFileUploaderOpen(bool);
        onActionClosePopper();
    }

    const toggleProductOptionListModalOpen = (bool) => {
        let query = { ...router.query };

        if (bool) {
            router.push({
                pathname: router?.pathname,
                query: {
                    ...query,
                    poListMd: true
                }
            })
        } else {
            router.back();
        }

    }

    const handleDownloadSampleExcel = async () => {
        const url = StockReceiveBulkCreateTemplate.assetUrl;
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', StockReceiveBulkCreateTemplate.assetName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        onActionClosePopper();
    }

    const handleSubmitExcelFileUploaded = async ({ formData }) => {
        customBackdropControl.showBackdrop();
        let newPrepareReceiveItemList = [...prepareReceiveItemListValueHook];
        let resultsPrepareReceiveItemList = null;

        await apiHook.reqInventoryReceiveBulkCreateExcelUpload({
            formData,
            headers: { wsId: wsId }
        },
            (results, res) => {
                resultsPrepareReceiveItemList = results;
                toggleExcelFileUploaderOpen(false);
            });

        if (resultsPrepareReceiveItemList) {
            newPrepareReceiveItemList = newPrepareReceiveItemList.concat(resultsPrepareReceiveItemList?.map(r => {
                return {
                    ...r,
                    id: uuidv4()
                }
            }));
        }

        prepareReceiveItemListActionsHook.onSet(newPrepareReceiveItemList);
        customBackdropControl.hideBackdrop();
    }

    const productOptionListModalOpen = poListMd === 'true' ? true : false;

    return (
        <>
            <St.Container>
                <div className='wrapper'>
                    <CustomBlockButton
                        type='button'
                        onClick={() => toggleProductOptionListModalOpen(true)}
                    >
                        입고제품추가
                    </CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        onClick={(e) => onActionOpenPopper(e)}
                    >
                        엑셀일괄추가
                    </CustomBlockButton>
                </div>
            </St.Container>

            <SearchAggregationProvider>
                <MdProductOptionList
                    open={productOptionListModalOpen}
                    onClose={() => toggleProductOptionListModalOpen(false)}
                />
            </SearchAggregationProvider>

            <CustomPopper
                open={popperOpen}
                anchorEl={popperAnchorEl}
                placement='bottom-start'
                element={
                    (
                        <>
                            <St.PopperContainer>
                                <div className='header-frame'>
                                    <div className="title">엑셀일괄추가</div>
                                    <button
                                        type='button'
                                        className='close-button-el'
                                        onClick={() => onActionClosePopper()}
                                    >
                                        <CustomImage
                                            src='/images/icon/close_default_959eae.svg'
                                        />
                                    </button>
                                </div>
                                <div className='wrapper'>
                                    <CustomBlockButton
                                        type='button'
                                        className='upload-button'
                                        onClick={() => toggleExcelFileUploaderOpen(true)}
                                    >
                                        엑셀 업로드
                                    </CustomBlockButton>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleDownloadSampleExcel()}
                                    >
                                        양식 다운로드
                                    </CustomBlockButton>
                                </div>
                            </St.PopperContainer>
                        </>
                    )
                }
            />

            {excelFileUploaderOpen &&
                <CustomExcelFileUploader
                    open={excelFileUploaderOpen}
                    onClose={() => toggleExcelFileUploaderOpen(false)}
                    onConfirm={handleSubmitExcelFileUploaded}
                />
            }
        </>
    );
}