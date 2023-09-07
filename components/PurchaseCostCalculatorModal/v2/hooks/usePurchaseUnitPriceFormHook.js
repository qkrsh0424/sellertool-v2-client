import { useState } from "react";
import { CustomNumberUtils } from "../../../../utils/CustomNumberUtils";

const customNumberUtils = CustomNumberUtils();

export function usePurchaseUnitPriceFormHook(props) {
    const [purchaseUnitPriceForm, setPurchaseUnitPriceForm] = useState({
        productUnitPrice: '',
        productUnitPriceMberId: "9e53a616-37f9-11ee-8d3c-06fe28321f8c",
        totalProductQty: '',
        localFreightCost: '',
        localFreightCostMberId: "9e53a616-37f9-11ee-8d3c-06fe28321f8c",
        extraCost: '',
        extraCostMberId: 2,
        customsDutyRate: '',
        customsTaxRate: '',
        purchaseUnitPriceKRW: '',
        purchaseUnitPriceMberId: 1
    });

    const onSetPurchaseUnitPriceForm = (value) => {
        setPurchaseUnitPriceForm(value)
    }

    const onInitializedSet = (selectedModule) => {
        onSetPurchaseUnitPriceForm({
            productUnitPrice: selectedModule?.productUnitPrice,
            productUnitPriceMberId: selectedModule?.productUnitPriceMberId,
            totalProductQty: selectedModule?.totalProductQty,
            localFreightCost: selectedModule?.localFreightCost,
            localFreightCostMberId: selectedModule?.localFreightCostMberId,
            extraCost: selectedModule?.extraCost,
            extraCostMberId: selectedModule?.extraCostMberId,
            customsDutyRate: selectedModule?.customsDutyRate,
            customsTaxRate: selectedModule?.customsTaxRate,
            purchaseUnitPriceKRW: selectedModule?.purchaseUnitPriceKRW,
            purchaseUnitPriceMberId: selectedModule?.purchaseUnitPriceMberId,
        })
    }

    const onChangeValueOfName = (name, value) => {
        setPurchaseUnitPriceForm({
            ...purchaseUnitPriceForm,
            [name]: value
        })
    }

    /**
     * 
     * @param {*} value 
     * @param {*} mberId MarginRecordBaseExchangeRateId
     * @param {*} baseExchangeRateList 
     * @returns 
     */
    const returnValueWithBaseExchangeRate = (value, mberId, baseExchangeRateList) => {
        value = Number.parseFloat(value || 0);
        let baseExchangeRateValue = customNumberUtils.returnExchangeRateValue(baseExchangeRateList, mberId);
        value = value * baseExchangeRateValue;
        return value;
    }

    return {
        purchaseUnitPriceForm,
        onSetPurchaseUnitPriceForm,
        onInitializedSet,
        onChangeValueOfName,
        returnValueWithBaseExchangeRate,
    }
}