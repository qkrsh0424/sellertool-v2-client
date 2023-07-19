import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 20px 0 20px;

    @media all and (max-width:992px){
        padding: 20px 10px 0 10px;
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
    
    margin-bottom: 50px;
`;

export const InputFieldBox = styled.div`
    .input-el {
        width: 240px;
        margin-right: 40px;
        font-size: 1.1rem;
        box-sizing: border-box;
        border: 1px solid #fff;
        border-bottom: 1px solid #bdbdbd;
        height: 40px;

        &:focus{
            outline: none;
            border: 1px solid #fff;
            border-bottom: 1px solid #bdbdbd;
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