const ORDER_INFO_HEADERS = [
    {
        name: 'prodCode',
        headerName: '[M] 상품코드',
        required: false,
        defaultWidth: 180,
        valueType: 'productCode'
    },
    {
        name: 'optionCode',
        headerName: '[M] 옵션코드',
        defaultWidth: 220,
        required: false,
        valueType: 'optionCode'
    },
    {
        name: 'releaseOptionCode',
        headerName: '[M] 출고옵션코드',
        defaultWidth: 220,
        required: false,
        valueType: 'optionCode'
    },
    {
        name: 'channelOrderDate',
        headerName: '판매채널 주문일시',
        required: true,
        defaultWidth: 180,
        valueType: 'date'
    },
    {
        name: 'prodName',
        headerName: '상품명',
        required: true,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'optionName',
        headerName: '옵션명',
        required: true,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'unit',
        headerName: '수량',
        required: true,
        defaultWidth: 180,
        valueType: 'number'
    },
    {
        name: 'salesChannel',
        headerName: '판매채널',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'orderNumber1',
        headerName: '주문번호1',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'orderNumber2',
        headerName: '주문번호2',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'channelProdCode',
        headerName: '상품코드',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'channelOptionCode',
        headerName: '옵션코드',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'price',
        headerName: '가격',
        required: false,
        defaultWidth: 180,
        valueType: 'numberWithCommas'
    },
    {
        name: 'deliveryCharge',
        headerName: '배송비',
        required: false,
        defaultWidth: 180,
        valueType: 'numberWithCommas'
    },
    {
        name: 'barcode',
        headerName: '바코드',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
]

const RECEIEVR_INFO_HEADERS = [
    {
        name: 'receiver',
        headerName: '수취인명',
        required: true,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'receiverContact1',
        headerName: '전화번호1',
        required: true,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'receiverContact2',
        headerName: '전화번호2',
        required: true,
        defaultWidth: 180,
        valueType: 'number'
    },
    {
        name: 'destination',
        headerName: '주소',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'destinationDetail',
        headerName: '주소 상세',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'zipCode',
        headerName: '우편번호',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'courier',
        headerName: '택배사',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'transportType',
        headerName: '배송방식',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'deliveryMessage',
        headerName: '배송메세지',
        required: false,
        defaultWidth: 180,
        valueType: 'numberWithCommas'
    },
    {
        name: 'waybillNumber',
        headerName: '운송장번호',
        required: false,
        defaultWidth: 180,
        valueType: 'numberWithCommas'
    }
]

const MANAGEMENT_MEMO_HEADERS = [
    {
        name: 'managementMemo1',
        headerName: '관리메모1',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'managementMemo2',
        headerName: '관리메모2',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo3',
        headerName: '관리메모3',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo4',
        headerName: '관리메모4',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo5',
        headerName: '관리메모5',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo6',
        headerName: '관리메모6',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo7',
        headerName: '관리메모7',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo8',
        headerName: '관리메모8',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo9',
        headerName: '관리메모9',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    },
    {
        name: 'managementMemo10',
        headerName: '관리메모10',
        defaultWidth: 180,
        required: false,
        valueType: 'string'
    }
]

const StaticValues = {
    ORDER_INFO_HEADERS:ORDER_INFO_HEADERS,
    RECEIEVR_INFO_HEADERS:RECEIEVR_INFO_HEADERS,
    MANAGEMENT_MEMO_HEADERS:MANAGEMENT_MEMO_HEADERS
}

export default StaticValues;