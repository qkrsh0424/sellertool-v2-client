import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "/components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { OptionBulkCreateTemplate } from "/utils/excel-template";
import CustomExcelFileUploader from "../../../../../../../modules/uploader/CustomExcelFileUploader";
import { useState } from "react";

const ContentContainer = styled.div`
    padding: 20px;
    
    .button-item{
        border-radius: 5px;
        &:first-child{
            background: var(--mainColor);
            color: #fff;
            border: 1px solid var(--mainColor);
            font-weight: 600;
        }

        &:last-child{
            margin-top: 10px;
            color: #606060;
        }
    }
`;
export function MdBulkCreateOptionList({
    open = false,
    onClose = () => { },
    onReqProductOptionBulkCreateExcelUpload
}) {
    const [excelFileUploaderOpen, setExcelFileUploaderOpen] = useState(false);

    const toggleExcelFileUploaderOpen = (setOpen) => {
        setExcelFileUploaderOpen(setOpen);
    }

    const handleSubmitDownloadSampleExcelForBulkCreateOptions = async () => {
        const url = OptionBulkCreateTemplate.assetUrl;
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', OptionBulkCreateTemplate.assetName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    const handleSubmitExcelFileUploaded = async ({ formData }) => {
        await onReqProductOptionBulkCreateExcelUpload(formData, () => {
            onClose();
        });
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>옵션 목록 엑셀 일괄등록</CustomDialog.Title>
                <ContentContainer>
                    <CustomBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => toggleExcelFileUploaderOpen(true)}
                    >
                        엑셀 업로드
                    </CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleSubmitDownloadSampleExcelForBulkCreateOptions()}
                    >
                        양식 다운로드
                    </CustomBlockButton>
                </ContentContainer>
            </CustomDialog>

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