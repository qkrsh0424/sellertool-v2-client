import styled from 'styled-components';

const Container = styled.div`
    flex:1;
`;

const HeadFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title{
        font-size: 21px;
        font-weight: 500;
    }

    .flex-box{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        padding: 0;
        margin: 0;
        margin-left: 10px;
        width: 30px;
        height: 30px;
        border: 1px solid #e0e0e0;
        background: white;

        cursor: pointer;
    }

    .button-icon-figure{
        position: relative;
        width: 20px;
        height: 20px;
        margin: auto;
    }

    .button-icon{
        opacity: 0.6;
    }

    .normal-button{
        &:hover{
            background: #2c73d2;
            border:1px solid #2c73d2;

            & .button-icon{
                filter: invert(100%);
                opacity: 1;
            }
        }
    }

    .delete-button{
        &:hover{
            background: #ff6961;
            border:1px solid #ff6961;

            & .button-icon{
                filter: invert(100%);
                opacity: 1;
            }
        }
    }
`;

const OptionAddAndEditModalWrapper = styled.div`
    
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
        margin-top: 15px;
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

    .image-box{
        width: 50%;
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        cursor: pointer;
    }
`;

const OptionListFieldWrapper = styled.div`
    border: 1px solid #e0e0e0;
    margin-top: 10px;
    overflow: auto;
    max-height: 500px;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #00000025;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
    }

    .item-box:nth-last-child(1){
        border-bottom: none;
    }

    .item-box{
        border-bottom: 1px solid #e0e0e0;
        cursor:pointer;

        &:hover{
            background: #2c73d210;
        }
    }

    .item-box-active{
        background: #2c73d230 !important;
    }

    .code-box{
        padding:5px;
        font-size: 12px;
        font-weight: 500;
        color:#626262;
    }

    .code-box-active{
        font-weight: 600;
        color:#2c73d2;
    }

    .flex-box{
        display: flex;
        align-items: center;
    }

    .image-box{
        width:60px;
    }

    .content-box{
        margin-left: 10px;
        flex:1;
    }

    .content-text{
        font-size: 13px;
        font-weight: 500;
    }
`;

export {
    Container,
    HeadFieldWrapper,
    OptionAddAndEditModalWrapper,
    OptionListFieldWrapper
}