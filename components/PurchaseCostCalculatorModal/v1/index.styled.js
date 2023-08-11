import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 20px;
        display: flex;
        gap:20px;  

        @media all and (max-width:992px){
            flex-direction: column;
        }
    `,
    ModuleListFieldWrapper: styled.div`
        width:100%;
        flex:1;
        display: flex;
        flex-direction: column;
        gap: 20px;
    `,
    InputFieldWrapper: styled.div`
        width:100%;
        flex:1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .calculate-button{
            background: var(--mainColor);
            color:#fff;
            border: none;
            font-weight: 800;
            height: 48px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
    `,
    ResultFieldWrapper: styled.div`
        width:100%;
        flex:1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .result-input{
            border: 1.5px solid var(--defaultBlueColor);
            font-weight: 600;

            &::placeholder{
                font-size: 12px;
            }
        }
    `,
    NumberInputWithExchangeRate: styled.div`
        label{
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 5px;
            color:#404040;
            display: inline-block;
        }

        .flexible{
            display: flex;
            gap: 5px;
            height: 38px;
        }

        input{
            flex:1;
            height: 100%;
            text-align: right;
            border-radius: 5px;
            font-weight: 600;

            &:read-only{}
        }

        button{
            width:80px;
            height: 100%;
            font-size: 10px;
            font-weight: 600;
            border-radius: 5px;
            padding: 0 5px;
            overflow: hidden;
        }

        .active-button{
            background: #fff;
            color: var(--mainColor);
            border: 1px solid var(--mainColor);
        }

        .readOnly-button{
            cursor:default;
            outline: none;
            margin:0;
            padding:0;
            background: #b0b0b0;
            color: #fff;
            border: 1px solid #b0b0b0;
        }
    `
}
