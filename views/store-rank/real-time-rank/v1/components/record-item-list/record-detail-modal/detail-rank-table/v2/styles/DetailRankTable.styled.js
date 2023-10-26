import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 20px 0 20px;
`;

export const Wrapper = styled.div`
    min-height: 40vh;
    /* max-height: 50vh; */
    overflow: auto;
    margin-bottom: 50px;
    /* background-color: #fff; */
    border-radius: 0 0 15px 15px;
    box-shadow: var(--defaultBoxShadow);
    background-color: #fff;
    border-bottom: 4px solid #eef2f9;

    .trend-wrapper {
        position:relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;

        :last-child {
            margin-bottom: 0;
        }
    }

    .blank-info-text {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20vh;
        font-size: 12px;
        color: #909090;
    }
`;