import styled from 'styled-components';

export const Container = styled.div`
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
        padding: 0 20px;
    }

    .content-box{
        margin-top: 40px;
    }

    .title-box{
        padding: 0 20px;
    }

    .title{
        border-bottom: 1px solid #000;
        font-size: 20px;
        font-weight: 400;
        color:#303030;
        padding-bottom: 20px;
    }

    .input-box{
        margin-top: 10px;
        
        .flex{
            display: flex;
        }

        .input-el{
            width:100%;
            box-sizing: border-box;
            padding: 15px 10px;
            font-size: 14px;
            border:1px solid #e0e0e0;
            border-radius: 10px;
            flex:1;

            &:focus{
                outline:none;
                border:1px solid var(--mainColor);
                box-shadow: var(--defaultBoxShadow);
            }
        }

        .button-el{
            margin:0;
            padding:0;
            margin-left: 5px;
            border-radius: 5px;
            width:80px;
        }

        .input-notice{
            color: #707070;
            font-size: 12px;
            margin-top: 3px;

            @media all and (max-width: 992px){
                font-size: 10px;
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