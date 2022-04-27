import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { categoryDataConnect } from '../../../data_connect/categoryDataConnect';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import FieldLoading from '../../modules/FieldLoading';
import FlexGap from '../../modules/FlexGap';
import LineBreakerBottom from '../../modules/LineBreakerBottom';
import CategoryComponent from './category/Category.component';
import ProductAndOptionLayout from './layout/ProductAndOptionLayout';
import ProductListComponent from './product-list/ProductList.component';

const Container = styled.div`

`;
const ProductListWrapper = styled.div`
    flex:1;
`;

const OptionListWrapper = styled.div`
    flex:1;
`;

const ProductDashboardMainComponent = (props) => {
    const router = useRouter();
    const workspaceRdx = useSelector(state => state.workspaceState);
    const [isLoading, setIsLoading] = useState(true);
    const [workspace, dispatchWorkspace] = useReducer(workspaceReducer, initialWorkspace);
    const [categories, dispatchCategories] = useReducer(categoriesReducer, initialCategories);
    const [category, dispatchCategory] = useReducer(categoryReducer, initialCategory);

    /**
     * 워크스페이스 여부에 따라 페이지 렌더링 결정
     */
    useEffect(() => {
        if (!workspaceRdx.info) {
            setIsLoading(true);
            return;
        }
        dispatchWorkspace({
            type: 'SET_DATA',
            payload: workspaceRdx.info
        })
        setIsLoading(false);

    }, [workspaceRdx.info]);

    /**
     * 워크스페이스 로딩후 패치 작업
     */
    useEffect(() => {
        if (!workspace) {
            return;
        }
        __category.req.fetchCategories();
    }, [workspace]);

    /**
     * 선택된 카테고리 dispatch
     */
    useEffect(() => {
        if (!router.isReady || !categories) {
            return;
        }

        let categoryId = router.query.cId;
        dispatchCategory({
            type: 'SET_DATA',
            payload: categories.filter(r => r.id === categoryId)[0]
        })
    }, [categories]);

    /**
     * 카테고리가 선택되었을때 패치
     */
    useEffect(() => {
        if (!category) {
            return;
        }
    }, [category]);

    const __category = {
        req: {
            fetchCategories: async () => {
                if (!workspace) {
                    return;
                }
                let workspaceId = workspace.id;

                await categoryDataConnect().searchListByWorkspaceId(workspaceId)
                    .then(res => {
                        if (res.status === 200) {
                            dispatchCategories({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
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

    return (
        <>
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
                <ProductAndOptionLayout>
                    <ProductListComponent

                    />
                    <FlexGap />
                    <ProductListComponent

                    />
                </ProductAndOptionLayout>
            </Container>
        </>
    );
}
export default ProductDashboardMainComponent;

const initialWorkspace = null;
const initialCategories = null;
const initialCategory = null;

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