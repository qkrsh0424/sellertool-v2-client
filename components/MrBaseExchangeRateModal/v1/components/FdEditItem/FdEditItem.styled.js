import styled from 'styled-components';

export const St = {
    Container: styled.div`
    
    `,
    NameWrapper: styled.div`
        margin-bottom: 20px;
        .input-box{
            label{
                display: inline-block;
                font-size: 13px;
                font-weight: 500;
                color: #606060;
                margin-bottom: 5px;
            }

            input{
                border-radius: 5px;
            }
        }
    `,
    ValueTypeSelector: styled.div`
        display: flex;
        .tabItem{
            user-select: none;
            cursor: pointer;
            text-align: center;
            padding: 10px;
            /* width: 100px; */
            flex:1;
            background:#f8f9fa;
            border: 1px solid #e0e0e0;
            color:#777;
            font-size: 14px;
            margin-bottom: -1px;
            &:first-child{
                border-top-left-radius: 5px;
            }

            &:last-child{
                border-top-right-radius: 5px;
            }

            &:not(:first-child){
                margin-left: -5px;
            }
        }

        .tabItem-active {
            position: relative;
            z-index: 10;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            background: rgb(255, 255, 255);
            color: rgb(64, 64, 64);
            font-weight: 700;
            /* border-bottom: 1px solid #00000000 !important; */
            border-bottom: none;
        }
    `,
    StaticFormWrapper: styled.div`
        border: 1px solid #e0e0e0;
        background: #fff;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 40px 20px;

        .input-box{
            label{
                display: inline-block;
                font-size: 13px;
                font-weight: 500;
                color: #606060;
                margin-bottom: 5px;
            }

            input{
                border-radius: 5px;
                text-align: end;
            }
        }

    `,
    DynamicFormWrapper: styled.div`
        border: 1px solid #e0e0e0;
        background: #fff;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 40px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .input-box{
            label{
                display: inline-block;
                font-size: 13px;
                font-weight: 500;
                color: #606060;
                margin-bottom: 5px;
            }

            input{
                border-radius: 5px;
                text-align: end;
            }

            select{
                border-radius: 5px;
            }

            .extraValue-input-field{
                display: flex;
                align-items: center;
                gap: 5px;

                .signBtn{
                    width:40px;
                    height: 40px;
                    border-radius: 5px;
                    border:1px solid #f0f0f000;
                    font-weight: 500;
                    font-size: 30px;
                    &:hover{
                        border:1px solid #f0f0f0;
                    }
                }

                .positiveNumber{
                    color:var(--defaultBlueColor);
                }

                .nagativeNumber{
                    color:var(--defaultRedColor);
                }

                input{
                    border-radius: 5px;
                    text-align: end;
                    flex:1;
                }
            }
        }
    `,
    FooterWrapper: styled.div`
        margin-top: 20px;
        .button-group{
            display: flex;
            gap: 5px;
            justify-content: flex-end;
            .buttonItem{
                width:100px;
                height: 35px;
                background: none;
                border: none;
                border-radius: 5px;
    
                &:hover{
                    background: #f5f5f5;
                }
            }
    
            .cancelBtn{
                color: #666;
                font-weight: 500;
            }
    
            .confirmBtn{
                color: var(--mainColor);
                font-weight: 500;
            }
        }
    `,
}