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

    .content-group{
        padding: 0 20px;

        
        .content-box{
            margin-top: 20px;
            background: #fff;
            padding: 10px;
            border-radius: 15px;
            box-shadow: var(--defaultBoxShadow);
            
            .input-box{
                flex:1;
                padding: 0 10px;

                .input-label{
                    font-size: 10px;
                    margin-bottom: 2px;
                    color: #808080;
                }

                .input-el{
                    width:100%;
                    box-sizing: border-box;
                    padding: 15px 10px;
                    font-size: 14px;
                    border:1px solid #e0e0e0;
                    border-radius: 5px;
                    flex:1;

                    &:focus{
                        outline:none;
                        border:1px solid var(--mainColor);
                        box-shadow: var(--defaultBoxShadow);
                    }
                }
            }

            .order-box{
                padding:0 10px;

                @media all and (max-width: 992px){
                    display: none;
                }
                
                .icon-figure{
                    width:20px;
                    height: 20px;
                }
            }

            .number-box{
                padding:0 10px;
                .number{

                }
            }

            .delete-button-box{
                padding:0 10px;
                .delete-button{
                    margin:0;
                    padding:0;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border:1px solid #f0f0f0;
                    box-shadow: var(--defaultBoxShadow);

                    .icon-figure{
                        width:70%;
                        height: 70%;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            }
        }

        .add-button{
            margin:0;
            padding:0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border:1px solid #f0f0f0;
            background: var(--mainColor);
            box-shadow: var(--defaultBoxShadow);

            .icon-figure{
                width:70%;
                height: 70%;
                margin-left: auto;
                margin-right: auto;
            }
        }
    }



    .button-group{
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
    }
`;

export const ControlGroup = styled.div`
    margin-top: 40px;
    padding: 0 20px;

    .uploadSampleExcel-button{
        margin:0;
        padding:0;
        height: 48px;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;
        background: var(--mainColor);
        color: #fff;
        border: 1px solid #f0f0f0;
        font-size: 14px;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .loadSampleExcel-button{
        margin:0;
        padding:0;
        height: 48px;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;
        background: #f0f0f0;
        color: #404040;
        border: 1px solid #f0f0f0;
        font-size: 14px;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }
`;

export const FlexBlock = styled.div`
    padding: 5px;
`;