import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const ButtonBox = styled.div`
    &:last-child {
        margin-right: 0;
    }

    .button-el {
        border: none;
        padding: 7px 15px;
        font-weight: 600;
        background-color: #b4b4b4;
        color: #fff;
        cursor: pointer;
        white-space: break-spaces;
        transition: 0.15s;

        &:hover {
            background-color: #999;
        }

        &.active-el {
            background-color: #4c4c4c;
        }
    }
`;