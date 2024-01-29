import { useState } from "react";
import CustomBlockButton from "../../../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../../../components/dialog/v1/CustomDialog";
import CustomInput from "../../../../../../../../../../components/input/default/v1/CustomInput";
import * as St from './MdAdd.styled';
import { customToast, defaultOptions } from "../../../../../../../../../../components/toast/custom-react-toastify/v1";

export function MdAdd({
    open,
    onClose,
    currentMappingValueList,
    onSubmit
}) {
    const [inputValue, setInputValue] = useState('');

    const handleChangeInputValueFromEvent = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValue || inputValue?.length <= 0 || inputValue > 30) {
            customToast.error('매핑값을 1-30 이내로 입력해 주세요.', { ...defaultOptions });
            return;
        }

        let newInputValue = inputValue.trim();
        if (currentMappingValueList?.includes(newInputValue)) {
            customToast.error('중복된 매핑값을 추가할 수 없습니다.', { ...defaultOptions });
            return;
        }
        onSubmit(newInputValue);
        onClose();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>매핑값을 추가 합니다.</CustomDialog.Title>
                <St.Container>
                    <div className='wrapper'>
                        <form className='wrapper__form' onSubmit={(e) => handleSubmit(e)}>
                            <div className='wrapper__form__inputBox'>
                                <label>매핑값</label>
                                <CustomInput
                                    type='text'
                                    placeholder='1-30자 이내로 입력해 주세요.'
                                    value={inputValue || ''}
                                    onChange={(e) => handleChangeInputValueFromEvent(e)}
                                    maxLength={30}
                                    autoFocus
                                />
                            </div>
                            <div className='wrapper__form__submitButtonGroup'>
                                <CustomBlockButton
                                    type='button'
                                    className='wrapper__form__submitButtonGroup__button'
                                    onClick={() => onClose()}
                                >
                                    취소
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='submit'
                                    className='wrapper__form__submitButtonGroup__button-submit'
                                >
                                    추가
                                </CustomBlockButton>
                            </div>
                        </form>
                    </div>
                </St.Container>
            </CustomDialog>
        </>
    );
}