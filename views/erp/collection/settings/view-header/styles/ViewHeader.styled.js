import styled from 'styled-components';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';

export const Container = styled.div`
    padding: 20px;
`;

export const Wrapper = styled.div`
    border: 1px solid #f0f0f0;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: var(--defaultBoxShadow);
`;

export const TitleContainer = styled.div`
    background: var(--defaultGrayColor);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .title{
        font-size: 18px;
        font-weight: 500;
    }

    .button-item{
        margin:0;
        padding:0;
        width:32px;
        height: 32px;
        border:none;
        background: none;
    }
`;

export const ItemListContainer = styled.div`
    max-height: 400px;
    overflow-y: scroll;

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #00000020;
        border-radius: 10px;
    }

    .isEmpty-notice{
        padding: 20px 0;
        font-size: 14px;
    }
`;

export const ItemListWrapper = styled.div`
    padding: 0 20px;
`;

export const ItemBox = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child{
        border-bottom: none;
    }

    .name{
        font-size: 16px;
        color: #404040;
        margin-bottom: 3px;
    }

    .description{
        font-size: 12px;
        color: #606060;
    }

    .icon-button-item{
        margin:0;
        padding:0;
        width:24px;
        height: 24px;
        border:none;
        background: none;
    }
`;

export const ListTitle = styled(CustomBlockButton)`
    background: #fafafa;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 700;
    border: none;
    text-align: left;
    color: #444;
    border-bottom: 1px solid #f0f0f0;
`;