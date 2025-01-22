import styled from 'styled-components';

export const Frame = {
    Container: styled.div`
        padding: 0 20px;
        margin-top: 20px;

        @media (max-width: 768px) {
            padding: 0 10px;
        }
    `,
    Tabs: styled.div`
        display: flex;
        justify-content: space-between;
        gap: 10px;
    `,
    Tab: styled.div`
        flex:1;
        padding: 10px;
        background: #fff;
        border-radius: 10px;
        font-size: 16px;
        box-shadow: var(--defaultBoxShadow);
        cursor: pointer;

        &.active{
            background: var(--mainColor);
            color: #fff;
            font-weight: 700;
        }
    `,
}