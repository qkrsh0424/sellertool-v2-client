import styled from "styled-components";

export const St = {
    Container: styled.div`
        margin-top: 20px;
        padding: 0 20px;
    `,
    Wrapper: styled.div`
        width: 100%;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: var(--defaultBoxShadow);
        overflow: hidden;
    `,
    HeaderWrapper: styled.div`
        background: var(--defaultGrayColor);
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title{
            font-size: 18px;
        }

        .dropdown-button-item{
            margin:0;
            padding:0;
            width:28px;
            height: 28px;
            border-radius: 5px;
            border: 1px solid #f0f0f0;
        }
    `,
    CategorySelectorContainer: styled.div`
        padding: 20px 20px 0 20px;
        display: flex;
        flex-direction: row;
        gap: 20px;

        @media all and (max-width: 992px){
            flex-direction: column;
        }

        .control-box{
            width:250px;

            @media all and (max-width: 992px){
                width: 100%;
            }
        }

        .label{
            font-size: 13px;
            color: #404040;
            margin-bottom: 5px;
        }

        .select-button{
            padding:0;
            margin:0;
            height: 40px;
            border-radius: 5px;
            background: var(--defaultGrayColor);
            border:1px solid #f0f0f0;
            font-size: 14px;

            &:hover{
                transition: all .3s;
                background: white;
                
            }
        }
    `,
    SearchConditionContainer: styled.div`
        padding: 20px 20px 0 20px;

        .label{
            font-size: 13px;
            color: #404040;
            margin-bottom: 5px;
        }

        .control-group{
            display: flex;
            gap:20px;

            @media all and (max-width:992px){
                flex-direction: column;
            }

            .control-box{
                width:250px;

                @media all and (max-width:992px){
                    width: 100%;
                }

                .select-item{
                    border-radius: 5px;
                    height: 40px;
                }

                .input-item{
                    border-radius: 5px;
                    height: 40px;
                }

            }

            .add-button{
                border-radius: 5px;
                width: 80px;
                height: 40px;
                background: var(--grayButtonColor);
                font-weight: bold;
                border: none;

                @media all and (max-width:992px){
                    width: 100%;
                }
            }
        }

        .searchFilter-item-group{
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
            
            .subject{
                font-size: 14px;
                font-weight: 600;
                padding: 10px 5px;
            }

            .searchFilter-item{
                display: flex;
                gap: 5px;
                align-items: center;
                border: none;
                background: var(--grayButtonColor);
                padding: 3px 8px;
                border-radius: 5px;

                .text{
                    font-size: 11px;
                    font-weight: 500;
                }

                .deleteIconBtn{
                    cursor: pointer;
                    width:25px;
                    height: 25px;
                    background: none;
                    padding:5px;
                    border-radius: 50%;

                    &:hover{
                        background:#fff;
                    }
                }
            }
        }
    `,
    SortTypesContainer: styled.div`
        padding: 20px 20px 0 20px;

        .label{
            font-size: 13px;
            color: #404040;
            margin-bottom: 5px;
        }

        .control-group{
            display: flex;
            gap:20px;

            @media all and (max-width:992px){
                flex-direction: column;
            }

            .control-box{
                width:250px;

                @media all and (max-width:992px){
                    width: 100%;
                }

                .select-item{
                    border-radius: 5px;
                    height: 40px;
                }

                .input-item{
                    border-radius: 5px;
                    height: 40px;
                }

                .add-button{
                    border-radius: 5px;
                    width: 80px;
                    height: 40px;
                    background: var(--grayButtonColor);
                    font-weight: bold;
                    border: none;
                }
            }
        }

        .aggregation-item-group{
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
            
            .subject{
                font-size: 14px;
                font-weight: 600;
                padding: 10px 5px;
            }

            .aggregation-item{
                display: flex;
                gap: 5px;
                align-items: center;
                border: none;
                background: var(--grayButtonColor);
                padding: 3px 8px;
                border-radius: 5px;

                .text{
                    font-size: 11px;
                    font-weight: 500;
                }

                .deleteIconBtn{
                    cursor: pointer;
                    width:25px;
                    height: 25px;
                    background: none;
                    padding:5px;
                    border-radius: 50%;

                    &:hover{
                        background:#fff;
                    }
                }
            }
        }
    `,
    FooterButtonContainer: styled.div`
        padding: 30px 20px 20px 20px;
        .button-group{
            display: flex;
            justify-content: flex-end;

            .button-item{
                padding:0;
                margin:0;
                width: 120px;
                height: 40px;
                border-radius: 5px;
                background: var(--defaultModalCloseColor);
                color: #fff;
                border:none;
                font-size: 16px;

                &:first-child{
                    margin-right: 10px;
                }
            }
        }
    `,
}