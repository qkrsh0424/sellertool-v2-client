import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
`;

export const Wrapper = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    background: #fff;
    padding-bottom: 20px;
`;

export const ButtonGroupLayout = styled.div`
    margin-top: 20px;
    padding: 0 20px;
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
        color: #fff;
    }

    .mode__button{
        background: #fff;
        color: var(--mainColor);
        border: 1px solid var(--mainColor);
    }
`;

export const EmptyContent = styled.div`
    margin-top: 20px;
    padding: 0 20px;

`;

export const ContentLayout = styled.div`
    margin-top: 20px;
    position: relative;

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

    .itemList__wrapper{
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
        padding:20px;

        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }
    }

    .item__wrapper{
        min-width: 200px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #fff;
        border:1.5px solid #e0e0e0;
        padding: 10px;
        border-radius: 15px;
        cursor: pointer;
        transition: all .3s;
    }

    .item__wrapper[is-selected="true"]{
        border: 1.5px solid var(--mainColorOpacity600);
        scale: 1.05;
    }

    .item__wrapper > .columnText{
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        color: #000000;
    }

    .item__wrapper > .content__box{
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
    
    .item__wrapper > .content__box > .columnName{
        flex:1;
        font-weight: 500;
        font-size: 16px;

    }

    .item__wrapper > .content__box > .icon__box{
        width: 24px;
        height: 24px;
        margin:0;
        padding:0;
        background: none;
        border:none;
    }

    .item__wrapper > .content__box > .icon__button{
        cursor: pointer;
        width: 30px;
        height: 30px;
        margin:0;
        padding:0;
        background: none;
        border:none;
    }
`;

export const TipsLayout = styled.div`
    margin-top: 20px;
    
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

export const EditHeaderInformationLayout = styled.div`
    margin-top: 20px;
    padding: 0 20px;
    
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