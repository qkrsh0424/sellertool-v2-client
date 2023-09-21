import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding:20px;

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
    `,
    ButtonGroup:styled.div`
        display: flex;
        gap: 5px;
        justify-content: flex-end;
        margin-top: 20px;

        button{
            width:100px;
            height: 40px;
            border-radius: 5px;

            &:hover{
                background: #f6f6f6;
            }
        }

        .cancel-btn{
            background: none;
            color:#666;
            font-weight: 600;
            border: none;
        }

        .confirm-btn{
            background: none;
            color:var(--mainColor);
            font-weight: 600;
            border: none;
        }
    `,
}