import { useState } from 'react';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomExcelFileUploader from '../../../../../../components/uploader/CustomExcelFileUploader';
import * as St from './FdUploader.styled';
import useDisabledBtn from '../../../../../../hooks/button/useDisabledBtn';

export function FdUploader({
    uploadHeaderList,
    downloadHeaderList,
    onReqUploadExcel,
    onReqDownloadExcel,
    onRefresh,
}) {
    const [excelUploaderModalOpen, setExcelUploaderModalOpen] = useState(false);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const toggleExcelUploaderModalOpen = (bool) => {
        setExcelUploaderModalOpen(bool);
    }

    const handleSubmitUploadExcel = ({ formData }) => {
        onReqUploadExcel(formData, () => toggleExcelUploaderModalOpen(false));
    }

    const handleSubmitDownloadExcel = () => {
        setDisabledBtn(true);
        onReqDownloadExcel();
    }

    const handleSubmitRefresh = () => {
        onRefresh();
    }

    return (
        <>
            <St.Container>
                <div className='wrapper'>
                    {(!uploadHeaderList || !downloadHeaderList) &&
                        <CustomBlockButton
                            type='button'
                            className='wrapper__textButton'
                            onClick={() => toggleExcelUploaderModalOpen(true)}
                        >
                            변환할 엑셀 선택
                        </CustomBlockButton>
                    }
                    {(uploadHeaderList || downloadHeaderList) &&
                        <>
                            <CustomBlockButton
                                type='button'
                                className='wrapper__refreshButton'
                                onClick={() => handleSubmitRefresh()}
                            >
                                초기화
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='wrapper__downloadButton'
                                onClick={() => handleSubmitDownloadExcel()}
                                disabled={disabledBtn}
                            >
                                엑셀 변환하기
                            </CustomBlockButton>
                        </>
                    }
                </div>
            </St.Container>

            {excelUploaderModalOpen &&
                (
                    <CustomExcelFileUploader
                        open={excelUploaderModalOpen}

                        onClose={() => toggleExcelUploaderModalOpen(false)}
                        onConfirm={({ formData }) => handleSubmitUploadExcel({ formData: formData })}
                    />
                )
            }
        </>
    );
}