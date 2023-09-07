import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px;
        max-width: 1600px;
        margin-left: auto;
        margin-right: auto;
        min-height: 1400px;
    `,
    Title: styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        margin-bottom: 20px;
        .title{
            font-size: 24px;
            font-weight: 700;
            color: #444;
        }

        .tagBadge{
            font-size: 14px;
            color: var(--plusWorkspaceColor);
            font-weight: 400;
            border:0.5px solid var(--plusWorkspaceColor);
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
        gap: 20px;

        @media all and (max-width:992px){
            flex-direction: column;
        }

        .marginRecordList-wrapper{
            width: 400px;

            @media all and (max-width:992px){
                width: 100%;
            }
        }

        .calculator-wrapper{
            flex:1;

            @media all and (max-width:992px){
                width: 100%;
            }
        }

        .emptyField{
            border: 1px solid #f0f0f0;
            border-radius: 10px;
            background: #fff;
            height: 300px;
            box-shadow: var(--defaultBoxShadow);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 700;
            color:#444;
        }
    `,
}