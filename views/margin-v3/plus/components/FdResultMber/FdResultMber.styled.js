import styled from 'styled-components';

export const St = {
    Container: styled.div`
        margin-bottom: 20px;
    `,
    Wrapper: styled.div`
        display: flex;
        justify-content: flex-end;
        .title{
            font-size: 12px;
            font-weight: 700;
            color:#666;
            margin-bottom: 5px;
        }

        .mberItem{
            border:1px solid var(--mainColor);
            border-radius: 5px;
            width:80px;
            text-align: center;
            padding: 10px 0;
            font-size: 14px;
            background: #fff;
            color:var(--mainColor);
            cursor: pointer;
            font-weight: 700;
            transition: all .3s;

            &:hover{
                background: var(--mainColor);
                color:#fff;
            }
        }
    `,
}