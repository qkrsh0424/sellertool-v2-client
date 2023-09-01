import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import { St } from "./FdPaymentList.styled";
import { v4 as uuidv4 } from 'uuid';

const customDateUtils = CustomDateUtils();
const customNumberUtils = CustomNumberUtils();

export function FdPaymentList({
    paymentList
}) {
    return (
        <>
            <St.Container>
                <St.Wrapper>

                    {paymentList?.map(payment => {
                        return (
                            <ItemCard
                                key={payment?.id}
                                payment={payment}
                            />
                        );
                    })}
                </St.Wrapper>
            </St.Container>
        </>
    );
}

function ItemCard({
    payment
}) {
    return (
        <St.ItemCard>
            <div className='product-info-group datetime'>
                <div>결제번호</div>
                <div>{payment?.id}</div>
            </div>
            <div className='product-info-group datetime'>
                <div>결제일</div>
                <div>{customDateUtils.dateToYYMMDDhhmmss(payment?.paidAt, '-', ':')}</div>
            </div>
            <div className="product-info-group">
                <div>
                    상품명 / 수량
                </div>
                <div>
                    {payment?.productName} / {payment?.unit}개
                </div>
            </div>
            <div className="product-info-group">
                <div>
                    결제금액
                </div>
                <div>
                    {customNumberUtils.numberWithCommas(payment?.amount || 0)}원
                </div>
            </div>
            <div className="product-info-group">
                <div>
                    적용된 워크스페이스
                </div>
                <div>
                    {payment?.appliedWorkspace?.name}
                </div>
            </div>
        </St.ItemCard>
    );
}