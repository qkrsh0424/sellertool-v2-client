import Image from 'next/image';
import { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import CommonModalComponent from '../../../modules/CommonModalComponent';

const Container = styled.div`
    flex:1;
`;

const Wrapper = styled.div`
    border: 1px solid #e0e0e0;
    margin-top: 10px;
`;

const HeadFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title{
        font-size: 21px;
        font-weight: 500;
    }

    .flex-box{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        padding: 0;
        margin: 0;
        margin-left: 10px;
        width: 30px;
        height: 30px;
        border: 1px solid #e0e0e0;
        background: white;

        cursor: pointer;
    }

    .button-icon-figure{
        position: relative;
        width: 20px;
        height: 20px;
        margin: auto;
    }

    .button-icon{
        opacity: 0.6;
    }

    .normal-button{
        &:hover{
            background: #2c73d2;
            border:1px solid #2c73d2;

            & .button-icon{
                filter: invert(100%);
                opacity: 1;
            }
        }
    }

    .delete-button{
        &:hover{
            background: #ff6961;
            border:1px solid #ff6961;

            & .button-icon{
                filter: invert(100%);
                opacity: 1;
            }
        }
    }
`;

const ProductAddAndEditModalWrapper = styled.div`
    .head-title{
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 600;
    }

    .body-wrapper{
        margin-top: 20px;
        padding: 0 10px;
    }

    .footer-wrapper{
        margin-top: 20px;
        display: flex;
    }

    .input-box{
        margin-top: 15px;
    }

    .input-el{
        box-sizing: border-box;
        height: 34px;
        width: 100%;
        margin-top: 10px;
        padding: 0 5px;
        border: 1px solid #e0e0e0;

        &:focus{
            outline: none;
        }
    }

    .input-label{
        font-size: 13px;
        font-weight: 500;
    }

    .input-notice{
        margin-top: 10px;
        font-size: 13px;
        color: #626262;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        flex:1;
        height: 34px;
        background: white;
        border: none;
        font-weight: 500;

        cursor: pointer;

        &:hover{
            font-weight: 600;
            background: #e0e0e060;
        }

        &:disabled{
            cursor: not-allowed;
        }
    }

    .image-box{
        width: 50%;
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        cursor: pointer;
    }
`;

function ProductAddModal({
    product,
    onActionChangeValueOfName,
    onActionOpenImageUploader,
    onClose,
    onConfirm,
    disabledBtn
}) {
    return (
        <ProductAddAndEditModalWrapper>
            <div className='head-title'>신규 상품 등록</div>
            <form onSubmit={onConfirm}>
                <div className='body-wrapper'>
                    <div className='input-box'>
                        <div className='input-label'>상품명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='defaultName'
                            value={product.defaultName || ''}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>상품 관리명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='managementName'
                            value={product.managementName || ''}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>이미지</div>
                        <div
                            className='image-box'
                            onClick={onActionOpenImageUploader}
                        >
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src={product?.imageUrl}
                                layout='responsive'
                                width={1}
                                height={1}
                                objectFit={'cover'}
                                alt='image'
                                loading='lazy'
                            ></Image>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모1</div>
                        <input
                            className='input-el'
                            type='text'
                            name='memo1'
                            value={product.memo1 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모2</div>
                        <input
                            className='input-el'
                            type='text'
                            name='memo2'
                            value={product.memo2 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모3</div>
                        <input
                            className='input-el'
                            type='text'
                            name='memo3'
                            value={product.memo3 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                </div>
                <div className='footer-wrapper'>
                    <button
                        type='button'
                        className='button-el'
                        style={{ color: '#ff6961' }}
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: '#2c73d2' }}
                        disabled={disabledBtn}
                    >
                        등록
                    </button>
                </div>
            </form>
        </ProductAddAndEditModalWrapper>
    );
}
export default function ProductListComponent(props) {
    const addProductImageUploaderRef = useRef();
    const [addProduct, dispatchAddProduct] = useReducer(addProductReducer, initialAddProduct);

    const [productAddModalOpen, setProductAddModalOpen] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }
        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [disabledBtn])

    const __product = {
        req: {
            uploadImages: async () => {

            }
        },
        action: {
            openAddModal: () => {
                setProductAddModalOpen(true);
            },
            closeAddModal: () => {
                setProductAddModalOpen(false);
                dispatchAddProduct({
                    type: 'CLEAR'
                })
            },
            openAddProductImageUploader: () => {
                addProductImageUploaderRef.current.click();
            },
            // TODO : 이미지 파일 업로드 기능 구현
            setAddProductImage: (e) => {
                console.log(e.target.files);
            },
            // TODO : 서밋 기능 구현
            confirmAdd: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                console.log(addProduct);
            }
        },
        change: {
            addProductValueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchAddProduct({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <HeadFieldWrapper>
                    <div className='title'>상품</div>
                    <div className='flex-box'>
                        <button
                            className='button-el normal-button'
                            type='button'
                            onClick={__product.action.openAddModal}
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    className='button-icon'
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/add_icon2.png'
                                    layout='fill'
                                    alt="add icon"
                                    loading='lazy'
                                ></Image>
                            </div>
                        </button>
                        <button
                            className='button-el normal-button'
                            type='button'
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    className='button-icon'
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/pen_icon2.png'
                                    layout='fill'
                                    alt="add icon"
                                    loading='lazy'
                                ></Image>
                            </div>
                        </button>
                        <button
                            className='button-el delete-button'
                            type='button'
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    className='button-icon'
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/x_icon.png'
                                    layout='fill'
                                    alt="add icon"
                                    loading='lazy'
                                ></Image>
                            </div>
                        </button>
                    </div>

                </HeadFieldWrapper>
                <Wrapper>
                    hello
                </Wrapper>
            </Container>
            {/* Modal */}
            {(productAddModalOpen && addProduct) &&
                <CommonModalComponent
                    open={productAddModalOpen}

                    onClose={__product.action.closeAddModal}
                >
                    <ProductAddModal
                        product={addProduct}
                        onActionChangeValueOfName={__product.change.addProductValueOfName}
                        onActionOpenImageUploader={__product.action.openAddProductImageUploader}
                        onClose={__product.action.closeAddModal}
                        onConfirm={__product.action.confirmAdd}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }
            <input
                ref={addProductImageUploaderRef}
                type='file'
                accept="image/*"
                onClick={(e) => e.target.value = ''}
                onChange={__product.action.setAddProductImage}
                hidden
            ></input>
        </>
    );
}

const initialAddProduct = {
    defaultName: '',
    managementName: '',
    imageUrl: 'http://localhost:3000/images/normal/image.png',
    memo1: '',
    memo2: '',
    memo3: ''
}

const addProductReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialAddProduct;
        default: return initialAddProduct;
    }
}