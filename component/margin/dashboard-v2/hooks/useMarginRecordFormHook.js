import _ from "lodash";
import { useState } from "react";
import { getRemovedPrefixZero, roundToTwo } from "../../../../utils/numberFormatUtils";

export default function useMarginRecordFormHook(props) {
    const [marginRecordForm, setMarginRecordForm] = useState({
        name: '',
        salePrice: '0',
        purchaseCost: '0',
        consumerDeliveryCharge: '0',
        sellerDeliveryCharge: '0',
        purchaseDeliveryCharge: '0',
        extraCost: '0',
        commission: '0',
        totalIncome: '0',
        totalIncomeInterestExpense: '0',
        totalExpense: '0',
        margin: '0',
        marginRate: '0',
        incomeTax: '0',
        expenseTax: '0',
        totalTax: '0'
    });

    const onSetMarginRecordForm = (marginRecord) => {
        let currMarginRecord = _.cloneDeep(marginRecord);

        setMarginRecordForm({
            name: currMarginRecord.name,
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
        value = getRemovedPrefixZero(value);

        setMarginRecordForm({
            ...marginRecordForm,
            [name]: value || '0'
        });
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
        try {
            checkPriceValueFormatValid(marginRecordForm.salePrice, '판매가격을 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)');
            checkPriceValueFormatValid(marginRecordForm.purchaseCost, '매입가격을 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)');
            checkPriceValueFormatValid(marginRecordForm.consumerDeliveryCharge, '소비자 부담 운임비를 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)');
            checkPriceValueFormatValid(marginRecordForm.sellerDeliveryCharge, '판매자 실질 부담 운임비를 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)');
            checkPriceValueFormatValid(marginRecordForm.purchaseDeliveryCharge, '매입 운임비를 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)');
            checkPriceValueFormatValid(marginRecordForm.extraCost, '기타비용을 정확히 입력해 주세요. (값 범위: 0 ~ 99999999999.99)');
            checkCommissionValueFormatValid(marginRecordForm.commission, '마켓 수수료를 정확히 입력해 주세요. (값 범위: 0 ~ 100)');
        } catch (err) {
            throw new Error(err.message);
        }

        // 매출 총액
        let totalIncome = parseFloat(marginRecordForm.salePrice) + parseFloat(marginRecordForm.consumerDeliveryCharge);

        // 수수료 비용
        let totalIncomeInterestExpense = totalIncome * parseFloat(marginRecordForm.commission * 0.01);

        // 매입 총 비용
        let totalExpense = parseFloat(marginRecordForm.purchaseCost) + parseFloat(marginRecordForm.purchaseDeliveryCharge) + parseFloat(marginRecordForm.sellerDeliveryCharge) + parseFloat(marginRecordForm.extraCost) + totalIncomeInterestExpense;

        // 마진액
        let margin = totalIncome - totalExpense;

        // 마진율
        let marginRate = 0;
        if (totalIncome !== 0) {
            marginRate = margin / totalIncome * 100;
        }

        // 매출 부가세
        let incomeTax = totalIncome - (totalIncome / 1.1);

        // 매입 부가세
        let expenseTax = totalExpense - (totalExpense / 1.1);

        // 총 부가세
        let totalTax = incomeTax - expenseTax;

        try {
            checkResultPriceValueFormatValid(totalIncome, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(totalIncomeInterestExpense, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(totalExpense, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(margin, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(marginRate, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(incomeTax, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(expenseTax, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
            checkResultPriceValueFormatValid(totalTax, '유효하지 않는 계산식 입니다. 다시 입력해 주세요.');
        } catch (err) {
            throw new Error(err.message);
        }

        setMarginRecordForm({
            ...marginRecordForm,
            totalIncome: roundToTwo(totalIncome),
            totalIncomeInterestExpense: roundToTwo(totalIncomeInterestExpense),
            totalExpense: roundToTwo(totalExpense),
            margin: roundToTwo(margin),
            marginRate: roundToTwo(marginRate),
            incomeTax: roundToTwo(incomeTax),
            expenseTax: roundToTwo(expenseTax),
            totalTax: roundToTwo(totalTax)
        })
    }

    const onActionClearForm = () => {
        setMarginRecordForm({
            name: '',
            salePrice: '0',
            purchaseCost: '0',
            consumerDeliveryCharge: '0',
            sellerDeliveryCharge: '0',
            purchaseDeliveryCharge: '0',
            extraCost: '0',
            commission: '0',
            totalIncome: '0',
            totalIncomeInterestExpense: '0',
            totalExpense: '0',
            margin: '0',
            marginRate: '0',
            incomeTax: '0',
            expenseTax: '0',
            totalTax: '0'
        })
    }

    const checkNameValueFormatValid = (name) => {
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (name.search(spaceSearchRegex) !== -1) {
            throw new Error('상품명을 정확히 입력해 주세요. 앞뒤 공백 없이 2-50자');
        }

        if (name.length < 2 || name.length > 50) {
            throw new Error('상품명을 정확히 입력해 주세요. 앞뒤 공백 없이 2-50자');
        }
    }

    const checkPriceValueFormatValid = (price, errorMessage) => {
        if (price < 0 || price > 99999999999.99) { // 0.9e11
            throw new Error(errorMessage);
        }
    }

    const checkCommissionValueFormatValid = (commission, errorMessage) => {
        if (commission < 0 || commission > 100) {
            throw new Error(errorMessage);
        }
    }

    const checkResultPriceValueFormatValid = (price, errorMessage) => {
        if (price < -999999999999.99 || price > 999999999999.99) { // 0.9e12
            throw new Error(errorMessage);
        }
    }

    return {
        marginRecordForm,
        onSetMarginRecordForm,
        onChangeMarginRecordNumberValueOfName,
        onChangeMarginRecordTextValueOfName,
        onActionCalculateMargin,
        onActionClearForm,
        checkNameValueFormatValid
    }
}