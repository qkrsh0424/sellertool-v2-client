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
        /* margin-bottom: 20px; */
        
        .content-box{
            padding: 20px 0;
            border-bottom: 1px solid #e0e0e0;
            font-size: 16px;
            
            .input-box{
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
                    border-radius: 10px;
                    flex:1;

                    &:focus{
                        outline:none;
                        border:1px solid var(--mainColor);
                        box-shadow: var(--defaultBoxShadow);
                    }

                    &:disabled{
                        background: #f0f0f050;
                        cursor: not-allowed;
                    }
                }
            }

            .tag{
                color:#404040;
                display: inline-block;
                border:1px solid var(--mainColorOpacity500);
                padding: 5px;
                background: #fff;
                box-sizing: border-box;
                font-size: 14px;
                border-radius: 5px;
                box-shadow: var(--defaultBoxShadow);
                margin: 0 10px 10px 0;
                cursor: pointer;
            }

            .tag-accent{
                color:#fff;
                display: inline-block;
                border:1px solid var(--mainColorOpacity500);
                padding: 5px;
                background: var(--mainColor);
                box-sizing: border-box;
                font-size: 14px;
                border-radius: 5px;
                box-shadow: var(--defaultBoxShadow);
                margin: 0 10px 10px 0;
                cursor: pointer;
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

export const LoadExistingModeWrapper = styled.div`
    .prev-button{
        margin:0;
        padding:0;
        width:80px;
        height: 34px;
        border-radius: 5px;
    }
`;