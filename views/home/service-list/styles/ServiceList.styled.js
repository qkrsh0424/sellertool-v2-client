import styled from 'styled-components';

export const ContentContainer = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 40px;
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
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const CardContainer = styled.div`
    padding: 10px;
`;

export const CardWrapper = styled.div`
    user-select: none;
    -webkit-tap-highlight-color: #00000000;
    background: #fff;
    border-radius: 15px;
    padding: 10px;
    box-shadow: var(--defaultBoxShadow);
    border:1px solid #e0e0e0;
    cursor: pointer;
`;

export const CardTitle = styled.div`
    text-align: center;
    color: #404040;
    font-weight: 600;
    padding: 20px 0;
    font-size: 18px;

    @media all and (max-width:992px){
        padding: 10px 0;
        font-size: 16px;
    }
`;

export const CardDescription = styled.div`
    padding-top: 10px;
    height: 100px;
    line-height: 25px;
    text-align: center;
    color: #666;
    word-break: keep-all;
    font-size: 14px;

    @media all and (max-width:992px){
        font-size: 12px;
        height: 70px;
    }
`;