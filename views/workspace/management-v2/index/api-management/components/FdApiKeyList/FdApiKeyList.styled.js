import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
`;

export const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const CardWrapper = styled.div`
    position: relative;
    padding:10px;
    border: 1px solid #f0f0f0;
    background: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .flex{
        display: flex;
        align-items: flex-start;
    }

    .contentWrapper{
        flex:1;
        font-size: 14px;

        .title{
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .apiKeyBox{
            display: flex;
            align-items: center;
            gap: 10px;

            .copyBox{
                button{
                    width: 20px;
                    height: 20px;
                    border: none;
                }
            }
        }

        .descriptionBox{
            display: flex;
            align-items: center;
            gap: 10px;

            .editBox{
                button{
                    width: 20px;
                    height: 20px;
                    border: none;
                }
            }
        }

        .secretKeyViewButtonBox{
            button{
                width: auto;
                height: auto;
                padding: 8px 15px;
                border-radius: 10px;
                background: #efefef;
                font-weight: 700;
                border: none;
                color: #000;
            }
        }

    }

    .deleteButtonBox{
        position: absolute;
        top: -8px;
        right: -8px;

        button{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border-color:#e56767;
            background: #fff;

            &:hover{
                background-color: var(--defaultRedColorOpacity200);
                border-color:var(--defaultRedColorOpacity200);
            }
        }
    }
`;