import styled from 'styled-components';
import { Container, Wrapper } from './styles/Head.styled';

const HeadComponent = (props) => {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        워크스페이스
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
export default HeadComponent;