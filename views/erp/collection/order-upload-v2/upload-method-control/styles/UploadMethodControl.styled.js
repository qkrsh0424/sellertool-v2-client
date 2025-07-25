import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    .button-item{
        cursor: pointer;
        margin: 0;
        padding: 0;
        /* width: 100px; */
        height: 30px;
        font-weight: 500;
        background: none;
        border: 1px solid #00000000;
        font-size: 14px;
        color: #404040;
    }

    .button-active{
        font-weight: 700;
        border-bottom: 1px solid var(--mainColor);
        color: var(--mainColor);
    }
`;