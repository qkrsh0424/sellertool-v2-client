import styled from 'styled-components';

export const St = {
    Container: styled.div`
        margin-bottom: 20px;
    `,
    Title:styled.div`
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
            color: #909090;
            font-weight: 400;
            border:0.5px solid #909090;
            padding: 3px 0;
            width: 70px;
            text-align: center;
            background: #fff;
            border-radius: 10px;
        }
    `,
}