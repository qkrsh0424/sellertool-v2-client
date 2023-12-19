import styled from 'styled-components';

export const SeperatorContainer = styled.div`
    padding: 20px;

    .wrapper{
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: var(--defaultBoxShadow3);

        button{
            border: none;
            border-radius: 10px;
            background: var(--grayButtonColor);
            font-size: 14px;
            font-weight: 700;
            transition: all .3s;
            :hover{
                scale: 1.03;
                background: var(--grayButtonHoverColor);
            }
        }

        .button__isActive{
            background: var(--mainColor);
            color: #fff;
            :hover{
                scale: 1;
                background: var(--mainColor);
            }
        }
    }
`;