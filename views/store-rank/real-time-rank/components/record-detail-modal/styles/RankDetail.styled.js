import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px 0;
`;

export const DetailInfoWrapper = styled.div`
    padding: 10px;
    background-color: white;
    border: 1px solid var(--mainColorOpacity500);
    margin-bottom: 10px;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
    display: flex;
    font-size: 14px;
    font-weight: 600;
    color: #666;

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
        color: #000;
    }

    .sub-info {
        display: flex;
        align-items: center;
        gap: 5px;
        min-height: 20px;

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