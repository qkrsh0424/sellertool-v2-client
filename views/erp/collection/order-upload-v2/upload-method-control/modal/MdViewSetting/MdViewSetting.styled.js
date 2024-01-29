import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 20px 10px;
    }
`;

export const LinkItem = styled.a`
    font-weight: 700;
    font-size: 14px;

    &:hover{
        text-decoration: underline;
    }
`;

export const Wrapper = styled.div`
    border: none;
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);
    padding: 20px;
    margin-top: 10px;

    .mainLayout{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        @media all and (max-width:992px){
            flex-direction: column;
        }
        
        .mainLayout__contentLayout{
            flex:1;
            width: 100%;

            .mainLayout__cententLayout__titleBox{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                .mainLayout__cententLayout__titleBox__title{
                    font-size: 18px;
                    font-weight: 600;
                }

                .mainLayout__cententLayout__titleBox__buttonGroup{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap:5px;
                    
                    .mainLayout__cententLayout__titleBox__buttonGroup__iconButton{
                        width: 20px;
                        height: 20px;
                        border-radius: 5px;
                    }
                }
                
            }

            .mainLayout__contentLayout__contentList{
                margin-top: 10px;
                border: 1px solid #e0e0e0;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                height: 300px;
                overflow: auto;
            }

            .mainLayout__contentLayout__contentList__item{
                padding:10px;
                font-size: 14px;
                cursor: pointer;

                &:hover{
                    background: #f0f0f0;
                }
            }

            .mainLayout__contentLayout__contentList__item-isSelected{
                font-weight: 700;
                color: var(--mainColor);
            }
        }

        .mainLayout__exchangeButton{
            width: 48px;
            height: 48px;
            border-radius: 10px;
            padding: 5px;
            box-shadow: var(--defaultBoxShadow);
            border-color: var(--mainColor);
        }
    }

    .footerButtonGroupLayout{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        button{
            width: 150px;
            border-radius: 10px;
            background-color: var(--defaultModalCloseColor);
            color:#fff;
            font-weight: 700;
            border: none;
        }

        .footerButtonGroupLayout__confirmButton{
            background-color: var(--mainColor);
        }
    }
`;