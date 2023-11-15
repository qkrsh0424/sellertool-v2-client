import CustomImage from "../../../../../../components/image/CustomImage";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import { St } from "./FdItemList.styled";

export function FdItemList({
    stockReceiveItemList
}) {
    return (
        <>
            <St.CardListContainer>
                <div className="wrapper">
                    {stockReceiveItemList?.map(stockReceiveItem => {
                        return (
                            <div key={stockReceiveItem?.id} className='cardItem'>
                                <div className='image-figure'>
                                    <CustomImage
                                        src={stockReceiveItem?.productThumbnailUri}
                                    />
                                </div>
                                <div className='contents'>
                                    <div className='information'>
                                        <div>
                                            {stockReceiveItem?.productName} [{stockReceiveItem?.productTag}]
                                        </div>
                                        <div>
                                            {stockReceiveItem?.productOptionName} [{stockReceiveItem?.productOptionTag}]
                                        </div>
                                        <div>
                                            <div>
                                                {stockReceiveItem?.productOptionCode}
                                            </div>
                                            <div>재고수량: 9999</div>
                                        </div>
                                    </div>
                                    <div className='form-items'>
                                        <div>
                                            <CustomInput
                                                placeholder={'입고수량'}
                                            />
                                            <CustomInput
                                                placeholder={'매입단가'}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder={'메모'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </St.CardListContainer>
        </>
    );
}