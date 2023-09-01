import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px;
    `,
    Title: styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        .title{
            font-size: 24px;
            font-weight: 700;
            color: #444;
        }

        .tagBadge{
            font-size: 14px;
            color: var(--defaultPurpleColorOpacity600);
            font-weight: 400;
            border:0.5px solid var(--defaultPurpleColorOpacity600);
            padding: 3px 0;
            width: 70px;
            text-align: center;
            background: #fff;
            border-radius: 10px;
        }
    `,
    BodyWrapper: styled.div`
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        gap: 20px;

        .marginRecordList-wrapper{
            width: 400px;
        }

        .calculator-wrapper{
            flex:1;
            height: 300px;
            background: #00ff0010;
        }
    `,
}