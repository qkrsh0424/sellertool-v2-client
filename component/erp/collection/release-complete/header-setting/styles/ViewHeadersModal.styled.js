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

export const ContentContainer = styled.div`
    padding: 0 20px;
`;

export const ItemWrapper = styled.div`

`;

export const ItemBox = styled.div`
    padding: 10px;
    background: #fff;
    margin-top: 10px;
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:last-child{
        margin-bottom: 10px;
    }

    .name{
        font-size: 14px;
        color:#404040;
        font-weight: 500;
    }

    .description{
        margin-top: 5px;
        font-size: 12px;
        color: #606060;
    }

    .icon-button-item{
        margin:0;
        padding:0;
        width:20px;
        height: 20px;
        border:none;
        background: none;
    }
`;