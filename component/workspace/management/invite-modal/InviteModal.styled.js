import styled from 'styled-components';

const Container = styled.div`

`;

const HeadFieldWrapper = styled.div`
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 18px;
    font-weight: 600;
`;

const FormFieldWrapper = styled.div`
    margin-top: 30px;
    padding: 0 10px;
    .input-box{
    }

    .input-label{
        font-size: 13px;
        font-weight: 500;
    }

    .input-el{
        box-sizing: border-box;
        width: 100%;
        margin-top: 5px;
        padding: 10px 5px;
        border: 1px solid #e0e0e0;

        &:focus{
            outline: none;
        }
    }

    .check-button-box{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .check-button-el{
        padding: 5px 10px;
        background: #2C73D2;
        border: none;
        color:white;
    }
`;

const ButtonFieldWrapper = styled.div`
    margin-top: 30px;
    display: flex;

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

export {
    Container,
    HeadFieldWrapper,
    FormFieldWrapper,
    ButtonFieldWrapper
}