import styled from 'styled-components';

export const Container = styled.div`
    padding: 40px 20px;

`;

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 15px;

    .content__box{
        
    }

    .content__box > label{
        display: inline-block;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .content__box > .locationTypeButtonGroup__box{
        display: flex;
        flex-direction: row;
        gap: 10px;

        button{
            width: 80px;
            border-radius: 10px;
            height: 38px;
            background: #efefef;
            border:none;
            font-size: 13px;
            font-weight: 600;
        }
    }

    .content__box > .manually__box{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
        font-size: 14px;
        font-weight: 600;
        select{
            width:auto;
            text-align: center;
            border-radius:10px;
            padding: 0 40px;
        }
    }

    .content__box > input{
        border-radius: 10px;
        font-weight: 500;
    }

    .buttonGroup__box{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 10px;
    }

    .buttonGroup__box > button{
        width:100px;
        border-radius: 10px;
        background: #efefef;
        border: none;
        font-weight: 600;
        color:#000;
    }
`;