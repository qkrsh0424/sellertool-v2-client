import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px 0;

        .wrapper{
            display: flex;
            justify-content: flex-end;
            gap:10px;
        }

        button{
            background: var(--grayButtonColor);
            height: 40px;
            width: auto;
            margin:0;
            padding: 0 16px;
            font-size: 14px;
            font-weight: 600;
            color: #000;
            border: none;
            border-radius: 8px;

            &:hover{
                background: var(--grayButtonHoverColor);
            }
        }
    `,
    PopperContainer: styled.div`
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 300px;

        @media all and (max-width:992px){
            width: auto;
        }

        .header-frame{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .header-frame > .title{
            font-weight: 600;
            font-size: 16px;
        }

        .header-frame > .close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:30px;
            height: 30px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;
        }

        .wrapper{
            display:flex;
            gap: 10px;
        }

        .wrapper>button{
            border-radius: 15px;
            border:none;
            background: var(--grayButtonColor);
            font-size: 14px;
            font-weight: 600;
        }

        .wrapper>.upload-button{
            background: var(--mainColor);
            color:#fff;
        }
    `,
}