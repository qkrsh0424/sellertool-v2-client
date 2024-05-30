import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const Wrapper = styled.div`
    border-radius: 15px;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow3);
    padding: 20px;

    .flexBox{
        display: flex;
    }

    .buttonBox{
        button{
            padding: 0 15px;
            border-radius: 10px;
            background-color: #fff;
            color: #000;
            font-weight: 700;
            border: 1px solid #000000;
            height: 40px;

            .flexBox{
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .icon{
                width: 20px;
                height: 20px;
            }
        }
    }
`;
