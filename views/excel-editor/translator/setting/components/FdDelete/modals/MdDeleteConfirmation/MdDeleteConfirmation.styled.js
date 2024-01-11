import styled from 'styled-components';

export const Container = styled.div`
    padding: 40px 20px;

    .wrapper{
        background: #fff;
        padding: 20px;
        border-radius: 15px;
        box-shadow: var(--defaultBoxShadow);

        > .wrapper__description{
            font-size: 14px;
            font-weight: 600;
        }

        > .wrapper__buttonGroup{
            margin-top: 20px;
            display: flex;
            gap: 10px;

            > button{
                border-radius: 10px;
                background: var(--defaultModalCloseColor);
                color: #fff;
                font-weight: 700;
                border: none;
            }

            > .wrapper__buttonGroup__isConfirmButton{
                background: var(--defaultRedColor);
            }
        }
    }
`;