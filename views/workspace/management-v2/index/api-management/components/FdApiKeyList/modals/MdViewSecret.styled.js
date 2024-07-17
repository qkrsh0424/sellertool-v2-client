import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 20px;
`;

export const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 10px;

    .copyBox{
        button{
            width: 20px;
            height: 20px;
            border: none;
        }
    }
`;

export const SecretKeyText = styled.div`
    word-break: break-all;
    font-size: 14px;
`;

export const WarningText = styled.div`
    margin-top: 20px;
    color: var(--defaultRedColor);
    font-weight: 700;
    font-size: 14px;
    word-break: keep-all;
`;