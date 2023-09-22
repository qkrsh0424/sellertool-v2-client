import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { STY_Card, STY_CardListWrapper, STY_Container } from "./FdPlanList.styled";
import { numberFormatUtils } from "../../../../../../../utils/numberFormatUtils";
import { SubscriptionPlanDetails } from "../../config/SubscriptionPlanDetails";
import { useRouter } from "next/router";

{/* 이벤트 종료 후 삭제 */ }
const CURRENT_EVENT_PLAN_ID = '63f1ee1c-58f2-11ee-8d3c-06fe28321f8c';

export function FdPlanList({
    currentWorkspace,
    refSubscriptionPlanList,
    eventAppliedLogList
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
                        if (refSubscriptionPlan?.statusType === 'HIDE') {
                            return null;
                        }

                        if (refSubscriptionPlan?.subscriptionPlan === 'PRIVATE') {
                            return (
                                <PrivateCard
                                    key={refSubscriptionPlan?.id}
                                    refSubscriptionPlan={refSubscriptionPlan}
                                    buttonType={buttonType}
                                    handleApplySubscriptionPlan={handleApplySubscriptionPlan}
                                />
                            );
                        }

                        {/* 이벤트 종료 후 삭제 */ }
                        if (refSubscriptionPlan?.id === CURRENT_EVENT_PLAN_ID && eventAppliedLogList?.length > 0) {
                            return null;
                        }

                        return (
                            <STY_Card.Container
                                key={refSubscriptionPlan?.id}
                                subscriptionPlan={refSubscriptionPlan?.subscriptionPlan}
                                style={refSubscriptionPlan?.highlightFlag ? { border: `3px solid ${refSubscriptionPlan?.highlightColorCode}` } : {}}
                            >
                                {refSubscriptionPlan?.highlightFlag &&
                                    <div className='highlightTag'>{refSubscriptionPlan?.highlightTagName}</div>
                                }
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
                                    {/* 이벤트 종료 후 삭제 */}
                                    <EventPlanDescription
                                        refSubscriptionPlan={refSubscriptionPlan}
                                    />
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
                                            {buttonType === 'USING_ANOTHER' &&
                                                <CustomBlockButton
                                                    type='button'
                                                    className='button-item'
                                                    disabled
                                                >
                                                    다른 플랜 이용중
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
                                            <li key={main.name} className={`li-main ${main?.badgeStatus === 'UPGRADE' ? 'upgrade-item' : ''} ${main?.badgeStatus === 'NEW' ? 'new-item' : ''} ${main?.badgeStatus === 'PENDING' ? 'pending-item' : ''}`}>
                                                {main.name}
                                                {main?.subList &&
                                                    <>
                                                        <STY_Card.ServiceList>
                                                            {main?.subList?.map(sub => {
                                                                return (
                                                                    <li key={sub.name} className={`li-sub ${sub?.badgeStatus === 'UPGRADE' ? 'upgrade-item' : ''} ${main?.badgeStatus === 'PENDING' ? 'pending-item' : ''}`}>{sub?.name}</li>
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

function PrivateCard({
    refSubscriptionPlan,
    buttonType,
    handleApplySubscriptionPlan
}) {
    return (
        <STY_Card.Container>
            <STY_Card.TitleBox>
                {refSubscriptionPlan?.name}
            </STY_Card.TitleBox>
            <STY_Card.PriceBox>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--mainColor)' }}>무료 제공 서비스</div>
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
                                다른 플랜 이용중
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
                        <li key={main.name} className={`li-main ${main?.badgeStatus === 'UPGRADE' ? 'upgrade-item' : ''} ${main?.badgeStatus === 'NEW' ? 'new-item' : ''} ${main?.badgeStatus === 'PENDING' ? 'pending-item' : ''}`}>
                            {main.name}
                            {main?.subList &&
                                <>
                                    <STY_Card.ServiceList>
                                        {main?.subList?.map(sub => {
                                            return (
                                                <li key={sub.name} className={`li-sub ${sub?.badgeStatus === 'UPGRADE' ? 'upgrade-item' : ''} ${main?.badgeStatus === 'PENDING' ? 'pending-item' : ''}`}>{sub?.name}</li>
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
}

{/* 이벤트 종료 후 삭제 */ }
function EventPlanDescription({
    refSubscriptionPlan
}) {

    if (refSubscriptionPlan?.id === CURRENT_EVENT_PLAN_ID) {
        return (
            <div style={{ color: 'var(--defaultRedColor)', fontWeight: '600', fontSize: '14px' }}>계정당 1회만 가능합니다.</div>
        );
    } else {
        return null;
    }
}