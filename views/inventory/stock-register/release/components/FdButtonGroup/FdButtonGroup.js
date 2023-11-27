import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdButtonGroup.styled";
import { useApiHook } from "../../hooks/useApiHook";
import { SearchAggregationProvider } from "../../contexts/SearchAggregationProvider";
import { MdProductOptionList } from "./modals/MdProductOptionList/MdProductOptionList";
import usePopperHook from "../../../../../../hooks/popper/usePopperHook";
import { useState } from "react";
import { StockReleaseBulkCreateTemplate } from "../../../../../../utils/excel-template/register-stocks";
import { usePrepareReleaseItemListActionsHook, usePrepareReleaseItemListValueHook } from "../../contexts/PrepareReleaseItemListProvider";
import { customBackdropController } from "../../../../../../components/backdrop/default/v1";
import CustomPopper from "../../../../../../components/popper/CustomPopper";
import CustomImage from "../../../../../../components/image/CustomImage";
import CustomExcelFileUploader from "../../../../../../components/uploader/CustomExcelFileUploader";
import { v4 as uuidv4 } from 'uuid';

const customBackdropControl = customBackdropController();

export function FdButtonGroup(props) {
    const router = useRouter();
    const poListMd = router?.query?.poListMd;
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const prepareReleaseItemListValueHook = usePrepareReleaseItemListValueHook();
    const prepareReleaseItemListActionsHook = usePrepareReleaseItemListActionsHook();

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
        const url = StockReleaseBulkCreateTemplate.assetUrl;
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', StockReleaseBulkCreateTemplate.assetName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        onActionClosePopper();
    }

    const handleSubmitExcelFileUploaded = async ({ formData }) => {
        customBackdropControl.showBackdrop();
        let newPrepareReleaseItemList = [...prepareReleaseItemListValueHook];
        let resultsPrepareReleaseItemList = null;

        await apiHook.reqInventoryReleaseBulkCreateExcelUpload({
            formData,
            headers: { wsId: wsId }
        },
            (results, res) => {
                resultsPrepareReleaseItemList = results;
                toggleExcelFileUploaderOpen(false);
            });

        if (resultsPrepareReleaseItemList) {
            newPrepareReleaseItemList = newPrepareReleaseItemList.concat(resultsPrepareReleaseItemList?.map(r => {
                return {
                    ...r,
                    id: uuidv4()
                }
            }));
        }

        prepareReleaseItemListActionsHook.onSet(newPrepareReleaseItemList);
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
                        출고제품추가
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