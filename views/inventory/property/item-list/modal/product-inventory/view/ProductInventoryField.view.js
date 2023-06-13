import { toPriceUnitFormat } from "../../../../../../../utils/numberFormatUtils";
import CustomImage from "../../../../../../modules/image/CustomImage";
import { TextWrapper, Wrapper } from "../style/ProductInventory.styled";

export default function ProductInventoryFieldView({
    product,
    productInventorySum
}) {
    return (
        <Wrapper>
            <div className='thumbnail-figure'>
                <CustomImage
                    src={product?.thumbnailUri}
                />
            </div>
            <TextWrapper>
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <span style={{ color: 'var(--mainColor)' }}>{product?.name}</span> [{product?.productTag || '태그 미지정'}]
                </div>
                <div>
                    <div className='text-box'>
                        <div>총 재고자산 : </div>
                        <div>{toPriceUnitFormat(productInventorySum?.propertyPriceSum ?? 0)}</div>
                    </div>
                    <div className='text-box'>
                        <div>총 재고수량 : </div>
                        <div>{productInventorySum?.stockUnitSum ?? 0} 개</div>
                    </div>
                    <div className='text-box'>
                        <div>총 예상매출액 : </div>
                        <div>{toPriceUnitFormat(productInventorySum?.estimatedSalesPrice ?? 0)}</div>
                    </div>
                </div>
            </TextWrapper>
        </Wrapper>
    )
}