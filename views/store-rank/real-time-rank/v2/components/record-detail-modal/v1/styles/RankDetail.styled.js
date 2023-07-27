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
    color: #888;
    padding: 10px;
    min-height: 220px;
    max-height: 220px;
    border-bottom: 4px solid #eef2f9;

    &:last-child {
        margin-bottom: 0;
    }

    @media screen and (max-width: 992px){
        max-height: fit-content;
        flex-direction: column;
        align-items: flex-start;
    }

    .image-el {
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        border: 1px solid #ededed;
    }

    .info-field {
        /* padding: 0 10px; */
        margin-bottom: 10px;
    }

    .rank-field {
        /* padding: 0 10px; */
    }

    .accent-text {
        font-weight: 800;
        font-size: 1.1rem;
        color: #4b4b4b;
    }
`;

export const InfoGroupBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .sub-info {
        display: flex;
        align-items: center;
        min-height: 20px;

        .sub-info-box {
            padding: 0 4px;
            background-color: var(--default-box-color);
            border: 1px solid var(--default-box-color);
            color: white;
            border-radius: 2px;
            margin-right: 5px;
        }
    }

    .highlight{
        display: inline-block;
        position:relative;
        font-weight: 700;
        color: #404040;
    }

    .highlight:hover:after{
        content:"";
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        height: 7px;
        border-radius: 3px;
        display: inline-block;
        background: var(--mainColorOpacity30);
    }
`;

export const DetailInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin-right: 7px;

    &:last-child {
        margin-right: 0;
    }
`;

export const InfoText = styled.div`
    position: absolute;
    top: 1;
    left: 0;
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #939393;
`;