import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
    margin-bottom: 10px;
    overflow: hidden;
    overflow-x: scroll;
`;

export const LabelGroup = styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 10px;
    color: #666;
    margin-bottom: 10px;

    &:last-child{
        margin-bottom: 0;
    }

    .content-value {
        font-weight: 700;
        color: #4b4b4b;
        font-size: 1.2rem;
    }
`;