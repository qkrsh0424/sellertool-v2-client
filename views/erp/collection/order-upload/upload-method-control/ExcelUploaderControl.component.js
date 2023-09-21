import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { useLocalStorageHook } from "../../../../../hooks/local_storage/useLocalStorageHook";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CustomSelect from "../../../../modules/select/CustomSelect";
import CustomExcelFileUploader from "../../../../modules/uploader/CustomExcelFileUploader";
import useExcelFormApiHook from "./hooks/useExcelFormApiHook";
import FavoriteTranslatorsModalComponent from "./modal/FavoriteTranslatorsModal.component";
import { ButtonGroup, SelectBox, TranslatorSelectorWrapper, UploadButtonBox, Wrapper } from "./styles/ExcelUploaderControl.styled";
import { useSelector } from "react-redux";
import { useSellertoolDatas } from "../../../../../hooks/sellertool-datas";

export default function ExcelUploaderControlComponent({
    excelTranslatorHeaders,
    excelTranslatorHeader,
    onActionChangeExcelTranslatorHeader,
    onSubmitUploadWithExcel,
    onSubmitDownloadSampleExcelForUploadHeader,
}) {
    const sellertoolDatas = useSellertoolDatas();
    const [excelFileUploaderOpen, setExcelFileUploaderOpen] = useState(false);
    const [favoriteTranslatorsModalOpen, setFavoriteTranslatorsModalOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);

    const {
        reqDownloadSampleExcelForErpCollectionOrderUpload
    } = useExcelFormApiHook();

    const handleChangeExcelTranslatorHeader = (e) => {
        let id = e.target.value;
        let data = excelTranslatorHeaders?.find(r => r.id === id);

        if (!data) {
            onActionChangeExcelTranslatorHeader(null);
            return;
        }

        onActionChangeExcelTranslatorHeader(data);
    }

    const handleSubmitDownloadSampleExcelForUploadHeader = async () => {
        handleOpenBackdrop();
        if (excelTranslatorHeader?.id) {
            let body = {
                excelTranslatorHeaderId: excelTranslatorHeader?.id
            }

            await onSubmitDownloadSampleExcelForUploadHeader({
                body: body,
                successCallback: () => {

                }
            });
        } else {
            await reqDownloadSampleExcelForErpCollectionOrderUpload(() => { });
        }
        handleCloseBackdrop();
    }

    const handleOpenExcelFileUploader = () => {
        setExcelFileUploaderOpen(true);
    }

    const handleCloseExcelFileUploader = () => {
        setExcelFileUploaderOpen(false);
    }

    const handleSubmitExcelUpload = ({ formData }) => {

        onSubmitUploadWithExcel(formData, () => handleCloseExcelFileUploader());
    }

    const handleOpenBackdrop = () => {
        setBackdropOpen(true);
    }

    const handleCloseBackdrop = () => {
        setBackdropOpen(false);
    }

    const toggleFavoriteTranslatorsModalOpen = (setOpen) => {
        setFavoriteTranslatorsModalOpen(setOpen);
    }

    const handleSelectFavoriteTranslator = (id) => {
        let currFavoriteTranslatorIds = new Set([...sellertoolDatas?.favoriteExcelTranslatorHeaderIdsForErpcUpload]);
        if (currFavoriteTranslatorIds.has(id)) {
            currFavoriteTranslatorIds.delete(id);
        } else {
            currFavoriteTranslatorIds.add(id);
        }
        sellertoolDatas._onSetFavoriteExcelTranslatorHeaderIdsForErpcUpload(currFavoriteTranslatorIds);
        onActionChangeExcelTranslatorHeader(null);
    }

    return (
        <>
            <Wrapper>
                <TranslatorSelectorWrapper>
                    <SelectBox>
                        <CustomSelect
                            className='select-item'
                            value={excelTranslatorHeader?.id || ''}
                            onChange={(e) => handleChangeExcelTranslatorHeader(e)}
                        >
                            <option value=''>기준양식</option>
                            {sellertoolDatas?.favoriteExcelTranslatorHeaderIdsForErpcUpload?.map(favoriteTranslatorId => {
                                const currExcelTranslatorHeader = excelTranslatorHeaders?.find(r => r?.id === favoriteTranslatorId);
                                if (!currExcelTranslatorHeader) {
                                    return null;
                                }

                                return (
                                    <option key={currExcelTranslatorHeader?.id} value={currExcelTranslatorHeader?.id}>{currExcelTranslatorHeader?.uploadHeaderTitle} &gt; {currExcelTranslatorHeader?.downloadHeaderTitle}</option>
                                );
                            })}
                        </CustomSelect>
                    </SelectBox>
                    <CustomBlockButton
                        type='button'
                        className='setting-button'
                        onClick={() => toggleFavoriteTranslatorsModalOpen(true)}
                    >
                        보기<br/>설정
                    </CustomBlockButton>
                </TranslatorSelectorWrapper>
                <ButtonGroup>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleSubmitDownloadSampleExcelForUploadHeader()}
                    >
                        업로드 양식 다운
                    </SingleBlockButton>
                </ButtonGroup>
                <UploadButtonBox>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleOpenExcelFileUploader()}
                    >
                        엑셀업로드
                    </SingleBlockButton>
                </UploadButtonBox>
            </Wrapper>

            {excelFileUploaderOpen &&
                <CustomExcelFileUploader
                    open={excelFileUploaderOpen}
                    onClose={handleCloseExcelFileUploader}
                    onConfirm={handleSubmitExcelUpload}
                />
            }

            {favoriteTranslatorsModalOpen &&
                <FavoriteTranslatorsModalComponent
                    open={favoriteTranslatorsModalOpen}
                    onClose={() => toggleFavoriteTranslatorsModalOpen(false)}
                    excelTranslatorHeaders={excelTranslatorHeaders}
                    favoriteTranslatorIds={sellertoolDatas?.favoriteExcelTranslatorHeaderIdsForErpcUpload}
                    onSelectFavoriteTranslator={handleSelectFavoriteTranslator}
                />
            }

            {backdropOpen &&
                <BackdropLoadingComponent
                    open={backdropOpen}
                />
            }
        </>
    );
}