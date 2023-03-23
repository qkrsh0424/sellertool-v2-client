import styled from 'styled-components';

export const Container = styled.div`
    @media all and (max-width:992px){
        margin-top: 30px;
    }
`;

export const TitleFieldWrapper = styled.div`
    font-size: 21px;
    font-weight: 600;
    color: #404040;
    margin-bottom: 10px;

    .refresh-button-el{
        margin:0;
        padding:0;
        width:34px;
        height: 34px;
        margin-left: 10px;
        border-radius: 10px;

        .refresh-button-icon-figure{
            width:70%;
            height: 70%;
            margin-left: auto;
            margin-right: auto;
        }
    }
`;

export const RegisterButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;

    .button-item{
        height: 32px;
        width: 70px;
        border-radius: 5px;
        background: #222;
        color: #fff;
        font-size: 13px;
        border: 1px solid #e0e0e0;
        font-weight: 700;
    }
`;

export const ListWrapper = styled.div`
    background: white;
    margin-top: 10px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    padding:0 20px;

    .item-group{
        padding:10px 0;
        font-size: 14px;
        color:#404040;
        border-bottom: 1px solid #f0f0f0;

        &:last-child{
            border-bottom: none;
        }

        @media all and (max-width:992px){
            flex-direction: column;
        }

        .content-group{
            flex:1;
    
            @media all and (max-width:992px){
                width:100%;
            }

            .template-name{
                font-size: 16px;
                word-break: break-all;
                margin-bottom: 10px;
                

                .use-tag{
                    font-size: 12px;
                    margin-left: 10px;
                    vertical-align: middle;
                }
    
                .use-tag-y{
                    color: var(--defaultBlueColor);
                }
    
                .use-tag-n{
                    color: var(--defaultRedColor);
                }
            }

            .time-info{
                display: flex;
                font-size: 12px;
                margin-top: 5px;
                color: #606060;
                .classify{
                    width: 90px;
                }

                .dateTime{
                    flex:1;
                }
            }
            
        }

        .control-items{
            @media all and (max-width:992px){
                width:100%;
                margin-top: 20px;
                flex:1;
                justify-content: flex-end;
            }
            
            .control-item{
                padding: 0;
                width: 40px;
                height: 30px;
                font-size: 11px;
                background: #f0f0f0;
                border: none;
                border-radius: 5px;
                color: #404040;
                font-weight: 700;

                &:hover{
                    transform: scale(1.02);
                }

                &:last-child{
                    margin-left:5px;
                }
            }

            .setting-button-el{
                background: #222;
                color: #fff;
            }

            .remove-button-el{
                background:var(--defaultRedColor);
                color: #fff;
            }
        }
    }

`;