import styled from 'styled-components';

const Container = styled.div`
    .cancel-button{
        height: 48px;
        border:none;
        font-size: 18px;
        font-weight: 500;
        background: var(--defaultModalCloseColor);
        color: #fff;
        flex:1;
    }

    .submit-button{
        height: 48px;
        border:none;
        font-size: 18px;
        font-weight: 500;
        background: var(--mainColor);
        color:#fff;
        width: 60%;
    }
`;
export default function FooterButtonGroup({
    isFlex,
    children,
    ...props
}) {
    return (
        <Container
            style={{ display: isFlex ? 'flex' : '' }}
        >
            {children}
        </Container>
    );
}