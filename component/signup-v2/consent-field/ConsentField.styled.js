import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
    background:#f9fbfc;
`;

const Wrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 50px;
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

    .prev-button-icon{
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width:80%;
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
        border-radius: 10px;

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

    .checkbox-el{
        width: 20px;
        height: 20px;

        @media all and (max-width: 992px){
            width: 15px;
            height: 15px;
        }
    }

    .label-el{
        margin-left: 10px;
        font-size: 16px;
        letter-spacing: 0.08em;

        @media all and (max-width: 992px){
            font-size: 14px;
        }
    }

    .label-link{
        color:var(--mainColor);
        font-weight: 600;
        text-decoration: none;
        cursor:pointer;
        -webkit-tap-highlight-color: #00000000;
    }
`;

export {
    Container,
    Wrapper,
    HeaderWrapper,
    FormGroup,
    InputBox
}