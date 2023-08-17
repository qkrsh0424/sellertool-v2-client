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
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '스토어 랭킹',
                newBadge: false,
                upgradeBadge: false,
                subList: [
                    {
                        name: '일5회',
                        newBadge: false,
                        upgradeBadge: false
                    },
                    {
                        name: '400위 까지',
                        newBadge: false,
                        upgradeBadge: false
                    }
                ]
            },
            {
                name: '통합 상품 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 재고 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 발주 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 판매 성과',
                newBadge: false,
                upgradeBadge: false
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
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '스토어 랭킹',
                newBadge: false,
                upgradeBadge: true,
                subList: [
                    {
                        name: '일50회',
                        newBadge: false,
                        upgradeBadge: true
                    },
                    {
                        name: '1200위 까지',
                        newBadge: false,
                        upgradeBadge: true
                    }
                ]
            },
            {
                name: '통합 상품 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 재고 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 발주 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 판매 성과',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '공유 워크스페이스',
                newBadge: true,
                upgradeBadge: false
            }
        ]
    },
    PLUS: {
        returnButtonType: (currentSubscriptionType) => {
            switch (currentSubscriptionType) {
                case 'NONE': case 'PRIVATE': case 'PUBLIC':
                    return 'SUBSCRIBE';
                case 'PLUS':
                    return 'EXTEND';
                default:
                    return 'USING_ANOTHER';
            }
        },
        mainList: [
            {
                name: '마진율 계산기',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '스토어 랭킹',
                newBadge: false,
                upgradeBadge: true,
                subList: [
                    {
                        name: '일50회',
                        newBadge: false,
                        upgradeBadge: true
                    },
                    {
                        name: '1200위 까지',
                        newBadge: false,
                        upgradeBadge: true
                    }
                ]
            },
            {
                name: '통합 상품 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 재고 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 발주 관리',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '통합 판매 성과',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '공유 워크스페이스',
                newBadge: false,
                upgradeBadge: false
            },
            {
                name: '반품 교환 관리',
                newBadge: true,
                upgradeBadge: false
            },
            {
                name: '마진율 계산기 플러스',
                newBadge: true,
                upgradeBadge: false
            },
            {
                name: '구매 프로세스',
                newBadge: true,
                upgradeBadge: false
            },
            {
                name: '스토어 자동 주문수집',
                newBadge: true,
                upgradeBadge: false
            }
        ]
    }
}

{/* <li className='li-main new-item'>반품 교환 관리</li>
                            <li className='li-main new-item'>마진율 계산기 플러스</li>
                            <li className='li-main new-item'>구매 프로세스</li>
                            <li className='li-main new-item'>스토어 자동 주문수집</li> */}