import { numberFormatUtils } from "../../../../../../utils/numberFormatUtils";
import { STY } from "./FdProductInfo.styled";

const returnDiscountedPrice = (price, discountRate) => {
    return price - (price * discountRate / 100);
}

export function FdProductInfo({
    targetWorkspace,
    refSubscriptionPlan
}) {
    return (
        <>
            <STY.Container>
                <STY.Wrapper>
                    <STY.Title>
                        1. 상품 정보
                    </STY.Title>
                    <STY.ItemList>
                        <STY.ItemGroup>
                            <STY.Item className='title'>워크스페이스</STY.Item>
                            <STY.Item>{targetWorkspace?.name}</STY.Item>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <STY.Item className='title'>상품명</STY.Item>
                            <STY.Item>{refSubscriptionPlan?.name} ({refSubscriptionPlan?.period}일)</STY.Item>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <STY.Item className='title'>가격</STY.Item>
                            <STY.Item>{numberFormatUtils.numberWithCommas(refSubscriptionPlan?.price || 0)}₩</STY.Item>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <STY.Item className='title'>할인</STY.Item>
                            <STY.Item>{refSubscriptionPlan?.discountRate}%</STY.Item>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <STY.Item className='title'>할인 적용된 가격</STY.Item>
                            <STY.Item>{numberFormatUtils.numberWithCommas(returnDiscountedPrice(refSubscriptionPlan?.price, refSubscriptionPlan?.discountRate) || 0)}₩</STY.Item>
                        </STY.ItemGroup>
                    </STY.ItemList>
                </STY.Wrapper>
            </STY.Container>
        </>
    );
}