import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const ButtonBox = styled.div`
    width: 100%;

    &:last-child {
        margin-right: 0;
    }

    .button-el {
        width: 100%;
        border: 1px solid #efefef;
        padding: 10px 15px;
        font-size: 14px;
        background-color: #efefef;
        color: #808080;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        white-space: break-spaces;
        transition: 0.15s;
        box-shadow: var(--defaultBoxShadow);


        &:hover {
            background-color: #f0f2f4;
        }

        &.active-el {
            background-color: #eef2f9;
            border: 1px solid #eef2f9;
            color: #404040;
            font-weight: 600;
        }
    }
`;