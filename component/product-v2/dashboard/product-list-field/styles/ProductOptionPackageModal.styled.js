import styled from 'styled-components';

export const Container = styled.div`
    background: var(--defaultBackground);
    
    .header-close-button-box{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;

        .header-close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;

            .header-close-button-icon{
                width:100%;
                height: 100%;
            }
        }
    
    }

    .title-box{
        padding: 0 20px;

        .title{
            border-bottom: 1px solid #000;
            font-size: 20px;
            font-weight: 400;
            color:#303030;
            padding-bottom: 20px;

            .accent-text{
                color:var(--mainColor);
            }
        }
    }
`;

export const ContentContainer = styled.div`
    padding: 20px 20px 0 20px;
`;

export const ContentWrapper = styled.div`

    .item-list-wrapper{
        .body{
            background: white;
            border: 1px solid #f0f0f0;
            border-radius: 10px;
            box-shadow: var(--defaultBoxShadow);
            margin-bottom: 5px;

            .content-wrapper{
                flex:1;
            }

            .content-item{
                padding: 10px;

                .button-item{
                    margin:0;
                    padding:0;
                    height: 40px;
                    border-radius: 5px;
                    font-size: 14px;
                    color: #505050;
                }

                .label{
                    margin-bottom: 3px;
                    font-size: 12px;
                    color:#606060;
                }

                .input-box{
                    flex:1;
                }

                .input-item{
                    width: 100%;
                    height: 40px;
                    border: 1px solid #e0e0e0;
                    padding: 0 10px;
                    border-radius: 5px;
                    outline: none;
                    box-sizing: border-box;
                }
            }

            .delete-button-box{
                width:40px;
                display: flex;
                align-items: center;
                justify-content: center;


                .delete-button-item{
                    margin:0;
                    padding:0;
                    width: 24px;
                    height: 24px;
                    border:none;
                    border-radius: 50%;
                }
            }
        }
    }

    .add-button-box{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        .add-button-item{
            margin:0;
            padding:0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--mainColor);
            border:none;
            
            .icon-figure{
                width: 70%;
                height: 70%;
                margin-left: auto;
                margin-right: auto;
            }
        }
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 40px;
    display: flex;
    .button-el{
        margin:0;
        padding:0;
        height: 48px;
        border:none;
        color:#fff;
        font-size: 18px;
        font-weight: 500;
    }
`;