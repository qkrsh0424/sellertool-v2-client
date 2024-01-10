import CustomInput from '../../../../../../components/input/default/v1/CustomInput';
import * as St from './FdEditName.styled';

export function FdEditName({
    excelTranslatorName,
    onChangeExcelTranslatorNameFromEvent
}) {
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.Title>
                        변환기 이름
                    </St.Title>
                    <St.InputWrapper>
                        <CustomInput
                            placeholder='변환기 이름을 1-50자로 입력해 주세요.'
                            maxLength={50}
                            value={excelTranslatorName || ''}
                            onChange={(e) => onChangeExcelTranslatorNameFromEvent(e)}
                        />
                    </St.InputWrapper>
                </St.Wrapper>
            </St.Container>
        </>
    );
}