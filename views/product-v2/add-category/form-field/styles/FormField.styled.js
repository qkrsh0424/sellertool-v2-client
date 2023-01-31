import styled from 'styled-components';

export const Container = styled.div`
    overflow: hidden;
`;

export const Wrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 60px 0;

    border-radius: 15px;
    background:#ffffff;
    box-shadow: var(--defaultBoxShadow);

    @media all and (max-width: 992px){
        width: 90%;
    }
`;

export const Title = styled.div`
    text-align: center;
    font-weight: 600;
    font-size: 18px;
`;

export const FormGroup = styled.form`
    padding: 0 50px;
    /* margin-bottom: 40px; */

    @media all and (max-width: 992px){
        padding: 0 20px;
    }
    
    .submit-button{
        width: 100%;
        height: 48px;
        padding:0;
        margin: 40px 0 0 0;

        background: var(--mainColor);
        border: none;
        border-radius: 10px;

        font-size: 16px;
        font-weight: 600;
        color: #fff;

        transition: all .5s;
        
        &:hover{
            background: var(--mainColorHover);
        }

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
        }
    }
`;

export const InputBox = styled.div`
    width: 100%;
    margin-top: 40px;

    .input-label{
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #555;
    }

    .input-item{
        width: 100%;
        height: 48px;
        padding: 0 12px;

        border: 1px solid #e1e1e1;
        border-radius: 10px;
        box-sizing: border-box;

        font-size: 15px;

        transition: all .5s;
        outline: none;
        
        &:hover{
            box-shadow: var(--defaultBoxShadow);
        }
        &:focus{
            box-shadow: var(--defaultBoxShadow);
            border: 1px solid #344b98;
        }
    }

    .input-notice{
        color: #707070;
        font-size: 12px;
        margin-top: 3px;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
    }

    .valid-label{
        display:inline-block;
        margin-right:10px;
        padding:1px 5px;

        border:1px solid red;
        font-size: 12px;
        font-weight: 400;

        color:red;
    }

    .pass-valid-label{
        border:1px solid #50bb1a;
        color:#50bb1a;
    }
`;