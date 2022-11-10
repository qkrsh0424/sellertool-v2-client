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
    }

    .content-box{
        padding: 20px 0;
    }

    .link-button{
        width:100%;
        border: 1px solid #f0f0f0;
        margin:0;
        padding:0;
        margin-top: 20px;
        height: 48px;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        font-size: 16px;
        color: #404040;
    }
`;
