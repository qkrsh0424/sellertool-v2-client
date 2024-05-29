import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 40px;

    @media all and (max-width:992px){
        padding: 40px 10px;
    }
`;

export const TextFieldWrapper = styled.div`
    text-align: center;
    font-weight: 700;
`;

export const FooterFieldWrapper = styled.div`
    margin-top: 40px;

    button{
        border: none;
        background-color: var(--mainColor);
        color: #fff;
        border-radius: 15px;
        font-weight: 700;
    }

    .noticeBox{
        margin-top: 20px;
        white-space: pre-line;
        word-break: keep-all;
        color: var(--defaultRedColor);
        font-size: 12px;
        overflow: auto;
        max-height: 100px;
    }
`;