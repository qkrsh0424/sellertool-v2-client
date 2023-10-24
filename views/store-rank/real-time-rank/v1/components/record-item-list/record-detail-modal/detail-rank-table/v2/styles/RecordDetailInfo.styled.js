import styled from "styled-components";

export const Wrapper = styled.div`
    font-size: 12px;
    font-weight: 600;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;

    @media screen and (max-width: 992px) {
        font-size: 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
    }

    .image-box {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
    }

    .image-el {
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        border: 1px solid #ededed;
    }

    .info-box {
        display: flex;
    }

    .info-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        overflow: hidden;
    }

    .sub-info-box {
        text-align: center;
        background-color: #919dbd;
        border: 1px solid #919dbd;
        color: white;
        border-radius: 2px;
        margin-right: 5px;
    }
`;