import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomImage from '../../../../../../components/image/CustomImage';
import CustomSelect from '../../../../../../components/select/default/v1/CustomSelect';
import * as St from './FdSelector.styled';

export function FdSelector({
    excelTranslatorList,
    selectedExcelTranslator,
    onSetSelectedExcelTranslator
}) {
    const handleChangeSelectedExcelTranslatorFromEvent = (e) => {
        let targetId = e.target.value;
        let targetItem = excelTranslatorList?.find(r => r.id === targetId);
        
        if (targetItem) {
            onSetSelectedExcelTranslator(targetItem);
        } else {
            onSetSelectedExcelTranslator(null);
        }

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
                            {excelTranslatorList?.map(r => {
                                return (
                                    <option key={r?.id} value={r?.id}>{r?.name}</option>
                                );
                            })}
                        </CustomSelect>
                        <CustomBlockButton
                            type='button'
                            className='wrapper__body__textButton'
                        >
                            보기<br />설정
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='wrapper__body__iconButton'
                        >
                            <div className='iconFigure'>
                                <CustomImage
                                    src='/images/icon/settings_default_000000.svg'
                                />
                            </div>
                        </CustomBlockButton>
                    </div>
                </div>
            </St.Container>
        </>
    );
}