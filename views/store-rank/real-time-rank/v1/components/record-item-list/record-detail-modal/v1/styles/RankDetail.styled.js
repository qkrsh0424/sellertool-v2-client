import styled from "styled-components";

export const Wrapper = styled.div`
    min-height: 45vh;
    max-height: 45vh;
    /* margin-bottom: 20px; */
    margin-bottom: 5px;
    border-radius: 0 0 15px 15px;
    box-shadow: var(--defaultBoxShadow);
    background-color: #fff;
    border: 1px solid #eef2f9;
    overflow: auto;
`;

export const DetailInfoWrapper = styled.div`
    min-height: 100px;
    border-bottom: 4px solid #eef2f9;
`;

export const MainInfoWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #888;
    padding: 5px;
    min-height: 100px;

    @media screen and (max-width: 992px) {
        font-size: 11px;
        flex-direction: column;
        align-items: normal;
    }

    &:last-child {
        margin-bottom: 0;
    }

    .image-box {
        width: 80px;
        height: 80px;

        @media screen and (max-width: 992px){
            width: 60px;
            height: 60px;
        }
    }

    .image-el {
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        border: 1px solid #ededed;
    }

    .info-field {
        /* padding: 0 10px; */
        margin-bottom: 10px;
        overflow: hidden;
    }   

    .accent-text {
        font-weight: 700;
        font-size: 14px;
        color: #4b4b4b;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .rank-box {
        border: 1px solid var(--defaultBlueColor);
        padding: 0px 10px;
        border-radius: 10px;
        color: var(--defaultBlueColor);
        cursor: pointer;

        &:hover {
            background-color: var(--defaultBlueColor);
            color: white;
        }
    }

    .ad-rank-box {
        border: 1px solid var(--defaultBlueColor);
        padding: 0px 10px;
        border-radius: 10px;
        color: var(--defaultBlueColor);
    }

    .dropdown-button-item{
        right: 5px;
        bottom: -30px;
        
        margin:0;
        padding:0;
        width:25px;
        height: 25px;
        border-radius: 5px;
        margin-left: 10px;

        @media screen and (max-width: 992px){
            bottom: 0;
            float: right;
        }
    }
`;

export const InfoGroupBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;

    .sub-info-box {
        padding: 0 4px;
        background-color: var(--thisBoxColor);
        border: 1px solid var(--thisBoxColor);
        color: white;
        border-radius: 2px;
        margin-right: 5px;
    }

    .highlight{
        display: inline-block;
        position:relative;
        /* font-weight: 700; */
        color: #404040;
        cursor: pointer;
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

export const SubInfoWrapper = styled.div`
    font-size: 12px;
    padding: 10px;
    border-top: 1px solid #efefef;
    color: #888;
    font-weight: 600;
`;

export const SubInfoGroupBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 2px;

    .sub-info-box {
        padding: 0 4px;
        background-color: var(--thisBoxColor);
        border: 1px solid var(--thisBoxColor);
        color: white;
        border-radius: 2px;
        margin-right: 5px;
    }

    .info-title {
        color: #a4a5a6
    }
`;

export const FlexBox = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const DetailInfoBox = styled.div`
    display: flex;
    align-items: center;

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
    font-size: 12px;
`;