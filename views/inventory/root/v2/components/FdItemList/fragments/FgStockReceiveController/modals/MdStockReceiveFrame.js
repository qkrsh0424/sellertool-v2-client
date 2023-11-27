import CustomBlockButton from "../../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../../components/dialog/v1/CustomDialog";
import CustomImage from "../../../../../../../../../components/image/CustomImage";
import CustomInput from "../../../../../../../../../components/input/default/v1/CustomInput";
import { St } from "./MdStockReceiveFrame.styled";

export function MdStockReceiveFrame({
    open,
    onClose
}) {
    return (
        <>
            <CustomDialog maxWidth="md" open={open} onClose={() => onClose()}>
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>입고등록</CustomDialog.Title>
                <St.ControlFieldContainer>
                    <div className='wrapper'>
                        <div>
                            <CustomBlockButton>
                                입고제품 추가
                            </CustomBlockButton>
                            <CustomBlockButton>
                                엑셀 일괄등록
                            </CustomBlockButton>
                        </div>
                        <div>
                            <CustomBlockButton>
                                일괄입력
                            </CustomBlockButton>
                        </div>
                    </div>
                </St.ControlFieldContainer>
                <St.CardListContainer>
                    <div className="wrapper">
                        <div className='cardItem'>
                            <div className='image-figure'>
                                <CustomImage
                                    src={"https://assets.sellertool.io/images/Sellertool_20231017095945_448_73783.jpeg?q=75"}
                                />
                            </div>
                            <div className='contents'>
                                <div className='information'>
                                    <div>
                                        마운틴하이커 3단 폴딩 선반 [LOUIS]
                                    </div>
                                    <div>
                                        화이트 [화이트]
                                    </div>
                                    <div>
                                        <div>
                                            4y951fa9826a7ejaxg
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
                        <div className='cardItem'>
                            <div className='image-figure'>
                                <CustomImage
                                    src={"https://assets.sellertool.io/images/Sellertool_20231017095945_448_73783.jpeg?q=75"}
                                />
                            </div>
                            <div className='contents'>
                                <div className='information'>
                                    <div>
                                        마운틴하이커 3단 폴딩 선반 [LOUIS]
                                    </div>
                                    <div>
                                        화이트 [화이트]
                                    </div>
                                    <div>
                                        <div>
                                            4y951fa9826a7ejaxg
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
                        <div className='cardItem'>
                            <div className='image-figure'>
                                <CustomImage
                                    src={"https://assets.sellertool.io/images/Sellertool_20231017095945_448_73783.jpeg?q=75"}
                                />
                            </div>
                            <div className='contents'>
                                <div className='information'>
                                    <div>
                                        마운틴하이커 3단 폴딩 선반 [LOUIS]
                                    </div>
                                    <div>
                                        화이트 [화이트]
                                    </div>
                                    <div>
                                        <div>
                                            4y951fa9826a7ejaxg
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
                        <div className='cardItem'>
                            <div className='image-figure'>
                                <CustomImage
                                    src={"https://assets.sellertool.io/images/Sellertool_20231017095945_448_73783.jpeg?q=75"}
                                />
                            </div>
                            <div className='contents'>
                                <div className='information'>
                                    <div>
                                        마운틴하이커 3단 폴딩 선반 [LOUIS]
                                    </div>
                                    <div>
                                        화이트 [화이트]
                                    </div>
                                    <div>
                                        <div>
                                            4y951fa9826a7ejaxg
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
                        <div className='cardItem'>
                            <div className='image-figure'>
                                <CustomImage
                                    src={"https://assets.sellertool.io/images/Sellertool_20231017095945_448_73783.jpeg?q=75"}
                                />
                            </div>
                            <div className='contents'>
                                <div className='information'>
                                    <div>
                                        마운틴하이커 3단 폴딩 선반 [LOUIS]
                                    </div>
                                    <div>
                                        화이트 [화이트]
                                    </div>
                                    <div>
                                        <div>
                                            4y951fa9826a7ejaxg
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
                    </div>
                </St.CardListContainer>
            </CustomDialog>
        </>
    );
}