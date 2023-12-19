import styled from 'styled-components';

export const ContentLayout = styled.div`
    margin-top: 20px;
    position: relative;

    .emptyContent{
        padding: 20px;

        &__wrapper{
            border: 1px dashed #e0e0e0;
            padding: 40px 20px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            word-break: keep-all;
        }
    }

    .itemContent{
        &__itemList{
            padding:20px;
            display: flex;
            flex-direction: row;
            gap: 10px;
            justify-content: flex-start;
            align-items: flex-start;
            overflow: auto;

            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
            &::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera*/
            }

            &__item{
                min-width: 200px;
                max-width: 200px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                background: #fff;
                border: 1.5px solid #e0e0e0;
                padding: 10px;
                border-radius: 15px;
                cursor: pointer;
                transition: all .3s;

                &__columnText{
                    text-align: center;
                    font-size: 13px;
                    font-weight: 600;
                    color: #000000;
                }

                &__contentWrapper{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;

                    &__columnName{
                        flex:1;
                        font-weight: 500;
                        font-size: 14px;
                    }

                    &__iconBox{
                        width: 24px;
                        height: 24px;
                        margin:0;
                        padding:0;
                        background: none;
                        border:none;
                    }
                }

                &__dropdownButton{
                    height: 30px;
                    width: 30px;
                    margin-left: auto;
                    margin-right: auto;
                    border: none;
                }

                &__detailWrapper{
                    &__valueTypeBox{
                        &__fixedText{
                            font-size: 14px;
                            font-weight: 600;
                            text-align: center;
                            color:#777;
                        }
                        &__mappingText{
                            font-size: 14px;
                            font-weight: 600;
                            text-align: center;
                            color:var(--defaultBlueColor);
                        }
                    }

                   &__fixedValueBox{
                        margin-top: 20px;
                        font-size: 14px;
                        font-weight: 500;

                        label{
                            display: inline-block;
                            font-size: 12px;
                            margin-bottom: 5px;
                        }

                        &__valueText{
                            border: none;
                            padding: 10px;
                            border-radius: 10px;
                            font-size: 14px;
                            background: #dfdfdf;
                            box-sizing: border-box;
                        }
                    }

                    &__mappingValueWrapper{
                        margin-top: 20px;

                        &__seperatorBox{
                            label{
                                display: inline-block;
                                font-size: 12px;
                                font-weight: 500;
                                margin-bottom: 5px;
                            }

                            &__valueText{
                                border: none;
                                padding: 10px;
                                border-radius: 10px;
                                background: #dfdfdf;
                                text-align: center;
                                font-size: 14px;
                                font-weight: 500;
                            }
                        }

                        &__contentBox{
                            margin-top: 20px;
                            label{
                                display: inline-block;
                                font-size: 12px;
                                font-weight: 500;
                                margin-bottom: 5px;
                            }

                            &__mappingValueListBox{
                                display: flex;
                                flex-direction: column;
                                gap: 10px;

                                &__mappingValueText{
                                    padding: 10px 0;
                                    border: none;
                                    text-align: center;
                                    font-size: 14px;
                                    font-weight: 500;
                                    border-radius: 10px;
                                    background-color: #fff;
                                    border: 1px solid #e0e0e0;
                                }
                            }

                        }
                    }
                }
            }

            &__item-isSelected{
                border: 1.5px solid var(--mainColorOpacity600);
                scale: 1.05;
            }
        }
    }

    .arrowLeft{
        position: absolute;
        top:0;
        left: 0;
        height: 100%;
        width: 50px;
        background-image: linear-gradient(to right, #bbbbbbff, #ffffff00);
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover{
            background-image: linear-gradient(to right, #999999ff, #ffffff00);
        }

        &__iconButton{
            cursor: pointer;
            padding:0;
            margin:0;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            border-radius: 50%;
        }
    }

    .arrowRight{
        position: absolute;
        top:0;
        right: 0;
        height: 100%;
        width: 50px;
        background-image: linear-gradient(to right, #ffffff00 , #bbbbbbff);
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
            background-image: linear-gradient(to right, #ffffff00 , #999999ff);
        }

        &__iconButton{
            cursor: pointer;
            padding:0;
            margin:0;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            border-radius: 50%;
        }
    }
`;

export const BottomLayout = styled.div`
    .detailViewButtonGroup{
        margin-top: 20px;
        padding: 0 20px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        button{
            width: auto;
            padding: 0 16px;
            height: 38px;
            border: none;
            background: var(--grayButtonColor);
            font-size: 14px;
            font-weight: 700;
            border-radius: 10px;
        }
    }
`;