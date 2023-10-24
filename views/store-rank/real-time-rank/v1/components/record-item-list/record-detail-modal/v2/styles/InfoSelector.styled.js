import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    margin-bottom: 10px;

    .button-el {
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
`;