import { useState } from "react";
import { CustomNumberUtils } from "../../../../utils/CustomNumberUtils";
import { CalculateUtils } from "../utils/CalculateUtils";

const returnPriceValueElseThrow = (price, errorMessage) => {
    if (!price) {
        return 0;
    }

    if (price < 0 || price > 99999999999) { // 0.9e11
        throw new Error(errorMessage);
    }

    return price;
}

const returnRateValueElseThrow = (value, errorMessage) => {
    if (!value) {
        return 0;
    }

    if (value < 0 || value > 100) {
        throw new Error(errorMessage);
    }

    return value;
}

const initialMarginRecordForm = {
    salesPrice: '', // 판매가격
    salesPriceMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
    consumerDeliveryCharge: '', // 배송비
    consumerDeliveryChargeMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
    purchaseUnitPrice: '', // 매입단가
    purchaseUnitPriceMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
    purchaseUnitFreightCost: '', // 매입운임비
    purchaseUnitFreightCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
    sellerDeliveryCharge: '', // 판매자 부담 운임비
    sellerDeliveryChargeMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
    marketDefaultCommission: '', // 마켓 기본수수료
    marketLinkedCommission: '', // 연동 수수료
    marketDeliveryCommission: '', // 배송비 수수료
    marketingCost: '', // 마케팅비용
    marketingCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
    extraCost: '', // 기타비용
    extraCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
    mrPurchaseModuleYn: 'n',
    mrPurchaseModuleId: null,
    marketCommissionType: 'ETC'
};

const initialResultForm = {
    totalIncomeKRW: '',
    totalExpenseKRW: '',
    marginKRW: '',
    marginRate: '',
    incomeTaxKRW: '',
    expenseTaxKRW: '',
    vatKRW: '',
    marginAfterVatKRW: ''
}

const marketCommissionList = [
    {
        name: '직접입력',
        value: 'ETC',
        marketDefaultCommission: '',
        marketLinkedCommission: '',
        marketDeliveryCommission: '',
    },
    {
        name: '스마트스토어',
        value: 'NAVER',
        marketDefaultCommission: '3.63',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.63',
    },
    {
        name: '쿠팡',
        value: 'COUPANG',
        marketDefaultCommission: '10.8',
        marketLinkedCommission: '',
        marketDeliveryCommission: '3.3',
    },
    {
        name: '옥션',
        value: 'AUCTION',
        marketDefaultCommission: '13',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.3',
    },
    {
        name: 'G마켓',
        value: 'GMARKET',
        marketDefaultCommission: '13',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.3',
    },
    {
        name: '11번가',
        value: '11ST',
        marketDefaultCommission: '13',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.3',
    },
]

const customNumberUtils = CustomNumberUtils();
const calculateUtils = CalculateUtils();


export function useMarginRecordFormHook() {
    const [marginRecordForm, setMarginRecordForm] = useState(null);
    const [resultForm, setResultForm] = useState(null);

    const onSetMarginRecordForm = (value) => {
        setMarginRecordForm(value);
    }

    const onSetBySelectedMarginRecord = (selectedMarginRecord) => {
        setMarginRecordForm({
            id: selectedMarginRecord?.id,
            name: selectedMarginRecord?.name,
            tag: selectedMarginRecord?.tag,
            salesPrice: selectedMarginRecord?.salesPrice,
            salesPriceMberId: selectedMarginRecord?.salesPriceMberId,
            consumerDeliveryCharge: selectedMarginRecord?.consumerDeliveryCharge,
            consumerDeliveryChargeMberId: selectedMarginRecord?.consumerDeliveryChargeMberId,
            purchaseUnitPrice: selectedMarginRecord?.purchaseUnitPrice,
            purchaseUnitPriceMberId: selectedMarginRecord?.purchaseUnitPriceMberId,
            purchaseUnitFreightCost: selectedMarginRecord?.purchaseUnitFreightCost,
            purchaseUnitFreightCostMberId: selectedMarginRecord?.purchaseUnitFreightCostMberId,
            sellerDeliveryCharge: selectedMarginRecord?.sellerDeliveryCharge,
            sellerDeliveryChargeMberId: selectedMarginRecord?.sellerDeliveryChargeMberId,
            marketDefaultCommission: selectedMarginRecord?.marketDefaultCommission,
            marketLinkedCommission: selectedMarginRecord?.marketLinkedCommission,
            marketDeliveryCommission: selectedMarginRecord?.marketDeliveryCommission,
            marketingCost: selectedMarginRecord?.marketingCost,
            marketingCostMberId: selectedMarginRecord?.marketingCostMberId,
            extraCost: selectedMarginRecord?.extraCost,
            extraCostMberId: selectedMarginRecord?.extraCostMberId,
            mrPurchaseModuleYn: selectedMarginRecord?.mrPurchaseModuleYn,
            mrPurchaseModuleId: selectedMarginRecord?.mrPurchaseModuleId,
            marketCommissionType: selectedMarginRecord?.marketCommissionType,
        })
    }

    const onSetResultForm = (value) => {
        setResultForm({ ...value });
    }

    const onChangeTextValueFromEvent = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setMarginRecordForm({
            ...marginRecordForm,
            [name]: value
        })
    }

    const onChangePriceValueFromEvent = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (!value) {
            setMarginRecordForm({
                ...marginRecordForm,
                [name]: value || ''
            });
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnPriceValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            setMarginRecordForm({
                ...marginRecordForm,
                [name]: value || ''
            });
        }
    }

    const onChangeRateValueFromEvent = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            setMarginRecordForm({
                ...marginRecordForm,
                [name]: value || ''
            });
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnRateValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            setMarginRecordForm({
                ...marginRecordForm,
                [name]: value || ''
            });
        }
    }

    const onChangeSelectedMarketCommissiomFromEvent = (e) => {
        let value = e.target.value;

        let marketCommission = marketCommissionList?.find(r => r.value === value);
        if (!marketCommission) {
            marketCommission = marketCommissionList[0].value;
            setMarginRecordForm({
                ...marginRecordForm,
                marketDefaultCommission: marketCommission?.marketDefaultCommission,
                marketLinkedCommission: marketCommission?.marketLinkedCommission,
                marketDeliveryCommission: marketCommission?.marketDeliveryCommission,
                marketCommissionType: marketCommission.value,
            })
            return;
        }

        setMarginRecordForm({
            ...marginRecordForm,
            marketDefaultCommission: marketCommission?.marketDefaultCommission,
            marketLinkedCommission: marketCommission?.marketLinkedCommission,
            marketDeliveryCommission: marketCommission?.marketDeliveryCommission,
            marketCommissionType: marketCommission.value,
        })
    }

    const onChangeYnValueFromEvent = (e) => {
        let name = e.target.name;
        let checked = e.target.checked;
        onSetMarginRecordForm({
            ...marginRecordForm,
            [name]: checked ? 'y' : 'n'
        })
    }

    const onChangeMrPurchaseModuleId = (mrPurchaseModule) => {
        onSetMarginRecordForm({
            ...marginRecordForm,
            mrPurchaseModuleId: mrPurchaseModule?.id
        })
    }

    const onActionClearForm = () => {
        setMarginRecordForm({
            ...initialMarginRecordForm,
            id: marginRecordForm?.id,
            name: marginRecordForm?.name,
            tag: marginRecordForm?.tag,
        });
        setResultForm(initialResultForm);
    }

    const returnBodyFormForSave = ({
        marginRecordForm,
        mrBaseExchangeRateList,
    }) => {
        if (marginRecordForm?.mrPurchaseModuleYn === 'y') {
            return {
                id: marginRecordForm?.id,
                name: marginRecordForm?.name?.trim()?.slice(0, 50),
                tag: marginRecordForm?.tag?.trim()?.slice(0, 50),
                salesPrice: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.salesPrice, defaultValue: 0, min: 0 }),
                salesPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.salesPriceMberId),
                consumerDeliveryCharge: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.consumerDeliveryCharge, defaultValue: 0, min: 0 }),
                consumerDeliveryChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.consumerDeliveryChargeMberId),
                purchaseUnitPrice: 0,
                purchaseUnitPriceMberId: mrBaseExchangeRateList[0]?.id,
                purchaseUnitFreightCost: 0,
                purchaseUnitFreightCostMberId: mrBaseExchangeRateList[0]?.id,
                sellerDeliveryCharge: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.sellerDeliveryCharge, defaultValue: 0, min: 0 }),
                sellerDeliveryChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.sellerDeliveryChargeMberId),
                marketDefaultCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketDefaultCommission, defaultValue: 0, min: 0 }),
                marketLinkedCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketLinkedCommission, defaultValue: 0, min: 0 }),
                marketDeliveryCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketDeliveryCommission, defaultValue: 0, min: 0 }),
                marketingCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketingCost, defaultValue: 0, min: 0 }),
                marketingCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.marketingCostMberId),
                extraCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.extraCost, defaultValue: 0, min: 0 }),
                extraCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.extraCostMberId),
                mrPurchaseModuleYn: 'y',
                mrPurchaseModuleId: marginRecordForm?.mrPurchaseModuleId,
                marketCommissionType: marginRecordForm?.marketCommissionType,
            }
        } else {
            return {
                id: marginRecordForm?.id,
                name: marginRecordForm?.name?.trim()?.slice(0, 50),
                tag: marginRecordForm?.tag?.trim()?.slice(0, 50),
                salesPrice: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.salesPrice, defaultValue: 0, min: 0 }),
                salesPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.salesPriceMberId),
                consumerDeliveryCharge: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.consumerDeliveryCharge, defaultValue: 0, min: 0 }),
                consumerDeliveryChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.consumerDeliveryChargeMberId),
                purchaseUnitPrice: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.purchaseUnitPrice, defaultValue: 0, min: 0 }),
                purchaseUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.purchaseUnitPriceMberId),
                purchaseUnitFreightCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.purchaseUnitFreightCost, defaultValue: 0, min: 0 }),
                purchaseUnitFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.purchaseUnitFreightCostMberId),
                sellerDeliveryCharge: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.sellerDeliveryCharge, defaultValue: 0, min: 0 }),
                sellerDeliveryChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.sellerDeliveryChargeMberId),
                marketDefaultCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketDefaultCommission, defaultValue: 0, min: 0 }),
                marketLinkedCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketLinkedCommission, defaultValue: 0, min: 0 }),
                marketDeliveryCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketDeliveryCommission, defaultValue: 0, min: 0 }),
                marketingCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketingCost, defaultValue: 0, min: 0 }),
                marketingCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.marketingCostMberId),
                extraCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.extraCost, defaultValue: 0, min: 0 }),
                extraCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.extraCostMberId),
                mrPurchaseModuleYn: 'n',
                mrPurchaseModuleId: null,
                marketCommissionType: marginRecordForm?.marketCommissionType,
            }
        }
    }

    return {
        marginRecordForm,
        resultForm,
        marketCommissionList,
        onSetMarginRecordForm,
        onSetBySelectedMarginRecord,
        onSetResultForm,
        onChangeTextValueFromEvent,
        onChangePriceValueFromEvent,
        onChangeRateValueFromEvent,
        onChangeSelectedMarketCommissiomFromEvent,
        onChangeYnValueFromEvent,
        onActionClearForm,
        onChangeMrPurchaseModuleId,
        returnBodyFormForSave
    }
}