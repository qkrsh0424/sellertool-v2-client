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

export const ControlBox = styled.div`
    width: 100%;
    margin-top: 40px;

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

    .select-item{
        border: 1px solid #e1e1e1;
        border-radius: 10px;
        box-sizing: border-box;
        transition: all .5s;
        outline: none;
        font-size: 15px;

        &:hover{
            box-shadow: var(--defaultBoxShadow);
        }

        &:focus{
            box-shadow: var(--defaultBoxShadow);
            border: 1px solid #344b98;
        }
    }

`;