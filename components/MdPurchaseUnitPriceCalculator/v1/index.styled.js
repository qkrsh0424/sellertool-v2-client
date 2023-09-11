import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px;
        min-height: 500px;
    `,
    ButtonGroupWrapper: styled.div`
        margin-bottom: 10px;
        .flexible{
            display: flex;
            flex-direction: row;
        }

        .button-item{
            width:100px;
            color: #666;
            &:first-child{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            &:last-child{
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                margin-left: -1px;
            }
        }

        .button-item-isActive{
            background: var(--mainColor);
            color:#fff;
            border-color: var(--mainColor);
            font-weight: 600;
        }
    `,
    FlexibleWrapper: styled.div`
        display: flex;
        flex-direction: row;
        gap: 20px;
    `,
}