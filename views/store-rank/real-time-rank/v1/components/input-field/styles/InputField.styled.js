import styled from "styled-components";

export const Container = styled.div`
    overflow: hidden;
    padding: 15px;

    form {
        box-shadow: var(--defaultBoxShadow);
        padding: 15px;
        background-color: var(--mainColorOpacity30);
        border-radius: 60px;
        display: inline-block;
        overflow: hidden;
        animation-duration: 1s;
        animation-name: slidedown;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
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
    padding: 15px 30px;
    border-radius: 50px;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow);

    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
`;

export const InputFieldBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    @media screen and (max-width: 992px) {
        flex-direction: column;
        width: 80%;
    }

    .input-el {
        width: 200px;
        height: 30px;
        font-size: 14px;
        box-sizing: border-box;
        border: 1px solid #fff;
        border-bottom: 1px solid #bdbdbd;

        &:focus{
            outline: none;
            border: 1px solid #fff;
            border-bottom: 1px solid #bdbdbd;
        }

        @media screen and (max-width: 992px) {
            width: 100%;
            font-size: 12px;
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