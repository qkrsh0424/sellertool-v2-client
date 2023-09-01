import { Container, Wrapper } from "./FdHead.styled";

export function FdHead(props) {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        결제내역
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}