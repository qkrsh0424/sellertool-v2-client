import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 20px 0 20px;
`;

export const Wrapper = styled.div`
    min-height: 50vh;
    max-height: 50vh;
    overflow: auto;
    margin-bottom: 50px;

    .trend-wrapper {
        position:relative;
        border-radius: 15px;
        box-shadow: var(--defaultBoxShadow);
        background-color: #fff;
        border: 1px solid #eef2f9;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;

        :last-child {
            margin-bottom: 0;
        }
    }
`;