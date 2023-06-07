import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    padding: 25px 20px;

    .thumbnail-figure{
        width: 200px;
        height: 200px;
        border:1px solid #f0f0f0;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 15px;

        @media screen and (max-width: 992px) {
            width: 150px;
            height: 150px;
        }
    }

    .text-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    @media screen and (max-width: 576px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
    }
`;

export const TextWrapper = styled.div`
    font-size: 16px;
    padding: 5px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 992px) {
        font-size: 14px;
    }
`;