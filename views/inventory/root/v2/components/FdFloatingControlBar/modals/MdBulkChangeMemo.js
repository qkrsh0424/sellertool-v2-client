import { useState } from "react";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";
import { getRemovedPrefixZero } from "../../../../../../../utils/numberFormatUtils";
import { ContentContainer } from "./MdBulkChangeMemo.styled";
import CustomInput from "../../../../../../../components/input/default/v1/CustomInput";

export function MdBulkChangeMemo({
    open = false,
    onClose = () => { },
    title = '모달 제목',
    onConfirm = () => { }
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [inputValue, setInputValue] = useState('');

    const handleChangeInputValue = (e) => {
        let value = e.target.value;

        setInputValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        if (!inputValue || inputValue.length < 1 || inputValue.length > 150) {
            alert('메모는 1-150자 이내로 입력 가능합니다.');
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
                            placeholder={'메모'}
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
                            disabledBtn={disabledBtn}
                        >
                            적용
                        </CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}