import styled from 'styled-components';


export const St = {
    Container: styled.div`
        margin-bottom: 20px;
        
    `,
    Wrapper: styled.div`
        display: flex;
        flex-direction: row;
        max-width: 992px;
        margin-left: auto;
        margin-right: auto;
        align-items: normal;
        // mobile
        @media all and (max-width:992px){
            flex-direction: column;
            align-items: normal;
        }
    `,
    ResultWrapper: styled.div`
        width: 300px;
        display: flex;
        flex-direction: column;
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        overflow: hidden;
        padding: 0 20px;
        border-left: none;
        

        @media all and (max-width:992px){
            width: 100%;
            border: 1px solid #e0e0e0;
            border-top: none;
            height: 600px;
        }

        .result-detail-button-box{
            display: flex;
            justify-content: flex-end;

            button{
                width: 100px;
                height: 40px;
                background-color: var(--grayButtonColor);
                border:none;
                border-radius: 5px;
                font-weight: 600;
                cursor: pointer;
            }

        }

        .result-box{
            flex:1;
            width:100%;
            overflow: hidden;
            background:#fff;
            color: #404040;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            border-bottom: 1px solid #e0e0e0;

            &:last-child{
                border-bottom: none;
            }
            
            @media all and (max-width:992px){
                padding: 10px;
                height: 400px;
            }

            .title{
                font-size: 16px;
                font-weight: 700;

                word-break: break-all;
                white-space:pre-line;
                
                @media all and (max-width:992px){
                    font-size: 15px;
                }
            }

            .result{
                display: flex;
                justify-content: flex-end;
                font-size: 18px;
                font-weight: 700;

                word-break: break-all;
                white-space:pre-line;

                @media all and (max-width:992px){
                    font-size: 15px;
                }
            }
        }
    `,
    CalculatorWrapper: styled.div`
        flex:1;
        border: 1px solid #e0e0e0;
        padding: 20px;
        border-radius: 20px;
        border-right: 1px dashed #e0e0e0;

        @media all and (max-width:992px){
            border: 1px solid #e0e0e0;
            border-bottom: 1px dashed #e0e0e0;
        }

        .button-wrapper{
            display: flex;
            justify-content: flex-end;
            gap: 10px;

            @media all and (max-width:992px){
                flex-direction: column-reverse;
            }
            
            .refreshBtn{
                width:150px;
                height: 60px;
                background:#b0b0b0;
                color:#fff;
                font-size: 16px;
                font-weight: 700;
                border-radius: 15px;
                border:none;

                @media all and (max-width:992px){
                    width:100%;
                }
            }

            .calculatorBtn{
                width:250px;
                height: 60px;
                background: var(--mainColor);
                color:#fff;
                font-size: 16px;
                font-weight: 700;
                border-radius: 15px;
                border:none;

                @media all and (max-width:992px){
                    width:100%;
                }
            }
        }
        .control-wrapper{
            display: flex;
            flex-direction: column;
            border-radius: 15px;
            gap: 30px;

            &:last-child{
                box-shadow: none;
            }
            
            .title{
                font-size: 18px;
                font-weight: 700;
                padding: 0 20px;
                color:#222;
                writing-mode: vertical-lr;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: 1px solid #e0e0e0;
                letter-spacing: 5px;
            }

            .flexible{
                display: flex;
                flex-direction: row;
                gap: 30px;
                width: 100%;

                @media all and (max-width:992px){
                    flex-direction: column;
                }
            }

            .flexible-col{
                display: flex;
                flex-direction: column;
                gap: 30px;
                width: 100%;

                @media all and (max-width:992px){
                    flex-direction: column;
                }
            }

            .flexible-alignItems-start{
                align-items: flex-start;
            }

            .input-box{
                flex:1;

                label{
                    display: inline-block;
                    font-size: 13px;
                    margin-bottom: 5px;
                    color:#222;
                    font-weight: 700;
                }

                input{
                    height: 50px;
                    border: 1px solid #e0e0e0;
                    border-radius: 15px;
                    background: var(--defaultBlueColorOpacity50);
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    transition: all .3s;
                    text-align: end;
                    font-weight: 700;
                    font-size: 15px;
                    &:focus{
                        z-index: 10;
                        scale: 1.03;
                        background: #fff;
                        border-color:var(--mainColor);
                        border-radius: 15px;
                    }
                }

                select{
                    width:100%;
                    height: 50px;
                    font-size: 15px;
                    background-color: var(--defaultBlueColorOpacity50);
                    border: 1px solid #e0e0e0;
                    border-radius: 15px;
                    transition: all .3s;

                    @media all and (max-width:992px){
                        width:100%;
                    }

                    &:focus{
                        z-index: 10;
                        scale: 1.03;
                        background-color: #fff;
                        border:1px solid var(--mainColor);
                    }
                }

                .currency{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 50px;
                    width: 100px;
                    font-size: 10px;
                    font-weight: 600;
                    background: #fff;
                    margin-left: -1px;
                    background: none;
                    border:1px solid #e0e0e0;
                    border-top-right-radius: 15px;
                    border-bottom-right-radius: 15px;
                }

                .flexItem{
                    display: flex;
                    align-items: center;
                }

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