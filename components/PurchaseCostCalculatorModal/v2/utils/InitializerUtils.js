export const InitializerUtils = () => {
    return {
        initFdCalculatorFormValues: _initFdCalculatorFormValues
    }
}

function _initFdCalculatorFormValues(MrPurchaseModule) {
    return {
        purchaseUnitPrice: '',
        purchaseUnitPriceMberId: '',
        purchaseUnitFreightCost: '',
        purchaseUnitFreightCostMberId: '',
        sellerDeliveryCharge: '',
        sellerDeliveryChargeMberId: ''
    }
}