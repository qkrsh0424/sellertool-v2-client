import styled from 'styled-components';

export const Container = styled.div`
    padding: 40px 20px;

    .wrapper{
        padding: 20px;
        box-shadow: var(--defaultBoxShadow3);
        background: #fff;
        border-radius: 15px;

        &__form{
            &__inputBox{
                > label{
                    display: inline-block;
                    font-size: 12px;
                    font-weight: 500;
                    margin-bottom: 5px;
                }

                >input{
                    border-radius: 10px;
                    background: var(--defaultBlueColorOpacity100);
                    border: 1px solid #00000000;
                    transition: all .3s;
                    font-size: 14px;
                    font-weight: 500;
                    :focus{
                        background: #fff;
                        border: 1px solid var(--mainColor);
                        scale: 1.05;
                    }
                }
            }

            &__submitButtonGroup{
                margin-top: 20px;
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                
                &__button{
                    width: 100px;
                    border-radius: 10px;
                    font-weight: 700;
                    background: var(--grayButtonColor);
                    border: none;
                    color: #777;
                }

                &__button-submit{
                    width: 100px;
                    border-radius: 10px;
                    font-weight: 700;
                    background: var(--mainColor);
                    border: none;
                    color: #fff;
                }
            }
        }
    }
`;