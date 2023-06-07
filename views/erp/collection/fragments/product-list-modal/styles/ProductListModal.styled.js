import styled from 'styled-components';

export const Container = styled.div`
    background: var(--defaultBackground);
    
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

export const ExcelDownloadButton = styled.div`
    margin-top: 30px;
    padding: 0 20px;
    display: flex;
    justify-content: flex-end;
    .button-item{
        margin:0;
        padding:0;
        width: 100px;
        height: 38px;
        font-size: 13px;
        background: var(--mainColor);
        color:#fff;
        border: none;
        border-radius: 5px;
    }
`;

export const ReleaseList = styled.div`
    /* margin-top: 20px; */
    padding: 20px;

    .box{
        user-select: none;
        -webkit-tap-highlight-color: #00000000;
        cursor: pointer;
        border: 1px solid #e9e9e9;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 5px;
        background: #fff;

        &:hover{
            border: 1px solid var(--mainColor);
        }

        .none-code{
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            font-weight: 700;
            color: var(--defaultRedColor);
        }

        .infoAndUnit{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            word-break: break-all;
            font-size: 12px;
            color: #333;
            font-weight: 700;

            .tag{
                font-size: 10px;
                color: #606060;
                font-weight: 400;
            }

            .unit{
                color: var(--mainColor);
            }

            .stock{
                font-size: 10px;
                color: #606060;
                font-weight: 500;
            }
        }

        .codeAndCategories{
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #606060;
            word-break: break-all;
        }
    }
`;