import styled from 'styled-components';
import { CustomDialog } from '../../../../../../components/dialog/v1/CustomDialog';

const ContentContainer = styled.div`
    padding: 40px 20px;
    font-weight: 600;
    word-break: keep-all;
`;

export default function DropWorkspaceModalComponent({
    open,
    onClose,
    onSubmit
}) {
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title><div style={{ color: 'var(--defaultRedColor)' }}>워크스페이스 탈퇴</div></CustomDialog.Title>
                <ContentContainer>
                    정말로 해당 워크스페이스를 나가시겠습니까?
                </ContentContainer>
                <CustomDialog.FooterButtonGroup isFlex>
                    <CustomDialog.FooterButton
                        type='button'
                        style={{
                            background: 'var(--defaultModalCloseColor)',
                            color: '#fff',
                            width: '40%'
                        }}
                        onClick={() => onClose()}
                    >취소</CustomDialog.FooterButton>
                    <CustomDialog.FooterButton
                        type='button'
                        style={{
                            background: 'var(--defaultRedColor)',
                            color: '#fff',
                            flex: 1
                        }}
                        onClick={() => onSubmit()}
                    >확인</CustomDialog.FooterButton>
                </CustomDialog.FooterButtonGroup>
            </CustomDialog>
        </>
    );
}