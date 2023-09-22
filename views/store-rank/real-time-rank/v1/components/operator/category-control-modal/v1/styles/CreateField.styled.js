import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    font-size: 14px;

    .content-box {
        padding: 20px 40px;
    }

    .input-el {
        width:100%;
        box-sizing: border-box;
        padding: 10px;
        font-size: 14px;
        border:1px solid #e0e0e0;
        border-radius: 5px;
        flex:1;
        outline:none;

        &:focus{
            border:1px solid var(--mainColor);
            box-shadow: var(--defaultBoxShadow);
        }
    }

    .button-group{
        margin-top: 40px;
        display: flex;

        .button-el{
            margin:0;
            padding:0;
            height: 48px;
            border:none;
            color:#fff;
            font-size: 18px;
            font-weight: 500;
        }
    }
`;