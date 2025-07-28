import { useState } from "react"
import { getRemovedPrefixZero } from "../../../../../../utils/numberFormatUtils";

export function useBulkUpdateErpItemsFormList(initialValue) {
    const [bulkUpdateErpItemsFormList, setBulkUpdateErpItemsFormList] = useState(initialValue || null);

    const onSetBulkUpdateErpItemsFormList = (values) => {
        setBulkUpdateErpItemsFormList(values);
    }

    const onChangeValueOfName = (e, erpItemId) => {
        let name = e.target.name;
        let value = e.target.value;

        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList.map(r => {
            if (r.id === erpItemId) {
                return {
                    ...r,
                    [name]: value
                }
            }
            return {
                ...r
            }
        }))
    }

    const onChangeNumberValueOfName = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
                if (r.id === id) {
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
            onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
                if (r.id === id) {
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

    const onChangeOptionCode = (erpItemId, optionCode) => {
        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
            if (r.id === erpItemId) {
                return {
                    ...r,
                    optionCode: optionCode,
                    releaseOptionCode: optionCode
                }
            }

            return {
                ...r
            }
        }))
    }

    const onChangeReleaseOptionCode = (erpItemId, optionCode) => {
        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
            if (r.id === erpItemId) {
                return {
                    ...r,
                    releaseOptionCode: optionCode
                }
            }

            return {
                ...r
            }
        }))
    }

    const onChangeOptionCodeAll = (optionCode) => {
        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
            return {
                ...r,
                optionCode: optionCode,
                releaseOptionCode: optionCode
            }
        }))
    }

    const onChangeReleaseOptionCodeAll = (optionCode) => {
        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
            return {
                ...r,
                releaseOptionCode: optionCode
            }
        }))
    }

    const onChangeChannelOrderDate = (erpItemId, channelOrderDate) => {
        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
            if (r.id === erpItemId) {
                return {
                    ...r,
                    channelOrderDate: channelOrderDate
                }
            }

            return {
                ...r
            }
        }))
    }

    const onChangeChannelOrderDateAll = (channelOrderDate) => {
        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
            return {
                ...r,
                channelOrderDate: channelOrderDate
            }
        }))
    }

    const onChangeFieldNameAll = (value, fieldName) => {
        onSetBulkUpdateErpItemsFormList(bulkUpdateErpItemsFormList?.map(r => {
            return {
                ...r,
                [fieldName]: value
            }
        }))
    }

    const onDelete = (erpItemId) => {
        onSetBulkUpdateErpItemsFormList(
            bulkUpdateErpItemsFormList?.filter(r => r?.id !== erpItemId)
        );
    }

    const returnSubmitForm = () => {
        return bulkUpdateErpItemsFormList.map(r => {
            return {
                ...r,
                prodCode: r?.prodCode ? r?.prodCode?.trim() : '',
                optionCode: r?.optionCode ? r?.optionCode?.trim() : '',
                releaseOptionCode: r?.releaseOptionCode ? r?.releaseOptionCode?.trim() : '',
                prodName: r?.prodName ? r?.prodName?.trim() : '',
                optionName: r?.optionName ? r?.optionName?.trim() : '',
                unit: (!r?.unit || r?.unit < 0) ? 0 : r?.unit,
                salesChannel: r?.salesChannel ? r?.salesChannel?.trim() : '',
                orderNumber1: r?.orderNumber1 ? r?.orderNumber1?.trim() : '',
                orderNumber2: r?.orderNumber2 ? r?.orderNumber2?.trim() : '',
                channelProdCode: r?.channelProdCode ? r?.channelProdCode?.trim() : '',
                channelOptionCode: r?.channelOptionCode ? r?.channelOptionCode?.trim() : '',
                price: (!r?.price || r?.price < 0) ? 0 : r?.price,
                deliveryCharge: (!r?.deliveryCharge || r?.deliveryCharge < 0) ? 0 : r?.deliveryCharge,
                barcode: r?.barcode ? r?.barcode?.trim() : '',
                receiver: r?.receiver ? r?.receiver?.trim() : '',
                receiverContact1: r?.receiverContact1 ? r?.receiverContact1?.trim() : '',
                receiverContact2: r?.receiverContact2 ? r?.receiverContact2?.trim() : '',
                destination: r?.destination ? r?.destination?.trim() : '',
                destinationDetail: r?.destinationDetail ? r?.destinationDetail?.trim() : '',
                zipCode: r?.zipCode ? r?.zipCode?.trim() : '',
                courier: r?.courier ? r?.courier?.trim() : '',
                transportType: r?.transportType ? r?.transportType?.trim() : '',
                deliveryMessage: r?.deliveryMessage ? r?.deliveryMessage?.trim() : '',
                waybillNumber: r?.waybillNumber ? r?.waybillNumber?.trim() : '',
                extraWaybillNumbers: r?.extraWaybillNumbers ? r?.extraWaybillNumbers?.trim() : '',
                managementMemo1: r?.managementMemo1 ? r?.managementMemo1?.trim() : '',
                managementMemo2: r?.managementMemo2 ? r?.managementMemo2?.trim() : '',
                managementMemo3: r?.managementMemo3 ? r?.managementMemo3?.trim() : '',
                managementMemo4: r?.managementMemo4 ? r?.managementMemo4?.trim() : '',
                managementMemo5: r?.managementMemo5 ? r?.managementMemo5?.trim() : '',
                managementMemo6: r?.managementMemo6 ? r?.managementMemo6?.trim() : '',
                managementMemo7: r?.managementMemo7 ? r?.managementMemo7?.trim() : '',
                managementMemo8: r?.managementMemo8 ? r?.managementMemo8?.trim() : '',
                managementMemo9: r?.managementMemo9 ? r?.managementMemo9?.trim() : '',
                managementMemo10: r?.managementMemo10 ? r?.managementMemo10?.trim() : '',
            }
        })
    }

    const checkSubmitFormatValid = (body) => {
        body?.forEach((r, index) => {
            if (r?.prodCode?.length > 20) {
                throw new Error(`${index + 1}행 : 상품코드는 20자 이내로 입력해주세요.`);
            }
            if (r?.optionCode?.length > 20) {
                throw new Error(`${index + 1}행 : 옵션코드는 20자 이내로 입력해주세요.`);
            }
            if (r?.releaseOptionCode?.length > 20) {
                throw new Error(`${index + 1}행 : 출고옵션코드는 20자 이내로 입력해주세요.`);
            }
            if (r?.prodName?.length > 300) {
                throw new Error(`${index + 1}행 : 상품명은 300자 이내로 입력해 주세요.`);
            }
            if (r?.optionName?.length > 300) {
                throw new Error(`${index + 1}행 : 옵션명은 300자 이내로 입력해 주세요.`);
            }
            if (r?.unit < 0 || r?.unit > 9999) {
                throw new Error(`${index + 1}행 : 수량은 0-9999로 입력해 주세요.`);
            }
            if (r?.salesChannel?.length > 40) {
                throw new Error(`${index + 1}행 : 판매채널은 40자 이내로 입력해 주세요.`);
            }
            if (r?.orderNumber1?.length > 36) {
                throw new Error(`${index + 1}행 : 주문번호1은 36자 이내로 입력해 주세요.`);
            }
            if (r?.orderNumber2?.length > 36) {
                throw new Error(`${index + 1}행 : 주문번호2는 36자 이내로 입력해 주세요.`);
            }
            if (r?.channelProdCode?.length > 36) {
                throw new Error(`${index + 1}행 : 상품코드는 36자 이내로 입력해 주세요.`);
            }
            if (r?.channelOptionCode?.length > 36) {
                throw new Error(`${index + 1}행 : 옵션코드는 36자 이내로 입력해 주세요.`);
            }
            if (r?.price < 0 || r?.price > 999999999) {
                throw new Error(`${index + 1}행 : 가격은 0-999999999 이내로 입력해 주세요.`);
            }
            if (r?.deliveryCharge < 0 || r?.deliveryCharge > 999999999) {
                throw new Error(`${index + 1}행 : 배송비는 0-999999999 이내로 입력해 주세요.`);
            }
            if (r?.barcode?.length > 30) {
                throw new Error(`${index + 1}행 : 바코드는 30자 이내로 입력해 주세요.`);
            }
            if (r?.receiver?.length > 40) {
                throw new Error(`${index + 1}행 : 수취인명은 40자 이내로 입력해 주세요.`);
            }
            if (r?.receiverContact1?.length > 20) {
                throw new Error(`${index + 1}행 : 전화번호1은 20자 이내로 입력해 주세요.`);
            }
            if (r?.receiverContact2?.length > 20) {
                throw new Error(`${index + 1}행 : 전화번호2는 20자 이내로 입력해 주세요.`);
            }
            if (r?.destination?.length > 200) {
                throw new Error(`${index + 1}행 : 주소는 200자 이내로 입력해 주세요.`);
            }
            if (r?.destinationDetail?.length > 200) {
                throw new Error(`${index + 1}행 : 주소상세는 40자 이내로 입력해 주세요.`);
            }
            if (r?.zipCode?.length > 10) {
                throw new Error(`${index + 1}행 : 우편번호는 10자 이내로 입력해 주세요.`);
            }
            if (r?.courier?.length > 40) {
                throw new Error(`${index + 1}행 : 택배사는 40자 이내로 입력해 주세요.`);
            }
            if (r?.transportType?.length > 45) {
                throw new Error(`${index + 1}행 : 배송방식은 45자 이내로 입력해 주세요.`);
            }
            if (r?.deliveryMessage?.length > 200) {
                throw new Error(`${index + 1}행 : 배송메세지는 200자 이내로 입력해 주세요.`);
            }
            if (r?.waybillNumber?.length > 30) {
                throw new Error(`${index + 1}행 : 운송장번호는 30자 이내로 입력해 주세요.`);
            }
            if (r?.extraWaybillNumbers?.length > 2000) {
                throw new Error(`${index + 1}행 : 기타운송장번호는 2000자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo1?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모1은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo2?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모2은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo3?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모3은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo4?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모4은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo5?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모5은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo6?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모6은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo7?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모7은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo8?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모8은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo9?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모9은 200자 이내로 입력해 주세요.`);
            }
            if (r?.managementMemo10?.length > 200) {
                throw new Error(`${index + 1}행 : 관리메모10은 200자 이내로 입력해 주세요.`);
            }
        })
    }

    return {
        bulkUpdateErpItemsFormList,
        onSetBulkUpdateErpItemsFormList,
        onChangeValueOfName,
        onChangeNumberValueOfName,
        onChangeOptionCode,
        onChangeReleaseOptionCode,
        onChangeOptionCodeAll,
        onChangeReleaseOptionCodeAll,
        onChangeChannelOrderDate,
        onChangeChannelOrderDateAll,
        onChangeFieldNameAll,
        onDelete,
        returnSubmitForm,
        checkSubmitFormatValid
    }
}