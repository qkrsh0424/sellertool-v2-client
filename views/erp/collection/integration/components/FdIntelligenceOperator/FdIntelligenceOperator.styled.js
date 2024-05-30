import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 20px 10px;
    }
`;

export const Wrapper = styled.div`
    border-radius: 15px;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow3);
    padding: 20px;

    h3{
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 0;
        color: #696969;
        font-weight: 900;

        .icon{
            width: 24px;
            height: 24px;
        }
    }

    .flexBox{
        display: flex;
    }

    .buttonBox{
        button{
            padding: 0 15px;
            border-radius: 10px;
            background-color: #696969;
            color: #ffffff;
            font-weight: 700;
            border: none;
            height: 40px;

            &:hover{
                opacity: 0.9;
            }

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
