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
        padding: 7px;
        font-size: 12px;
        background-color: #efefef;
        color: #808080;
        font-weight: 500;
        cursor: pointer;
        white-space: break-spaces;
        transition: 0.15s;
        box-shadow: var(--defaultBoxShadow);

        display: flex;
        align-items: center;
        justify-content: center;


        &:hover {
            background-color: #f0f2f4;
        }

        &.active-el {
            background-color: #eef2f9;
            border: 1px solid #eef2f9;
            color: #404040;
            font-weight: 600;

            .info-box {
                background-color: #c4cad4;
            }
        }
        
        .info-box {
            background-color: #d8d8d8;
            border-radius: 2px;
            color: white;
            padding: 2px 7px;
            margin: 0 10px;
        }
    }
`;