import styled from 'styled-components';

export const St = {
    Container: styled.div`

    `,
    Wrapper: styled.div`
        border:1px solid #f0f0f0;
        border-radius: 15px;
        background: #fff;
        padding: 0 20px;
        max-height: 800px;
        overflow: auto;
    `,
    ItemCard: styled.div`
        padding: 20px 0;
        border-bottom: 1px solid #f0f0f0;
        &:last-child{
            border-bottom:none;
        }

        .product-info-group{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #404040;
            font-weight: 600;
            margin-top: 5px;
            gap: 5px;

            @media all and (max-width:992px){
                font-size: 10px;
            }
        }
    `
}