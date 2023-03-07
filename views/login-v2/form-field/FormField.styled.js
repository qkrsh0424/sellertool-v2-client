import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
`;

const Wrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 50px;

    border-radius: 15px;
    background:#ffffff;
    box-shadow: var(--defaultBoxShadow);

    @media all and (max-width: 992px){
        width: 90%;
    }
`;

const FormGroup = styled.form`
    padding: 0 50px;

    @media all and (max-width: 992px){
        padding: 0 20px;
    }
    
    .submit-button{
        width: 100%;
        height: 48px;
        margin-top: 40px;
        padding:0;

        background: var(--mainColor);
        border: 1px solid var(--mainColor);
        border-radius: 10px;

        font-size: 16px;
        font-weight: 600;
        color: #fff;

        transition: all .5s;
        
        &:hover{
            background: var(--mainColorHover);
            border: 1px solid var(--mainColorHover);
        }

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
        }
    }

    .find-link-group{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
    
    .find-link-group>.username{
        font-size: 13px;
        color: #808080;
        cursor:pointer;
        -webkit-tap-highlight-color: #00000000;
        text-decoration: none;

        &:hover{
            text-decoration: underline;
        }
    }

    .find-link-group>.password{
        font-size: 13px;
        color: #808080;
        cursor:pointer;
        -webkit-tap-highlight-color: #00000000;
        text-decoration: none;

        &:hover{
            text-decoration: underline;
        }

        &::before{
            background-color: #d7dce0;
            display: inline-block;
            width: 3px;
            height: 3px;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            vertical-align: top;
            content: '';
            margin: 0 5px 0 5px;
            vertical-align: 3px;
        }
    }
`;

const InputBox = styled.div`
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

export {
    Container,
    Wrapper,
    FormGroup,
    InputBox
}