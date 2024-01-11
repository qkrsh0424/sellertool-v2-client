import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    padding: 0 20px;
`;

export const Wrapper = styled.div`
    padding: 20px 0;
    border-radius: 15px;
    background: #fff;
    box-shadow: var(--defaultBoxShadow3);
`;

export const VerticalLineBreaker = styled.div`
    margin: 20px;

    background-color: #f0f0f0;
    height: 1px;
    .lineBreaker {
    }
`;

export const TitleLayout = styled.div`
    padding: 0 20px;
    & > div{
        font-size: 20px;
        font-weight: 600;
    }
`;

export const ButtonGroupLayout = styled.div`
    padding: 0 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    @media all and (max-width:992px){
        flex-direction: column;
    }

    .group__wrapper{
        display: flex;
        align-items: center;
        gap: 10px;

        @media all and (max-width:992px){
            &:last-child{
                justify-content: flex-end;
            }
        }
    }

    label{
        font-weight: 600;
        font-size: 14px;
    }

    button{
        width: auto;
        padding: 0 16px;
        height: 38px;
        border-radius: 10px;
        background: #efefef;
        border:none;
        font-weight: 700;
        font-size: 14px;
        color:#000;
    }

    .add__button{
        background: var(--defaultBlueColor);
        color: #ffffff;
    }
`;

export const ContentLayout = styled.div`
    margin-top: 20px;
    position: relative;
    .arrowLeft-button-box{
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

        .icon-button{
            cursor: pointer;
            padding:0;
            margin:0;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            border-radius: 50%;
        }
        
        .icon-button > img{
            width: 100%;
            height: 100%;
        }
    }

    .arrowRight-button-box{
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

        .icon-button{
            cursor: pointer;
            padding:0;
            margin:0;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            border-radius: 50%;
        }
        
        .icon-button > img{
            width: 100%;
            height: 100%;
        }
    }

    .emptyContent__layout{
        padding: 20px;

        > .wrapper{
            border: 1px dashed #e0e0e0;
            padding: 40px 20px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            word-break: keep-all;
        }
    }

    .itemList__wrapper{
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
    }
`;

export const ItemWrapper = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #fff;
    border: ${props => props?.['is-selected'] ? '1.5px solid var(--mainColorOpacity600)' : '1.5px solid #e0e0e0'};
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    scale: ${props => props?.['is-selected'] ? '1.05' : ''};
    transition: all .3s;

    & > .columnText{
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #000000;
    }

    & > .content__box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        input{
            font-size: 16px;
            font-weight: 500;
            border-radius: 10px;
            background: var(--defaultBlueColorOpacity100);
            border-color: #00000000;
            transition: all .3s;
    
            &:focus{
                background: #fff;
                border-color: var(--mainColor);
                scale: 1.05;
            }
        }
    }
    
    & > .content__box > .columnName{
        flex:1;
        font-weight: 500;
        font-size: 14px;
    }

    & > .content__box > .icon__box{
        width: 24px;
        height: 24px;
        margin:0;
        padding:0;
        background: none;
        border:none;
    }

    & > .content__box > .icon__button{
        cursor: pointer;
        width: 30px;
        height: 30px;
        margin:0;
        padding:0;
        background: none;
        border:none;
    }

    & > .dropdown__button{
        height: 30px;
        width: 30px;
        margin-left: auto;
        margin-right: auto;
        border: none;
    }
`;

export const ItemInformationViewWrapper = styled.div`

    & > .valueType__box{

    }

    & > .valueType__box > .valueType{
        font-size: 14px;
        font-weight: 600;
        text-align: center;
    }

    & > .valueType__box > .valueType[value-type="FIXED"]{
        color:#777;
    }

    & > .valueType__box > .valueType[value-type="MAPPING"]{
        color:var(--defaultBlueColor);
    }

    & > .fixedValue__box{
        margin-top: 20px;
        font-size: 14px;
        font-weight: 500;

        label{
            display: inline-block;
            font-size: 12px;
            margin-bottom: 5px;
        }

        .value__field{
            border: none;
            padding: 10px;
            border-radius: 10px;
            font-size: 14px;
            background: #dfdfdf;
            box-sizing: border-box;
        }
    }

    & > .mappingValue__wrapper{
        margin-top: 20px;
    }
    
    & > .mappingValue__wrapper > .seperator__box{
        label{
            display: inline-block;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 5px;
        }
    }

    & > .mappingValue__wrapper > .seperator__box > .seperator{
        font-size: 14px;
        font-weight: 500;

        .value__field{
            border: none;
            padding: 10px;
            border-radius: 10px;
            background: #dfdfdf;
            text-align: center;
        }
    }

    & > .mappingValue__wrapper > .value__box{
        margin-top: 20px;
        label{
            display: inline-block;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 5px;
        }
    }

    & > .mappingValue__wrapper > .value__box > .mappingValueList__box{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    & > .mappingValue__wrapper > .value__box > .mappingValueList__box > .mappingValue{
        padding: 10px 0;
        border: none;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid #e0e0e0;
    }
`;

export const ItemInformationEditWrapper = styled.div`
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;

    & > .valueType__box{
        display: flex;
    }

    & > .valueType__box > .valueType{
        text-align: center;
        font-size: 13px;
        font-weight: 500;
        color: #444;
        height: 38px;

        &:first-child{
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }

        &:last-child{
            margin-left: -1px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }
    
    & > .fixedValue__box{
        margin-top: 20px;
        label{
            margin-bottom: 5px;
            display: inline-block;
            font-size: 12px;
            font-weight: 500;
        }
    }

    & > .fixedValue__box > input{
        border-radius: 10px;
        font-weight: 500;
        background: var(--defaultBlueColorOpacity100);
        border: 1px solid #00000000;
        transition: all .3s;

        &:focus{
            border: 1px solid var(--mainColor);
            background: #fff;
            scale: 1.05;
        }
    }

    & > .mappingValue__wrapper{
        margin-top: 20px;

        label{
            display: inline-block;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 5px;
        }
    }

    & > .mappingValue__wrapper > .seperator{
        margin-bottom: 20px;
    }

    & > .mappingValue__wrapper > .seperator > button{
        height: 38px;
        border-radius: 10px;
        background: #efefef;
        border: none;
        font-weight: 600;
        color: #000;
        font-size: 13px;
    }

    & > .mappingValue__wrapper > .mappingValueList__box{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    & > .mappingValue__wrapper > .mappingValueList__box > .mappingValue{
        display: flex;
        padding: 10px;
        border: none;
        font-size: 14px;
        font-weight: 500;
        border-radius: 10px;
        background-color: #fff;
        border:1px solid #e0e0e0;
        word-break: keep-all;
        align-items: center;
        justify-content: space-between;

        .icon__figure{
            width: 24px;
            height: 24px;
        }
    }

    & > .mappingValue__wrapper > .mappingValueList__box > .mappingValueDroppableField{
        padding: 10px 0;
        border: none;
        text-align: center;
        font-size: 13px;
        font-weight: 400;
        color: #666;
        border-radius: 10px;
        background-color: #fff;
        border:1px dashed #e0e0e0;
        word-break: keep-all;
    }
`;

export const EditHeaderInformationLayout = styled.div`
    padding: 0 20px;
    margin-top: 20px;
    
    .layout__wrapper{
        border-top: 1px solid #e0e0e0;
    }

    .title__wrapper{
        margin-top: 20px;
        font-size: 18px;
        font-weight: 600;
    }

    .form__wrapper{
        margin-top: 20px;

        & > .input__wrapper{
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

        & > .valueTypeSelector__wrapper{
            margin-top: 40px;

            .buttonGroup__box{
                display: flex;
                gap: 5px;
                > button{
                    width: 100px;
                    border-radius: 10px;
                }
            }

            .isActive__button{
                background: var(--defaultBlackColor);
                color: #fff;
            }
        }

        & > .fixedValue__wrapper{
            margin-top: 40px;

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

        & > .mappingValue__layout {
            margin-top: 40px;
            display: flex;
            gap: 10px;
            align-items: flex-start;

            @media all and (max-width:992px){
                flex-direction: column;
            }

            & > .seperator__wrapper{
                width: 300px;
                border-radius: 15px;
                padding: 10px;

                > .description{
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
    
            & > .mappingValueList__wrapper{
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

                > .description{
                    font-size: 12px;
                    color: #444;
                    margin-bottom: 5px;
                }

                > .addButton{
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

                > .mappingValueList__box{
                    padding: 10px;
                    background: var(--grayButtonColor);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    /* height: 100%; */

                    > .mappingValue{
                        background: #fff;
                        border: none;
                        border-radius: 10px;
                        padding: 10px;
                        
                        > .content{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 14px;
                            font-weight: 600;
                            word-break: keep-all;
                            gap: 10px;

                            .columnName{
                                flex:1;
                                font-size: 14px;
                                font-weight: 500;
                            }

                            > .icon__figure{
                                width: 24px;
                                height: 24px;
                            }

                            > .icon__figure__pointer{
                                cursor: pointer;
                            }
                        }

                        > .notice{
                            font-size: 10px;
                            margin-top: 5px;
                            word-break: keep-all;
                            color: var(--defaultRedColor);
                            font-weight: 500;
                        }
                    }

                    > .mappingValue__isSkiped{
                        background: #d0d0d0;
                    }
                    
                    > .mappingValueDroppableField{
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


        & > .buttonGroup__wrapper{
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
    }
`;

export const TipsLayout = styled.div`
    margin-top: 40px;
    padding: 0 20px;
    
    .wrapper{
        background: #efefef;
        padding:20px;
        border-radius: 15px;

        > .title{
            font-size: 18px;
            font-weight: 600;
        }

        > .itemList{
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 5px;

            > div { 
                font-size: 14px;
                font-weight: 600;
                color: #404040;
            }
            
            .addSpan{
                background: var(--defaultBlueColor);
                color:#fff;
                border-radius: 5px;
                padding: 3px 5px;
                font-size: 11px;
            }

            > .delete{
                ::before{
                    content: "";
                    display:inline-block;
                    background-image: url('/images/icon/delete_default_e56767.svg');
                    background-size: 20px 20px;
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    vertical-align: bottom;
                }
            }

            > .drag{
                ::before{
                    content: "";
                    display:inline-block;
                    background-image: url('/images/icon/drag_indicator_000000.svg');
                    background-size: 20px 20px;
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    vertical-align: bottom;
                }
            }
        }
        
    }
`;