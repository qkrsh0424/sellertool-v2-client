import { CustomNumberUtils } from "../../../../utils/CustomNumberUtils";

const customNumberUtils = CustomNumberUtils();

export const CalculateUtils = () => {
    return {
        getMarginResultForm: _getMarginResultForm,
        getPurchaseUnitPriceKRW: _getPurchaseUnitPriceKRW,
        getPurchaseUnitFreightCostKRW: _getPurchaseUnitFreightCostKRW,
        getPriceValueWithBaseExchangeRate: _getPriceValueWithBaseExchangeRate
    }
}

function _getMarginResultForm({
    marginRecordForm = null,
    mrPurchaseModuleForm = null,
    mrBaseExchangeRateList = []
}) {
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
        mrPurchaseModuleYn: marginRecordForm?.mrPurchaseModuleYn || 'n',
        mrPurchaseModuleId: marginRecordForm?.mrPurchaseModuleId || null,
        marketCommissionType: marginRecordForm?.marketCommissionType,
    }

    // 판매정보
    let salesPriceKRW = _getPriceValueWithBaseExchangeRate(form?.salesPrice, form?.salesPriceMberId, mrBaseExchangeRateList);
    let consumerDeliveryChargeKRW = _getPriceValueWithBaseExchangeRate(form?.consumerDeliveryCharge, form?.consumerDeliveryChargeMberId, mrBaseExchangeRateList);

    // 매입정보
    let purchaseUnitPriceKRW = 0;
    let purchaseUnitFreightCostKRW = 0;
    let sellerDeliveryChargeKRW = _getPriceValueWithBaseExchangeRate(form?.sellerDeliveryCharge, form?.sellerDeliveryChargeMberId, mrBaseExchangeRateList);
    // 매입모듈 사용
    if (form?.mrPurchaseModuleYn === 'y' && form?.mrPurchaseModuleId && mrPurchaseModuleForm) {
        purchaseUnitPriceKRW = _getPriceValueWithBaseExchangeRate(mrPurchaseModuleForm?.purchaseUnitPrice, mrPurchaseModuleForm?.purchaseUnitPriceMberId, mrBaseExchangeRateList);
        purchaseUnitFreightCostKRW = _getPriceValueWithBaseExchangeRate(mrPurchaseModuleForm?.purchaseUnitFreightCost, mrPurchaseModuleForm?.purchaseUnitFreightCostMberId, mrBaseExchangeRateList);
        // 일반형태로 계산
    } else {
        purchaseUnitPriceKRW = _getPriceValueWithBaseExchangeRate(form?.purchaseUnitPrice, form?.purchaseUnitPriceMberId, mrBaseExchangeRateList);
        purchaseUnitFreightCostKRW = _getPriceValueWithBaseExchangeRate(form?.purchaseUnitFreightCost, form?.purchaseUnitFreightCostMberId, mrBaseExchangeRateList);
    }

    // 수수료 및 기타비용
    let marketDefaultCommissionPriceKRW = salesPriceKRW * form?.marketDefaultCommission / 100;
    let marketLinkedCommissionPriceKRW = salesPriceKRW * form?.marketLinkedCommission / 100;
    let marketDeliveryCommissionPriceKRW = consumerDeliveryChargeKRW * form?.marketDeliveryCommission / 100;
    let marketingCostKRW = _getPriceValueWithBaseExchangeRate(form?.marketingCost, form?.marketingCostMberId, mrBaseExchangeRateList);
    let extraCostKRW = _getPriceValueWithBaseExchangeRate(form?.extraCost, form?.extraCostMberId, mrBaseExchangeRateList);


    let totalIncomeKRW = customNumberUtils.roundToDigit(salesPriceKRW + consumerDeliveryChargeKRW, 2);
    let totalExpenseKRW = customNumberUtils.roundToDigit(purchaseUnitPriceKRW + purchaseUnitFreightCostKRW + sellerDeliveryChargeKRW + marketDefaultCommissionPriceKRW + marketLinkedCommissionPriceKRW + marketDeliveryCommissionPriceKRW + marketingCostKRW + extraCostKRW, 2);
    let marginKRW = customNumberUtils.roundToDigit(totalIncomeKRW - totalExpenseKRW, 2);
    let marginRate = totalIncomeKRW <= 0 ? 0 : customNumberUtils.roundToDigit(marginKRW / totalIncomeKRW * 100, 2);

    let incomeTaxKRW = customNumberUtils.roundToDigit(totalIncomeKRW / 11, 2);
    let expenseTaxKRW = customNumberUtils.roundToDigit(totalExpenseKRW / 11, 2);
    let vatKRW = customNumberUtils.roundToDigit(incomeTaxKRW - expenseTaxKRW, 2);
    let marginAfterVatKRW = customNumberUtils.roundToDigit(marginKRW - vatKRW, 2);
    return {
        totalIncomeKRW: totalIncomeKRW,
        totalExpenseKRW: totalExpenseKRW,
        marginKRW: marginKRW,
        marginRate: marginRate,
        incomeTaxKRW: incomeTaxKRW,
        expenseTaxKRW: expenseTaxKRW,
        vatKRW: vatKRW,
        marginAfterVatKRW: marginAfterVatKRW
    };
}


function _getPurchaseUnitPriceKRW(formValues, mrBaseExchangeRateList) {
    let purchaseType = formValues?.purchaseType;
    let productUnitPrice = customNumberUtils.parseNumberToFloat({ value: formValues?.productUnitPrice, defaultValue: 0 });
    let productUnitPriceMberId = customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.productUnitPriceMberId);
    let totalProductQty = customNumberUtils.parseNumberToInt({ value: formValues?.totalProductQty, defaultValue: 1, min: 1 });
    let localFreightCost = customNumberUtils.parseNumberToFloat({ value: formValues?.localFreightCost, defaultValue: 0 });
    let localFreightCostMberId = customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.localFreightCostMberId);
    let extraCost = customNumberUtils.parseNumberToFloat({ value: formValues?.extraCost, defaultValue: 0 });
    let extraCostMberId = customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.extraCostMberId);
    let customsDutyRate = customNumberUtils.parseNumberToFloat({ value: formValues?.customsDutyRate, defaultValue: 0 });
    let customsTaxRate = customNumberUtils.parseNumberToFloat({ value: formValues?.customsTaxRate, defaultValue: 0 });

    let productUnitPriceWithBaseExchangeRate = _getPriceValueWithBaseExchangeRate(productUnitPrice, productUnitPriceMberId, mrBaseExchangeRateList);
    let localFreightCostWithBaseExchangeRate = _getPriceValueWithBaseExchangeRate(localFreightCost, localFreightCostMberId, mrBaseExchangeRateList);
    let extraCostWithBaseExchangeRate = _getPriceValueWithBaseExchangeRate(extraCost, extraCostMberId, mrBaseExchangeRateList);

    function calculateDomesticPurchaseUnitPriceKRW() {
        let costSum = productUnitPriceWithBaseExchangeRate * totalProductQty + extraCostWithBaseExchangeRate;
        return costSum / (totalProductQty || 1);
    }

    function calculateOverSeasPurchaseUnitPriceKRW() {
        let costSum = productUnitPriceWithBaseExchangeRate * totalProductQty + localFreightCostWithBaseExchangeRate + extraCostWithBaseExchangeRate;
        let customsDuty = costSum * customsDutyRate / 100;
        let customsTax = (costSum + customsDuty) * customsTaxRate / 100;

        let afterCustomsCostSum = costSum + customsDuty + customsTax;

        return afterCustomsCostSum / (totalProductQty || 1);
    }

    if (purchaseType === 'DOMESTIC') {
        return customNumberUtils.roundToDigit(calculateDomesticPurchaseUnitPriceKRW(), 6);
    }

    return customNumberUtils.roundToDigit(calculateOverSeasPurchaseUnitPriceKRW(), 6);
}

function _getPurchaseUnitFreightCostKRW(formValues, mrBaseExchangeRateList) {
    let purchaseType = formValues?.purchaseType;
    let totalOceanFreightCharge = customNumberUtils.parseNumberToFloat({ value: formValues?.totalOceanFreightCharge, defaultValue: 0 });
    let totalOceanFreightChargeMberId = customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.totalOceanFreightChargeMberId);
    let totalCBM = customNumberUtils.parseNumberToFloat({ value: formValues?.totalCBM, defaultValue: 0 });
    let productUnitCBM = customNumberUtils.parseNumberToFloat({ value: formValues?.productUnitCBM, defaultValue: 0 });
    let destinationFreightCost = customNumberUtils.parseNumberToFloat({ value: formValues?.destinationFreightCost, defaultValue: 0 });
    let destinationFreightCostMberId = customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.destinationFreightCostMberId);
    let coCharge = customNumberUtils.parseNumberToFloat({ value: formValues?.coCharge, defaultValue: 0 });
    let coChargeMberId = customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.coChargeMberId);

    let totalOceanFreightChargeKRW = _getPriceValueWithBaseExchangeRate(totalOceanFreightCharge, totalOceanFreightChargeMberId, mrBaseExchangeRateList);
    let destinationFreightCostKRW = _getPriceValueWithBaseExchangeRate(destinationFreightCost, destinationFreightCostMberId, mrBaseExchangeRateList);
    let coChargeKRW = _getPriceValueWithBaseExchangeRate(coCharge, coChargeMberId, mrBaseExchangeRateList);

    function calculateDomesticPurchaseUnitFreightCostKRW() {
        return totalOceanFreightChargeKRW;
    }

    function calculateOverSeasPurchaseUnitFreightCostKRW() {
        let totalFreightCostKRW = totalOceanFreightChargeKRW + destinationFreightCostKRW + coChargeKRW;

        if (totalCBM <= 0) {
            return totalFreightCostKRW;
        }

        let productProportion = productUnitCBM / totalCBM;

        let purchaseUnitFreightCostKRW = totalFreightCostKRW * productProportion;

        return purchaseUnitFreightCostKRW;
    }

    if (purchaseType === 'DOMESTIC') {
        return customNumberUtils.roundToDigit(calculateDomesticPurchaseUnitFreightCostKRW(), 6);
    }
    return customNumberUtils.roundToDigit(calculateOverSeasPurchaseUnitFreightCostKRW(), 6);
}

function _getPriceValueWithBaseExchangeRate(value, mberId, mrBaseExchangeRateList) {
    value = Number.parseFloat(value || 0);
    let baseExchangeRateValue = customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, mberId);
    value = value * baseExchangeRateValue;
    return value;
}