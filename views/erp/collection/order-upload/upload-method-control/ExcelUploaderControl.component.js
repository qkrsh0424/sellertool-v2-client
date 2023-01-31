import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CustomSelect from "../../../../modules/select/CustomSelect";
import CustomExcelFileUploader from "../../../../modules/uploader/CustomExcelFileUploader";
import useExcelFormApiHook from "./hooks/useExcelFormApiHook";
import { ButtonGroup, SelectBox, UploadButtonBox, Wrapper } from "./styles/ExcelUploaderControl.styled";

export default function ExcelUploaderControlComponent({
    excelTranslatorHeaders,
    excelTranslatorHeader,
    onActionChangeExcelTranslatorHeader,
    onSubmitUploadWithExcel,
    onSubmitDownloadSampleExcelForUploadHeader,
}) {
    const [excelFileUploaderOpen, setExcelFileUploaderOpen] = useState(false);
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

    return (
        <>
            <Wrapper>
                <SelectBox>
                    <CustomSelect
                        className='select-item'
                        value={excelTranslatorHeader?.id || ''}
                        onChange={(e) => handleChangeExcelTranslatorHeader(e)}
                    >
                        <option value=''>기준양식</option>
                        {excelTranslatorHeaders?.map(r => {
                            return (
                                <option key={r?.id} value={r?.id}>{r?.uploadHeaderTitle} &gt; {r?.downloadHeaderTitle}</option>
                            );
                        })}
                    </CustomSelect>
                </SelectBox>
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

            {backdropOpen &&
                <BackdropLoadingComponent
                    open={backdropOpen}
                />
            }
        </>
    );
}