import styled from "styled-components";

export const Wrapper = styled.div`
    margin-bottom: 20px;

    .button-item {
        font-size: 1rem;
        font-weight: 700;
        background-color: var(--mainColor);
        border-radius: 10px;
        color: #fff;
        box-shadow: var(--defaultBoxShadow);
    }

    .disabled-btn {
        border-radius: 10px;
    }

    .timer-button {
        font-size: 1.1rem;
        font-weight: 700;
        color: #999;
        /* -webkit-text-stroke: 0.5px #000; */
        
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
`;