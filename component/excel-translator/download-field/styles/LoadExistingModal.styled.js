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

    .content-group{
        padding: 0 20px;
        margin-bottom: 20px;

        
        .content-box{
            margin-top: 20px;
            background: #fff;
            padding: 10px;
            border-radius: 15px;
            box-shadow: var(--defaultBoxShadow);
            line-height: 1.7;
            cursor: pointer;
            font-size: 16px;
            color:#404040;

            .header-count{
                font-size: 14px;
                color: #808080
            }
        }
    }



    .button-group{
        margin-top: 40px;
        display: flex;

        .button-el{
            margin:0;
            padding:0;
            height: 48px;
            border:none;
            color:#fff;
            font-size: 18px;
            font-weight: 500;
        }
    }
`;

export const ControlGroup = styled.div`
    margin-top: 40px;
    padding: 0 20px;

    .uploadSampleExcel-button{
        margin:0;
        padding:0;
        height: 48px;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;
        background: var(--mainColor);
        color: #fff;
        border: 1px solid #f0f0f0;
        font-size: 14px;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .loadSampleExcel-button{
        margin:0;
        padding:0;
        height: 48px;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;
        background: #f0f0f0;
        color: #404040;
        border: 1px solid #f0f0f0;
        font-size: 14px;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }
`;

export const FlexBlock = styled.div`
    padding: 5px;
`;

export const LoadExistingModeWrapper = styled.div`
    .prev-button{
        margin:0;
        padding:0;
        width:80px;
        height: 34px;
        border-radius: 5px;
    }
`;