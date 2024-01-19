import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
    
    > .wrapper{
        padding: 20px;
        background: #fff;
        border: none;
        border-radius: 15px;
        box-shadow: var(--defaultBoxShadow3);

        > .wrapper__title{
            font-size: 20px;
            font-weight: 600;
        }
    }
`;

export const UploadExcelPreviewContainer = styled.div`
    margin-top: 20px;

    > .wrapper{
        > .wrapper__title{
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        > .wrapper__emptyTableWrapper{
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed #e0e0e0;
            border-radius: 5px;
            background:#ffffff;
            min-height: 200px;
            max-height: 300px;
            font-size: 16px;
            font-weight: 600;
        }

        > .wrapper__tableWrapper{
            overflow-x: auto;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            background:#ffffff;
            min-height: 200px;
            max-height: 300px;

            &::-webkit-scrollbar{
                background: #e1e1e130;
                height:5px;
                width: 5px;
            }

            &::-webkit-scrollbar-track{
                border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb{
                background-color: #00000010;
                border-radius: 10px;
            }
            
            table{
                position:relative;
                text-align: center;
                width: fit-content;
                table-layout: fixed;
                border: none;

                > thead{
                    > tr{
                        > th{
                            height: 35px;
                            width: 40px;
    
                            box-sizing: border-box;
                            padding:0 5px;
    
                            background:#efefef;
                            color: #000;
                            font-weight: 600;
                            position: sticky;
                            top:0;
                            border-bottom: 1px solid #f0f0f0;
                            border-right: 1px solid #f0f0f0;
    
                            line-height: 1.5;
                            font-size: 12px;
                            
                            .numbering__box{
                                font-size: 10px;
                                border-bottom: 1px solid #f7f7f7;
                                padding: 5px 0;
                                color: #777;
                                word-break: keep-all;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            }
    
                            .value__box{
                                padding: 5px 0;
                                word-break: keep-all;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            }
                        }
                    }
                }

                > tbody{
                    > tr{
                        &:hover{
                            background:#f8f8f8;

                            .fixed-col-left {
                                background:#f8f8f8;
                            }
                        }

                        > .numbering__td{
                            font-size: 10px;
                            color: #777;
                            background: #efefef;
                            font-weight: 600;
                        }

                        > td{
                            box-sizing: border-box;
                            padding: 5px;

                            border-bottom: 1px solid #f7f7f7;
                            line-height: 1.5;
                            word-break: keep-all;
                            /* overflow:hidden;
                            text-overflow:ellipsis; */
                            /* white-space:nowrap; */
                            white-space: pre-line;
                            font-size: 12px;
                            color: #000;
                            font-weight: 500;
                            
                            
                            .thumbnail-figure{
                                width:55%;
                                height: 55%;
                                border:1px solid #f0f0f0;
                                border-radius: 10px;
                                overflow: hidden;
                                margin-left: auto;
                                margin-right: auto;

                            }

                            .content-box{
                                padding:5px 0;

                                div{
                                    /* word-break: keep-all;
                                    overflow:hidden;
                                    text-overflow:ellipsis;
                                    white-space:nowrap; */
                                    white-space: pre-line;
                                }

                                .stockRegisterStatusView-button-item{
                                    margin:0;
                                    padding:0 16px;
                                    width: auto;
                                    height: 30px;
                                    margin-left: auto;
                                    margin-right: auto;
                                    border-radius: 10px;
                                    color: #222;
                                    border: none;
                                    background: var(--grayButtonColor);
                                    font-size: 12px;
                                    font-weight: 700;
                                }

                                .optionCodeText{
                                    cursor:pointer;   
                                    
                                    &:hover{
                                        font-weight: 500;
                                        color: var(--mainColor);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .tr-selected{
                background:var(--defaultBlueColorOpacity100);

                &:hover{
                    background:var(--defaultBlueColorOpacity200);

                    .fixed-col-left {
                        background:var(--defaultBlueColorOpacity200);
                    }
                }
            }

            table .fixed-col-left {
                position: sticky;
                left: 0;
                z-index:10;
                border-right: 1px solid #e0e0e060;
                box-shadow: 6px 0 5px -7px #e0e0e0;
            }

            .status-button{
                height: 30px;
                width: 150px;
                padding:0;
                margin: auto;
                font-size: 12px;
            }

            .delete-button-item{
                width:30px;
                height: 30px;
                margin:0;
                padding:0;
                margin-left: auto;
                margin-right: auto;
                border-radius: 5px;

                .icon-figure{
                    width:70%;
                    height: 70%;
                    margin-left: auto;
                    margin-right: auto;
                }
            }
        }
    }
`;


export const Arrow = styled.div`
    margin-top: 20px;
    padding: 10px 0;
    width: 40px;
    margin-left: auto;
    margin-right: auto;
`;