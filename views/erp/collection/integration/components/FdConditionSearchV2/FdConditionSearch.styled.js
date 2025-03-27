import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px 20px 0 20px;

    @media all and (max-width: 992px){
        padding: 20px 10px 0 10px;
    }
`;

export const Wrapper = styled.div`
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    padding-top: 10px;
    padding-bottom: 20px;
`;

export const ConditionContainer = styled.div`
    padding: 10px 20px;

    .label{
        font-size: 12px;
        margin-bottom: 5px;
        color: #404040;
    }
`;

export const SearchFieldWrapper = styled.div`
    padding: 10px 20px;

    .flexBox{
        display: flex;

        &.gap-20{
            gap: 20px;
        }

        &.mobileDynamic{
            @media all and (max-width:992px){
                flex-direction: column;
            }
        }
    }

    .conditionBookmarkBox{
        button{
            width: 38px;
            height: 38px;
            border:1px solid #e0e0e0;
            border-radius: 5px;
        }
    }

    .conditionSelectBox{
        /* width: 200px; */

        select{
            height: 38px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
        }
    }

    .queryInputBox{
        /* width: 300px; */
        height: 85px;
        textarea{
            resize: none;
            width: 100%;
            height: 100%;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 10px;
            font-size: 14px;
            background-color: #fff;
            font-weight: 500;

            &:disabled{
                opacity: 0.7;
                background-color: #f6f6f6;
            }

            &::-webkit-scrollbar{
                background: #e1e1e130;
                height:5px;
                width: 3px;
            }
        
            &::-webkit-scrollbar-track{
                border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb{
                background-color: #00000010;
                border-radius: 10px;
            }
        }
    }

    .addButtonBox{
        margin-top: 20px;

        button{
            border-radius: 10px;
            background-color: #efefef;
            border: none;
            font-weight: 700;
        }
    }

    .searchListWrapper{
        width: 700px;
        border-radius: 10px;
        @media all and (max-width:992px){
            width: 100%;
        }

        .title{
            font-size: 14px;
            font-weight: 600;
            padding: 0 10px 10px 10px;
        }

        .aggregationListWrapper{
            display: flex;
            gap: 10px;
            align-items: flex-start;
            flex-wrap: wrap;

            .aggregationBox{
                background-color: #efefef;
                padding: 10px;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                gap: 5px;

                .header{
                    display: flex;
                    gap: 5px;
                    align-items: center;
                    justify-content: space-between;
                    .conditionName{
                        font-size: 11px;
                        font-weight: 500;
                        word-break: break-all;
                        white-space: pre-line;
                    }

                    .deleteButton{
                        width: 15px;
                        height: 15px;
                        background-color: #00000000;
                        border: none;
                    }                    
                }

                .queryText{
                    font-size: 10px;
                    word-break: break-all;
                    white-space: pre-line;
                    max-height: 40px;
                    overflow-y: auto;

                    &::-webkit-scrollbar{
                        background: #e1e1e130;
                        height:5px;
                        width: 3px;
                    }
                
                    &::-webkit-scrollbar-track{
                        border-radius: 10px;
                    }
                    &::-webkit-scrollbar-thumb{
                        background-color: #00000010;
                        border-radius: 10px;
                    }
                }
            }
        }
    }
`;

export const RadioContainer = styled.div`
    padding: 10px 20px;
    line-height: 1.5;
    .title{
        font-size: 14px;
        font-weight: 600;
        color: #606060;

        .highlight{
            display: inline-block;
            position: relative;
            font-weight: 700;
        }

        .highlight::after{
            content: "";
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 7px;
            display: inline-block;
            background: var(--mainColorOpacity500);
        }
    }

    .wrapper{
        display: flex;
        align-items: center;
        margin-right: 15px;
        margin-bottom: 5px;
        cursor: pointer;

        .radio-item{
            margin: 0;
            cursor: pointer;
        }

        .label{
            font-size: 13px;
            color: #404040;
            margin-left: 5px;
            font-weight: 600;
        }
    }
`;

export const PeriodWrapper = styled.div`
    display: flex;

    @media all and (max-width: 992px){
        flex-direction: column;
    }

    .select-item{
        width: 200px;
        height: 38px;
        border-radius: 5px;
        font-size: 13px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }

    .button-item{
        margin:0;
        padding:0;
        width: 150px;
        height: 38px;
    }

    .date-box{
        margin-left: 20px;

        @media all and (max-width: 992px){
            display: flex;
            margin-left: 0;
            margin-top: 20px;
        }
    }

    .MuiInputBase-input{
        padding: 0 14px;
        box-sizing: border-box;
        height: 38px;
        font-size: 14px;
    }

    .date-picker{
        width: 320px;
        border:none;
        
        &:last-child{
            margin-left: 20px;
        }

        @media all and (max-width: 992px){
            flex:1
        }
    }
`;

export const ConditionWrapper = styled.div`
    display: flex;
    .select-item{
        width: 200px;
        height: 38px;
        border-radius: 5px;
        font-size: 13px;

        @media all and (max-width: 992px){
            width: 100%;
            flex:1;
        }
    }

    .input-item{
        width: 200px;
        height: 38px;
        border-radius: 5px;
        margin-left: 20px;
        box-sizing: border-box;

        @media all and (max-width: 992px){
            width: 100%;
            flex:1;
        }
    }
`;

export const FlexGroup = styled.div`
    display: flex;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

export const SubmitButtonContainer = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: center;
    padding: 0 20px;

    .button-item{
        width: 150px;
        margin: 0;
        padding:0;
        height: 48px;
        background: var(--mainColor);
        color: white;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        box-shadow: var(--defaultBoxShadow);

        &:last-child{
            margin-left: 10px;
        }
    }
`;