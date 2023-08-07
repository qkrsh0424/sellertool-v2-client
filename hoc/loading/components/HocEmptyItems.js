import styled from 'styled-components';

const Container = styled.div`
`;

const DefaultElement = styled.div`
    text-align: center;
    font-size: 14px;
    font-weight: 500;
`;

export function HocEmptyItems({
    text,
    element = <DefaultElement>조회 결과가 없습니다.</DefaultElement>,
    ...props
}) {
    return (
        <>
            <Container>
                {text ?
                    <DefaultElement>{text}</DefaultElement>
                    :
                    <>
                        {element}
                    </>
                }
            </Container>
        </>
    );
}