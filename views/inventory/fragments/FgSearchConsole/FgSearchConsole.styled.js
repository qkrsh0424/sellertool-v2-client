import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;

    @media all and (max-width: 992px){
        padding: 20px 10px;
    }
`;

export const FieldLayout = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    overflow: hidden;
`;

export const HeaderLayout = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--defaultGrayColor);
`;

export const BodyLayout = styled.div`
    padding: 0 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const FooterLayout = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 20px;
`;

export const BodyLayout__CategorySelectorContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;

    & > .categorySelector__box{
        width:250px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }

    & > .categorySelector__box > label{ 
        display: inline-block;
        margin-bottom:5px;
    }

    & > .categorySelector__box > button{
        padding:0;
        margin:0;
        height: 40px;
        border-radius: 5px;
        background: var(--defaultGrayColor);
        border:1px solid #f0f0f0;
        font-size: 14px;

        &:hover{
            transition: all .3s;
            background: white;
        }
    }
`;

export const BodyLayout__SearchFilterContainer = styled.div`
    .form__box{
        display: flex;
        gap:20px;

        @media all and (max-width:992px){
            flex-direction: column;
        }
    }

    .form__box > .eventControl__box{
        width:250px;

        @media all and (max-width:992px){
            width:100%;
        }
    }

    .form__box > .eventControl__box > select, input, button{
        border-radius: 5px;
        height: 40px;
    }

    .form__box > .eventControl__box > button{
        width: 80px;
        border: none;
        background-color: var(--grayButtonColor);

        @media all and (max-width:992px){
            width:100%;
        }
    }

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
        cursor: pointer;
        width:25px;
        height: 25px;
        background: none;
        padding:5px;
        border-radius: 50%;

        &:hover{
            background:#fff;
        }
    }
`;

export const BodyLayout__SortTypeContainer = styled.div`
    .eventControlGroup__box{
        display: flex;
        gap:20px;
    }

    .eventControlGroup__box > .eventControl__box{
        width:250px;

        @media all and (max-width:992px){
            width:100%;
        }
    }

    .eventControlGroup__box > .eventControl__box > select, input, button{
        border-radius: 5px;
        height: 40px;
    }

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
        cursor: pointer;
        width:25px;
        height: 25px;
        background: none;
        padding:5px;
        border-radius: 50%;

        &:hover{
            background:#fff;
        }
    }
`;

export const FooterLayout__ButtonGroupContainer = styled.div`
    display: flex;
    justify-content: flex-end;

    .button-item{
        padding:0;
        margin:0;
        width: 120px;
        height: 40px;
        border-radius: 5px;
        background: var(--defaultModalCloseColor);
        color: #fff;
        border:none;
        font-size: 16px;

        &:first-child{
            margin-right: 10px;
        }
    }
`;