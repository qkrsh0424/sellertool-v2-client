import styled from "styled-components";

export const Wrapper = styled.div`
    margin-bottom: 20px;

    .button-item {
        font-size: 14px;
        font-weight: 700;
        background-color: var(--mainColor);
        border-radius: 10px;
        color: #fff;
        box-shadow: var(--defaultBoxShadow);
        transition: 0.2s;
        height: 45px;

        &:hover {
            background-color: var(--mainColorHover);
        }
    }

    .disabled-btn {
        border-radius: 10px;
    }

    .timer-button {
        position: relative;
        font-size: 14px;
        font-weight: 700;
        color: #999;
        
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .progress-box {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
`;