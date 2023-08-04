import styled from 'styled-components';

export const STY = {
    Container: styled.div`
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 30px;
        padding-left: 10px;
        padding-right: 10px;
    `,
    Wrapper: styled.div`
        border: 1px solid #f0f0f0;
        background-color: #fff;
        padding: 0 20px;
        border-radius: 15px;
    `,
    Title: styled.div`
        /* border-bottom: 1px solid #f0f0f0; */
        padding: 20px 0;
        font-size: 24px;
        font-weight: 700;
    `,
    ItemList: styled.div`
    
    `,
    ItemGroup: styled.div`
        padding: 20px 0;
        /* border-bottom: 1px solid #f0f0f0; */
        .label{
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .text{
            font-size: 14px;
            color:#606060;
            font-weight: 600;
        }

        .consent{
            font-size: 16px;
            margin-top: 20px;
            color: #606060;
            font-weight: 500;
            line-height:1.5;

            a{
                color: var(--defaultBlueColor);
                font-weight: 700;
            }
        }
    `,
    BottomButtonList: styled.div`
        display: flex;
        justify-content: flex-end;
        padding-bottom: 30px;
        margin-top: 30px;

        .cancel-button{
            width:150px;
            border-radius: 5px;
            /* background: var(--defaultRedColor); */
            color: #606060;
            font-weight: 700;
            background: #f0f0f0;
            border: none;

            @media all and (max-width:992px){
                flex:1;
            }
        }

        .confirm-button{
            margin-left: 10px;
            width:150px;
            border-radius: 5px;
            background: var(--mainColor);
            border: none;
            color: #fff;
            font-weight: 700;

            @media all and (max-width:992px){
                flex:1;
            }
        }
    `
}