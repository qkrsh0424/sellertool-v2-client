import styled from 'styled-components';

export const ContentLayout = styled.div`
    padding: 0 20px;
    margin-top: 20px;

    .title{
        margin-top: 20px;
        font-size: 18px;
        font-weight: 600;
    }

    .contentForm{
        margin-top: 20px;

        &__submitButtonGroup{
            display: flex;
            flex-direction: row;
            margin-top: 20px;
            justify-content: flex-end;
            gap: 10px;

            & > button{
                width: 150px;
                border-radius: 10px;
                border: none;
                font-weight: 700;
            }
        }

        &__headerName{
            margin-top: 20px;
            & > input{
                width: 300px;
                border-radius: 10px;
                background: var(--defaultBlueColorOpacity100);
                border: 1px solid #00000000;
                transition: all .3s;
                font-weight: 500;
                color: #000;

                :focus{
                    border: 1px solid var(--mainColor);
                    scale: 1.05;
                    background: #fff;
                }

                @media all and (max-width:992px){
                    width: 100%;
                }
            }
        }

        &__valueTypeSelector{
            margin-top: 20px;
            display: flex;
            gap: 5px;

            > button{
                width: 100px;
                border-radius: 10px;
            }

            &__button-isActive{
                background: var(--defaultBlackColor);
                color: #fff;
            }
        }

        &__fixedValue{
            margin-top: 20px;
            > input{
                width: 300px;
                border-radius: 10px;
                background: var(--defaultBlueColorOpacity100);
                border: 1px solid #00000000;
                transition: all .3s;
                font-weight: 500;
                color: #000;

                :focus{
                    border: 1px solid var(--mainColor);
                    scale: 1.05;
                    background: #fff;
                }

                @media all and (max-width:992px){
                    width: 100%;
                }
            }
        }

        &__mappingValueLayout{
            margin-top: 20px;
            display: flex;
            gap: 10px;
            align-items: flex-start;

            @media all and (max-width:992px){
                flex-direction: column;
            }

            &__seperatorWrapper{
                width: 300px;
                border-radius: 15px;
                padding: 10px;

                @media all and (max-width:992px){
                    width: 100%;
                }

                &__description{
                    font-size: 12px;
                    color: #444;
                    margin-bottom: 5px;
                }

                label{
                    display: inline-block;
                    margin-bottom: 5px;
                    font-size: 12px;
                    font-weight: 500;
                }
    
                button{
                    border: none;
                    background: var(--grayButtonColor);
                    border-radius: 10px;
                }
            }

            &__mappingValueListContainer{
                width: 300px;
                border: 1px solid var(--mainColor);
                border-radius: 15px;
                padding: 10px;

                @media all and (max-width:992px){
                    width: 100%;
                }

                label{
                    display: inline-block;
                    margin-bottom: 5px;
                    font-size: 12px;
                    font-weight: 500;
                }

                &__description{
                    font-size: 12px;
                    color: #444;
                    margin-bottom: 5px;
                }

                &__addButton{
                    width: 100%;
                    padding: 0 16px;
                    height: 48px;
                    background: #fff;
                    border: 1px solid var(--defaultBlueColor);
                    color: var(--defaultBlueColor);
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 10px;
                    margin-bottom: 10px;
                }

                &__valueListWrapper{
                    padding: 10px;
                    background: var(--grayButtonColor);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    /* height: 100%; */

                    .valueListWrapper-isError{
                        border: 1px solid var(--defaultRedColor);
                        background: var(--defaultRedColorOpacity100);
                        color: var(--defaultRedColor);
                    }

                    &__valueBox{
                        background: #fff;
                        border: none;
                        border-radius: 10px;
                        padding: 10px;
                        
                        &__contentBox{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 14px;
                            font-weight: 600;
                            word-break: keep-all;
                            gap: 10px;

                            &__columnName{
                                flex:1;
                                font-size: 14px;
                                font-weight: 500;
                            }

                            &__iconFigure{
                                width: 24px;
                                height: 24px;
                            }

                            &__iconFigure-clickable{
                                cursor: pointer;
                                width: 24px;
                                height: 24px;
                            }
                        }
                    }
                    
                    &__emptyBox{
                        background: #fff;
                        height: 60px;
                        border: 1px dashed #e0e0e0;
                        border-radius: 10px;
                        font-size: 13px;
                        font-weight: 600;
                        padding: 10px;
                        word-break: keep-all;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }

    .form__wrapper{
        & > .mappingValue__layout {
            & > .referenceHeaderField__wrapper{
                width: 420px;
                border-radius: 15px;
                padding: 10px;
                @media all and (max-width:992px){
                    width: 100%;
                }

                > label{
                    display: inline-block;
                    margin-bottom: 5px;
                    font-size: 12px;
                    font-weight: 500;
                }

                > .description{
                    font-size: 12px;
                    color: #444;
                    margin-bottom: 5px;
                }

                > .layout{
                    display: flex;
                    gap: 10px;

                    > .bucketList__wrapper{
                        background: var(--defaultBackground2);
                        border-radius: 10px;
                        overflow: auto;
                        width: 120px;
                        height: 358px;

                        > .headTitle{
                            background: var(--contentHeadBackground);
                            width: 100%;
                            padding: 10px;
                            color: #000;
                            font-size: 14px;
                            font-weight: 600;
                        }

                        > .itemList__wrapper{
                            padding: 10px;
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            
                            > .item{
                                user-select: none;
                                font-size: 14px;
                                color: #444;
                                cursor: pointer;
                            }

                            > .item__isActive{
                                color: var(--mainColor);
                                font-weight: 500;
                            }
                        }
                    }

                    > .headerList__wrapper{
                        flex:1;
                        > input{
                            border-radius: 10px;
                            margin-bottom: 10px;
                            background: var(--grayButtonColor);
                            border: 1px solid #00000000;
                            transition: all .3s;
        
                            :focus{
                                background: #fff;
                                border-color:var(--mainColor);
                            }
                        }
        
                        > .itemList__wrapper{
                            padding: 10px;
                            background: var(--grayButtonColor);
                            border-radius: 10px;
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            height: 300px;
                            overflow: auto;
        
                            > .item__wrapper{
                                padding: 10px;
                                border-radius: 10px;
                                background: #fff;
                                .content__box{
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    gap: 10px;
                                    .icon__box{
                                        width: 24px;
                                        height: 24px;
                                        margin:0;
                                        padding:0;
                                        background: none;
                                        border:none;
                                    }
        
                                    .columnName{
                                        flex:1;
                                        font-weight: 500;
                                        font-size: 14px;
                                    }
                                }
                            }
        
                            > .item__wrapper_disabled{
                                background: #d0d0d0;
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const ReferenceHeaderListLayout = styled.div`
    width: 420px;
    border-radius: 15px;
    padding: 10px;

    @media all and (max-width:992px){
        width: 100%;
    }

    label{
        display: inline-block;
        margin-bottom: 5px;
        font-size: 12px;
        font-weight: 500;
    }

    .description{
        font-size: 12px;
        color: #444;
        margin-bottom: 5px;
    }

    .container{
        display: flex;
        gap: 10px;

        &__contentWrapper{
            flex:1;

            > input{
                border-radius: 10px;
                margin-bottom: 10px;
                background: var(--grayButtonColor);
                border: 1px solid #00000000;
                transition: all .3s;

                :focus{
                    background: #fff;
                    border-color:var(--mainColor);
                }
            }

            &__itemListWrapper{
                padding: 10px;
                background: var(--grayButtonColor);
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                height: 300px;
                overflow: auto;

                &__itemWrapper{
                    padding: 10px;
                    border-radius: 10px;
                    background: #fff;

                    &__itemBox{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 10px;

                        &__iconFigure{
                            width: 24px;
                            height: 24px;
                            margin:0;
                            padding:0;
                            background: none;
                            border:none;
                        }

                        &__columnName{
                            flex:1;
                            font-weight: 500;
                            font-size: 14px;
                        }
                    }
                }

                &__itemWrapper-disabled{
                    background: #d0d0d0;
                }
            }
        }

        &__bucketListWrapper{
            background: var(--defaultBackground2);
            border-radius: 10px;
            overflow: auto;
            width: 120px;
            height: 358px;

            &__headTitle{
                background: var(--contentHeadBackground);
                width: 100%;
                padding: 10px;
                color: #000;
                font-size: 14px;
                font-weight: 600;
            }

            &__itemListWrapper{
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                
                &__item{
                    user-select: none;
                    font-size: 14px;
                    color: #444;
                    cursor: pointer;
                }

                &__item-isActive{
                    color: var(--mainColor);
                    font-weight: 500;
                }
            }
        }
    }
`;