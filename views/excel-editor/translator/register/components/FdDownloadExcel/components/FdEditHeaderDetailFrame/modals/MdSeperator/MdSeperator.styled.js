import styled from 'styled-components';

export const SeperatorContainer = styled.div`
    padding: 20px;

    .wrapper{
        padding: 20px;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: var(--defaultBoxShadow3);

        button{
            border: none;
            border-bottom: 1px solid #f0f0f0;
            background: #fff;
            font-size: 14px;
            font-weight: 500;
            transition: all .3s;
            color: #777;
            :hover{
                scale: 1.03;
                background: var(--mainColorOpacity50);
            }
        }

        .button__isActive{
            color: var(--mainColor);
            border-bottom: 3px solid var(--mainColor);
            font-weight: 700;
            :hover{
                scale: 1;
                background: #fff;
            }
        }
    }
`;