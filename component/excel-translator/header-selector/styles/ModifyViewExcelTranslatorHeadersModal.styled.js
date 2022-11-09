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
        margin-top: 40px;

        @media all and (max-width: 992px){
            flex-direction: column;
        }
        

        .initialize-button{
            margin:0;
            padding:0;
            width: 200px;
            height: 48px;
            border-radius: 10px;
            background: #f5f5f5;
            box-shadow: var(--defaultBoxShadow);
            font-size: 16px;
            color: #404040;
        }

        .move-button-group{
            @media all and (max-width: 992px){
                width:100%;
            }

            .icon-button{
                margin:0;
                padding:0;
                width:40px;
                height: 40px;
                border-radius: 50%;
                box-shadow: var(--defaultBoxShadow);
                border:1px solid #f0f0f0;
            }

            .icon-figure{
                width: 65%;
                height: 65%;
                margin-left: auto;
                margin-right: auto;
            }
        }

        .content-box{
            flex:1;
            border-radius: 15px;
            overflow: hidden;
            overflow-y: scroll;
            box-shadow: var(--defaultBoxShadow);
            background: #fff;
            height: 300px;
            &::-webkit-scrollbar{
                background: #e1e1e130;
                height:7px;
                width: 5px;
            }

            &::-webkit-scrollbar-track{
                border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb{
                background-color: #00000020;
                border-radius: 10px;
            }

            @media all and (max-width: 992px){
                flex:auto;
                width:100%;
            }

            .title{
                background-color: #eef2f9;
                padding: 0 20px;
                height: 48px;
                box-sizing: border-box;
                color: #404040;
                font-size: 16px;
                font-weight: 500;
                

                .order-button{
                    margin:0;
                    padding:0;
                    width:24px;
                    height: 24px;
                    border-radius: 5px;
                    box-shadow: var(--defaultBoxShadow);
                    &:last-child{
                        margin-left: 5px;
                    }
                }
            }
            
            .item-list{
                padding: 0 10px;
                

                .item{
                    user-select: none;
                    -webkit-tap-highlight-color: #00000000;
                    cursor: pointer;
                    padding: 10px;
                    color:#404040;
                    
                    &:hover{
                        background: #f0f0f0;
                        border-radius: 10px;
                    }
                }

                .item-active{
                    color:var(--mainColor);
                    font-weight: 600;
                }
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

export const FlexBlock = styled.div`
    padding: 10px;
`;