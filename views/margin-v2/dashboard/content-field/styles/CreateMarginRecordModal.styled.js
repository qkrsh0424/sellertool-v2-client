import styled from 'styled-components';

export const Container = styled.div`
    .content-group{
        padding: 30px 20px 0 20px;

        .input-item{
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #e0e0e0;
            height: 48px;
            border-radius: 10px;
            padding: 15px 10px;
            font-size: 14px;
            outline:none;

            &:focus{
                border: 1px solid var(--mainColor);
                box-shadow: var(--defaultBoxShadow);
            }
        }

        .content-title{
            font-size: 14px;
            font-weight: 600;
            color: #404040;
        }

        .content-box{
            margin-top: 10px;
            
            .icon-figure{
                width: 24px;
                height: 24px;
            }

            .text-item{
                margin-left: 10px;
                font-size: 17px;
                font-weight: 500;
            }

            .validation-button-el{
                margin: 0px 0px 0px 5px;
                padding: 0px;
                border-radius: 10px;
                width: 80px;
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