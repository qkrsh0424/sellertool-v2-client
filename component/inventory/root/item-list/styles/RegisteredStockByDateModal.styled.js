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
    margin-bottom: 20px;

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
    margin-bottom: 5px;

    &:hover{
        .edit-button-item{
            display: block;
        }
    }

    .thumbnail-figure{
        width:40px;
        height: 40px;
        margin-right: 10px;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        overflow: hidden;
    }

    .categoryInfo{
        font-size: 12px;
        color: #404040;
    }

    .productInfo{
        font-size: 12px;
        color: #404040;
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
        margin-top: 3px;
    }

    .memo{
        flex:1;
        font-size: 12px;
        color: #404040;
    }

    .edit-button-item{
        display: none;
        margin:0;
        padding:0;
        width:14px;
        height:14px;
        border-radius: 5px;
        border: none;

        &:hover{
            background: none;
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
        margin-right: 20px;
    }

    .search-button-box{
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