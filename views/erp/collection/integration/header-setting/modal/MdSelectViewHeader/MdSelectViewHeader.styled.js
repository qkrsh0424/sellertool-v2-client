import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 0 20px 20px 20px;
`;

export const ItemWrapper = styled.div`

`;

export const ItemBox = styled.div`
    padding: 10px;
    background: #fff;
    margin-top: 10px;
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 20px;

    &:last-child{
        margin-bottom: 10px;
    }

    .name{
        font-size: 14px;
        color:#404040;
        font-weight: 500;
    }

    .description{
        margin-top: 5px;
        font-size: 12px;
        color: #606060;
    }

    .icon-button-item{
        margin:0;
        padding:0;
        width:20px;
        height: 20px;
        border:none;
        background: none;
    }
`;