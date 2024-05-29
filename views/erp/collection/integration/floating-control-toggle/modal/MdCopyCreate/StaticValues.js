export function StaticValues(props) {
    return {
        HEADERS: HEADERS
    }
}

const HEADERS = [
    {
        name: 'uniqueCode',
        headerName: '[M] 주문수집번호',
        required: true,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'channelOrderDate',
        headerName: '판매채널 주문일시',
        required: true,
        defaultWidth: 180,
        valueType: 'date'
    },
    {
        name: 'createdAt',
        headerName: '주문수집일시',
        required: true,
        defaultWidth: 180,
        valueType: 'date'
    },
    {
        name: 'salesAt',
        headerName: '주문확정일시',
        required: true,
        defaultWidth: 180,
        valueType: 'date'
    },
    {
        name: 'releaseAt',
        headerName: '출고완료일시',
        required: true,
        defaultWidth: 180,
        valueType: 'date'
    },
    {
        name: 'holdAt',
        headerName: '보류등록일시',
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
        headerName: '옵션정보',
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
        valueType: 'string'
    },
    {
        name: 'waybillNumber',
        headerName: '운송장번호',
        required: false,
        defaultWidth: 180,
        valueType: 'string'
    },
    {
        name: 'price',
        headerName: '판매금액',
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
    },
]