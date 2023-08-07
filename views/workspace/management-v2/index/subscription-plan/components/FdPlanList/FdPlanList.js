import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { STY_Card, STY_CardListWrapper, STY_Container } from "./FdPlanList.styled";
import { numberFormatUtils } from "../../../../../../../utils/numberFormatUtils";
import { SubscriptionPlanDetails } from "../../config/SubscriptionPlanDetails";
import { useRouter } from "next/router";

export function FdPlanList({
    currentWorkspace,
    refSubscriptionPlanList
}) {
    const router = useRouter();
    const subscriptionPlan = currentWorkspace?.subscriptionPlan;

    const handleApplySubscriptionPlan = (refSubscriptionPlanId, plan) => {
        if (plan === 'PRIVATE') {
            router.push({
                pathname: '/workspace/management',
                query: {
                    wsId: currentWorkspace?.id,
                    view: 'SETTINGS'
                }
            });
            return;
        }
        router.push({
            pathname: '/payments/subscription-plan',
            query: {
                wsId: currentWorkspace?.id,
                spId: refSubscriptionPlanId,
                paymentType: 'SUBSCRIPTION_PLAN'
            }
        })
    }

    return (
        <>
            <STY_Container>
                <STY_CardListWrapper>
                    {refSubscriptionPlanList?.map(refSubscriptionPlan => {
                        const buttonType = SubscriptionPlanDetails[refSubscriptionPlan?.subscriptionPlan]?.returnButtonType(subscriptionPlan);
                        return (
                            <STY_Card.Container key={refSubscriptionPlan?.id}>
                                <STY_Card.TitleBox>
                                    {refSubscriptionPlan?.name}
                                </STY_Card.TitleBox>
                                <STY_Card.PriceBox>
                                    {refSubscriptionPlan?.discountRate !== 0 &&
                                        <div className='original-price-wrapper'>
                                            <div className='original-price-tag'>{numberFormatUtils?.numberWithCommas(refSubscriptionPlan?.price ?? 0)}원</div>
                                            <div className='original-price-discount-badge'>
                                                <div>SAVE</div>
                                                <div>{refSubscriptionPlan?.discountRate}%</div>
                                            </div>
                                        </div>
                                    }
                                    <div className='sales-price-wrapper'>
                                        <div className='sales-price-tag'>{numberFormatUtils?.numberWithCommas(refSubscriptionPlan?.price - (refSubscriptionPlan?.price * refSubscriptionPlan?.discountRate / 100))}원 <span style={{ fontSize: '12px', color: '#808080', fontWeight: '500' }}>/ {refSubscriptionPlan?.period}일</span></div>
                                    </div>
                                </STY_Card.PriceBox>
                                <STY_Card.SubscriptionButtonBox>
                                    {refSubscriptionPlan?.statusType === 'OPEN' &&
                                        <>
                                            {buttonType === 'SUBSCRIBE' &&
                                                <CustomBlockButton
                                                    type='button'
                                                    className='button-item'
                                                    onClick={() => handleApplySubscriptionPlan(refSubscriptionPlan?.id, refSubscriptionPlan?.subscriptionPlan)}
                                                >
                                                    구독하기
                                                </CustomBlockButton>
                                            }
                                            {buttonType === 'USING_THIS' &&
                                                <CustomBlockButton
                                                    type='button'
                                                    className='button-item'
                                                    disabled
                                                >
                                                    이용중
                                                </CustomBlockButton>
                                            }
                                            {buttonType === 'EXTEND' &&
                                                <CustomBlockButton
                                                    type='button'
                                                    className='button-item'
                                                    onClick={() => handleApplySubscriptionPlan(refSubscriptionPlan?.id)}
                                                >
                                                    구독 연장하기
                                                </CustomBlockButton>
                                            }
                                            {buttonType === 'USING_ANOTHER' &&
                                                <CustomBlockButton
                                                    type='button'
                                                    className='button-item'
                                                    disabled
                                                >
                                                    다른 플랜 사용중
                                                </CustomBlockButton>
                                            }
                                        </>
                                    }
                                    {refSubscriptionPlan?.statusType === 'CLOSE' &&
                                        <>
                                            <CustomBlockButton
                                                type='button'
                                                className='button-item'
                                                disabled
                                            >
                                                준비중
                                            </CustomBlockButton>
                                        </>
                                    }
                                </STY_Card.SubscriptionButtonBox>
                                <STY_Card.LineBreaker />
                                <STY_Card.ServiceList>
                                    {SubscriptionPlanDetails[refSubscriptionPlan?.subscriptionPlan]?.mainList.map(main => {
                                        return (
                                            <li key={main.name} className={`li-main ${main.upgradeBadge ? 'upgrade-item' : ''} ${main.newBadge ? 'new-item' : ''}`}>
                                                {main.name}
                                                {main?.subList &&
                                                    <>
                                                        <STY_Card.ServiceList>
                                                            {main?.subList?.map(sub => {
                                                                return (
                                                                    <li key={sub.name} className={`li-sub ${sub.upgradeBadge ? 'upgrade-item' : ''}`}>{sub?.name}</li>
                                                                );
                                                            })}
                                                        </STY_Card.ServiceList>
                                                    </>
                                                }
                                            </li>
                                        )
                                    })}
                                </STY_Card.ServiceList>
                            </STY_Card.Container>
                        );
                    })}
                </STY_CardListWrapper>
            </STY_Container>
        </>
    );
}