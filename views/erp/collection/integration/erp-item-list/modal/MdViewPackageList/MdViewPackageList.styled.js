import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 20px;
`;

export const ParentProductOptionInfoWrapper = styled.div`
    font-weight: 700;
    border: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;

    h3{
        margin-top: 0;
    }
`;

export const CardListWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const CardBox = styled.div`
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;

    .productInfoText{
        font-weight: 700;
        font-size: 14px;
    }

    .stockInfoFlexBox{
        margin-top: 10px;
        display: flex;
        gap: 20px;
        font-size: 12px;
        font-weight: 500;

        & .text-blue{
            color: var(--defaultBlueColor);
        }
        & .text-red{
            color: var(--defaultRedColor);
        }
    }
`;
