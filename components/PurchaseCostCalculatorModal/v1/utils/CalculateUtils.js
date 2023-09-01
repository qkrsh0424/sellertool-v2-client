import { CustomNumberUtils } from "../../../../utils/CustomNumberUtils";

const customNumberUtils = CustomNumberUtils();

export const CalculateUtils = () => {
    return {
        getPurchaseUnitPriceKRW: _getPurchaseUnitPriceKRW,
        getPurchaseUnitFreightCostKRW: _getPurchaseUnitFreightCostKRW,
        getPriceValueWithBaseExchangeRate: _getPriceValueWithBaseExchangeRate
    }
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