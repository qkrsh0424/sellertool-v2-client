import Image from 'next/image';
import { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../../data_connect/csrfDataConnect';
import { uploadDataConnect } from '../../../../data_connect/uploadDataConnect';
import useImageUploaderHooks from '../../../../hooks/useImageUploaderHooks';
import CommonModalComponent from '../../../modules/CommonModalComponent';
import ConfirmModalComponent from '../../../modules/ConfirmModalComponent';
import _ from "lodash";

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

const ProductListFieldWrapper = styled.div`
    border: 1px solid #e0e0e0;
    margin-top: 10px;
    overflow: auto;
    max-height: 500px;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #00000025;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
    }

    .item-box:nth-last-child(1){
        border-bottom: none;
    }

    .item-box{
        border-bottom: 1px solid #e0e0e0;
        cursor:pointer;

        &:hover{
            background: #2c73d210;
        }
    }

    .item-box-active{
        background: #2c73d230 !important;
    }

    .code-box{
        padding:5px;
        font-size: 12px;
        font-weight: 500;
        color:#626262;
    }

    .code-box-active{
        font-weight: 600;
        color:#2c73d2;
    }

    .flex-box{
        display: flex;
        align-items: center;
    }

    .image-box{
        width:60px;
    }

    .content-box{
        margin-left: 10px;
        flex:1;
    }

    .content-text{
        font-size: 13px;
        font-weight: 500;
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
                                src={product?.imageUrl || 'http://localhost:3000/images/normal/image.png'}
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

function ProductEditModal({
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
                                src={product?.imageUrl || 'http://localhost:3000/images/normal/image.png'}
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
                            name='productInfo.memo1'
                            value={product.productInfo.memo1 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모2</div>
                        <input
                            className='input-el'
                            type='text'
                            name='productInfo.memo2'
                            value={product.productInfo.memo2 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모3</div>
                        <input
                            className='input-el'
                            type='text'
                            name='productInfo.memo3'
                            value={product.productInfo.memo3 || ''}
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
    const editProductImageUploaderRef = useRef();
    const { uploadImages } = useImageUploaderHooks({
        MAX_FILE_SIZE: 10485760
    });
    const [addProduct, dispatchAddProduct] = useReducer(addProductReducer, initialAddProduct);
    const [editProduct, dispatchEditProduct] = useReducer(editProductReducer, initialEditProduct);

    const [isLoading, setIsLoading] = useState(true);
    const [productAddModalOpen, setProductAddModalOpen] = useState(false);
    const [productDeleteModalOpen, setProductDeleteModalOpen] = useState(false);
    const [productEditModalOpen, setProductEditModalOpen] = useState(false);
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

    useEffect(() => {
        if (!props.products) {
            return;
        }
        setIsLoading(false);
    }, [props.products]);

    const __product = {
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
            setAddProductImage: async (e) => {
                let files = e.target.files;
                if (!files || files?.length <= 0) {
                    alert('이미지를 선택해 주세요.');
                    return;
                }

                let images = await uploadImages(files);

                if (!images) {
                    return;
                }

                dispatchAddProduct({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'imageUrl',
                        value: images[0].fileStorageUri
                    }
                })
            },
            confirmAdd: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                if (!addProduct.defaultName) {
                    alert('상품명은 필수 입력입니다.');
                    return;
                }

                if (!addProduct.managementName) {
                    alert('상품 관리명은 필수 입력입니다.');
                    return;
                }

                if (!addProduct.imageUrl) {
                    alert('잘못된 형식의 이미지 입니다.');
                    return;
                }

                props.onSubmitAddProduct(addProduct);
                __product.action.closeAddModal();
            },
            openDeleteModal: () => {
                if (!props.product) {
                    alert('상품을 먼저 선택해 주세요.');
                    return;
                }
                setProductDeleteModalOpen(true);
            },
            closeDeleteModal: () => {
                setProductDeleteModalOpen(false);
            },
            confirmDelete: () => {
                if (!props.product) {
                    alert('상품을 먼저 선택해 주세요.');
                    return;
                }
                props.onSubmitDeleteProduct(props.product.id);
                __product.action.closeDeleteModal();
            },
            openEditModal: () => {
                if (!props.product) {
                    alert('상품을 먼저 선택해 주세요.');
                    return;
                }
                dispatchEditProduct({
                    type: 'SET_DATA',
                    payload: { ...props.product }
                })
                setProductEditModalOpen(true);
            },
            closeEditModal: () => {
                setProductEditModalOpen(false);
                dispatchEditProduct({
                    type: 'CLEAR'
                })
            },
            openEditProductImageUploader: () => {
                editProductImageUploaderRef.current.click();
            },
            setEditProductImage: async (e) => {
                let files = e.target.files;
                if (!files || files?.length <= 0) {
                    alert('이미지를 선택해 주세요.');
                    return;
                }

                let images = await uploadImages(files);

                if (!images) {
                    return;
                }

                dispatchEditProduct({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'imageUrl',
                        value: images[0].fileStorageUri
                    }
                })
            },
            confirmEdit: (e) => {
                e.preventDefault();
                if (!editProduct.defaultName) {
                    alert('상품명은 필수 입력입니다.');
                    return;
                }

                if (!editProduct.managementName) {
                    alert('상품 관리명은 필수 입력입니다.');
                    return;
                }

                if (!editProduct.imageUrl) {
                    alert('잘못된 형식의 이미지 입니다.');
                    return;
                }
                props.onSubmitEditProduct({
                    body: editProduct,
                    callback: () => __product.action.closeEditModal()
                });
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
            },
            editProductValueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                const newEditProduct = _.set(editProduct, name, value);
                dispatchEditProduct({
                    type: 'SET_DATA',
                    payload: { ...newEditProduct }
                })
            }
        }
    }

    if (isLoading) {
        return null;
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
                        {props.product &&
                            <>
                                <button
                                    className='button-el normal-button'
                                    type='button'
                                    onClick={__product.action.openEditModal}
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
                                    onClick={__product.action.openDeleteModal}
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
                            </>
                        }
                    </div>
                </HeadFieldWrapper>
                <ProductListFieldWrapper>
                    {(!props.products || props.products.length <= 0) &&
                        <div style={{fontSize:'14px', fontWeight:'600', textAlign:'center', margin:'150px 0'}}>관리중인 상품이 없습니다.</div>
                    }
                    {props.products.map(r => {
                        return (
                            <div
                                key={r.id}
                                className={`item-box ${props.product?.id === r.id && 'item-box-active'}`}
                                onClick={() => props.onActionSelectProduct(r)}
                            >
                                <div className={`code-box ${props.product?.id === r.id && 'code-box-active'}`}>상품 코드 : {r.code}</div>
                                <div className='flex-box'>
                                    <div className='image-box'>
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                            src={r.imageUrl}
                                            layout={'responsive'}
                                            width={1}
                                            height={1}
                                            alt={'product image'}
                                            objectFit='cover'
                                            loading='lazy'
                                        ></Image>
                                    </div>
                                    <div className='content-box'>
                                        <div className='flex-box'>
                                            <div className='content-text' style={{ flex: 1 }}>상품명 : {r.defaultName}</div>
                                            <div className='content-text' style={{ flex: 1 }}>상품 관리명 : {r.managementName}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </ProductListFieldWrapper>
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
            {productEditModalOpen && editProduct &&
                <CommonModalComponent
                    open={productEditModalOpen}

                    onClose={__product.action.closeEditModal}
                >
                    <ProductEditModal
                        product={editProduct}
                        onActionChangeValueOfName={__product.change.editProductValueOfName}
                        onActionOpenImageUploader={__product.action.openEditProductImageUploader}
                        onClose={__product.action.closeEditModal}
                        onConfirm={__product.action.confirmEdit}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }
            {productDeleteModalOpen && props.product &&
                <ConfirmModalComponent
                    open={productDeleteModalOpen}
                    message={
                        (
                            <>
                                <div>연관된 옵션 등 하위 데이터들도 모두 삭제 됩니다.</div>
                                <div>해당 상품을 정말로 삭제 하시겠습니까?</div>
                            </>
                        )
                    }
                    onClose={__product.action.closeDeleteModal}
                    onConfirm={__product.action.confirmDelete}
                />
            }
            <input
                ref={addProductImageUploaderRef}
                type='file'
                accept="image/*"
                onClick={(e) => e.target.value = ''}
                onChange={__product.action.setAddProductImage}
                hidden
            ></input>
            <input
                ref={editProductImageUploaderRef}
                type='file'
                accept="image/*"
                onClick={(e) => e.target.value = ''}
                onChange={__product.action.setEditProductImage}
                hidden
            ></input>
        </>
    );
}

const initialAddProduct = {
    defaultName: '',
    managementName: '',
    imageUrl: 'https://assets.sellertool.io/default/no_image.png',
    memo1: '',
    memo2: '',
    memo3: ''
}

const initialEditProduct = null;

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

const editProductReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialEditProduct;
        default: return initialEditProduct;
    }
}