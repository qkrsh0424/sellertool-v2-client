import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px 0;
    `,
    Wrapper: styled.div`
        display: flex;
        align-items: center;
        gap: 20px;

        button{
            width:40px;
            height: 40px;
            background: #fff;
            border-radius: 50%;
            border: none;
            background: #fff;
            transition: all .3s;

            &:hover{
                background: var(--grayButtonHoverColor);
            }
        }

        .title-box{
            flex:1;
            font-size: 22px;
            font-weight: 700;
        }
    `,
}