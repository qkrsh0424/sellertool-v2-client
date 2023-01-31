import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { categoryDataConnect } from '../../../data_connect/categoryDataConnect';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import { optionDataConnect } from '../../../data_connect/optionDataConnect';
import { productDataConnect } from '../../../data_connect/productDataConnect';
import FieldLoading from '../../modules/loading/FieldLoading';
import FlexGap from '../../modules/fragment/FlexGap';
import LineBreakerBottom from '../../modules/fragment/LineBreakerBottom';
import CategoryComponent from './category/Category.component';
import ProductAndOptionDetailLayout from './layout/ProductAndOptionDetailLayout';
import ProductAndOptionLayout from './layout/ProductAndOptionLayout';
import OptionDetailComponent from './option-detail/OptionDetail.component';
import OptionListComponent from './option-list/OptionList.component';
import ProductDetailComponent from './product-detail/ProductDetail.component';
import ProductListComponent from './product-list/ProductList.component';

const Container = styled.div`
    max-width: 1280px;
    margin-left:auto;
    margin-right: auto;
    margin-bottom: 100px;
    @media all and (max-width:992px){
        padding:0 10px;
    }
`;

function PageTitleField({ title }) {
    return (
        <h5 style={{ padding: '0 10px', color: '#505050' }}>{title}</h5>
    );
}

const ProductDashboardMainComponent = (props) => {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [isLoading, setIsLoading] = useState(true);
    const [workspace, dispatchWorkspace] = useReducer(workspaceReducer, initialWorkspace);
    const [categories, dispatchCategories] = useReducer(categoriesReducer, initialCategories);
    const [category, dispatchCategory] = useReducer(categoryReducer, initialCategory);
    const [products, dispatchProducts] = useReducer(productsReducer, initialProducts);
    const [product, dispatchProduct] = useReducer(productReducer, initialProduct);
    const [options, dispatchOptions] = useReducer(optionsReducer, initialOptions);
    const [option, dispatchOption] = useReducer(optionReducer, initialOption);

    /**
     * 워크스페이스 여부에 따라 페이지 렌더링 결정
     */
    useEffect(() => {
        if (!workspaceRedux.workspaceInfo) {
            setIsLoading(true);
            return;
        }
        dispatchWorkspace({
            type: 'SET_DATA',
            payload: { ...workspaceRedux.workspaceInfo }
        })
        setIsLoading(false);

    }, [workspaceRedux.workspaceInfo]);

    /**
     * 워크스페이스 로딩후 패치 작업
     * fetch categories
     * fetch products
     */
    useEffect(() => {
        if (!router.isReady || !workspace) {
            return;
        }

        if (!workspace.id) {
            return;
        }

        __category.req.fetchCategories();

        if (!router?.query?.cId) {
            return;
        }

        __product.req.fetchProducts();
    }, [router.isReady, workspace]);

    /**
     * 선택된 카테고리 dispatch
     */
    useEffect(() => {
        if (!router.isReady || !categories) {
            return;
        }

        let categoryId = router.query.cId;
        const fetchedCategory = categories.filter(r => r.id === categoryId)[0];

        if (!fetchedCategory) {
            dispatchCategory({
                type: 'CLEAR'
            });
            return;
        }

        dispatchCategory({
            type: 'SET_DATA',
            payload: { ...fetchedCategory }
        })
    }, [router.isReady, categories]);

    useEffect(() => {
        if (!product) {
            dispatchOptions({
                type: 'CLEAR'
            })
            return;
        }

        __option.req.fetchOptions();
    }, [product])

    const __category = {
        req: {
            fetchCategories: async () => {
                let workspaceId = workspace.id;

                await categoryDataConnect().searchListByWorkspaceId(workspaceId)
                    .then(res => {
                        if (res.status === 200) {
                            dispatchCategories({
                                type: 'SET_DATA',
                                payload: [...res.data.data]
                            });
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            createOne: async (workspaceId, body) => {
                await csrfDataConnect().getApiCsrf();
                await categoryDataConnect().createOne(workspaceId, body)
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            updateOne: async (workspaceId, body) => {
                await csrfDataConnect().getApiCsrf();
                await categoryDataConnect().updateOne(workspaceId, body)
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            deleteOne: async (workspaceId, categoryId) => {
                await csrfDataConnect().getApiCsrf();
                await categoryDataConnect().deleteOne(workspaceId, categoryId)
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        submit: {
            add: async (body) => {
                await __category.req.createOne(workspace.id, body);
                await __category.req.fetchCategories();
            },
            edit: async (body) => {
                await __category.req.updateOne(workspace.id, body);
                await __category.req.fetchCategories();
            },
            delete: async () => {
                await __category.req.deleteOne(workspace.id, category.id);
                router.replace({
                    pathname: router.pathname
                })
            }
        }
    }

    const __product = {
        req: {
            fetchProducts: async () => {
                let workspaceId = workspace.id;
                let categoryId = router.query.cId;

                await productDataConnect().searchListByCategoryId(workspaceId, categoryId)
                    .then(res => {
                        if (res.status === 200) {
                            const fetchedProducts = res.data.data;

                            dispatchProducts({
                                type: 'SET_DATA',
                                payload: [...fetchedProducts]
                            })

                            /*
                            선택된 product refresh
                            */
                            if (product) {
                                const fetchedProduct = fetchedProducts.filter(r => r.id === product.id)[0];
                                if (fetchedProduct) {
                                    dispatchProduct({
                                        type: 'SET_DATA',
                                        payload: { ...fetchedProduct }
                                    })
                                } else {
                                    dispatchProduct({
                                        type: 'CLEAR'
                                    })
                                }
                            }

                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            },
            createOne: async (workspaceId, categoryId, body) => {
                await csrfDataConnect().getApiCsrf();
                await productDataConnect().createOne(workspaceId, categoryId, body)
                    .then(res => {
                        if (res.status === 200) {
                            /*
                            refresh products
                            */
                            __product.req.fetchProducts();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            deleteOne: async (workspaceId, productId) => {
                await csrfDataConnect().getApiCsrf();
                await productDataConnect().deleteOne(workspaceId, productId)
                    .then(res => {
                        if (res.status === 200) {
                            /*
                            refresh products
                            */
                            __product.req.fetchProducts();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            updateOne: async ({
                workspaceId,
                body,
                callback
            }) => {
                await csrfDataConnect().getApiCsrf();
                await productDataConnect().updateOne(workspaceId, body)
                    .then(res => {
                        if (res.status === 200) {
                            /*
                            callback 실행 => 업데이트 모달 닫기
                            */
                            callback();
                            /*
                            refresh products
                            */
                            __product.req.fetchProducts();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        action: {
            select: (selectedProduct) => {
                dispatchOption({
                    type: 'CLEAR'
                })
                if (product?.id === selectedProduct.id) {
                    dispatchProduct({
                        type: 'CLEAR'
                    })
                    return;
                }
                dispatchProduct({
                    type: 'SET_DATA',
                    payload: { ...selectedProduct }
                });
            }
        },
        submit: {
            add: async (body) => {
                await __product.req.createOne(workspace.id, category.id, body);
            },
            delete: async (productId) => {
                await __product.req.deleteOne(workspace.id, productId);
            },
            edit: async ({ body, callback }) => {
                await __product.req.updateOne({
                    workspaceId: workspace.id,
                    body: body,
                    callback: callback
                });
            }
        }
    }

    const __option = {
        req: {
            fetchOptions: async () => {
                let workspaceId = workspace.id;
                let productId = product.id;

                await optionDataConnect().searchListByProductId(workspaceId, productId)
                    .then(res => {
                        if (res.status === 200) {
                            const fetchedOptions = res.data.data;

                            dispatchOptions({
                                type: 'SET_DATA',
                                payload: [...fetchedOptions]
                            })

                            /*
                            선택된 option refresh
                            */
                            if (option) {
                                const fetchedOption = fetchedOptions.filter(r => r.id === option.id)[0];
                                if (fetchedOption) {
                                    dispatchOption({
                                        type: 'SET_DATA',
                                        payload: { ...fetchedOption }
                                    })
                                } else {
                                    dispatchOption({
                                        type: 'CLEAR'
                                    })
                                }
                            }

                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            },
            createOne: async (workspaceId, productId, body) => {
                await csrfDataConnect().getApiCsrf();
                await optionDataConnect().createOne(workspaceId, productId, body)
                    .then(res => {
                        if (res.status === 200) {
                            /*
                            refresh products
                            */
                            __option.req.fetchOptions();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            deleteOne: async (workspaceId, optionId) => {
                await csrfDataConnect().getApiCsrf();
                await optionDataConnect().deleteOne(workspaceId, optionId)
                    .then(res => {
                        if (res.status === 200) {
                            /*
                            refresh options
                            */
                            __option.req.fetchOptions();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            updateOne: async ({
                workspaceId,
                body,
                callback
            }) => {
                await csrfDataConnect().getApiCsrf();
                await optionDataConnect().updateOne(workspaceId, body)
                    .then(res => {
                        if (res.status === 200) {
                            /*
                            callback 실행 => 업데이트 모달 닫기
                            */
                            callback();
                            /*
                            refresh products
                            */
                            __option.req.fetchOptions();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (!res) {
                            alert('네트워크가 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        action: {
            select: (selectedOption) => {
                if (option?.id === selectedOption.id) {
                    dispatchOption({
                        type: 'CLEAR'
                    })
                    return;
                }
                dispatchOption({
                    type: 'SET_DATA',
                    payload: { ...selectedOption }
                })
            }
        },
        submit: {
            add: async (body) => {
                if (!workspace) {
                    alert('워크스페이스를 찾을 수 없습니다.');
                    return;
                }

                if (!product) {
                    alert('상품을 먼저 선택해 주세요.');
                    return;
                }

                await __option.req.createOne(workspace.id, product.id, body);
            },
            delete: async (optionId) => {
                await __option.req.deleteOne(workspace.id, optionId);
            },
            edit: async ({ body, callback }) => {
                await __option.req.updateOne({
                    workspaceId: workspace.id,
                    body: body,
                    callback: callback
                });
            }
        }
    }

    return (
        <>
            <PageTitleField
                title={'| 상품 관리 |'}
            />
            <Container>
                {isLoading &&
                    <FieldLoading
                        size={40}
                        marginTop={100}
                        marginBottom={100}
                        color={'#828282'}
                    />
                }
                {(!isLoading && categories) &&
                    <CategoryComponent
                        categories={categories}
                        category={category}
                        onSubmitAddCategory={__category.submit.add}
                        onSubmitEditCategory={__category.submit.edit}
                        onSubmitDeleteCategory={__category.submit.delete}
                    />
                }
                {!isLoading && !category &&
                    <div style={{ textAlign: 'center', margin: '150px 0', fontSize: '16px', fontWeight: '600' }}>카테고리를 선택해 주세요.</div>
                }
                {category &&
                    <ProductAndOptionLayout>
                        <ProductListComponent
                            products={products}
                            product={product}
                            onSubmitAddProduct={__product.submit.add}
                            onSubmitEditProduct={__product.submit.edit}
                            onSubmitDeleteProduct={__product.submit.delete}
                            onActionSelectProduct={__product.action.select}
                        />
                        <FlexGap />
                        <OptionListComponent
                            options={options}
                            option={option}
                            product={product}
                            onSubmitAddOption={__option.submit.add}
                            onSubmitEditOption={__option.submit.edit}
                            onSubmitDeleteOption={__option.submit.delete}
                            onActionSelectOption={__option.action.select}
                        />
                    </ProductAndOptionLayout>
                }
                {product &&
                    <ProductAndOptionDetailLayout>
                        <ProductDetailComponent
                            product={product}
                        />
                        <FlexGap />
                        <OptionDetailComponent
                            option={option}
                        />
                    </ProductAndOptionDetailLayout>
                }
            </Container>
        </>
    );
}
export default ProductDashboardMainComponent;

const initialWorkspace = null;
const initialCategories = null;
const initialCategory = null;
const initialProducts = null;
const initialProduct = null;
const initialOptions = null;
const initialOption = null;

const workspaceReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialWorkspace;
    }
}

const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialCategories;
    }
}

const categoryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialCategory;
    }
}

const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProducts;
        default: return initialProducts;
    }
}

const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProduct;
        default: return initialProduct;
    }
}

const optionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptions;
        default: return initialOptions;
    }
}

const optionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOption;
        default: return initialOption;
    }
}