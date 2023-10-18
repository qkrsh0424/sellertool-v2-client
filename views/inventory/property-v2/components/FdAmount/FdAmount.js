import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import { St } from "./FdAmount.styled";

const customNumberUtils = CustomNumberUtils();

export function FdAmount({
    inventoryAssetAmount
}) {
    const remainedAssetsAmount = inventoryAssetAmount?.remainedAssetsAmount ? inventoryAssetAmount?.remainedAssetsAmount : 0;
    const estimatedSalesAmount = inventoryAssetAmount?.estimatedSalesAmount ? inventoryAssetAmount?.estimatedSalesAmount : 0;
    const totalRemainedQuantityAmount = inventoryAssetAmount?.totalRemainedQuantityAmount ? inventoryAssetAmount?.totalRemainedQuantityAmount : 0;
    return (
        <>
            <St.Container>
                <St.CardItemWrapper>
                    <div className='card'>
                        <label>
                            총 재고자산
                        </label>
                        <div className='amount'>{customNumberUtils.toPriceUnitFormat(remainedAssetsAmount)}</div>
                    </div>
                    <div className='card'>
                        <label>
                            총 예상 매출액
                        </label>
                        <div className='amount'>{customNumberUtils.toPriceUnitFormat(estimatedSalesAmount)}</div>
                    </div>
                    <div className='card'>
                        <label>
                            총 재고수량
                        </label>
                        <div className='amount'>{totalRemainedQuantityAmount} 개</div>
                    </div>
                </St.CardItemWrapper>
            </St.Container>
        </>
    );
}