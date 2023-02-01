import { useState } from "react";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import CustomInput from "../../../../../modules/input/CustomInput";
import { CancelButton, Container, InputBox, SubmitButton } from "../styles/StockReleaseModal.styled";

export default function StockReleaseModalComponent({
    open,
    onClose,
    onConfirm
}) {
    const [memo, setMemo] = useState('');

    if (!open) {
        return null;
    }

    const handleChangeMemo = (e) => {
        let value = e.target.value;

        setMemo(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!memo) {
            alert('출고 메모를 작성해 주세요.');
            return;
        }
        onConfirm(memo);
    }

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
        >
            <Container>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <CustomDialog.CloseButton onClose={() => onClose()} />
                    <CustomDialog.Title>선택된 데이터들의 재고를 차감합니다.</CustomDialog.Title>
                    <InputBox>
                        <CustomInput
                            type='text'
                            className='input-item'
                            value={memo || ''}
                            onChange={(e) => handleChangeMemo(e)}
                            placeholder={'메모'}
                        />
                    </InputBox>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CancelButton
                            type='button'
                            onClick={() => onClose()}
                        >
                            취소
                        </CancelButton>
                        <SubmitButton
                            type='submit'
                        >
                            확인
                        </SubmitButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </Container>
        </CustomDialog>
    );
}