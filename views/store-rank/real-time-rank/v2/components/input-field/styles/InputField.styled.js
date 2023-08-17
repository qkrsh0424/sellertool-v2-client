import styled from "styled-components";

export const Container = styled.div`
    overflow: hidden;
    
    form {
        box-shadow: var(--defaultBoxShadow);
        padding: 15px;
        background-color: var(--mainColorOpacity30);
        /* border-radius: 0 0 50px 50px; */
        border-radius: 60px;
        margin: 15px;
        margin-bottom: 0;
        display: inline-block;
        overflow: hidden;
        animation-duration: 1s;
        animation-name: slidedown;
    }

    @media all and (max-width:992px){
        padding: 10px;
    }

    @keyframes slidedown {
        from {
            opacity: 0;
            transform: translateY(-80%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
        
    @-moz-keyframes slidedown { /* Firefox */
        from {
            opacity: 0;
            transform: translateY(-80%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
        
    @-webkit-keyframes slidedown { /* Safari and Chrome */
        from {
            opacity: 0;
            transform: translateY(-80%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @-o-keyframes slidedown { /* Opera */
        from {
            opacity: 0;
            transform: translateY(-80%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const Wrapper = styled.div`
    width: 720px;
    height: 80px;
    border-radius: 50px;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow);

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 992px) {
        width: 100%;
        height: 150px;
        padding: 15px;
    }
`;

export const InputFieldBox = styled.div`
    .input-el {
        width: 240px;
        margin-right: 40px;
        font-size: 1.1rem;
        box-sizing: border-box;
        border: 1px solid #fff;
        border-bottom: 1px solid #bdbdbd;
        height: 45px;

        &:focus{
            outline: none;
            border: 1px solid #fff;
            border-bottom: 1px solid #bdbdbd;
        }


        @media screen and (max-width: 992px) {
            width: 90%;
        }
    }
`

export const ButtonFieldBox = styled.div`
    .submit-button-box{
        display: flex;
        justify-content: flex-end;
        background-color: var(--mainColor);
        border-radius: 50%;
        transition: 0.2s;

        &:hover {
            transform: scale(1.1);
        }

        .submit-button-el{
            -webkit-tap-highlight-color: #00000000;
            width: 40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;
        }
    
    }
`;