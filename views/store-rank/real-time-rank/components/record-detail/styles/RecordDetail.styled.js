import styled from "styled-components";

export const Container = styled.div`
    padding: 50px 50px 0 50px;

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
