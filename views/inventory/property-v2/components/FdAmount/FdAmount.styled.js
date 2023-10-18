import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 0 20px;
    `,
    CardItemWrapper: styled.div`
        display: flex;
        flex-direction: row;
        gap: 10px;
        overflow-y:auto;
        padding: 20px 0;
        .card{
            display: flex;
            flex-direction: column;
            flex:1;
            min-width: 150px;
            padding: 20px;
            gap: 10px;
            border-radius: 10px;
            background: var(--defaultBlueColorOpacity200);
            box-shadow: var(--defaultBoxShadow);
            label{
                font-weight: 600;
                color:#222;
                font-size: 15px;
            }

            .amount{
                text-align: right;
                font-weight: 700;
                color:#222;
                font-size: 17px;
            }
        }
    `,
}