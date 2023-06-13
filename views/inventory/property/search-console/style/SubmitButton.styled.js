import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 30px 20px 20px 20px;

    .button-group{
        display: flex;
        justify-content: flex-end;

        .button-item{
            padding:0;
            margin:0;
            width: 120px;
            height: 40px;
            border-radius: 5px;
            background: var(--defaultModalCloseColor);
            color: #fff;
            border:none;
            font-size: 16px;

            &:first-child{
                margin-right: 10px;
            }
        }
    }
`;