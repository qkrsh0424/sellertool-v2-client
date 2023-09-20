import styled from 'styled-components';

export const St = {
    Container: styled.div`
    
    `,
    FlexibleWrapper: styled.div`
        display: flex;
        flex-direction: row;
        gap: 10px;

        @media all and (max-width:992px){
            flex-direction: column;
        }
    `,
    BodyWrapper: styled.div`
        flex:1;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        background: #fff;
        padding: 20px 10px;
        border-radius: 15px;
        border:1px solid #f0f0f0;

        .title{
            font-size: 18px;
            font-weight: bold;

        }

        .input-box{
            .flexible{
                display: flex;
                align-items: center;
            }

            label{
                display: inline-block;
                font-size: 14px;
                margin-bottom: 5px;
                color:#666;
                font-weight: 700;
            }

            input{
                height: 40px;
                border-radius: 5px;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                transition: all .3s;
                text-align: end;
                font-weight: 700;
                flex:1;
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
                border:1px solid var(--defaultRedColor);
                color: var(--defaultRedColor);
            }

            .pcs{
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
        }

        .result-button-group{
            display: flex;
            gap: 10px;
            
            .buttonEl{
                flex:1;
                border-radius: 5px;
                background:#e0e0e0;
                font-weight: bold;
                border:none;
            }

            .buttonEl-calculate{
                background:var(--mainColor);
                color:#fff;
            }
        }

        .result-data-box{
            label{
                display: inline-block;
                font-size: 14px;
                margin-bottom: 5px;
                color:var(--mainColor);
                font-weight: 700;
            }

            .flexible{
                display: flex;

            }

            .price-text{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding:10px;
                border-bottom:1px solid #e0e0e0;
                flex:1;
                height: 50px;
                font-weight: 700;
                font-size: 18px;
            }

            .currency{
                display: flex;
                justify-content: center;
                border:1px solid #e0e0e0;
                align-items: center;
                height: 50px;
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

            .currency-notset{
                border:1px solid var(--defaultRedColor);
                color: var(--defaultRedColor);
            }
        }
    `,
    ExampleWrapper: styled.div`
        margin-top: 20px;
        border-radius: 15px;
        border:1px solid #f6f6f6;
        background:#f6f6f6;
        padding:20px;

        .title-box{
            display: flex;
            align-items: center;
            gap: 5px;

            .title{
                font-size: 18px;
                font-weight: bold;
                color:#444;
            }

            .spreadBtn{
                width:60px;
                height: 30px;
                background: none;
                border: 1px solid #00000000;
                color:var(--defaultBlueColor);

                &:hover{
                    background: #f0f0f0;
                }
            }
        }

        .scenario-wrapper{
            line-height: 1.5;
            margin-top: 10px;

            .scenario-table-box{
                overflow: auto;
                margin-top: 10px;
                margin-bottom: 10px;
                table{
                    table-layout: fixed;
                    width:100%;
                    background: white;
                    text-align: center;
                    font-size: 10px;
                    border-collapse: collapse;
                }

                th,td{
                    border: 1px solid #f0f0f0;
                }
                thead th{
                    width: 120px;
                }
            }
            .scenario-title{
                font-size: 14px;
                color:#444;
                font-weight: 600;
            }

            .flexible{
                display: flex;
                flex-direction: row;
                gap: 10px;
                @media all and (max-width:992px){
                    flex-direction: column;
                }
            }

            .example-form-box{

            }

            .input-example{
                font-size: 12px;
                padding:10px;
                font-weight: 700;
                width: 300px;
                margin-bottom: 10px;
                background: #fff;
                border-radius: 5px;
                border:1px solid #f0f0f0;

                @media all and (max-width:992px){
                    width:100%;
                }

                &>div:last-child{
                    text-align: end;
                }
            }
        }
    `,
}