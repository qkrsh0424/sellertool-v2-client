import styled from 'styled-components';

const Container = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const TitleFieldWrapper = styled.div`
    .title{
        font-size: 18px;
        font-weight: 500;
    }
`;

const FormFieldWrapper = styled.div`
    .input-box{
        margin-bottom: 25px;
        width: 430px;

        @media screen and (max-width: 576px) {
            width: 100%;
        }
    }

    .input-label{
        margin-bottom: 10px;
        font-size: 14px;
    }

    .input-label span {
        font-size: 12px;
        color: #707070;
    }

    .input-notice{
        color: #707070;
        font-size: 12px;
        margin-top: 3px;
        padding: 2px;
    }

    .re-request {
        color: #2C73D2;
        text-decoration: underline;
        cursor: pointer;
    }

    .input-el{
        padding: 10px 5px;
        width: 100%;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;

        &:focus{
            outline: none;
            background: #2C73D20D;
        }

        :disabled {
            background: #e0e0e0;
            border: 1px solid #e0e0e0;
        }
    }

    .input-box .input-side-btn {
        padding: 10px;
        margin: 0 5px;
        border-radius: 2px;
        border: 1px solid #2C73D2;
        background-color: #2C73D2;
        color: white;
        cursor: pointer;
        width: 100px;

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
            border: 1px solid #e0e0e0;
        }

        transition: all .3s;
        &:hover{
            background: #309FFF;
            border: 1px solid #309FFF;
        }
    }

    .auth-box {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
    }

    .input-el-box {
        width: 75%;
    }
`;

const ButtonFieldWrapper = styled.div`
    .submit-button-el{
        font-size: 18px;
        padding: 0;
        margin: 0;
        width: 250px;
        height: 50px;
        background:#2C73D2;
        color:white;
        border: none;

        cursor: pointer;

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
        }

        @media screen and (max-width: 576px){
            width: 90%;
        }
    }
`;

export {
    Container,
    TitleFieldWrapper,
    FormFieldWrapper,
    ButtonFieldWrapper
}