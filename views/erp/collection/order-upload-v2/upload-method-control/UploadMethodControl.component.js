import { useState } from "react";
import ExcelUploaderControlComponent from "./ExcelUploaderControl.component";
import SingleUploaderControlComponent from "./SingleUploaderControl.component";
import { ButtonGroup, Container } from "./styles/UploadMethodControl.styled";
import { WorkspaceUploaderControl } from "./workspace-uploader-control";

export default function UploadMethodControlComponent({
    onSubmitUploadWithExcel,
    onSubmitUploadWithSingle,
    onBringErpItemsFromOtherWorkspace,

    excelTranslatorList,
    selectedExcelTranslator,
    onChangeSelectedExcelTranslator
}) {
    const [uploadMethod, setUploadMethod] = useState('excel');

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
                    <button
                        type='button'
                        className={`button-item ${uploadMethod === 'workspace' ? 'button-active' : ''}`}
                        onClick={() => handleChangeUploadMethod('workspace')}
                    >
                        다른 워크스페이스에서 가져오기
                    </button>
                </ButtonGroup>
                {uploadMethod === 'excel' &&
                    <ExcelUploaderControlComponent
                        excelTranslatorList={excelTranslatorList}
                        selectedExcelTranslator={selectedExcelTranslator}
                        onChangeSelectedExcelTranslator={onChangeSelectedExcelTranslator}
                        onSubmitUploadWithExcel={onSubmitUploadWithExcel}
                    />
                }
                {uploadMethod === 'single' &&
                    <SingleUploaderControlComponent
                        onSubmitUploadWithSingle={onSubmitUploadWithSingle}
                    />
                }
                {uploadMethod === 'workspace' &&
                    <WorkspaceUploaderControl
                        onBringErpItemsFromOtherWorkspace={onBringErpItemsFromOtherWorkspace}
                    />
                }
            </Container>
        </>
    );
}