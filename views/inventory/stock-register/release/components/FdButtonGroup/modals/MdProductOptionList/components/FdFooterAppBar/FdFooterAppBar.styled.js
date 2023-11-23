import styled from 'styled-components';

export const St = {
    Container: styled.div`
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        border-top: 1px solid #e0e0e0;
        background-color: #efefef;
        padding: 10px 20px;
        .wrapper{
            display: flex;
            justify-content: flex-end;
            gap:10px;
            align-items: center;
        }

        .wrapper .selectedCount{
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 8px;
            font-size: 14px;
        }

        .wrapper button{
            width: auto;
            border: none;
            width: 100px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
        }

        .wrapper .confirm-button{
            background: var(--mainColor);
            color: #fff;
        }

        .wrapper .cancel-button{
            background: var(--defaultModalCloseColor);
            color: #fff;
        }
    `,
}