import styled from 'styled-components';

export const ContentContainer = styled.div`
    margin-top: 80px;
    position:relative;
    z-index: 2;

    @media all and (max-width:992px){
        margin-top: 40px;
    }
`;

export const CategoryTitle = styled.div`
    font-size: 21px;
    font-weight: 500;
`;

export const ContentWrapper = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    

    @media all and (max-width:992px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media all and (max-width:576px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const CardContainer = styled.div`
    padding: 10px;

    .isReady{
        background: #f0f0f0;

        &:hover{
            transform: scale(1);
            border: 1px solid #f0f0f0;
        }
    }
`;

export const CardWrapper = styled.div`
    user-select: none;
    -webkit-tap-highlight-color: #00000000;
    background: #fff;
    border-radius: 15px;
    padding: 10px;
    box-shadow: var(--defaultBoxShadow);
    cursor: pointer;
    transition: all .2s;
    border: 1px solid #00000000;

    &:hover{
        transform: scale(1.03);
        border: 1px solid var(--mainColor);
    }
`;

export const CardTitle = styled.div`
    text-align: center;
    color: #404040;
    font-weight: 600;
    padding: 20px 0;
    font-size: 18px;
    transition: all .2s;

    ${CardWrapper}:hover &{
        color: var(--mainColor);
    }
    
    @media all and (max-width:992px){
        padding: 10px 0;
        font-size: 16px;
    }

`;

export const CardDescription = styled.div`
    padding-top: 10px;
    height: 60px;
    line-height: 25px;
    text-align: center;
    color: #666;
    word-break: keep-all;
    font-size: 14px;
    transition: all .2s;
    
    ${CardWrapper}:hover &{
        color: var(--mainColor);
    }

    @media all and (max-width:992px){
        font-size: 12px;
        height: 60px;
    }

`;