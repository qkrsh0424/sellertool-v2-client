import styled from 'styled-components';

const Container = styled.div`
    margin-top: 20px;
    /* max-width: 1280px;
    margin-left:auto;
    margin-right: auto; */
`;

const CategorySelectorFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .select-item{
        width: 300px;
        height: 43px;
        padding: 5px;
        /* margin: 0 10px; */
        border: 1px solid #e1e1e1;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/images/icon/down_arrow_icon2.png') no-repeat right 0 center;
        background-size: 30px;
        

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            /* margin: 10px 0 0 0; */
            width: 100%;
        }
    }

    .category-add-button-el{
        position:relative;
        overflow: hidden;
        width: 43px;
        height: 43px;
        padding: 0;
        margin: 0;
        margin-left: 10px;

        background: white;
        border: 1px solid #e0e0e0;

        cursor: pointer;

        &:hover{
            background: #2C73D2;
            border: 1px solid #2C73D2;

            & .category-add-button-icon-figure{
                opacity: 1;
                filter:invert(100%);
            }
        }
    }

    .category-add-button-icon-figure{
        position: relative;
        width: 30px;
        height: 30px;
        margin: auto;
        opacity: 0.6;
    }
`;

const CategoryModalWrapper = styled.div`
    .head-title{
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 600;
    }

    .body-wrapper{
        margin-top: 20px;
        padding: 0 10px;
    }

    .footer-wrapper{
        margin-top: 20px;
        display: flex;
    }

    .input-box{

    }

    .input-el{
        box-sizing: border-box;
        height: 34px;
        width: 100%;
        margin-top: 10px;
        padding: 0 5px;
        border: 1px solid #e0e0e0;

        &:focus{
            outline: none;
        }
    }

    .input-label{
        font-size: 13px;
        font-weight: 500;
    }

    .input-notice{
        margin-top: 10px;
        font-size: 13px;
        color: #626262;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        flex:1;
        height: 34px;
        background: white;
        border: none;
        font-weight: 500;

        cursor: pointer;

        &:hover{
            font-weight: 600;
            background: #e0e0e060;
        }

        &:disabled{
            cursor: not-allowed;
        }
    }
`;

const SelectedCategoryFieldWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .flex-box{
        display: flex;
        align-items: center;

        .button-el:nth-last-child(1){
            margin-left: 10px;
        }
    }
    
    .category-title{
        font-size: 24px;
        font-weight: 500;
    }

    .button-el{
        padding:0;
        margin:0;
        width: 100px;
        height: 25px;
        font-size: 12px;
        font-weight: 500;
        background: white;
        border:1px solid #e0e0e0;

        cursor: pointer;
    }

    .edit-button{
        &:hover{
            background: #2c73d2;
            border:1px solid #2c73d2;
            color:white;
        }
    }

    .delete-button{
        color:#ff6961;
        border:1px solid #ff6961;
        &:hover{
            background: #ff6961;
            border:1px solid #ff6961;
            color:white;
        }
    }
`;

export {
    Container,
    CategorySelectorFieldWrapper,
    CategoryModalWrapper,
    SelectedCategoryFieldWrapper
}