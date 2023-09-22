// badgeStatus = [COMMON, UPGRADE, NEW, PENDING]
export const SubscriptionPlanDetails = {
    PRIVATE: {
        returnButtonType: (currentSubscriptionType) => {
            switch (currentSubscriptionType) {
                case 'NONE':
                    return 'SUBSCRIBE';
                case 'PRIVATE':
                    return 'USING_THIS';
                default:
                    return 'USING_ANOTHER';
            }
        },
        mainList: [
            {
                name: '마진율 계산기',
                badgeStatus: 'COMMON'
            },
            {
                name: '스토어 랭킹 (준비중...)',
                badgeStatus: 'PENDING',
                subList: [
                    {
                        name: '일5회',
                        badgeStatus: 'PENDING',
                    },
                    {
                        name: '400위 까지',
                        badgeStatus: 'PENDING',
                    }
                ]
            },
            {
                name: '통합 상품 관리',
                badgeStatus: 'COMMON',
            },
            {
                name: '통합 재고 관리',
                badgeStatus: 'COMMON',
            },
            {
                name: '통합 발주 관리',
                badgeStatus: 'COMMON',
            },
            {
                name: '통합 판매 성과',
                badgeStatus: 'COMMON',
            }
        ]
    },
    PUBLIC: {
        returnButtonType: (currentSubscriptionType) => {
            switch (currentSubscriptionType) {
                case 'NONE': case 'PRIVATE':
                    return 'SUBSCRIBE';
                case 'PUBLIC':
                    return 'USING_THIS';
                default:
                    return 'USING_ANOTHER';
            }
        },
        mainList: [
            {
                name: '마진율 계산기',
                badgeStatus: 'COMMON'
            },
            {
                name: '스토어 랭킹 (준비중...)',
                badgeStatus: 'PENDING',
                subList: [
                    {
                        name: '일5회',
                        badgeStatus: 'PENDING'
                    },
                    {
                        name: '400위 까지',
                        badgeStatus: 'PENDING'
                    }
                ]
            },
            {
                name: '통합 상품 관리',
                badgeStatus: 'COMMON'
            },
            {
                name: '통합 재고 관리',
                badgeStatus: 'COMMON'
            },
            {
                name: '통합 발주 관리',
                badgeStatus: 'COMMON'
            },
            {
                name: '통합 판매 성과',
                badgeStatus: 'COMMON'
            },
            {
                name: '공유 워크스페이스',
                badgeStatus: 'NEW'
            }
        ]
    },
    PLUS: {
        returnButtonType: (currentSubscriptionType) => {
            switch (currentSubscriptionType) {
                case 'NONE': case 'PRIVATE': case 'PUBLIC':
                    return 'SUBSCRIBE';
                case 'PLUS':
                    return 'USING_THIS';
                default:
                    return 'USING_ANOTHER';
            }
        },
        mainList: [
            {
                name: '마진율 계산기',
                badgeStatus: 'COMMON'
            },
            {
                name: '스토어 랭킹 (준비중...)',
                badgeStatus: 'PENDING',
                subList: [
                    {
                        name: '일50회',
                        badgeStatus: 'PENDING',
                    },
                    {
                        name: '1200위 까지',
                        badgeStatus: 'PENDING',
                    }
                ]
            },
            {
                name: '통합 상품 관리',
                badgeStatus: 'COMMON'
            },
            {
                name: '통합 재고 관리',
                badgeStatus: 'COMMON'
            },
            {
                name: '통합 발주 관리',
                badgeStatus: 'COMMON'
            },
            {
                name: '통합 판매 성과',
                badgeStatus: 'COMMON'
            },
            {
                name: '공유 워크스페이스',
                badgeStatus: 'COMMON'
            },
            {
                name: '마진율 계산기 플러스+',
                badgeStatus: 'NEW'
            },
        ]
    }
}

{/* <li className='li-main new-item'>반품 교환 관리</li>
                            <li className='li-main new-item'>마진율 계산기 플러스</li>
                            <li className='li-main new-item'>구매 프로세스</li>
                            <li className='li-main new-item'>스토어 자동 주문수집</li> */}