import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #fff;
    border: 1px solid #fff;
    box-shadow: var(--defaultBoxShadow);
    overflow: hidden;
    border-radius: 15px;
    margin-bottom: 20px;
    
    display: flex;
    align-items: center;
`;

export const LabelGroup = styled.div`
    display: flex;
    align-items: center;
    white-space: break-spaces;
    margin-bottom: 15px;
    color: #666;

    &:last-child{
        margin-bottom: 0;
    }

    .content-value {
        font-weight: 700;
        color: #4b4b4b;
        font-size: 1.2rem;
    }
`;