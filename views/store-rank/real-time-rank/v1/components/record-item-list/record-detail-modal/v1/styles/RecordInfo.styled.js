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

    .image-box {
        min-width: 90px;
        max-width: 90px;
        height: 90px;
    }
`;

export const LabelGroup = styled.div`
    padding: 0 5px;
    color: #666;
    font-size: 12px;
    margin-bottom: 10px;

    &:last-child{
        margin-bottom: 0;
    }

    .content-value {
        font-size: 14px;
        font-weight: 700;
        color: #4b4b4b;
    }
`;