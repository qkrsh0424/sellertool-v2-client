import _ from "lodash";
import { useEffect, useState } from "react";
import { getRemovedPrefixZero, numberFormatUtils, roundToTwo } from "../../../../utils/numberFormatUtils";

const initialMarginRecordForm = {
    name: '',
    tag: '',
    salePrice: '',
    purchaseCost: '',
    consumerDeliveryCharge: '',
    sellerDeliveryCharge: '',
    purchaseDeliveryCharge: '',
    extraCost: '',
    commission: '',
    totalIncome: '',
    totalIncomeInterestExpense: '',
    totalExpense: '',
    margin: '',
    marginRate: '',
    incomeTax: '',
    expenseTax: '',
    totalTax: '',
    finalMargin: ''
};

export default function useMarginRecordFormHook(marginRecord) {
    const [marginRecordForm, setMarginRecordForm] = useState(initialMarginRecordForm);

    useEffect(() => {
        if (!marginRecord) {
            setMarginRecordForm(initialMarginRecordForm);
            return;
        }
        onSetMarginRecordForm();

    }, [marginRecord]);

    const onSetMarginRecordForm = () => {
        let currMarginRecord = _.cloneDeep(marginRecord);

        setMarginRecordForm({
            name: currMarginRecord.name,
            tag: currMarginRecord.tag,
            salePrice: currMarginRecord.salePrice,
            purchaseCost: currMarginRecord.purchaseCost,
            consumerDeliveryCharge: currMarginRecord.consumerDeliveryCharge,
            sellerDeliveryCharge: currMarginRecord.sellerDeliveryCharge,
            purchaseDeliveryCharge: currMarginRecord.purchaseDeliveryCharge,
            extraCost: currMarginRecord.extraCost,
            commission: currMarginRecord.commission,
            totalIncome: currMarginRecord.totalIncome,
            totalIncomeInterestExpense: currMarginRecord.totalIncomeInterestExpense,
            totalExpense: currMarginRecord.totalExpense,
            margin: currMarginRecord.margin,
            marginRate: currMarginRecord.marginRate,
            incomeTax: currMarginRecord.incomeTax,
            expenseTax: currMarginRecord.expenseTax,
            totalTax: currMarginRecord.totalTax
        })
    }

    const onChangeMarginRecordNumberValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            setMarginRecordForm({
                ...marginRecordForm,
                [name]: ''
            });
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnPriceValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (numberFormatUtils.isNumberValueWithDecimalPoint(value, 2)) {
            setMarginRecordForm({
                ...marginRecordForm,
                [name]: value || ''
            });
        }
    }

    const onChangeMarginRecordCommission = (e) => {
        let value = e.target.value;

        if (!value) {
            setMarginRecordForm({
                ...marginRecordForm,
                commission: ''
            });
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnCommissionValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (numberFormatUtils.isNumberValueWithDecimalPoint(value, 2)) {
            setMarginRecordForm({
                ...marginRecordForm,
                commission: value || ''
            });
        }
    }

    const onChangeMarginRecordTextValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setMarginRecordForm({
            ...marginRecordForm,
            [name]: value
        })
    }

    const onActionCalculateMargin = () => {
        let salePrice = 0;
        let purchaseCost = 0;
        let consumerDeliveryCharge = 0;
        let sellerDeliveryCharge = 0;
        let purchaseDeliveryCharge = 0;
        let extraCost = 0;
        let commission = 0;

        try {
            salePrice = parseFloat(returnPriceValueElseThrow(marginRecordForm.salePrice, '판매가격을 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)'));
            purchaseCost = parseFloat(returnPriceValueElseThrow(marginRecordForm.purchaseCost, '매입가격을 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)'));
            consumerDeliveryCharge = parseFloat(returnPriceValueElseThrow(marginRecordForm.consumerDeliveryCharge, '소비자 부담 운임비를 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)'));
            sellerDeliveryCharge = parseFloat(returnPriceValueElseThrow(marginRecordForm.sellerDeliveryCharge, '판매자 실질 부담 운임비를 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)'));
            purchaseDeliveryCharge = parseFloat(returnPriceValueElseThrow(marginRecordForm.purchaseDeliveryCharge, '매입 운임비를 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)'));
            extraCost = parseFloat(returnPriceValueElseThrow(marginRecordForm.extraCost, '기타비용을 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)'));
            commission = parseFloat(returnCommissionValueElseThrow(marginRecordForm.commission, '마켓 수수료를 정확히 입력해 주세요. (값 범위: 0 ~ 100)'));
        } catch (err) {
            throw new Error(err.message);
        }

        const totalIncome = setTotalIncome(); // 매출 총액
        const totalIncomeInterestExpense = setTotalIncomeInterestExpense(); // 수수료 비용
        const totalExpense = setTotalExpense(); // 매입 총 비용
        const margin = setMargin(); // 마진액
        const marginRate = setMarginRate(); // 마진율
        const incomeTax = setIncomeTax(); // 매출 부가세
        const expenseTax = setExpenseTax(); // 매입 부가세
        const totalTax = setTotalTax(); // 총 부가세
        const finalMargin = setFinalMargin();

        function setTotalIncome() {
            return salePrice + consumerDeliveryCharge;
        }

        function setTotalIncomeInterestExpense() {
            return totalIncome * commission * 0.01;
        }

        function setTotalExpense() {
            return purchaseCost + purchaseDeliveryCharge + sellerDeliveryCharge + extraCost + totalIncomeInterestExpense;
        }

        function setMargin() {
            return totalIncome - totalExpense;
        }

        function setMarginRate() {
            let bar = 0;
            if (totalIncome !== 0) {
                bar = margin / totalIncome * 100;
            }

            return bar;
        }

        function setIncomeTax() {
            return totalIncome - (totalIncome / 1.1);
        }

        function setExpenseTax() {
            return totalExpense - (totalExpense / 1.1);
        }

        function setTotalTax() {
            return incomeTax - expenseTax;
        }

        function setFinalMargin() {
            return margin - totalTax;
        }

        try {
            checkResultPriceValueFormatValid(totalIncome, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(totalIncomeInterestExpense, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(totalExpense, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(margin, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(marginRate, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(incomeTax, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(expenseTax, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(totalTax, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(finalMargin, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
        } catch (err) {
            throw new Error(err.message);
        }

        setMarginRecordForm({
            ...marginRecordForm,
            salePrice: roundToTwo(salePrice),
            consumerDeliveryCharge: roundToTwo(consumerDeliveryCharge),
            commission: roundToTwo(commission),
            purchaseCost: roundToTwo(purchaseCost),
            purchaseDeliveryCharge: roundToTwo(purchaseDeliveryCharge),
            sellerDeliveryCharge: roundToTwo(sellerDeliveryCharge),
            extraCost: roundToTwo(extraCost),
            totalIncome: roundToTwo(totalIncome),
            totalIncomeInterestExpense: roundToTwo(totalIncomeInterestExpense),
            totalExpense: roundToTwo(totalExpense),
            margin: roundToTwo(margin),
            marginRate: roundToTwo(marginRate),
            incomeTax: roundToTwo(incomeTax),
            expenseTax: roundToTwo(expenseTax),
            totalTax: roundToTwo(totalTax),
            finalMargin: roundToTwo(finalMargin)
        })
    }

    const onActionClearForm = () => {
        setMarginRecordForm(initialMarginRecordForm);
    }

    const checkNameValueFormatValid = () => {
        const name = marginRecordForm?.name;
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (name.search(spaceSearchRegex) !== -1) {
            throw new Error('레코드명을 정확히 입력해 주세요. 앞뒤 공백 없이 2-50자');
        }

        if (name.length < 2 || name.length > 50) {
            throw new Error('레코드명을 정확히 입력해 주세요. 앞뒤 공백 없이 2-50자');
        }
    }

    const checkTagValueFormatValid = () => {
        const tag = marginRecordForm?.tag;
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (!tag) {
            return;
        }

        if (tag.search(spaceSearchRegex) !== -1) {
            throw new Error('관리태그를 정확히 입력해 주세요. 앞뒤 공백 없이 2-50자');
        }

        if (tag.length < 0 || tag.length > 50) {
            throw new Error('관리태그를 정확히 입력해 주세요. 앞뒤 공백 없이 2-50자');
        }
    }

    const returnPriceValueElseThrow = (price, errorMessage) => {
        if (!price) {
            return 0;
        }

        if (price < 0 || price > 99999999999.99) { // 0.9e11
            throw new Error(errorMessage);
        }

        return price;
    }

    const returnCommissionValueElseThrow = (commission, errorMessage) => {
        if (!commission) {
            return 0;
        }

        if (commission < 0 || commission > 100) {
            throw new Error(errorMessage);
        }

        return commission;
    }

    const checkResultPriceValueFormatValid = (price, errorMessage) => {
        if (price < -999999999999.99 || price > 999999999999.99) { // 0.9e12
            throw new Error(errorMessage);
        }
    }

    return {
        marginRecordForm,
        onChangeMarginRecordNumberValueOfName,
        onChangeMarginRecordCommission,
        onChangeMarginRecordTextValueOfName,
        onActionCalculateMargin,
        onActionClearForm,
        checkNameValueFormatValid,
        checkTagValueFormatValid
    }
}