import Image from 'next/image';
import { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../../data_connect/csrfDataConnect';
import { uploadDataConnect } from '../../../../data_connect/uploadDataConnect';
import useImageUploaderHooks from '../../../../hooks/useImageUploaderHooks';
import CommonModalComponent from '../../../modules/CommonModalComponent';
import ConfirmModalComponent from '../../../modules/ConfirmModalComponent';
import _ from "lodash";
import { Container, HeadFieldWrapper, ProductAddAndEditModalWrapper, ProductListFieldWrapper } from './ProductList.styled';

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
                    alert('???????????? ????????? ?????????.');
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
                    alert('???????????? ?????? ???????????????.');
                    return;
                }

                if (!addProduct.managementName) {
                    alert('?????? ???????????? ?????? ???????????????.');
                    return;
                }

                if (!addProduct.imageUrl) {
                    alert('????????? ????????? ????????? ?????????.');
                    return;
                }

                props.onSubmitAddProduct(addProduct);
                __product.action.closeAddModal();
            },
            openDeleteModal: () => {
                if (!props.product) {
                    alert('????????? ?????? ????????? ?????????.');
                    return;
                }
                setProductDeleteModalOpen(true);
            },
            closeDeleteModal: () => {
                setProductDeleteModalOpen(false);
            },
            confirmDelete: () => {
                if (!props.product) {
                    alert('????????? ?????? ????????? ?????????.');
                    return;
                }
                props.onSubmitDeleteProduct(props.product.id);
                __product.action.closeDeleteModal();
            },
            openEditModal: () => {
                if (!props.product) {
                    alert('????????? ?????? ????????? ?????????.');
                    return;
                }
                dispatchEditProduct({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(props.product)
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
                    alert('???????????? ????????? ?????????.');
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
                    alert('???????????? ?????? ???????????????.');
                    return;
                }

                if (!editProduct.managementName) {
                    alert('?????? ???????????? ?????? ???????????????.');
                    return;
                }

                if (!editProduct.imageUrl) {
                    alert('????????? ????????? ????????? ?????????.');
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
                <HeadField
                    products={props.products}
                    product={props.product}
                    openAddModal={__product.action.openAddModal}
                    openEditModal={__product.action.openEditModal}
                    openDeleteModal={__product.action.openDeleteModal}
                />
                <ProductListField
                    products={props.products}
                    product={props.product}
                    onActionSelect={props.onActionSelectProduct}
                />
            </Container>

            {/* Add Product Modal */}
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

            {/* Edit Product Modal */}
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

            {/* Delete Product Modal */}
            {productDeleteModalOpen && props.product &&
                <ConfirmModalComponent
                    open={productDeleteModalOpen}
                    message={
                        (
                            <>
                                <div>????????? ?????? ??? ?????? ??????????????? ?????? ?????? ?????????.</div>
                                <div>?????? ????????? ????????? ?????? ???????????????????</div>
                            </>
                        )
                    }
                    onClose={__product.action.closeDeleteModal}
                    onConfirm={__product.action.confirmDelete}
                />
            }

            {/* Add Product Image Uploader */}
            <input
                ref={addProductImageUploaderRef}
                type='file'
                accept="image/*"
                onClick={(e) => e.target.value = ''}
                onChange={__product.action.setAddProductImage}
                hidden
            ></input>
            {/* Edit Product Image Uploader */}
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
            <div className='head-title'>?????? ?????? ??????</div>
            <form onSubmit={onConfirm}>
                <div className='body-wrapper'>
                    <div className='input-box'>
                        <div className='input-label'>?????????</div>
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
                        <div className='input-label'>?????? ?????????</div>
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
                        <div className='input-label'>?????????</div>
                        <div
                            className='image-box'
                            onClick={onActionOpenImageUploader}
                        >
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src={product?.imageUrl || 'https://assets.sellertool.io/default/no_image.png'}
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
                        <div className='input-label'>??????1</div>
                        <input
                            className='input-el'
                            type='text'
                            name='memo1'
                            value={product.memo1 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>??????2</div>
                        <input
                            className='input-el'
                            type='text'
                            name='memo2'
                            value={product.memo2 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>??????3</div>
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
                        ??????
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: '#2c73d2' }}
                        disabled={disabledBtn}
                    >
                        ??????
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
            <div className='head-title'>?????? ?????? ??????</div>
            <form onSubmit={onConfirm}>
                <div className='body-wrapper'>
                    <div className='input-box'>
                        <div className='input-label'>?????????</div>
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
                        <div className='input-label'>?????? ?????????</div>
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
                        <div className='input-label'>?????????</div>
                        <div
                            className='image-box'
                            onClick={onActionOpenImageUploader}
                        >
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src={product?.imageUrl || 'https://assets.sellertool.io/default/no_image.png'}
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
                        <div className='input-label'>??????1</div>
                        <input
                            className='input-el'
                            type='text'
                            name='productInfo.memo1'
                            value={product.productInfo.memo1 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>??????2</div>
                        <input
                            className='input-el'
                            type='text'
                            name='productInfo.memo2'
                            value={product.productInfo.memo2 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>??????3</div>
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
                        ??????
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: '#2c73d2' }}
                        disabled={disabledBtn}
                    >
                        ??????
                    </button>
                </div>
            </form>
        </ProductAddAndEditModalWrapper>
    );
}

function HeadField({
    products,
    product,
    openAddModal,
    openEditModal,
    openDeleteModal
}) {
    return (
        <HeadFieldWrapper>
            <div className='title'>?????? ({products?.length || 0})</div>
            <div className='flex-box'>
                <button
                    className='button-el normal-button'
                    type='button'
                    onClick={openAddModal}
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
                {product &&
                    <>
                        <button
                            className='button-el normal-button'
                            type='button'
                            onClick={openEditModal}
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
                            onClick={openDeleteModal}
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
    );
}

function ProductListField({
    products,
    product,
    onActionSelect
}) {
    return (
        <ProductListFieldWrapper>
            {(!products || products.length <= 0) &&
                <div style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center', margin: '150px 0' }}>????????? ????????? ????????????.</div>
            }
            {products.map(r => {
                return (
                    <div
                        key={r.id}
                        className={`item-box ${product?.id === r.id && 'item-box-active'}`}
                        onClick={() => onActionSelect(r)}
                    >
                        <div className={`code-box ${product?.id === r.id && 'code-box-active'}`}>?????? ?????? : {r.code}</div>
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
                                    <div className='content-text' style={{ flex: 1 }}>????????? : {r.defaultName}</div>
                                    <div className='content-text' style={{ flex: 1 }}>?????? ????????? : {r.managementName}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            })}
        </ProductListFieldWrapper>
    );
}