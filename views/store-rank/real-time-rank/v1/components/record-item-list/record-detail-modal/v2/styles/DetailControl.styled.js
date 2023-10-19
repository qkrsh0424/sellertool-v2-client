import styled from "styled-components";

export const Wrapper = styled.div`
    margin-bottom: 10px;

    .control-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        @media screen and (max-width: 992px) {
            display: block;
        }
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

    .detail-header {
        display: flex;
        align-items: center;
        gap: 5px;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .detail-header .button-el {
        width: 30px;
        height: 30px;
        border: none;
        background-color: inherit;
        border-radius: 100%;
        
        &:hover {
            background-color: var(--defaultGrayColor);
        }
    }

    .date-selector-box {
        flex: 1;
        text-align: center;
    }

   .select-item{
        width: 100%;
        height: 30px;
        border: 1px solid var(--defaultGrayColor);
        border-radius: 5px;
        font-size: 12px;
        text-align: center;

        @media all and (max-width: 992px){
            width: 100%;
            flex:1;
        }
    }

    .rank-trend-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        font-size: 12px;
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

        &:hover {
            color: #fff;
            background-color: var(--mainColorOpacity500);
            border: 1px solid var(--mainColorOpacity500);
        }
    }
`;
