import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 20px 10px;
    }
`;

export const Wrapper = styled.div`
    position: relative;
    border: none;
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);
    padding: 20px;
    overflow: hidden;
`;

export const FlexGroup = styled.div`
    display: flex;
    gap: 10px;
    .selectWrapper{
        width: 200px;
        button{
            border-radius: 10px;
        }
    }

    .clearButtonWrapper{
        width: 200px;
        button{
            border-radius: 10px;
            background: var(--defaultModalCloseColor);
            color: #fff;
            border: none;
            font-weight: 700;
        }
    }
`;

export const SortItemsWrapper = styled.div`
    .itemList__box{
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
    }

    .itemList__box > .item__box{
        display: flex;
        gap: 5px;
        align-items: center;
        border: none;
        background: var(--grayButtonColor);
        padding: 3px 8px;
        border-radius: 5px;
    }

    .itemList__box > .item__box > .text{
        font-size: 11px;
        font-weight: 500;
    }

    .itemList__box > .item__box > .deleteIconBtn{
        width:25px;
        height: 25px;
        background: none;
        padding:5px;
        border-radius: 50%;
    }
`;

export const LoadingPannel = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
`;