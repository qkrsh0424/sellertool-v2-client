import { useState } from "react";
import { numberFormatUtils, roundToTwo } from "../../../../utils/numberFormatUtils";
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
        value: 'etc',
        marketDefaultCommission: '',
        marketLinkedCommission: '',
        marketDeliveryCommission: '',
    },
    {
        name: '스마트스토어',
        value: 'naver',
        marketDefaultCommission: '3.63',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.63',
    },
    {
        name: '쿠팡',
        value: 'coupang',
        marketDefaultCommission: '10.8',
        marketLinkedCommission: '',
        marketDeliveryCommission: '3.3',
    },
    {
        name: '옥션',
        value: 'auction',
        marketDefaultCommission: '13',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.3',
    },
    {
        name: 'G마켓',
        value: 'gmarket',
        marketDefaultCommission: '13',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.3',
    },
    {
        name: '11번가',
        value: '11st',
        marketDefaultCommission: '13',
        marketLinkedCommission: '2',
        marketDeliveryCommission: '3.3',
    },
]

const customNumberUtils = CustomNumberUtils();
const calculateUtils = CalculateUtils();


export function useMarginRecordFormHook() {
    const [marginRecordForm, setMarginRecordForm] = useState(initialMarginRecordForm);
    const [resultForm, setResultForm] = useState(initialResultForm);
    const [selectedMarketCommission, setSelectedMarketCommission] = useState(marketCommissionList[0]);

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
            setSelectedMarketCommission(marketCommissionList[0]);
            return;
        }

        setMarginRecordForm({
            ...marginRecordForm,
            marketDefaultCommission: marketCommission?.marketDefaultCommission,
            marketLinkedCommission: marketCommission?.marketLinkedCommission,
            marketDeliveryCommission: marketCommission?.marketDeliveryCommission
        })
        setSelectedMarketCommission(marketCommission);

    }

    const onActionClearForm = () => {
        setMarginRecordForm(initialMarginRecordForm);
        setResultForm(initialResultForm);
    }

    const onCalculateAndSetResultForm = (mrBaseExchangeRateList) => {
        let form = {
            salesPrice: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.salesPrice, defaultValue: 0 }),
            salesPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.salesPriceMberId),
            consumerDeliveryCharge: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.consumerDeliveryCharge, defaultValue: 0 }),
            consumerDeliveryChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.consumerDeliveryChargeMberId),
            purchaseUnitPrice: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.purchaseUnitPrice, defaultValue: 0 }),
            purchaseUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.purchaseUnitPriceMberId),
            purchaseUnitFreightCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.purchaseUnitFreightCost, defaultValue: 0 }),
            purchaseUnitFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.purchaseUnitFreightCostMberId),
            sellerDeliveryCharge: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.sellerDeliveryCharge, defaultValue: 0 }),
            sellerDeliveryChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.sellerDeliveryChargeMberId),
            marketDefaultCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketDefaultCommission, defaultValue: 0 }),
            marketLinkedCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketLinkedCommission, defaultValue: 0 }),
            marketDeliveryCommission: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketDeliveryCommission, defaultValue: 0 }),
            marketingCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.marketingCost, defaultValue: 0 }),
            marketingCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.marketingCostMberId),
            extraCost: customNumberUtils.parseNumberToFloat({ value: marginRecordForm?.extraCost, defaultValue: 0 }),
            extraCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, marginRecordForm?.extraCostMberId),
        }

        // 판매정보
        let salesPriceKRW = calculateUtils.getPriceValueWithBaseExchangeRate(form?.salesPrice, form?.salesPriceMberId, mrBaseExchangeRateList);
        let consumerDeliveryChargeKRW = calculateUtils.getPriceValueWithBaseExchangeRate(form?.consumerDeliveryCharge, form?.consumerDeliveryChargeMberId, mrBaseExchangeRateList);

        // 매입정보
        let purchaseUnitPriceKRW = calculateUtils.getPriceValueWithBaseExchangeRate(form?.purchaseUnitPrice, form?.purchaseUnitPriceMberId, mrBaseExchangeRateList);
        let purchaseUnitFreightCostKRW = calculateUtils.getPriceValueWithBaseExchangeRate(form?.purchaseUnitFreightCost, form?.purchaseUnitFreightCostMberId, mrBaseExchangeRateList);
        let sellerDeliveryChargeKRW = calculateUtils.getPriceValueWithBaseExchangeRate(form?.sellerDeliveryCharge, form?.sellerDeliveryChargeMberId, mrBaseExchangeRateList);

        // 수수료 및 기타비용
        let marketDefaultCommissionPriceKRW = salesPriceKRW * form?.marketDefaultCommission / 100;
        let marketLinkedCommissionPriceKRW = salesPriceKRW * form?.marketLinkedCommission / 100;
        let marketDeliveryCommissionPriceKRW = consumerDeliveryChargeKRW * form?.marketDeliveryCommission / 100;
        let marketingCostKRW = calculateUtils.getPriceValueWithBaseExchangeRate(form?.marketingCost, form?.marketingCostMberId, mrBaseExchangeRateList);
        let extraCostKRW = calculateUtils.getPriceValueWithBaseExchangeRate(form?.extraCost, form?.extraCostMberId, mrBaseExchangeRateList);


        let totalIncomeKRW = customNumberUtils.roundToDigit(salesPriceKRW + consumerDeliveryChargeKRW, 2);
        let totalExpenseKRW = customNumberUtils.roundToDigit(purchaseUnitPriceKRW + purchaseUnitFreightCostKRW + sellerDeliveryChargeKRW + marketDefaultCommissionPriceKRW + marketLinkedCommissionPriceKRW + marketDeliveryCommissionPriceKRW + marketingCostKRW + extraCostKRW, 2);
        let marginKRW = customNumberUtils.roundToDigit(totalIncomeKRW - totalExpenseKRW, 2);
        let marginRate = customNumberUtils.roundToDigit(marginKRW / totalIncomeKRW * 100, 2);

        let incomeTaxKRW = customNumberUtils.roundToDigit(totalIncomeKRW / 11, 2);
        let expenseTaxKRW = customNumberUtils.roundToDigit(totalExpenseKRW / 11, 2);
        let vatKRW = customNumberUtils.roundToDigit(incomeTaxKRW - expenseTaxKRW, 2);
        let marginAfterVatKRW = customNumberUtils.roundToDigit(marginKRW - vatKRW, 2);
        setResultForm({
            totalIncomeKRW: totalIncomeKRW,
            totalExpenseKRW: totalExpenseKRW,
            marginKRW: marginKRW,
            marginRate: marginRate,
            incomeTaxKRW: incomeTaxKRW,
            expenseTaxKRW: expenseTaxKRW,
            vatKRW: vatKRW,
            marginAfterVatKRW: marginAfterVatKRW
        })
    }

    return {
        marginRecordForm,
        resultForm,
        marketCommissionList,
        selectedMarketCommission,
        onChangePriceValueFromEvent,
        onChangeRateValueFromEvent,
        onChangeSelectedMarketCommissiomFromEvent,
        onActionClearForm,
        onCalculateAndSetResultForm
    }
}