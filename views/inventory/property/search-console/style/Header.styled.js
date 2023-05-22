import styled from "styled-components";

export const Wrapper = styled.div`
    background: var(--defaultGrayColor);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title{
        font-size: 18px;
    }

    .dropdown-button-item{
        margin:0;
        padding:0;
        width:28px;
        height: 28px;
        border-radius: 5px;
        border: 1px solid #f0f0f0;
    }
`;