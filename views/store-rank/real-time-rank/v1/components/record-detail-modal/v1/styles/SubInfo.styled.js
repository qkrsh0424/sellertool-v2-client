import styled from "styled-components";

export const Wrapper = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sub-content {
        font-size: 12px;
        font-weight: 700;
        color: #808080;
        display: flex;
        justify-content: flex-end;

        @media screen and (max-width: 992px) {
            position: static;
        }

        .content-box {
            display: flex;
            align-items: center;
            gap: 5px;
            /* text-overflow: ellipsis;
            white-space: nowrap; */

            :hover {
                color: var(--mainColor);   
            }
        }
    }

    .button-el {
        border: none;
        width: 70px;
        font-size: 11px;
        background-color: #f4f4f4;
        border-radius: 5px;
        cursor: pointer;
        color: rgb(96, 96, 96);
        height: 30px;
    }
`;