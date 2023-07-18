import { useState } from "react";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";
import { getRemovedPrefixZero } from "../../../../../../../utils/numberFormatUtils";
import { ContentContainer } from "./MdBulkChangeUnit.styled";
import CustomInput from "../../../../../../../components/input/default/v1/CustomInput";

export function MdBulkChangeUnit({
    open = false,
    onClose = () => { },
    title = '모달 제목',
    onConfirm = () => { }
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [inputValue, setInputValue] = useState('');

    const handleChangeInputValue = (e) => {
        let value = e.target.value;

        if (!value) {
            setInputValue('');
            return;
        }

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,4}$/)) {
            setInputValue(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        if (!inputValue || inputValue < 1 || inputValue > 1000) {
            alert('수량은 1-1000 이내의 숫자만 입력 가능합니다.');
            return;
        }

        onConfirm(inputValue);
        onClose();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>{title}</CustomDialog.Title>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <CustomInput
                            type='text'
                            className='input-item'
                            placeholder={'입고수량'}
                            value={inputValue || ''}
                            onChange={(e) => handleChangeInputValue(e)}
                            required
                        />
                    </ContentContainer>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            onClick={() => onClose()}
                            style={{
                                flex: 4,
                                background: 'var(--defaultModalCloseColor)',
                                color: 'white'
                            }}
                        >
                            취소
                        </CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            style={{
                                flex: 6,
                                background: 'var(--mainColor)',
                                color: 'white'
                            }}
                            disabled={disabledBtn}
                        >
                            적용
                        </CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}