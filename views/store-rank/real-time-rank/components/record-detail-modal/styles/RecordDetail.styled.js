import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px 20px 0 20px;

    @media all and (max-width:992px){
        padding: 20px 10px 0 10px;
    }

    .button-item {
        font-size: 1rem;
        font-weight: 700;
        background-color: var(--mainColor);
        border-radius: 10px;
        color: #fff;
        box-shadow: var(--defaultBoxShadow);
    }
`;
