import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { useState } from "react";
import CustomExcelFileUploader from "../../../../../modules/uploader/CustomExcelFileUploader";

const Container = styled.div`
    background: var(--defaultBackground);
`;

const ContentContainer = styled.div`
    padding: 20px;
    .button-item{
        border-radius: 5px;
        &:last-child{
            margin-top: 10px;
        }
    }

    .sample-download-button{
        color: #606060;
    }

    .upload-button{
        font-weight: 700;
        border: 1px solid var(--mainColor);
        color:white;
        background: var(--mainColor);
    }
`;


export default function WaybillRegistrationModalComponent({
    open,
    onClose,
    onSubmitDownloadSampleExcelForWaybillRegistration,
    onSubmitUploadWaybillForm
}) {
    const [fileUploaderOpen, setFileUploaderOpen] = useState(false);

    const toggleFileUploaderOpen = (setOpen) => {
        setFileUploaderOpen(setOpen);
    }

    const handleSubmitUpload = async (data) => {
        onSubmitUploadWaybillForm(data.formData, () => {
            toggleFileUploaderOpen(false);
        });
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <Container>
                    <CustomDialog.CloseButton onClose={() => onClose()} />
                    <CustomDialog.Title>운송장 일괄등록</CustomDialog.Title>
                    <ContentContainer>
                        <CustomBlockButton
                            type='button'
                            className='button-item upload-button'
                            onClick={() => toggleFileUploaderOpen(true)}
                        >업로드</CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='button-item sample-download-button'
                            onClick={() => onSubmitDownloadSampleExcelForWaybillRegistration()}
                        >양식 다운로드</CustomBlockButton>
                    </ContentContainer>
                </Container>
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