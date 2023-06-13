import styled from 'styled-components';

export const Container = styled.div`
    background: var(--defaultBackground);
    min-height: 800px;
`;

export const Wrapper = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    padding-bottom: 100px;
`;

export const HeadContainer = styled.div`
    
    .title{
        font-size: 24px;
        font-weight: 600;
    }

    .delete-button-item{
        margin:0;
        padding:0;
        width: 80px;
        height: 34px;
        background: var(--defaultRedColor);
        color: #fff;
        border: none;
        border-radius: 5px;
    }
`;