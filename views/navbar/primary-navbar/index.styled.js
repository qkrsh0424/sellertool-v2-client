import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
    position: relative;
    height: 64px;
    background-color: var(--mainColor);
    /* background: linear-gradient(70deg, #2C73D2, #309FFF);
    background: -webkit-linear-gradient(70deg, #2C73D2, #309FFF); */

    /* @media all and (max-width:992px){
        height: 52px;
    } */
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const AuthContainer = styled.div`
    
`;

export {
    Container,
    Wrapper,
    AuthContainer
}