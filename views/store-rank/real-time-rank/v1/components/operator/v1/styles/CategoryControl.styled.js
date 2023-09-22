import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    .button-item {
        border: 1px solid var(--mainColor);
        background-color: #fff;
        color: #444;
        font-size: 12px;
        font-weight: 600;
        border-radius: 7px;
        width: 130px;
        cursor: pointer;
    }
`;