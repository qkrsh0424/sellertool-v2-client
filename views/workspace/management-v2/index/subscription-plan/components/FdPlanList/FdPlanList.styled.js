import styled from 'styled-components';

export const STY_Container = styled.div`
    margin-top: 20px;
`;

export const STY_CardListWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media all and (max-width:992px){
        flex-direction: column;
    }

`;

export const STY_Card = {
    Container: styled.div`
        width: 100%;
        height: 100%;
        padding: 20px;
        background: #fff;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
    `,
    TitleBox: styled.div`
        margin: 20px 0;
        background: #fff;
        text-align: center;
        font-size: 22px;
        font-weight: 800;
        color: #333;
        border-radius: 5px;
    `,
    PriceBox: styled.div`
        margin: 40px 0;
        text-align: center;

        .original-price-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        .original-price-tag{
            text-decoration-line: line-through;
            color: #808080;
            font-size: 14px;
        }

        .original-price-discount-badge{
            background: var(--mainColor);
            color: white;
            border-radius: 5px;
            padding: 3px 3px;
            font-size: 11px;
            font-weight: 600;
        }

        .sales-price-wrapper{
            margin-top: 10px;
        }

        .sales-price-tag{
            font-size: 20px;
            font-weight: 800;
        }
    `,
    SubscriptionButtonBox: styled.div`
        /* margin: 40px 0; */
        .button-item{
            background: #333;
            color: #fff;
            font-weight: 600;
            font-size: 18px;
            border-radius: 5px;
            border: none;

            &:disabled{
                opacity: 0.3;
            }
        }
    `,
    LineBreaker: styled.div`
        background: #f0f0f0;
        height: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
    `,
    ServiceList: styled.ul`
        padding:0;
        .li-main {
            margin: 10px 0;
            padding: 0 0 0 30px;
            list-style: none;
            background-image: url('/images/icon/check_default_5fcf80.svg');
            background-repeat: no-repeat;
            background-position: left top;
            background-size: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #666;
        }
        
        .li-sub{
            margin: 10px 0;
            padding: 0 0 0 30px;
            list-style: none;
            background-image: url('/images/icon/check_default_5fcf80.svg');
            background-repeat: no-repeat;
            background-position: left top;
            background-size: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #666;
        }

        .upgrade-item{
            color: var(--defaultGreenColor);
            font-weight: 700;
        }

        .new-item{
            color: var(--defaultBlueColor);
            font-weight: 700;
        }
    `
}