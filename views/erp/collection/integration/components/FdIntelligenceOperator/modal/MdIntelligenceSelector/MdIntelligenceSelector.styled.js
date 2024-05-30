import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 40px;

    @media all and (max-width:992px){
        padding: 40px 10px;
    }
`;

export const LoadErpItemListWrapper = styled.div`
    .loadButton{
        border-radius: 15px;
        background-color: var(--mainColor);
        color: #fff;
        border:none;
        font-weight: 700;
    }
`;

export const SettingFieldWrapper = styled.div`
    .priorityTabListBox{
        .titleBox{
            display: flex;
            margin-bottom: 10px;
            gap: 10px;
            align-items: center;

            .title{
                font-size: 18px;
                font-weight: 600;
            }

            button{
                width: 30px;
                height: 30px;
                border: none;
                background-color: #00000000;
            }
        }

        .flexBox{
            display: flex;
        }

        .flexBox.gap-5{
            gap: 5px;
        }

        .tabBox{
            display: flex;
            border: 1px solid #00000000;
            padding: 5px 8px;
            align-items: center;
            gap: 5px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: var(--defaultBoxShadow3);
            font-weight: 600;
            font-size: 14px;

            .tabBox__name{

            }

            .tabBox__iconButton{
                width: 20px;
                height: 20px;
                border: none;
                background-color: #00000000;
            }

            .tabBox__icon{
                
            }
        }
    }
`;

export const LaunchFieldWrapper = styled.div`
    margin-top: 40px;
    .launchButton{
        border-radius: 15px;
        color: #ffffff;
        background-color: #696969;
        border: 1px solid #696969;
        font-weight: 700;
        box-shadow: var(--defaultBoxShadow3);
        animation: backgroundChange 1s infinite;

        &:hover{
            animation:none;
            opacity: 0.9;
            color:#fff;
        }

        .flexBox{
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
        }

        .icon{
            width: 20px;
            height: 20px;
        }
    }

    @keyframes backgroundChange{
        0%{
            opacity: 0.9;
            scale: 1;
        }
        50%{
            opacity: 1;
            scale: 1.03;
        }
        100%{
            opacity: 0.9;
            scale: 1;
        }
    }
`;