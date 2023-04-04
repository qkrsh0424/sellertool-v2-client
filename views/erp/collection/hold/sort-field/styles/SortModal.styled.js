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

export const ContentContainer = styled.div`
    padding: 10px 20px;
    
`;

export const ItemBox = styled.div`
    padding: 8px 0;

    .sortName{
        font-size: 12px;
        color: #404040;
    }

    .button-group{
        margin-top: 10px;
        display: flex;
    }

    .button-item{
        margin:0;
        padding: 0;
        height: 30px;
        font-size: 12px;
        border-radius: 5px;
        max-width: 130px;
        color: #404040;
        &:last-child{
            margin-left: 10px;
        }
    }
`;