import styled from 'styled-components';

const Container = styled.div`
    position: relative;

    .logo-figure{
        position: relative;
        overflow: hidden;
        width: 40px;
        height: 40px;
        border-radius: 5px;

        cursor: pointer;
        @media all and (max-width:992px){
            width: 32px;
            height: 32px;
        }
    }

    .logo-el{

    }
`;

const LogoImgEl = styled.img`
    width: 40px;
    border-radius: 10px;
    cursor: pointer;
    @media all and (max-width:992px){
        width: 32px;
    }
`;

export {
    Container,
    LogoImgEl
}