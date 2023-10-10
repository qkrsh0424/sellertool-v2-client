import styled from "styled-components";

export const Wrapper = styled.div`
    .button-box {
        margin-bottom: 10px;
    
        @media screen and (max-width: 992px) {
            display: flex;
        }
    }

    .button-box .button-el {
        border: none;
        width: 70px;
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
        padding: 5px 0;
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
`;
