import styled from 'styled-components';

export const RemoveMemberModalWrapper = styled.div`
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


    .content-group{
        padding: 30px 20px 0 20px;

        .content-title{
            font-size: 14px;
            font-weight: 600;
            color: #404040;
        }

        .content-box{
            margin-top: 10px;

            .profile-figure{
                overflow: hidden;
                width:70px;
                height: 70px;
                border-radius: 50%;
                border: 1px solid #f0f0f0;
            }

            .username-text{
                margin-left: 10px;
                color:var(--mainColor);
                font-size: 18px;
                font-weight: 600;
            }

            .description-text{
                text-align: center;
                font-weight: 600;
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
                color:var(--defaultRedColor);
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
