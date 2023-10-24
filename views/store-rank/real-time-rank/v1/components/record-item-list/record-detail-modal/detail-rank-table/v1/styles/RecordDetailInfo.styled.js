import styled from "styled-components";

export const Wrapper = styled.div`
    font-size: 14px;
    font-weight: 600;
    padding: 10px;
    margin-bottom: 10px;

    .image-box {
        width: 90px;
        height: 90px;
        margin-bottom: 10px;

        @media screen and (max-width: 992px){
            width: 80px;
            height: 80px;
        }
    }

    .image-el {
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        border: 1px solid #ededed;
    }
`;