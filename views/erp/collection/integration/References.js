export const CLASSIFICATIONS = [
    {
        classificationType: 'ALL',
        name: '전체',
        periodSearchCondition: 'createdAt',
        defaultSortTypes: ['CREATED_AT$ASC']
    },
    {
        classificationType: 'NEW',
        name: '신규주문',
        periodSearchCondition: 'createdAt',
        defaultSortTypes: ['CREATED_AT$ASC']
    },
    {
        classificationType: 'CONFIRM',
        name: '주문확정',
        periodSearchCondition: 'salesAt',
        defaultSortTypes: ['SALES_AT$ASC']
    },
    {
        classificationType: 'COMPLETE',
        name: '출고완료',
        periodSearchCondition: 'releaseAt',
        defaultSortTypes: ['RELEASE_AT$ASC']
    },
    {
        classificationType: 'POSTPONE',
        name: '보류데이터',
        periodSearchCondition: 'holdAt',
        defaultSortTypes: ['HOLD_AT$ASC']
    },
]

export const PERIOD_TYPES = [
    { value: '', name: '전체' },
    { value: 'createdAt', name: '주문수집일시' },
    { value: 'channelOrderDate', name: '채널주문일시' },
    { value: 'salesAt', name: '주문확정일시' },
    { value: 'releaseAt', name: '출고완료일시' },
    { value: 'holdAt', name: '보류등록일시' },
]

export const MANAGEMENT_PRODUCT_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'productCode',
        name: '[M] 상품코드'
    },
    {
        value: 'productName',
        name: '[M] 상품명'
    },
    {
        value: 'productTag',
        name: '[M] 상품태그'
    },
    {
        value: 'productOptionCode',
        name: '[M] 옵션코드'
    },
    {
        value: 'productOptionName',
        name: '[M] 옵션명'
    },
    {
        value: 'productOptionTag',
        name: '[M] 옵션태그'
    }
]

export const ORDER_INFO_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'prodName',
        name: '상품명'
    },
    {
        value: 'optionName',
        name: '옵션명'
    },
    {
        value: 'salesChannel',
        name: '판매채널'
    },
    {
        value: 'orderNumber1',
        name: '주문번호1'
    },
    {
        value: 'orderNumber2',
        name: '주문번호2'
    },
]

export const RECEIVER_INFO_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'receiver',
        name: '수취인명'
    },
    {
        value: 'receiverContact1',
        name: '수취인 전화번호1'
    },
    {
        value: 'receiverContact2',
        name: '수취인 전화번호2'
    },
]

export const DELIVERY_INFO_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'destination',
        name: '주소'
    },
    {
        value: 'destinationDetail',
        name: '주소상세'
    },
    {
        value: 'waybillNumber',
        name: '운송장번호'
    },
    {
        value: 'releaseLocation',
        name: '출고지'
    },
]

export const MANAGEMENT_MEMO_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'managementMemo1',
        name: '관리메모1'
    },
    {
        value: 'managementMemo2',
        name: '관리메모2'
    },
    {
        value: 'managementMemo3',
        name: '관리메모3'
    },
    {
        value: 'managementMemo4',
        name: '관리메모4'
    },
    {
        value: 'managementMemo5',
        name: '관리메모5'
    },
    {
        value: 'managementMemo6',
        name: '관리메모6'
    },
    {
        value: 'managementMemo7',
        name: '관리메모7'
    },
    {
        value: 'managementMemo8',
        name: '관리메모8'
    },
    {
        value: 'managementMemo9',
        name: '관리메모9'
    },
    {
        value: 'managementMemo10',
        name: '관리메모10'
    },
]


export const MATCHED_CODE_TYPES = [
    {
        value: 'optionCode',
        name: '[M] 옵션코드'
    },
    {
        value: 'releaseOptionCode',
        name: '[M] 출고옵션코드'
    }
]

export const STOCK_REFLECT_YN_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'y',
        name: '반영'
    },
    {
        value: 'n',
        name: '미반영'
    },
]

export const SORT_METHODS = [
    {
        name: '[M] 주문수집일시',
        sortTarget: 'CREATED_AT'
    },
    {
        name: '채널주문일시',
        sortTarget: 'CHANNEL_ORDER_DATE'
    },
    {
        name: '[M] 주문확정일시',
        sortTarget: 'SALES_AT'
    },
    {
        name: '[M] 출고완료일시',
        sortTarget: 'RELEASE_AT'
    },
    {
        name: '[M] 보류등록일시',
        sortTarget: 'HOLD_AT'
    },
    {
        name: '[M] 상품명',
        sortTarget: 'PRODUCT_NAME'
    },
    {
        name: '[M] 상품태그',
        sortTarget: 'PRODUCT_TAG'
    },
    {
        name: '[M] 옵션명',
        sortTarget: 'PRODUCT_OPTION_NAME'
    },
    {
        name: '[M] 옵션태그',
        sortTarget: 'PRODUCT_OPTION_TAG'
    },
    {
        name: '[M] 출고지',
        sortTarget: 'RELEASE_LOCATION'
    },
    {
        name: '상품명',
        sortTarget: 'PROD_NAME'
    },
    {
        name: '옵션명',
        sortTarget: 'OPTION_NAME'
    },
    {
        name: '판매채널',
        sortTarget: 'SALES_CHANNEL'
    },
    {
        name: '수취인명',
        sortTarget: 'RECEIVER'
    },
    {
        name: '[M] 옵션코드',
        sortTarget: 'OPTION_CODE'
    },
    {
        name: '[M] 출고옵션코드',
        sortTarget: 'RELEASE_OPTION_CODE'
    },
    {
        name: '관리메모1',
        sortTarget: 'MANAGEMENT_MEMO1'
    },
    {
        name: '관리메모2',
        sortTarget: 'MANAGEMENT_MEMO2'
    },
    {
        name: '관리메모3',
        sortTarget: 'MANAGEMENT_MEMO3'
    },
    {
        name: '관리메모4',
        sortTarget: 'MANAGEMENT_MEMO4'
    },
    {
        name: '관리메모5',
        sortTarget: 'MANAGEMENT_MEMO5'
    },
    {
        name: '관리메모6',
        sortTarget: 'MANAGEMENT_MEMO6'
    },
    {
        name: '관리메모7',
        sortTarget: 'MANAGEMENT_MEMO7'
    },
    {
        name: '관리메모8',
        sortTarget: 'MANAGEMENT_MEMO8'
    },
    {
        name: '관리메모9',
        sortTarget: 'MANAGEMENT_MEMO9'
    },
    {
        name: '관리메모10',
        sortTarget: 'MANAGEMENT_MEMO10'
    },
]