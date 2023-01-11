import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
`;

export const AddButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    .button-item{
        margin:0;
        padding:0;
        width: 120px;
        height: 40px;
        font-size: 13px;
        border-radius: 5px;
        background: var(--mainColor);
        color: #fff;
    }
`;

export const CardItemList = styled.div`
    margin-top: 10px;
`;

export const CardItem = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    margin-top: 10px;
    overflow: auto;

    .wrapper{
        display: flex;

        @media all and (max-width: 992px){
            width: 992px;
        }
    }

    .count-box{
    }

    .delete-box{
        margin-left: 10px;
        .button-item{
            position:relative;
            margin:0;
            padding: 0;
            height: 24px;
            width: 24px;
            margin: 0 auto;
            border: 1px solid #00000000;
            cursor: pointer;
            background: none;
        }
    }

    .name-box{
        width: 150px;
        margin-left: 10px;
        .label{
            font-size: 10px;
            margin-bottom: 3px;
            color:#404040;
        }

        .input-item{
            height: 35px;
            border-radius: 5px;
            font-size: 13px;
            width: 100%;
        }
    }

    .fieldType-box{
        margin-left: 10px;
        .label{
            font-size: 10px;
            margin-bottom: 3px;
            color:#404040;
        }

        .button-item{
            margin: 0;
            padding: 0;
            width: 70px;
            height: 35px;
            border-radius: 5px;
            font-size: 13px;
            color: #404040;
        }
    }

    .fieldSplitter-box{
        margin-left: 10px;
        .label{
            font-size: 10px;
            margin-bottom: 3px;
            color:#404040;
        }

        .button-item{
            margin: 0;
            padding: 0;
            width: 70px;
            height: 35px;
            border-radius: 5px;
            font-size: 13px;
            color: #404040;
        }
    }

    .viewDetails-box{
        margin-left: 10px;
        width: 350px;
        
        .label{
            font-size: 10px;
            margin-bottom: 3px;
            color:#404040;
        }

        .setting-button{
            background: var(--mainColor);
            color:#fff !important;
            font-weight: 700;
            padding: 3px 7px !important;
            cursor: pointer;
        }

        .detail-name{
            font-size: 11px;
            display: inline-block;
            border: 1px solid #f0f0f0;
            padding: 3px 7px;
            border-radius: 5px;
            color: #404040;
            margin-right: 3px;
            margin-bottom: 3px;
        }
    }

    .fixedValue-box{
        margin-left: 10px;
        width: 300px;
        
        .label{
            font-size: 10px;
            margin-bottom: 3px;
            color:#404040;
        }

        .input-item{
            height: 35px;
            border-radius: 5px;
            font-size: 13px;
            width: 100%;
        }
    }

    .mergeYn-box{
        margin-left: 10px;
        
        
        .label{
            font-size: 10px;
            margin-bottom: 3px;
            color:#404040;
        }

        .button-item-off{
            width: 70px;
            margin: 0;
            padding: 0;
            height: 35px;
            border:1px solid var(--defaultRedColor);
            border-radius: 5px;
            font-size: 13px;
            color: var(--defaultRedColor);
        }

        .button-item-on{
            width: 70px;
            margin: 0;
            padding: 0;
            height: 35px;
            border:1px solid var(--defaultGreenColor);
            border-radius: 5px;
            font-size: 13px;
            color: var(--defaultGreenColor);
        }
    }
`;