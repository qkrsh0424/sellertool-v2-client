import { CustomDialog } from "../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";

const ContentContainer = styled.div`
    padding: 0 20px;
    margin-top: 40px;
    margin-bottom:40px;
    text-align:center;
    font-weight:500;
`;

export default function DeleteMarginRecordModalComponent({
    open,
    onClose,
    onConfirm,
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleSubmit = () => {
        setDisabledBtn(true);

        onConfirm();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>마진율 레코드 <span style={{ color: 'var(--defaultRedColor)' }}>삭제</span></CustomDialog.Title>
                <ContentContainer>
                    해당 마진율 레코드를 삭제합니다.
                </ContentContainer>
                <CustomDialog.FooterButtonGroup isFlex>
                    <CustomDialog.FooterButton type='button' style={{ background: 'var(--defaultModalCloseColor)', color: '#fff', width: '40%' }}>취소</CustomDialog.FooterButton>
                    <CustomDialog.FooterButton type='button' onClick={() => handleSubmit()} disabled={disabledBtn} style={{ background: 'var(--defaultRedColor)', color: '#fff', flex: 1 }}>확인</CustomDialog.FooterButton>
                </CustomDialog.FooterButtonGroup>
            </CustomDialog>
        </>
    );
}