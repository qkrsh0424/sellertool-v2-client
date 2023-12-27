import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    > .wrapper{
        padding:20px;
        background: #fff;
        border:none;
        border-radius: 15px;
        box-shadow: var(--defaultBoxShadow3);
        display: flex;
        flex-direction: row;
        gap: 10px;

        > .wrapper__textButton{
            width: 200px;
            border: 1px solid #00000000;
            background: var(--grayButtonColor);
            border-radius: 10px;
            font-weight: 700;
            font-size: 14px;
            color: #000;

            &:hover{
                background-color: var(--grayButtonHoverColor);
            }
        }

        > .wrapper__refreshButton{
            width: 150px;
            border: 1px solid #00000000;
            background: var(--grayButtonColor);
            border-radius: 10px;
            font-weight: 700;
            font-size: 14px;
            color: #000;

            &:hover{
                background-color: var(--grayButtonHoverColor);
            }
        }

        >.wrapper__downloadButton{
            width: 250px;
            border: 1px solid #00000000;
            background: var(--mainColor);
            border-radius: 10px;
            font-weight: 700;
            font-size: 14px;
            color: #fff;
        }
    }
`;