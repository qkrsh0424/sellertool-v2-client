import { useRouter } from 'next/router';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomImage from '../../../../../../components/image/CustomImage';
import CustomSelect from '../../../../../../components/select/default/v1/CustomSelect';
import * as St from './FdSelector.styled';
import { MdViewSetting } from './modals/MdViewSetting/MdViewSetting';
import { useState } from 'react';
import { useSellertoolDatas } from '../../../../../../hooks/sellertool-datas';
import { useApiHook } from '../../hooks/useApiHook';

export function FdSelector({
    excelTranslatorList,
    selectedExcelTranslator,
    onSetSelectedExcelTranslator
}) {
    const router = useRouter();

    const sellertoolDatas = useSellertoolDatas();
    const [viewSettingModalOpen, setViewSettingModalOpen] = useState(false);

    const toggleViewSettingModalOpen = (bool) => {
        setViewSettingModalOpen(bool);
    }

    const handleChangeSelectedExcelTranslatorFromEvent = (e) => {
        let targetId = e.target.value;
        let targetItem = excelTranslatorList?.find(r => r.id === targetId);

        if (targetItem) {
            onSetSelectedExcelTranslator(targetItem);
        } else {
            onSetSelectedExcelTranslator(null);
        }

    }

    const handleRouterToSettingPage = () => {
        router?.push({
            pathname: '/excel-editor/translator/setting',
            query: {
                excelTranslatorId: selectedExcelTranslator?.id
            }
        })
    }

    const handleSubmitSetBookmarkExcelTranslatorIdList = (newBookmarkExcelTranslatorIdList) => {
        sellertoolDatas?._onSetBookmarkExcelTranslatorIdListForTranslator(newBookmarkExcelTranslatorIdList);
    }

    return (
        <>
            <St.Container>
                <div className='wrapper'>
                    <div className='wrapper__title'>
                        변환기 선택
                    </div>
                    <div className='wrapper__body'>
                        <CustomSelect
                            value={selectedExcelTranslator?.id}
                            onChange={(e) => handleChangeSelectedExcelTranslatorFromEvent(e)}
                        >
                            <option value=''>변환기를 선택하세요.</option>
                            <option disabled>===== 즐겨찾기 =====</option>
                            {sellertoolDatas?.bookmarkExcelTranslatorIdListForTranslator?.map(bookmarkExcelTranslatorId => {
                                let excelTranslator = excelTranslatorList?.find(r => r.id === bookmarkExcelTranslatorId);
                                return (
                                    <option key={bookmarkExcelTranslatorId} value={excelTranslator?.id}>{excelTranslator?.name}</option>
                                );
                            })}
                            <option disabled>===== 일반 =====</option>
                            {excelTranslatorList?.filter(r => !sellertoolDatas?.bookmarkExcelTranslatorIdListForTranslator?.includes(r?.id))?.map(excelTranslator => {
                                return (
                                    <option key={excelTranslator?.id} value={excelTranslator?.id}>{excelTranslator?.name}</option>
                                );
                            })}
                        </CustomSelect>
                        <div className='wrapper__body__buttonGroup'>
                            <CustomBlockButton
                                type='button'
                                className='wrapper__body__buttonGroup__textButton'
                                onClick={() => toggleViewSettingModalOpen(true)}
                            >
                                보기<br />설정
                            </CustomBlockButton>
                            {selectedExcelTranslator &&
                                <CustomBlockButton
                                    type='button'
                                    className='wrapper__body__buttonGroup__iconButton'
                                    onClick={() => handleRouterToSettingPage()}
                                >
                                    <div className='iconFigure'>
                                        <CustomImage
                                            src='/images/icon/settings_default_000000.svg'
                                        />
                                    </div>
                                </CustomBlockButton>
                            }
                        </div>
                    </div>
                </div>
            </St.Container>

            {viewSettingModalOpen &&
                <MdViewSetting
                    open={viewSettingModalOpen}
                    onClose={() => toggleViewSettingModalOpen(false)}

                    excelTranslatorList={excelTranslatorList}
                    bookmarkExcelTranslatorIdList={sellertoolDatas?.bookmarkExcelTranslatorIdListForTranslator}
                    onConfirm={handleSubmitSetBookmarkExcelTranslatorIdList}
                />
            }
        </>
    );
}