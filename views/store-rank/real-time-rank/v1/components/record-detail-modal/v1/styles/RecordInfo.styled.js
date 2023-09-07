import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
    margin-bottom: 10px;
    overflow: hidden;
`;

export const LabelGroup = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    gap: 10px;
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;

    &:last-child{
        margin-bottom: 0;
    }

    .content-value {
        font-size: 16px;
        font-weight: 700;
        color: #4b4b4b;
    }
`;