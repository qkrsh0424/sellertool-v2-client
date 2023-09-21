import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    font-size: 14px;

    .content-box {
        padding: 20px 40px;
    }

    .select-el {
        border-radius: 5px;
        height: 40px;
        margin-bottom: 10px;
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
        height: 40px;

        &:focus{
            border:1px solid var(--mainColor);
            box-shadow: var(--defaultBoxShadow);
        }

        &:disabled {
            background-color: #efefef;
            cursor: not-allowed;
        }
    }
`;