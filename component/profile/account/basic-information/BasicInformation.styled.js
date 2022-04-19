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
        display: flex;
        align-items: center;
        margin-bottom: 25px;
    }

    .input-label{
        width: 100px;
        margin-right: 10px;
        font-size: 14px;
    }

    .input-notice{
        color: #707070;
        font-size: 12px;
        margin-top: 3px;
    }

    .input-el{
        padding: 10px 5px;
        width: 280px;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;

        &:focus{
            outline: none;
            background: #2C73D20D;
        }
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
    }
`;

export {
    Container,
    TitleFieldWrapper,
    FormFieldWrapper,
    ButtonFieldWrapper
}