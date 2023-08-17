import styled from 'styled-components';

export const St = {
    Container: styled.div`
        margin-top: 20px;
    `,
    Wrapper: styled.div`
        background: #f6f6f6;
        border: 1px solid #f0f0f0;
        padding: 20px;
        border-radius: 10px;
    `,
    TitleBox: styled.div`
        display: flex;
        align-items: center;
        gap:5px;
        .icon{
            width:24px;
            height: 24px;
        }
        .title{
            font-size: 16px;
            font-weight: 700;
            color:var(--defaultRedColor);
        }
    `,
    ItemList: styled.div`
        padding: 20px 0;
        /* padding: 0 40px; */
        .item{
            
        }

        .item-title{
            color: #444;
            font-weight: 600;
        }
        .item-desc-list{
            padding:0 40px;
            margin: 10px 0;
        }

        .item-desc{
            font-size: 14px;
            color: #444;
            margin-top: 10px;

            a{
                color:var(--defaultBlueColor);
            }
        }
    `,
}