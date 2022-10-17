import styled from 'styled-components';

export const PermissionSettingModalWrapper = styled.div`
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

            .permission-button-el{
                padding:0 10px;
                margin:5px;
                width:80px;
                height: 34px;
                text-align: left;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 5px;
                color:#404040;
                font-size: 14px;

                .permission-button-bulb{
                    display: inline-block;
                    border-radius: 50%;
                    width: 13px;
                    height: 13px;
                }

                .permission-button-bulb-on{
                    background: var(--defaultGreenColor);
                }

                .permission-button-bulb-off{
                    background: var(--defaultRedColor);
                }
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