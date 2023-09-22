import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    min-height: 800px;
    background: #fff;
    padding-top: 1px;
    overflow: hidden;
    padding: 80px 10px 40px 10px;
    border-bottom: 1px solid #e0e0e0;

    @media all and (max-width:992px){
        padding-top: 50px;
    }

    .fadeIn{
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;

export const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;

    .emoji{
        &::before{
            content: "🌟";
        }
    }
`;

export const H1 = styled.h1`
    font-weight: 800;
    color: var(--mainColor);
    font-size: 50px;
    word-break: keep-all;
    text-align: center;

    opacity:0;
    transition:all 1s;
    transform:translate3d(0, 50%, 0);

    @media all and (max-width:992px){
        font-size: 28px;
    }
`;

export const H2 = styled.h2`
    font-weight: 700;
    color: #222;
    font-size: 34px;
    word-break: keep-all;
    text-align: center;

    opacity:0;
    transition:all 1s;
    transform:translate3d(0, 50%, 0);

    @media all and (max-width:992px){
        font-size: 20px;
    }
`;

export const H3 = styled.h3`
    font-weight: 400;
    color: #444;
    font-size: 20px;
    word-break: keep-all;
    text-align: center;

    opacity:0;
    transition:all 1s;
    transform:translate3d(0, 50%, 0);

    @media all and (max-width:992px){
        font-size: 20px;
    }
`;

export const FloatingImageBox = styled.div`
    position: absolute;
    right: 0;
    bottom: -100px;
    width: 800px;
    z-index: 0;

    opacity:0;
    transition:all 1s;
    transform:translate3d(0, 50%, 0);
`;

export const ServiceListFadeOut = styled.div`
    opacity:0;
    transition:all 1s;
    transform:translate3d(0, 50%, 0);
`;