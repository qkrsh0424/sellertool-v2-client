import styled from 'styled-components';

export const Container = styled.div`
    background: var(--defaultBackground);
    position: relative;
    width:100%;
    .header-close-button-box{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;

        .header-close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;

            .header-close-button-icon{
                width:100%;
                height: 100%;
            }
        }
    }

    .title-box{
        padding: 0 20px;

        .title{
            border-bottom: 1px solid #000;
            font-size: 20px;
            font-weight: 400;
            color:#303030;
            padding-bottom: 20px;

            .accent-text{
                color:var(--mainColor);
            }
        }
    }
`;

export const ItemInfoContainer = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

export const ItemInfoWrapper = styled.div`
    background: #fff;
    padding: 10px 10px;
    border-radius: 15px;
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    .thumbnail-figure{
        width:50px;
        height: 50px;
        margin-right: 10px;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        overflow: hidden;
    }

    .categoryInfo{
        font-size: 14px;
        color: #404040;
    }

    .productInfo{
        font-size: 14px;
        color: #404040;
    }

    .totalUnit-wrapper{
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;

        .item-group{
            .item{
                font-size: 13px;
                font-weight: 500;

                &:last-child{
                    margin-top: 5px;
                }
            }
        }
    }
`;

export const SearchConsoleContainer = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .MuiInputBase-input{
        padding: 12px 14px;
        font-size: 14px;
    }

    .date-picker{
        width: 100%;
        border:none;
        
        &:last-child{
            margin-left: 10px;
        }
    }

    .search-button-box{
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .search-button-item{
        margin:0;
        padding:0;
        width: 100px;
        height: 38px;
        border-radius: 10px;
        background: var(--mainColor);
        color: #fff;
        border: none;
    }
`;

export const SearchConsoleWrapper = styled.div`
    background: #fff;
    padding: 20px 10px;
    border-radius: 15px;
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
`;

export const ContentContainer = styled.div`
    margin-top: 10px;
    padding: 0 20px;
    margin-bottom: 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

export const ItemCardBox = styled.div`
    border: 1px solid #f0f0f0;
    background: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);
    margin-top: 5px;
    display: flex;
    align-items: center;

    &:hover{
        .edit-button-item{
            display: block;
        }
    }

    .left-group{
        margin-right: 10px;
    }

    .right-group{
        flex:1;
    }

    .status-box{
        font-size: 13px;
        color: #505050;

        .status-receive{
            color:var(--defaultGreenColor);
            font-weight: 600;
        }

        .status-release{
            color:var(--defaultRedColor);
            font-weight: 600;
        }
    }

    .unit-box{
        font-size: 13px;
        color: #505050;

        .unit{
            color:var(--mainColor);
            font-weight: 500;
        }

        .receive-unit{
            color:var(--defaultGreenColor);
            font-weight: 500;
        }

        .release-unit{
            color:var(--defaultRedColor);
            font-weight: 500;
        }
    }

    .memo-box{
        display: flex;
        align-items: center;
        margin-top: 5px;
    }

    .memo{
        flex:1;
        font-size: 13px;
    }

    .edit-button-item{
        display: none;
        margin:0;
        padding:0;
        width:16px;
        height:16px;
        border-radius: 5px;
        border: none;

        &:hover{
            background: none;
        }
    }

    .delete-button{
        width:24px;
        height: 24px;
        border: none;
    }
`;

export const SubmitButtonContainer = styled.div`
    margin-top: 40px;
    display: flex;

    .button-item{
        margin:0;
        padding:0;
        height: 48px;
        border:none;
        color:#fff;
        font-size: 18px;
        font-weight: 500;
    }
`;