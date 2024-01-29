import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }

    .wrapper{
        border-radius: 15px;
        background: #fff;
        padding: 20px;
        box-shadow: var(--defaultBoxShadow3);

        &__title{
            font-size: 20px;
            font-weight: 600;
        }

        &__body{
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            gap: 10px;

            @media all and (max-width:992px){
                flex-direction: column;
            }

            select{
                width:300px;
                background-color: var(--defaultBlueColorOpacity100);
                border-radius: 10px;
                border: none;
                font-weight: 500;

                @media all and (max-width:992px){
                    width: 100%;
                }
            }

            &__buttonGroup{
                display: flex;
                flex-direction: row;
                gap: 10px;

                &__textButton{
                    width: 48px;
                    height: 48px;
                    background: var(--grayButtonColor);
                    font-weight: 700;
                    font-size: 14px;
                    border: none;
                    border-radius: 10px;
    
                    @media all and (max-width:992px){
                        width: 100%;
                    }
                }
    
                &__iconButton{
                    width: 48px;
                    height: 48px;
                    background: var(--grayButtonColor);
                    font-weight: 700;
                    font-size: 14px;
                    border: none;
                    border-radius: 10px;
    
                    > .iconFigure{
                        width: 24px;
                        margin-left: auto;
                        margin-right: auto;
                    }
    
                    @media all and (max-width:992px){
                        width: 100%;
                    }
                }
            }

        }
    }
`;