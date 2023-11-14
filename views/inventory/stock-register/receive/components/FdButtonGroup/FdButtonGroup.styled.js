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
            height: 32px;
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
}