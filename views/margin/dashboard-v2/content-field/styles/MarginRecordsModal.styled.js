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
        padding: 30px 20px 30px 20px;

        .input-item{
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #e0e0e0;
            height: 48px;
            border-radius: 10px;
            padding: 15px 10px;
            font-size: 14px;
            outline:none;

            &:focus{
                border: 1px solid var(--mainColor);
                box-shadow: var(--defaultBoxShadow);
            }
        }

        .content-title{
            font-size: 14px;
            font-weight: 600;
            color: #404040;
        }

        .content-box{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            cursor: pointer;
            margin-top: 10px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            background: #fff;
            box-shadow: var(--defaultBoxShadow);
            padding: 10px 0;
            
            &:hover{
                background: #f0f0f040;
                /* border: 1px solid var(--mainColor); */
            }

            .info-group{
                flex:1;
                padding: 0 10px;

                .title{
                    font-size: 18px;
                    font-weight: 600;
                    color: #404040;
                }

                .value-group{
                    margin-top: 10px;

                    &:last-child{
                        margin-top: 5px;
                    }
                    .value{
                        font-size: 12px;
                        font-weight: 500;
                        color: #808080;
                    }
                }
            }

            .delete-button-box{
                padding: 0 10px;
                .delete-button-el{
                    margin:0;
                    padding:0;
                    width:30px;
                    height: 30px;
                    border:none;
                    border-radius: 50%;
                    
                    .icon-figure{
                        width:70%;
                        height: 70%;
                        margin-left: auto;
                        margin-right: auto;
                    }
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
export const ContentWrapper = styled.div`
    padding:10px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const ItemBox = styled.div`
    width: 100%;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    /* margin-bottom: 10px; */

    cursor: pointer;

    .title{
        padding: 0 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 16px;
        color: #444;
    }

    .flex-wrapper{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin-bottom: 5px;
    }

    .flex-item{
        margin-right: 8px;
        font-size: 12px;
        color: #555;
    }

    &:hover{
        background: #e1e1e140;
    }

    @media all and (max-width: 992px){
        .title{
            font-size: 13px;
        }
        .flex-item{
            font-size: 10px;
        }   
    }
`;

export const DeleteBtnBox = styled.div`
    position: relative;
    padding: 3px;

    .btn-item{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        user-select: none;

        cursor: pointer;

        &:hover{
            background: #e1e1e140;
        }
        &:active{
            background: #e1e1e180;
        }
    }

    .icon{
        position: relative;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
`;