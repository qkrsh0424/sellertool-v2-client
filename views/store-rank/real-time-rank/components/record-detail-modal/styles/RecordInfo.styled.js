import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: white;
    border: 1px solid #efefef;
    box-shadow: var(--defaultBoxShadow);
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
`;

export const LabelGroup = styled.div`
    display: flex;
    align-items: center;
    white-space: break-spaces;
    margin-bottom: 15px;

    &:last-child{
        margin-bottom: 0;
    }

    .content-value {
        font-weight: 700;
    }
`;