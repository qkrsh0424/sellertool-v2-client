import styled from 'styled-components';

export const St = {
    Container: styled.div`
        flex:1;
    `,
    Wrapper: styled.div`
        width:100%;
        flex:1;
        padding: 20px;
        display: flex;
        border:1px solid #e0e0e0;
        flex-direction: column;
        gap: 20px;
        border-radius: 10px;
        background: white;
        box-shadow: var(--defaultBoxShadow);
    `,
    BodyWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap:20px;
        .input-box{
            .flexible{
                display: flex;
            }

            label{
                display: inline-block;
                font-size: 13px;
                color:#666;
                font-weight: 600;
                margin-bottom: 5px;
            }

            input{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                background: var(--defaultBlueColorOpacity50);
                transition: all .3s;
                width: 300px;
                height: 40px;
                text-align: end;
                font-weight: 700;
                &:focus{
                    z-index: 5;
                    scale: 1.01;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    background: #fff;
                }

                @media all and (max-width:992px){
                    flex:1;
                    width: 100%;
                }
            }

            .calculatorBtn{
                cursor: pointer;
                border:1px solid #f0f0f0;
                border-radius: 5px;
                font-size: 12px;
                color:#222;
                width:90px;
                font-weight: 600;
                height: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #f0f0f0;
            }

            .baseExchangeRateBtn{
                display: flex;
                border: 1px solid #e0e0e0;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                width: 80px;
                height: 40px;
                margin-left: -1px;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                font-size: 10px;
                font-weight: 700;
                transition: all .3s;

                &:hover{
                    color:var(--mainColor);
                    border-color: var(--mainColor);
                }
            }
            
            .baseExchangeRateBtn-Notset{
                border-color: var(--defaultRedColor);
                color: var(--defaultRedColor);
            }

            .calculator-select-btn{
                cursor:pointer;
                background: #fff;
                width:40px;
                height: 40px;
                font-size: 13px;
                border-radius: 20px;
                font-weight: 700;
                transition: all .3s;
                padding:5px;
                margin-top: 5px;
                &:hover{
                    background:#f0f0f0;
                }
            }
        }
    `,
    FooterWrapper: styled.div`
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: flex-end;
        .buttonEl{
            width: 100px;
            border-radius: 5px;

            @media all and (max-width:992px){
                flex:1;
                width: 100%;
            }
        }

        .selectBtn{
            background-color: var(--mainColor);
            border:none;
            color: #fff;
            font-weight: 700;
        }

        .saveBtn{
            background-color: #fff;
            border:1px solid var(--mainColor);
            color: var(--mainColor);
            font-weight: 700;
        }
    `,
}