import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    @media screen and (max-width: 992px) {
        display: block;
    }

    .button-box {
        @media screen and (max-width: 992px) {
            display: flex;
            margin-bottom: 10px;
        }
    }

    .button-box .button-el {
        border: none;
        width: 80px;
        font-size: 11px;
        background-color: #f4f4f4;
        border-radius: 5px;
        cursor: pointer;
        color: rgb(96, 96, 96);
        height: 30px;

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .rank-trend-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        font-size: 12px;
        min-width: 120px;
    }

    .rank-trend-box .open-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background-color: #fff;
        border: 1px solid var(--mainColor);
        border-radius: 15px;
        /* color: #404040; */
        color: var(--mainColor);
        font-weight: 600;
        padding: 0 10px;
        font-size: 12px;
        cursor: pointer;
        transition: 0.15s;
        height: 30px;

        &:hover {
            color: #fff;
            background-color: var(--mainColorOpacity500);
            border: 1px solid var(--mainColorOpacity500);
        }
    }

    .rank-trend-box .disabled-btn {
        border: 1px solid #e3e3e3;
        color: #e3e3e3;
        pointer-events: none;
        cursor: not-allowed;
    }
`;
