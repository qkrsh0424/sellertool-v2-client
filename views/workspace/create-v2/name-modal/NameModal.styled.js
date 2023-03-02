import styled from 'styled-components';

const Container = styled.div`

`;

const TitleFieldWrapper = styled.div`
    padding: 10px;
    font-weight: 600;
    border-bottom: 1px solid #e0e0e0;
`;

const FormFieldWrapper = styled.div`
    margin-top: 30px;
    padding: 0 10px;

    .input-box{
        
    }

    .input-label{
        font-size: 13px;
        font-weight: 600;
    }

    .input-el{
        margin-top: 5px;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #e0e0e0;
        padding: 10px 5px;

        &:focus{
            outline: none;
        }
    }

    .input-notice{
        margin-top: 5px;
        font-size: 11px;
    }
`;

const ButtonFieldWrapper = styled.div`
    display: flex;
    margin-top: 30px;

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
    TitleFieldWrapper,
    FormFieldWrapper,
    ButtonFieldWrapper
}