import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "/components/image/CustomImage";
import { Container, FormWrapper, HeadWrapper, Wrapper } from "./FdProduct.styled";
import { useRef, useState } from "react";
import useImageUploaderHooks from "/hooks/uploader/useImageUploaderHooks";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";

export function FdProduct({
    product,
    onChangeProductValueOfName,
    onChangeProductThumbnailUri
}) {
    const customBackdropControl = customBackdropController();
    const thumbnailUploaderRef = useRef();
    const [dropDownOpen, setDropDownOpen] = useState(true);
    const { uploadImages } = useImageUploaderHooks({
        MAX_FILE_SIZE: 10485760
    });

    const toggleDropDownOpen = (setOpen) => {
        setDropDownOpen(setOpen);
    }

    const handleThumbnailUploaderOpen = () => {
        thumbnailUploaderRef.current.click();
    }

    const handleClearThumbnailUri = () => {
        onChangeProductThumbnailUri('');
    }

    const handleChangeThumbnailUri = async (e) => {
        let files = e.target.files;
        if (!files || files?.length <= 0) {
            alert('이미지를 선택해 주세요.');
            return;
        }

        customBackdropControl.showBackdrop();
        let images = await uploadImages(files);
        customBackdropControl.hideBackdrop();
        if (!images) {
            return;
        }

        onChangeProductThumbnailUri(images[0]?.fileStorageUri);
    }

    const handleChangeValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        onChangeProductValueOfName(name, value);
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <HeadWrapper className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                        <div className='mgl-flex mgl-flex-alignItems-center'>
                            <span className='required-tag'></span>
                            <div className='title'>
                                상품 정보
                            </div>
                        </div>
                        {dropDownOpen ?
                            <CustomBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => toggleDropDownOpen(false)}
                            >
                                <div className='icon-figure'>
                                    <CustomImage
                                        src={'/images/icon/arrowDropUp_default_808080.svg'}
                                    />
                                </div>
                            </CustomBlockButton>
                            :
                            (

                                <CustomBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => toggleDropDownOpen(true)}
                                >
                                    <div className='icon-figure'>
                                        <CustomImage
                                            src={'/images/icon/arrowDropDown_default_808080.svg'}
                                        />
                                    </div>
                                </CustomBlockButton>
                            )
                        }
                    </HeadWrapper>
                    {dropDownOpen &&
                        (
                            <FormWrapper>
                                <div className='control-group mgl-flex'>
                                    <div className='control-group1'>
                                        <div className="control-box">
                                            <div className='label mgl-flex mgl-flex-alignItems-center'>
                                                대표 이미지
                                            </div>
                                            <div className='thumbnail'>
                                                <div className='thumbnail-figure'>
                                                    <CustomImage
                                                        src={product?.thumbnailUri ? product?.thumbnailUri : '/images/normal/image.png'}
                                                    ></CustomImage>
                                                </div>
                                                <div className='thumbnail-button-group'>
                                                    <CustomBlockButton
                                                        type='button'
                                                        className='button-item'
                                                        onClick={() => handleThumbnailUploaderOpen()}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src='/images/icon/search_default_ffffff.svg'
                                                            />
                                                        </div>
                                                    </CustomBlockButton>
                                                    <CustomBlockButton
                                                        type='button'
                                                        className='button-item'
                                                        onClick={() => handleClearThumbnailUri()}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src='/images/icon/delete_default_ffffff.svg'
                                                            />
                                                        </div>
                                                    </CustomBlockButton>
                                                </div>
                                                <input
                                                    ref={thumbnailUploaderRef}
                                                    type='file'
                                                    accept="image/*"
                                                    onClick={(e) => e.target.value = ''}
                                                    onChange={(e) => handleChangeThumbnailUri(e)}
                                                    hidden
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='control-group2'>
                                        <div className="control-box">
                                            <div className='label mgl-flex mgl-flex-alignItems-center'>
                                                <span className='required-tag'></span>
                                                상품명
                                            </div>
                                            <div className='mgl-flex mgl-flex-alignItems-center'>
                                                <input
                                                    type='text'
                                                    className="input-item"
                                                    placeholder="상품명"
                                                    name='name'
                                                    value={product?.name || ''}
                                                    onChange={(e) => handleChangeValueOfName(e)}
                                                    maxLength={100}
                                                ></input>
                                                <div className='count-tag'>
                                                    <span className='notice'>{product?.name?.length ?? '0'}</span> / 100
                                                </div>
                                            </div>
                                        </div>
                                        <div className="control-box">
                                            <div className='label mgl-flex mgl-flex-alignItems-center'>
                                                상품 태그
                                            </div>
                                            <div className='mgl-flex mgl-flex-alignItems-center'>
                                                <input
                                                    type='text'
                                                    className="input-item"
                                                    placeholder="상품 태그"
                                                    name='productTag'
                                                    value={product?.productTag || ''}
                                                    onChange={(e) => handleChangeValueOfName(e)}
                                                    maxLength={100}
                                                ></input>
                                                <div className='count-tag'>
                                                    <span className='notice'>{product?.productTag?.length ?? '0'}</span> / 100
                                                </div>
                                            </div>
                                        </div>
                                        <div className="control-box">
                                            <div className='label mgl-flex mgl-flex-alignItems-center'>
                                                매입 사이트 URL
                                            </div>
                                            <div className='mgl-flex mgl-flex-alignItems-center'>
                                                <input
                                                    type='text'
                                                    className="input-item"
                                                    placeholder="매입 사이트 URL"
                                                    name='purchaseUri'
                                                    value={product?.purchaseUri || ''}
                                                    onChange={(e) => handleChangeValueOfName(e)}
                                                    maxLength={400}
                                                ></input>
                                                <div className='count-tag'>
                                                    <span className='notice'>{product?.purchaseUri?.length ?? '0'}</span> / 400
                                                </div>
                                            </div>
                                        </div>
                                        <div className="control-box">
                                            <div className='label mgl-flex mgl-flex-alignItems-center'>
                                                상품별 메모
                                            </div>
                                            <div className='mgl-flex mgl-flex-alignItems-center'>
                                                <input
                                                    type='text'
                                                    className="input-item"
                                                    placeholder="상품별 메모"
                                                    name='memo'
                                                    value={product?.memo || ''}
                                                    onChange={(e) => handleChangeValueOfName(e)}
                                                    maxLength={200}
                                                ></input>
                                                <div className='count-tag'>
                                                    <span className='notice'>{product?.memo?.length ?? '0'}</span> / 200
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FormWrapper>
                        )
                    }
                </Wrapper>
            </Container>
        </>
    );
}