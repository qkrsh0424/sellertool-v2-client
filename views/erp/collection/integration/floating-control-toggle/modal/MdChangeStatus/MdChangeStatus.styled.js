import styled from 'styled-components';

export const ContentContainer = styled.div`
    padding: 20px;
`;

export const ContentWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);

    .controlWrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-top: 40px;

        .controlWrapper__currentStatus{
            flex:1;
            text-align: center;
            font-size: 14px;
            font-weight: 700;
        }

        .controlWrapper__iconFigure{
            width: 24px;
            height: 24px;
        }

        .controlWrapper__targetStatus{
            flex:1;

            select{
                border-radius: 30px;
            }
        }
    }

    .additionalDescription{
        font-size: 14px;
    }

    .buttonGroup{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 40px;
        gap:10px;

        button{
            width: 100px;
            border: none;
            border-radius: 10px;
            font-weight: 700;
        }

        button.confirm{
            color: #fff;
            background-color: var(--mainColor);
        }
    }
`;