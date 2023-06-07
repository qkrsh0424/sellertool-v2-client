import { toPriceUnitFormat } from "../../../../../utils/numberFormatUtils";
import { Wrapper } from "../style/TotalStockText.styled";

export default function TotalStockTextFieldView ({
    selectedProductOptionsInventorySum
}) {
    return (
        <Wrapper>
            <div className='text-box'>
                <div>총 재고 수량 : </div>
                <div className='accent'>{selectedProductOptionsInventorySum?.stockUnitSum ?? 0} 개</div>
            </div>
            <div className='text-box'>
                <div>총 재고 자산 : </div>
                <div className='accent'>{toPriceUnitFormat(selectedProductOptionsInventorySum?.propertyPriceSum ?? 0)}</div>
            </div>
            <div className='text-box'>
                <div>총 예상 매출액 : </div>
                <div className='accent'>{toPriceUnitFormat(selectedProductOptionsInventorySum?.estimatedSalesPrice ?? 0)}</div>
            </div>
        </Wrapper>
    )
}