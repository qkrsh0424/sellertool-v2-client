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

export const ContentWrapper = styled.div`
    padding: 20px;
    .button-item{
        margin:20px auto;
        padding:0;
        width: 70%;
        height: 48px;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        color: #404040;
    }

    .button-item-active{
        background: var(--mainColor);
        color:#fff;
    }
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    border-top: 1px solid rgb(224, 224, 224);
    border-left: 1px solid rgb(224, 224, 224);
    background: #fff;
    box-shadow: var(--defaultBoxShadow);

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

export const ButtonContainer = styled.div`
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
`;