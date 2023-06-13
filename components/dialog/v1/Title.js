import styled from 'styled-components';

const Container = styled.div`
    padding: 0 20px;

    .title{
        padding: 20px 0;
        border-bottom: 1px solid #000;
        font-size: 20px;
        font-weight: 400;
        color:#303030;
        /* padding-bottom: 20px; */

        .accent-text{
            color:var(--mainColor);
        }
    }
`;

export default function Title({
    children,
    ...props
}) {
    return (
        <Container {...props}>
            <div className='title'>
                {children}
            </div>
        </Container>
    );
}