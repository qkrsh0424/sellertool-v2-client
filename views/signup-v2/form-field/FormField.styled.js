import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
`;

const LogoBox = styled.div`
    width: 50px;
    height: 50px;
    margin-top: 80px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    overflow: hidden;
`;

const Wrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 50px;

    border-radius: 15px;
    background:#ffffff;
    box-shadow: var(--defaultBoxShadow);

    @media all and (max-width: 992px){
        width: 90%;
    }
`;

const HeaderWrapper = styled.div`
    margin-top: 40px;
    position: relative;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;

    @media all and (max-width: 992px){
        padding: 0 20px;
    }

    .head-box{
        width: 120px;
    }

    .title{
        font-weight: 600;
        font-size: 18px;
        text-align: center;

        @media all and (max-width: 992px){
            font-size: 15px;
        }
    }

    .prev-button-el{
        position:relative;
        font-weight: 500;
        font-size: 18px;
        color: #606060;
        padding:0;
        margin:0;
        width:40px;
        height: 40px;
        border-radius: 50%;
        border:none;

        @media all and (max-width: 992px){
            width:30px;
            height: 30px;
        }
    }

    .prev-button-icon-figure{
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width:80%;
    }
    .prev-button-icon{
        
    }

    .page{
        font-weight: 500;
        font-size: 18px;
        color: #606060;
        text-align: right;

        @media all and (max-width: 992px){
            font-size: 15px;
        }
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
        margin-bottom: 40px;
        padding:0;

        background: var(--mainColor);
        border: 1px solid var(--mainColor);
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        transition: all .5s;
        
        &:hover{
            background: var(--mainColorHover);
            border: 1px solid var(--mainColorHover);
        }

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
            border: 1px solid #e0e0e0;
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

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .input-item{
        width: 100%;
        height: 48px;
        padding: 0 12px;

        border: 1px solid #e1e1e1;
        border-radius: 10px;
        box-sizing: border-box;

        font-size: 14px;

        transition: all .5s;
        outline: none;
        &:hover{
            box-shadow: var(--defaultBoxShadow);
        }
        &:focus{
            box-shadow: var(--defaultBoxShadow);
            border: 1px solid var(--mainColor);
        }

        @media all and (max-width: 992px){
            font-size: 14px;
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

    .validation-button-el{
        margin: 0;
        width: 150px;
        height: 48px;
        margin-left: 5px;
        border-radius: 10px;
        font-size: 14px;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .valid-label{
        display:inline-block;
        margin-right:10px;
        font-size: 12px;
        font-weight: 400;

        color:#e56767;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
    }

    .pass-valid-label{
        color:#5fcf80;
    }
`;

export {
    Container,
    LogoBox,
    Wrapper,
    HeaderWrapper,
    FormGroup,
    InputBox
}