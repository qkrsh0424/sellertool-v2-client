import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 10px 0;

        .addBtn{
            width:40px;
            height: 40px;
            padding: 5px;
            border-radius: 50%;
            background: var(--mainColor);
            border: 1px solid var(--mainColor);
            margin-left: auto;
            margin-right: auto;
            transition: all .3s;
            &:hover{
                rotate: 90deg;
                scale: 1.1;
                box-shadow: var(--defaultBoxShadow);
            }
        }
    `,
}