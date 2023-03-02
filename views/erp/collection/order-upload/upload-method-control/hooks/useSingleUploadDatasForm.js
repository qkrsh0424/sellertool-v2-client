import _ from "lodash";
import { useState } from "react";
import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
import { getRemovedPrefixZero } from "../../../../../../utils/numberFormatUtils";

export default function useSingleUploadDatasForm(props) {
    const [singleUploadDatasForm, setSingleUploadDatasForm] = useState([]);

    const onAddSingleUploadData = (data) => {
        setSingleUploadDatasForm([...singleUploadDatasForm?.concat(data)]);
    }

    const onDeleteSingleUploadData = (reqIndex) => {
        setSingleUploadDatasForm(singleUploadDatasForm?.filter((r, index) => index !== reqIndex));
    }

    const onCopySingleUploadData = (reqIndex) => {
        let targetData = singleUploadDatasForm?.find((r, index) => index === reqIndex);
        let newData = _.cloneDeep(targetData);
        newData = {
            ...newData,
            channelOrderDate: dateToYYYYMMDDhhmmss(new Date())
        }

        setSingleUploadDatasForm(singleUploadDatasForm?.slice(0, reqIndex + 1).concat(newData).concat(singleUploadDatasForm?.slice(reqIndex + 1, singleUploadDatasForm?.length)))
    }

    const onChangeOptionValueOfName = (e, reqIndex) => {
        let name = e.target.name;
        let value = e.target.value;

        setSingleUploadDatasForm(singleUploadDatasForm?.map((r, index) => {
            if (reqIndex === index) {
                return {
                    ...r,
                    [name]: value
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onChangeChannelOrderDate = (value, reqIndex) => {

        setSingleUploadDatasForm(singleUploadDatasForm?.map((r, index) => {
            if (reqIndex === index) {
                return {
                    ...r,
                    channelOrderDate: value
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onChangeChannelOrderDateAll = (value) => {
        setSingleUploadDatasForm(singleUploadDatasForm?.map((r, index) => {
            return {
                ...r,
                channelOrderDate: value
            }
        }))
    }

    const onChangeNumberValueOfName = (e, reqIndex) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            setSingleUploadDatasForm(singleUploadDatasForm?.map((r, index) => {
                if (index === reqIndex) {
                    return {
                        ...r,
                        [name]: ''
                    }
                } else {
                    return { ...r }
                }
            }))
            return;
        }

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,9}$/)) {
            setSingleUploadDatasForm(singleUploadDatasForm?.map((r, index) => {
                if (index === reqIndex) {
                    return {
                        ...r,
                        [name]: value
                    }
                } else {
                    return { ...r }
                }
            }))
        }
    }

    const checkSubmitFormatValid = () => {
        try {
            singleUploadDatasForm.forEach((data, index) => {
                HEADERS.forEach(header => {
                    header.checkValid(data[header.fieldName], index);
                })
            })
        } catch (err) {
            throw new Error(err.message);
        }
    }

    return {
        singleUploadDatasForm,
        onAddSingleUploadData,
        onDeleteSingleUploadData,
        onCopySingleUploadData,
        onChangeOptionValueOfName,
        onChangeChannelOrderDate,
        onChangeChannelOrderDateAll,
        onChangeNumberValueOfName,
        checkSubmitFormatValid,
    }
}

const HEADERS = [
    {
        fieldName: "channelOrderDate",
        headerName: "판매채널 주문일시",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'datetime',
        checkValid: (value, index) => {
            if (value && value.length > 20) {
                throw new Error(`${index + 1}행 : 판매채널 주문일시 형식을 다시 확인해 주세요. (yyyy-mm-dd HH:MM:SS)`);
            }
        }
    },
    {
        fieldName: "prodName",
        headerName: "상품명",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
        checkValid: (value, index) => {
            if (!value || value.length > 255) {
                throw new Error(`${index + 1}행 : 상품명은 1-255자 필수 입력입니다.`)
            }
        }
    },
    {
        fieldName: "optionName",
        headerName: "옵션정보",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
        checkValid: (value, index) => {
            if (!value || value.length > 255) {
                throw new Error(`${index + 1}행 : 옵션정보는 1-255자 필수 입력입니다.`)
            }
        }
    },
    {
        fieldName: "unit",
        headerName: "수량",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'number',
        checkValid: (value, index) => {
            if (!value || value < 1 || value > 9999) {
                throw new Error(`${index + 1}행 : 수량은 1-9999 필수 입력입니다.`)
            }
        }
    },
    {
        fieldName: "receiver",
        headerName: "수취인명",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
        checkValid: (value, index) => {
            if (!value || value.length > 40) {
                throw new Error(`${index + 1}행 : 수취인명은 1-40자 필수 입력입니다.`)
            }
        }
    },
    {
        fieldName: "receiverContact1",
        headerName: "전화번호1",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
        checkValid: (value, index) => {
            if (!value || value.length > 20) {
                throw new Error(`${index + 1}행 : 전화번호1은 1-20자 필수 입력입니다.`)
            }
        }
    },
    {
        fieldName: "receiverContact2",
        headerName: "전화번호2",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 20) {
                throw new Error(`${index + 1}행 : 전화번호2를 다시 확인해 주세요. 0-20자`);
            }
        }
    },
    {
        fieldName: "destination",
        headerName: "주소",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
        checkValid: (value, index) => {
            if (!value || value.length > 200) {
                throw new Error(`${index + 1}행 : 주소는 1-200자 필수 입력입니다.`)
            }
        }
    },
    {
        fieldName: "destinationDetail",
        headerName: "주소 상세",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 주소 상세를 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "salesChannel",
        headerName: "판매채널",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 40) {
                throw new Error(`${index + 1}행 : 판매채널을 다시 확인해 주세요. 0-40자`);
            }
        }
    },
    {
        fieldName: "orderNumber1",
        headerName: "주문번호1",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 36) {
                throw new Error(`${index + 1}행 : 주문번호1을 다시 확인해 주세요. 0-36자`);
            }
        }
    },
    {
        fieldName: "orderNumber2",
        headerName: "주문번호2",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 36) {
                throw new Error(`${index + 1}행 : 주문번호2를 다시 확인해 주세요. 0-36자`);
            }
        }
    },
    {
        fieldName: "channelProdCode",
        headerName: "상품코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 36) {
                throw new Error(`${index + 1}행 : 상품코드를 다시 확인해 주세요. 0-36자`);
            }
        }
    },
    {
        fieldName: "channelOptionCode",
        headerName: "옵션코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 36) {
                throw new Error(`${index + 1}행 : 옵션코드를 다시 확인해 주세요. 0-36자`);
            }
        }
    },
    {
        fieldName: "zipCode",
        headerName: "우편번호",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 10) {
                throw new Error(`${index + 1}행 : 우편번호를 다시 확인해 주세요. 0-10자`);
            }
        }
    },
    {
        fieldName: "courier",
        headerName: "택배사",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 40) {
                throw new Error(`${index + 1}행 : 택배사를 다시 확인해 주세요. 0-40자`);
            }
        }
    },
    {
        fieldName: "transportType",
        headerName: "배송방식",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 40) {
                throw new Error(`${index + 1}행 : 배송방식을 다시 확인해 주세요. 0-40자`);
            }
        }
    },
    {
        fieldName: "deliveryMessage",
        headerName: "배송메세지",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 배송메세지를 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "waybillNumber",
        headerName: "운송장번호",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 36) {
                throw new Error(`${index + 1}행 : 운송장번호를 다시 확인해 주세요. 0-36자`);
            }
        }
    },
    {
        fieldName: "price",
        headerName: "판매금액",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'number',
        checkValid: (value, index) => {
            if (!value || value < 0 || value > 999999999) {
                throw new Error(`${index + 1}행 : 판매금액을 다시 확인해 주세요. 값 범위 0-999999999`);
            }
        }
    },
    {
        fieldName: "deliveryCharge",
        headerName: "배송비",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'number',
        checkValid: (value, index) => {
            if (!value || value < 0 || value > 999999999) {
                throw new Error(`${index + 1}행 : 배송비를 다시 확인해 주세요. 값 범위 0-999999999`);
            }
        }
    },
    {
        fieldName: "barcode",
        headerName: "바코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 30) {
                throw new Error(`${index + 1}행 : 바코드를 다시 확인해 주세요. 0-30자`);
            }
        }
    },
    {
        fieldName: "prodCode",
        headerName: "[M] 상품코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 30) {
                throw new Error(`${index + 1}행 : [M] 상품코드를 다시 확인해 주세요. 0-30자`);
            }
        }
    },
    {
        fieldName: "optionCode",
        headerName: "[M] 옵션코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 20) {
                throw new Error(`${index + 1}행 : [M] 옵션코드를 다시 확인해 주세요. 0-20자`);
            }
        }
    },
    {
        fieldName: "releaseOptionCode",
        headerName: "[M] 출고옵션코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 20) {
                throw new Error(`${index + 1}행 : [M] 출고옵션코드를 다시 확인해 주세요. 0-20자`);
            }
        }
    },
    {
        fieldName: "releaseLocation",
        headerName: "[M] 출고지",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 100) {
                throw new Error(`${index + 1}행 : [M] 출고지를 다시 확인해 주세요. 0-100자`);
            }
        }
    },
    {
        fieldName: "managementMemo1",
        headerName: "관리메모1",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모1을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo2",
        headerName: "관리메모2",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모2을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo3",
        headerName: "관리메모3",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모3을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo4",
        headerName: "관리메모4",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모4을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo5",
        headerName: "관리메모5",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모5을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo6",
        headerName: "관리메모6",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모6을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo7",
        headerName: "관리메모7",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모7을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo8",
        headerName: "관리메모8",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모8을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo9",
        headerName: "관리메모9",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모9을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
    {
        fieldName: "managementMemo10",
        headerName: "관리메모10",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
        checkValid: (value, index) => {
            if (value && value.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모10을 다시 확인해 주세요. 0-200자`);
            }
        }
    },
];

const getInitialSingleUploadData = () => {
    return {
        channelOrderDate: dateToYYYYMMDDhhmmss(new Date()),
        prodName: "",
        optionName: "",
        unit: "0",
        receiver: "",
        receiverContact1: "",
        receiverContact2: "",
        destination: "",
        destinationDetail: "",
        salesChannel: "",
        orderNumber1: "",
        orderNumber2: "",
        channelProdCode: "",
        channelOptionCode: "",
        zipCode: "",
        courier: "",
        transportType: "",
        deliveryMessage: "",
        waybillNumber: "",
        price: "0",
        deliveryCharge: "0",
        barcode: "",
        prodCode: "",
        optionCode: "",
        releaseOptionCode: "",
        releaseLocation: "",
        managementMemo1: "",
        managementMemo2: "",
        managementMemo3: "",
        managementMemo4: "",
        managementMemo5: "",
        managementMemo6: "",
        managementMemo7: "",
        managementMemo8: "",
        managementMemo9: "",
        managementMemo10: "",
    }
}