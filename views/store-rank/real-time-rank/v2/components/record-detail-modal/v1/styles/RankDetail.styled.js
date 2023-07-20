import styled from "styled-components";

export const Wrapper = styled.div`
    min-height: 50vh;
    max-height: 50vh;
    margin-bottom: 20px;
    border-radius: 0 0 15px 15px;
    box-shadow: var(--defaultBoxShadow);
    background-color: #fff;
    border: 1px solid #eef2f9;
    overflow: auto;
`;

export const DetailInfoWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #666;
    padding: 10px;
    border-bottom: 4px solid #eef2f9;

    &:last-child {
        margin-bottom: 0;
    }

    .image-el {
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        border: 1px solid #ededed;
    }

    .info-field {
        padding: 0 10px;
        margin-bottom: 10px;
    }

    .rank-field {
        padding: 0 10px;
    }

    .accent-text {
        font-weight: 800;
        font-size: 1.1rem;
        color: #4b4b4b;
    }

    .sub-info {
        display: flex;
        align-items: center;
        gap: 5px;
        min-height: 20px;
        position: absolute;
        top: 0;

        .sub-info-box {
            padding: 0 4px;
            background-color: var(--default-box-color);
            border: 1px solid var(--default-box-color);
            color: white;
            border-radius: 2px;
        }
    }
`;

export const InfoGroupBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: break-spaces;

    .hover-effet {
        transition: 0.2s;

        &:hover {
            text-decoration: underline;
            text-underline-offset: 1px;
        }
    }
`;

export const InfoText = styled.div`
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
`;