import styled from 'styled-components';

export const St = {
    Container: styled.div`
        margin-bottom: 20px;
    `,
    ResultWrapper: styled.div`
        border-radius: 10px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;

        @media all and (max-width:992px){
            grid-template-columns: repeat(2, 1fr) !important;
        }

        .result-box{
            flex:1;
            overflow: hidden;
            padding: 10px;
            background: #fff;
            /* background: var(--mainColor); */
            border:1px solid #e0e0e0;
            border-radius: 5px;
            color: #000;
            box-shadow: var(--defaultBoxShadow);

            .title{
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 10px;

                word-break: break-all;
                white-space:pre-line;
                
                @media all and (max-width:992px){
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            .result{
                float: right;
                font-size: 16px;
                font-weight: 700;

                word-break: break-all;
                white-space:pre-line;
            }
        }
    `,
    CalculatorWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;
        /* background-color: var(--mainColorOpacity100); */
        background-color: #fff;
        border-radius: 1px solid #f0f0f0;
        box-shadow: var(--defaultBoxShadow);
        padding: 20px;
        border-radius: 10px;
        .button-wrapper{
            display: flex;
            justify-content: flex-end;
            gap: 10px;

            .refreshBtn{
                width:100px;
                height: 40px;
                background:#b0b0b0;
                color:#fff;
                border-radius: 5px;
                font-weight: 600;
                font-size: 16px;
                border:none;
            }

            .calculatorBtn{
                width:150px;
                background: var(--mainColor);
                color:#fff;
                font-size: 16px;
                font-weight: 700;
                border-radius: 5px;
                border:none;
            }

            .saveBtn{
                width:100px;
                height: 40px;
                background: var(--mainColor);
                color:#fff;
                font-size: 16px;
                font-weight: 600;
                border-radius: 5px;
                border:none;
            }
        }
        .control-wrapper{
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 10px;
            .title{
                font-size: 18px;
                font-weight: 700;
                color:#555;
            }

            .flexible{
                display: flex;
                flex-direction: row;
                gap: 15px;

                @media all and (max-width:992px){
                    flex-direction: column;
                }
            }

            .input-box{
                flex:1;

                label{
                    display: inline-block;
                    font-size: 13px;
                    margin-bottom: 5px;
                    color:#666;
                    font-weight: 700;
                }

                .text-input{
                    border-radius: 5px;
                    text-align: start;

                    &::placeholder{
                        color:#b0b0b0;
                    }
                }

                input{
                    height: 40px;
                    border-radius: 5px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    transition: all .3s;
                    text-align: end;
                    font-weight: 700;
                    background: var(--defaultBlueColorOpacity50);
                    &:focus{
                        z-index: 10;
                        scale: 1.01;
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                        background: #fff;
                    }

                    &:read-only{
                        background: #f0f0f0;
                    }
                }

                select{
                    width:300px;
                    height: 40px;
                    border-radius: 5px;
                    &:focus{
                        z-index: 10;
                        scale: 1.01;
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                        border:1px solid var(--mainColor);
                    }
                }

                .currency{
                    display: flex;
                    justify-content: center;
                    border:1px solid #e0e0e0;
                    align-items: center;
                    height: 40px;
                    width: 80px;
                    border-radius: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    background: #fff;
                    margin-left: -1px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    cursor: pointer;
                    transition: all .3s;
                    &:hover{
                        z-index: 11;
                        scale: 1.01;
                        border:1px solid var(--mainColor);
                        background: var(--mainColor);
                        color:#fff;
                    }
                }

                .currency-readOnly{
                    display: flex;
                    justify-content: center;
                    border:1px solid #e0e0e0;
                    align-items: center;
                    height: 40px;
                    width: 80px;
                    border-radius: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    background: #fff;
                    margin-left: -1px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    cursor: pointer;
                    transition: all .3s;
                    &:hover{
                    }
                }

                .currency-notset{
                    border:1px solid var(--defaultRedColor) !important;
                    color: var(--defaultRedColor);

                    &:hover{
                        border:1px solid var(--defaultRedColor) !important;
                        color: var(--defaultRedColor);
                    }
                }

                .rate{
                    display: flex;
                    justify-content: center;
                    border:1px solid #e0e0e0;
                    align-items: center;
                    height: 40px;
                    width: 80px;
                    border-radius: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    background: #f0f0f0;
                    margin-left: -1px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }

                .flexItem{
                    display: flex;
                    align-items: center;
                }

                .handlerBtn{
                    width: 300px;
                    height: 40px;
                    border-radius: 5px;
                    color:#606060;
                    font-weight: 600;

                    &:hover{
                        z-index: 10;
                        scale: 1.01;
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                        border:1px solid var(--mainColor);
                    }
                }

            }
        }
    `,
    Wrapper: styled.div`
        background: #fff;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);
        padding: 20px;
        border-radius: 10px;

        .flex-wrapper{
            display:flex;
            flex-direction: row;
            .calculator-wrapper{
                flex:1;
            }

            .result-wrapper{
                /* width:  */
            }
        }
    `,
}
export const ProductName = styled.div`
    span{
        display: inline-block;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 700;
        color: #404040;
        border-left: 4px solid var(--mainColor);
    }
`;

export const GridWrapper = styled.div`
    display: flex;
    border-radius: 5px;
    transition: all .5s;
    margin-top: 20px;

    .flex-block{
        padding:20px;
    }

    @media all and (max-width:992px){
        flex-direction: column;
    }
`;

export const LeftBox = styled.form`
    flex:1;
`;

export const RightBox = styled.div`
    width:30%;

    @media all and (max-width:992px){
        width:100%;
        flex:1;
    }
`;

export const FlexBlock = styled.div`
    padding:15px;
`;

export const InputWrapper = styled.div`
    display: flex;

    @media all and (max-width:992px){
        flex-direction: column;
    }
`;

export const InputBox = styled.div`
    background: #fff;
    flex:1;
    border-radius: 10px;
    overflow: hidden;

    .label-flex-box{
        display: flex;
        justify-content: space-between;
        color:#303030;
        font-weight: 700;
        font-size: 16px;
        margin-top: 10px;
    }
    
    .input-group{
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .input-flex-box{
        display: flex;
        align-items: center;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        box-sizing: border-box;
        overflow: hidden;
    }
    
    .unit{
        width: 50px;
        text-align: center;
        color:var(--mainColor);
        font-weight: 600;
    }

    input{
        flex:1;
        padding: 13px;
        outline: none;
        border: none;

        transition: all .5s;

        font-size: 16px;
        color: #444;
    }

`;

export const CommonWrapper = styled.div`
    margin-top: 10px;
`;

export const ButtonBox = styled.div`
    margin-top: 20px;

    @media all and (max-width: 992px){
        margin-top: 0;
    }

    .calc-button{
        margin:0;
        padding:0;
        width: 100%;
        height: 48px;
        background: var(--mainColor);
        border: none;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        &:hover{
            background: var(--mainColorHover);
            border: none;
            color: white;
        }
    }
`;

export const FlexRightBox = styled.div`
    display: flex;
    justify-content: flex-end;

    .control-btn{
        position: relative;
        margin:0;
        padding:0;
        margin-left: 7px;
        width: 44px;
        height: 44px;
        
        background: #fff;
        box-shadow: var(--defaultBoxShadow);
        border:none;
        border-radius: 50%;

        color: #444;
        font-weight: 600;

        cursor: pointer;

        transition: all .3s;

        &:hover{
            background: #e1e1e140;
            color: white;
        }

        &:active{
            transition: all 0s;
            background: #e1e1e180;
        }
    }

    .control-btn .icon{
        position: relative;
        width: 60%;
        height: 60%;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const ResultBox = styled.div`
    flex:1;
    overflow: hidden;
    padding: 20px;
    background: white;
    border:1px solid #e0e0e0;
    border-radius: 5px;
    color: #404040;

    .title{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .result{
        float: right;
        font-size: 18px;
        font-weight: 700;
    }
`;