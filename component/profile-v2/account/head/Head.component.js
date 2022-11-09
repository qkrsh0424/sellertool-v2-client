import styled from 'styled-components';
import { Container, Wrapper } from './styles/Head.styled';

const HeadComponent = (props) => {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        내정보
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
export default HeadComponent;