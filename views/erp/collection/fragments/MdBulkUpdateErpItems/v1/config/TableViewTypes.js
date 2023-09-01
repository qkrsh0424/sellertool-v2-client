import StaticValues from "./StaticValues";

const TableViewTypes = [
    {
        value: 'orderInfo',
        name: '주문정보',
        tableHeaders: StaticValues.ORDER_INFO_HEADERS
    },
    {
        value: 'receiverAndDeliveryInfo',
        name: '수취인 및 배송정보',
        tableHeaders: StaticValues.RECEIEVR_INFO_HEADERS
    },
    {
        value: 'matchingCodeAndManagementMemo',
        name: '관리메모',
        tableHeaders: StaticValues.MANAGEMENT_MEMO_HEADERS
    },
];

export default TableViewTypes;