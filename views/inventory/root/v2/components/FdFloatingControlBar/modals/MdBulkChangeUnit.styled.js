import styled from 'styled-components';

export const Container = styled.div`
    background: var(--defaultBackground);
    position: relative;
    width:100%;
`;

export const ContentContainer = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 0 20px;

    .input-item{
        border-radius: 5px;
    }
`;

export const SubmitButtonContainer = styled.div`
    margin-top: 40px;
    display: flex;

    .button-item{
        margin:0;
        padding:0;
        height: 48px;
        border:none;
        color:#fff;
        font-size: 18px;
        font-weight: 500;
    }
`;