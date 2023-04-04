import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 20px;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 10px;
    .button-item{
        margin:0;
        padding:0;
        height: 38px;
        width: 200px;
        font-size: 12px;
        line-height: 1.3;
        color: #404040;
        border-radius: 5px;
        box-shadow: var(--defaultBoxShadow);
    }

    .bold{
        font-weight: 700;
    }
`;