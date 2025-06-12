import { useRef } from "react";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";
import { Container, ContentContainer } from "./index.styled";
import CustomInput from "../../../../../../../components/input/default/v1/CustomInput";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";

export function EditUnitModalComponent({
    open,
    inventoryStockData,
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const inputValueRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        let value = inputValueRef.current.value;

        if (!value || value < 0 || value > 999999) {
            customToast.info('입고수량은 0-999999 내외로 입력해 주세요.')
            return;
        }

        onConfirm(value);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>입고 수량 수정</CustomDialog.Title>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Container>
                        <CustomInput
                            ref={inputValueRef}
                            type='number'
                            className='input-item'
                            defaultValue={inventoryStockData?.unit}
                            placeholder={'입고수량'}
                        />
                    </Container>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            className='button-item'
                            style={{
                                background: '#959eae',
                                color: '#fff',
                                flex: 1
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            className='button-item'
                            style={{
                                background: 'var(--mainColor)',
                                color: '#fff',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}