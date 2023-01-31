import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    border-top: 1px solid rgb(224, 224, 224);
    border-left: 1px solid rgb(224, 224, 224);

    @media all and (max-width: 992px){
        grid-template-columns: repeat(3, 1fr);
    }

    .grid-item{
        user-select: none;
        border-right: 1px solid rgb(224, 224, 224);
        border-bottom: 1px solid rgb(224, 224, 224);
        padding: 8px;
        font-size: 13px;
        cursor: pointer;
        word-break: break-all;
        color: #404040;

        @media all and (max-width: 992px){
            font-size: 11px;
        }
    }

    .select-all{
        font-weight: 600;
        color: var(--defaultBlueColor);
    }

    .clear-all{
        font-weight: 600;
        color: var(--defaultRedColor);
    }

    .selected{
        background: var(--mainColor);
        font-weight: 500;
        color: #fff;
    }
`;

export const DownArrowIconBox = styled.div`
    width: 50px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
`;

export const SelectedItemListContainer = styled.div`
    width: 100%;
    min-height: 300px;

    .empty-box{
        border-radius: 10px;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);
        padding: 60px 0;
        text-align: center;
        color: #404040;
        font-weight: 600;
        font-size: 14px;
    }
`;

export const SelectedItemBox = styled.div`
    padding: 10px;
    margin-bottom: 5px;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    display: flex;
    align-items: center;

    .numbering-box{
        font-size: 13px;
        text-align: center;
        width: 20px;

        @media all and (max-width: 992px){
            font-size: 11px;
            width: 15px;
        }
    }

    .customHeaderName-box{
        flex:1;
        margin-left: 10px;

        @media all and (max-width: 992px){
            margin-left: 5px;
        }

        .label{
            font-size: 11px;
            color: #606060;

            @media all and (max-width: 992px){
                font-size: 10px;
            }
        }
        .customHeaderName{
            height: 40px;
            border-radius: 5px;
            font-size: 14px;

            @media all and (max-width: 992px){
                font-size: 10px;
            }
        }
    }

    .originHeaderName-box{
        width: 230px;
        margin-left: 10px;

        @media all and (max-width: 992px){
            width: 80px;
            margin-left: 5px;
        }

        .label{
            font-size: 11px;
            color: #606060;

            @media all and (max-width: 992px){
                font-size: 10px;
            }
        }

        .originHeaderName{
            height: 40px;
            background: #f0f0f0;
            border: 1px solid #f0f0f0;
            border-radius: 5px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-size: 14px;
            color: #606060;

            @media all and (max-width: 992px){
                font-size: 10px;
                
            }
        }
    }

    .delete-button-box{
        width: 25px;
        margin-left: 10px;

        @media all and (max-width: 992px){
            width: 20px;
            margin-left: 5px;
        }

        .delete-button-item{
            margin:0;
            padding:0;
            border: none;
            background: none;
        }
    }
`;