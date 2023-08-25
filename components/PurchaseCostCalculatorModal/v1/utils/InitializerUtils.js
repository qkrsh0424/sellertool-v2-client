export const InitializerUtils = () => {
    return {
        initFdCalculatorFormValues: _initFdCalculatorFormValues
    }
}

function _initFdCalculatorFormValues(MrPurchaseModule) {
    return {
        purchaseType: MrPurchaseModule?.purchaseType, // 매입방식
        productUnitPrice: MrPurchaseModule?.productUnitPrice, // 제품단가
        productUnitPriceMberId: MrPurchaseModule?.productUnitPriceMberId, // 제품단가 기준환율
        totalProductQty: MrPurchaseModule?.totalProductQty, // 제품 총 수량
        localFreightCost: MrPurchaseModule?.localFreightCost, // 출발지 운임비
        localFreightCostMberId: MrPurchaseModule?.localFreightCostMberId, // 출발지 운임비 기준환율
        extraCost: MrPurchaseModule?.extraCost, // 기타비용
        extraCostMberId: MrPurchaseModule?.extraCostMberId, // 기타비용 기준환율
        customsDutyRate: MrPurchaseModule?.customsDutyRate, // 관세
        customsTaxRate: MrPurchaseModule?.customsTaxRate, // 관부가세
        totalOceanFreightCharge: MrPurchaseModule?.totalOceanFreightCharge, // 총 선적 비용
        totalOceanFreightChargeMberId: MrPurchaseModule?.totalOceanFreightChargeMberId, // 총 선적 비용 기준환율
        totalCBM: MrPurchaseModule?.totalCBM, // 총 선적 CBM
        productUnitCBM: MrPurchaseModule?.productUnitCBM, // 제품 개당 CBM
        destinationFreightCost: MrPurchaseModule?.destinationFreightCost, // 도착지 운임비
        destinationFreightCostMberId: MrPurchaseModule?.destinationFreightCostMberId, // 도착지 운임비 기준환율
        coCharge:MrPurchaseModule?.coCharge, // CO 비용
        coChargeMberId:MrPurchaseModule?.coChargeMberId, // CO 비용 기준환율
        purchaseUnitPriceMberId: MrPurchaseModule?.purchaseUnitPriceMberId, // 매입단가 기준환율
        purchaseUnitFreightCostMberId: MrPurchaseModule?.purchaseUnitFreightCostMberId, // 매입운임비 기준환율
    }
}