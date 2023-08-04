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
        display: flex;
        padding: 20px 0;
        /* border-bottom: 1px solid #f0f0f0; */
        
        .title{
            font-weight: 700;
        }
    `,
    Item: styled.div`
        flex:1;
        font-size: 14px;
        font-weight: 500;
    `
}