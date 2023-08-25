import styled from 'styled-components';

export const St = {
    Container: styled.div`
        flex:1;
    `,
    Wrapper: styled.div`
        width:100%;
        flex:1;
        display: flex;
        flex-direction: row;
        gap: 20px;
        border-radius: 10px;

        @media all and (max-width:1280px){
            flex-direction: column;
        }
    `,
    ResultWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 15px;
        border-radius: 10px;
        border:1px solid #808080;
        height: 100%;
        width: 350px;
        @media all and (max-width:1280px){
            width:100%;
            flex:1;
        }

        .calculate-button{
            background: var(--mainColor);
            color:#fff;
            border: none;
            font-weight: 800;
            height: 48px;
            border-radius: 5px;
        }

        .export-button{
            background: #e0e0e0;
            color:#404040;
            border: none;
            font-weight: 800;
            height: 62.5px;
            border-radius: 5px;
        }
    `,
    FormWrapper: styled.div`
        flex:1;
        padding: 15px;
        border-radius: 10px;
        border:1px solid #808080;
        height: 100%;

        .purchaseType-wrapper{
            display: flex;
            margin-bottom: 20px;
            justify-content: flex-start;

            .buttonEl{
                width: 100px;
                height: 40px;
                color: #606060;
                &:first-child{
                    border-right: none;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                &:last-child{
                    border-left: none;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }

            .buttonEl-isActive{
                border:1px solid var(--mainColor);
                background: var(--mainColor);
                color: #fff;
                font-weight: 600;
            }
        }

        .partition-group{
            display: flex;
            flex-direction: row;
            gap: 20px;


            @media all and (max-width:1280px){
                flex-direction: column;
            }

            .partition{
                width:100%;
                flex:1;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
        }

        .calculate-button{
            background: var(--mainColor);
            color:#fff;
            border: none;
            font-weight: 800;
            height: 62.5px;
            border-radius: 5px;
        }
    `,
    NumberInputWrapper: styled.div`
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

        .result-input{
            border: 1.5px solid var(--defaultBlueColor);
            font-weight: 600;
            background: var(--defaultBlueColorOpacity200);

            &::placeholder{
                color: #222;
                font-size: 12px;
            }
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

        .notset-button{
            background: #fff;
            color: var(--defaultRedColor);
            border: 1px solid var(--defaultRedColor);
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