import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px 0;
        border-bottom: 1px solid #e0e0e0;
    `,
    Wrapper: styled.div`
        display: flex;
        align-items: center;

        button{
            width:40px;
            height: 40px;
            background: #fff;
            border-radius: 50%;
            border: none;
            background: var(--grayButtonColor);

            &:hover{
                background: var(--grayButtonHoverColor);
            }
        }

        .title-box{
            flex:1;
            text-align: center;
            margin-left: -40px;
            font-size: 22px;
            font-weight: 700;
        }
    `,
}