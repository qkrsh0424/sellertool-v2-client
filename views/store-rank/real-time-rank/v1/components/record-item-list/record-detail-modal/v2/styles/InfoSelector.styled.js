import styled from "styled-components";

export const Wrapper = styled.div`
    .info-text {
        font-size: 12px;
        margin-bottom: 30px;
        color: #626262;

        @media screen and (max-width: 992px){
            font-size: 10px;
        }
    }

    .info-text .accent-text {
        font-weight: 700;
    }

    .selector-box {
        display: flex;
        align-items: center;
        gap: 5px;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .button-el {
        width: 35px;
        height: 35px;
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
        height: 35px;
        border: 1px solid var(--defaultGrayColor);
        border-radius: 5px;
        font-size: 14px;
        text-align: center;

        @media all and (max-width: 992px){
            width: 100%;
            flex:1;
        }
    }
`;