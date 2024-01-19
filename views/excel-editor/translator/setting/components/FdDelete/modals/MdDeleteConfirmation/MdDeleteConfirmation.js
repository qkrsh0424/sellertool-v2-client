import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import useDisabledBtn from "../../../../../../../../hooks/button/useDisabledBtn";
import * as St from './MdDeleteConfirmation.styled';

export function MdDeleteConfirmation({
    open,
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleSubmit = () => {
        setDisabledBtn(true);

        if (disabledBtn) {
            return;
        }

        onConfirm();
    }
    
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>변환기 삭제</CustomDialog.Title>
                <St.Container>
                    <div className='wrapper'>
                        <div className='wrapper__description'>
                            현재 선택된 변환기를 정말로 삭제 하시겠습니까?
                        </div>
                        <div className='wrapper__buttonGroup'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => onClose()}
                            >
                                아니오
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='wrapper__buttonGroup__isConfirmButton'
                                onClick={() => handleSubmit()}
                                disabled={disabledBtn}
                            >
                                예
                            </CustomBlockButton>
                        </div>
                    </div>
                </St.Container>
            </CustomDialog>
        </>
    );
}