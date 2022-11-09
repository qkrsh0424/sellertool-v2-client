import styled from 'styled-components';

export const Container = styled.div`
    padding:20px;

    .link-button-el{
        padding:0;
        margin:0;
        height: 56px;
        background: var(--mainColor);
        color:white;
        border:1px solid var(--mainColor);
        border-radius: 10px;
        font-size: 16px;
    }
`;

export const NoticeElement = styled.div`
    text-align: center;
    padding: 30px 0;
    color:#303030;
    font-weight: 600;
    font-size: 16px;
    word-break: keep-all;
`;

