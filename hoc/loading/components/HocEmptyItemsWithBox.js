import styled from 'styled-components';

const Container = styled.div`
    padding: ${props => props.paddingTRBL};
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 100%;
    background: white;
    border: 1px solid #f0f0f0;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
`;

const TextBox = styled.div`
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    padding: 0 20px;
`;


export function HocEmptyItemsWithBox({
    paddingTRBL = '0 0 0 0',
    element = <>조회 결과가 없습니다.</>
}) {
    return (
        <>
            <Container paddingTRBL={paddingTRBL}>
                <Wrapper>
                    <TextBox>
                        {element}
                    </TextBox>
                </Wrapper>
            </Container>
        </>
    );
}