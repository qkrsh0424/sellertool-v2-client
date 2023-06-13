import styled from "styled-components";

export const Wrapper = styled.div`
    width: 210px;
    /* background-color: var(--mainColorOpacity500); */
    background-color: var(--mainColor);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    
    .text-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-bottom: 10px;
        color: white;
        font-weight: 600;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .accent {
        color: #ffbd70;
        font-weight: 700;
    }
`;