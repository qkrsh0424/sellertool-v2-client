import { useState } from "react";
import ExcelUploaderControlComponent from "./ExcelUploaderControl.component";
import useExcelTranslatorHeadersHook from "./hooks/useExcelTranslatorHeadersHook";
import SingleUploaderControlComponent from "./SingleUploaderControl.component";
import { ButtonGroup, Container } from "./styles/UploadMethodControl.styled";

export default function UploadMethodControlComponent({
    excelTranslatorHeader,
    onActionChangeExcelTranslatorHeader,
    onSubmitUploadWithExcel,
    onSubmitUploadWithSingle
}) {
    const [uploadMethod, setUploadMethod] = useState('excel');
    const {
        excelTranslatorHeaders,
        reqDownloadSampleExcelForUploadHeader,
        reqDownloadSampleExcelForDownloadHeader
    } = useExcelTranslatorHeadersHook();


    const handleChangeUploadMethod = (method) => {
        setUploadMethod(method);
    }

    return (
        <>
            <Container>
                <ButtonGroup>
                    <button
                        type='button'
                        className={`button-item ${uploadMethod === 'excel' ? 'button-active' : ''}`}
                        onClick={() => handleChangeUploadMethod('excel')}
                    >
                        엑셀대량등록
                    </button>
                    <button
                        type='button'
                        className={`button-item ${uploadMethod === 'single' ? 'button-active' : ''}`}
                        onClick={() => handleChangeUploadMethod('single')}
                    >
                        단건등록
                    </button>
                </ButtonGroup>
                {uploadMethod === 'excel' &&
                    <ExcelUploaderControlComponent
                        excelTranslatorHeaders={excelTranslatorHeaders}
                        excelTranslatorHeader={excelTranslatorHeader}

                        onActionChangeExcelTranslatorHeader={onActionChangeExcelTranslatorHeader}
                        onSubmitUploadWithExcel={onSubmitUploadWithExcel}
                        onSubmitDownloadSampleExcelForUploadHeader={reqDownloadSampleExcelForUploadHeader}
                    />
                }
                {uploadMethod === 'single' &&
                    <SingleUploaderControlComponent
                        onSubmitUploadWithSingle={onSubmitUploadWithSingle}
                    />
                }
            </Container>
        </>
    );
}