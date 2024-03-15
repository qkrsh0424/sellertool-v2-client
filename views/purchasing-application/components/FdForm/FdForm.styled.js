import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    padding-top: 20px;
`;

export const Wrapper = styled.div`
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TitleContainer = styled.div`
    font-size: 20px;
    font-weight: 700;
`;


export const ControlContainer = styled.div`
    label{
        display: inline-block;
        margin-bottom: 5px;
        font-size: 12px;
        color: #444;
    }

    & > input{
        border-radius: 10px;
        background: var(--defaultBlueColorOpacity100);
        border: 1px solid #00000000;
        font-weight: 500;
        transition: all .3s;

        &::placeholder{
            color: #a0a0a0;
        }

        &:focus{
            outline: none;
            border-color: var(--mainColor);
            scale: 1.02;
            box-shadow: var(--defaultBoxShadow3);
            background-color: #fff;
        }

    }

    & > textarea{
        border-radius: 10px;
        background: var(--defaultBlueColorOpacity100);
        border: 1px solid #00000000;
        font-weight: 500;
        width: 100%;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        height: 100px;
        transition: all .3s;
        resize: none;

        &::placeholder{
            color: #a0a0a0;
        }

        &:focus{
            outline: none;
            border-color: var(--mainColor);
            scale: 1.02;
            box-shadow: var(--defaultBoxShadow3);
            background-color: #fff;
        }
    }

    & > select{
        border-radius: 10px;
        background-color: var(--defaultBlueColorOpacity100);
        border: 1px solid #00000000;
        font-weight: 500;
        transition: all .3s;

        &::placeholder{
            color: #a0a0a0;
        }
        
        &:focus{
            outline: none;
            border-color: var(--mainColor);
            scale: 1.02;
            box-shadow: var(--defaultBoxShadow3);
            background-color: #fff;
        }
    }
`;

export const FooterButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;

    & > button{
        max-width: 150px;
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        border: none;
    }

    & > button.cancel{
        background-color: var(--defaultModalCloseColor);
    }

    & > button.submit{
        background-color: var(--mainColor);
    }
`;