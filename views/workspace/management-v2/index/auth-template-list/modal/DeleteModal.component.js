import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";

const Container = styled.div`
    .message{
        text-align: center;
        padding: 40px 20px;
        font-size: 16px;
        font-weight: 500;
        color: #444;
    }
`;

export default function DeleteModalComponent({
    open,
    onClose,
    onSubmit
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleSubmit = () => {
        setDisabledBtn(true);
        onSubmit();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth={'xs'}
            >
                <Container>
                    <CustomDialog.CloseButton onClose={() => onClose()} />
                    <CustomDialog.Title>권한 템플릿 삭제</CustomDialog.Title>
                    <div className='message'>
                        해당 권한 템플릿을 삭제합니다.
                    </div>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton type='button' style={{ background: 'var(--defaultModalCloseColor)', color: '#fff', width: '40%' }} onClick={() => onClose()}>취소</CustomDialog.FooterButton>
                        <CustomDialog.FooterButton type='button' style={{ background: 'var(--defaultRedColor)', color: '#fff', flex: 1 }} onClick={() => handleSubmit()} disabled={disabledBtn}>삭제</CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </Container>
            </CustomDialog>

        </>
    );
}