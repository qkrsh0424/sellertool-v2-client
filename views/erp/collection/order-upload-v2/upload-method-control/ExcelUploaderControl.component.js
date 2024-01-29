import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomSelect from "../../../../modules/select/CustomSelect";
import CustomExcelFileUploader from "../../../../modules/uploader/CustomExcelFileUploader";
import { ButtonGroup, SelectBox, TranslatorSelectorWrapper, UploadButtonBox, Wrapper } from "./styles/ExcelUploaderControl.styled";
import { useSellertoolDatas } from "../../../../../hooks/sellertool-datas";
import { MdViewSetting } from "./modal/MdViewSetting/MdViewSetting";
import { ErpcUploadTemplate } from "../../../../../utils/excel-template/erpc/ErpcUploadTemplate";

export default function ExcelUploaderControlComponent({
    onSubmitUploadWithExcel,

    excelTranslatorList,
    selectedExcelTranslator,
    onChangeSelectedExcelTranslator
}) {
    const sellertoolDatas = useSellertoolDatas();

    const [viewSettingModalOpen, setViewSettingModalOpen] = useState(false);
    const [excelFileUploaderOpen, setExcelFileUploaderOpen] = useState(false);

    const toggleViewSettingModalOpen = (bool) => {
        setViewSettingModalOpen(bool);
    }

    const handleSubmitSetBookmarkExcelTranslatorIdList = (newBookmarkExcelTranslatorIdList) => {
        sellertoolDatas?._onSetBookmarkExcelTranslatorIdListForErpc(newBookmarkExcelTranslatorIdList);
    }

    const handleChangeSelectedExcelTranslatorFromEvent = (e) => {
        let id = e.target.value;
        let data = excelTranslatorList?.find(r => r.id === id);

        if (!data) {
            onChangeSelectedExcelTranslator(null);
            return;
        }

        onChangeSelectedExcelTranslator(data);
    }

    const handleDownloadCommonExcelSample = () => {
        const url = ErpcUploadTemplate.assetUrl;
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', ErpcUploadTemplate.assetName);
        document.body.appendChild(link);
        link.click();
        link.remove();
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

    return (
        <>
            <Wrapper>
                <ButtonGroup>
                    <CustomBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleDownloadCommonExcelSample()}
                    >
                        기준양식 엑셀 다운
                    </CustomBlockButton>
                </ButtonGroup>
                <TranslatorSelectorWrapper>
                    <SelectBox>
                        <CustomSelect
                            className='select-item'
                            value={selectedExcelTranslator?.id || ''}
                            onChange={(e) => handleChangeSelectedExcelTranslatorFromEvent(e)}
                        >
                            <option value=''>기준양식</option>
                            <option disabled>===== 즐겨찾기 =====</option>
                            {sellertoolDatas?.bookmarkExcelTranslatorIdListForErpc?.map(bookmarkExcelTranslatorId => {
                                let excelTranslator = excelTranslatorList?.find(r => r.id === bookmarkExcelTranslatorId);
                                if (!excelTranslator) {
                                    return null;
                                }
                                return (
                                    <option key={bookmarkExcelTranslatorId} value={excelTranslator?.id}>{excelTranslator?.name}</option>
                                );
                            })}
                            <option disabled>===== 일반 =====</option>
                            {excelTranslatorList?.filter(r => !sellertoolDatas?.bookmarkExcelTranslatorIdListForErpc?.includes(r?.id))?.map(excelTranslator => {
                                return (
                                    <option key={excelTranslator?.id} value={excelTranslator?.id}>{excelTranslator?.name}</option>
                                );
                            })}
                        </CustomSelect>
                    </SelectBox>
                    <CustomBlockButton
                        type='button'
                        className='setting-button'
                        onClick={() => toggleViewSettingModalOpen(true)}
                    >
                        보기<br />설정
                    </CustomBlockButton>
                </TranslatorSelectorWrapper>
                <UploadButtonBox>
                    <CustomBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleOpenExcelFileUploader()}
                    >
                        엑셀업로드
                    </CustomBlockButton>
                </UploadButtonBox>
            </Wrapper>

            {excelFileUploaderOpen &&
                <CustomExcelFileUploader
                    open={excelFileUploaderOpen}
                    onClose={handleCloseExcelFileUploader}
                    onConfirm={handleSubmitExcelUpload}
                />
            }

            {viewSettingModalOpen &&
                <MdViewSetting
                    open={viewSettingModalOpen}
                    onClose={() => toggleViewSettingModalOpen(false)}

                    excelTranslatorList={excelTranslatorList}
                    bookmarkExcelTranslatorIdList={sellertoolDatas?.bookmarkExcelTranslatorIdListForErpc}
                    onConfirm={handleSubmitSetBookmarkExcelTranslatorIdList}
                />
            }
        </>
    );
}