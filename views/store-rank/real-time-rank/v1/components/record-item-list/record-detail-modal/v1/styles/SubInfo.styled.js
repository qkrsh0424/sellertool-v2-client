import styled from "styled-components";

export const Wrapper = styled.div`
    margin-bottom: 10px;

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
`;