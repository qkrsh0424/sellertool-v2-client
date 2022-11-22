import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Container, FlexBlock } from './styles/index.styled';
import Layout from './layout/Layout';
import SearchFieldComponent from './search-field/SearchField.component';
import AddFloatButtonComponent from './add-float-button/AddFloatButton.component';
import useProductCategoriesHook from './hooks/useProductCategoriesHook';
import ProductListFieldComponent from './product-list-field/ProductListField.component';

const ProductDashboardMainComponent = (props) => {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const {
        productCategories,
        productCategory,
        reqChangeProductCategoryName,
        reqDeleteProductCategory
    } = useProductCategoriesHook();

    const __handle = {
        submit: {
            modifyProductCategoryName: async ({
                body,
                successCallback
            }) => {
                await reqChangeProductCategoryName({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            deleteProductCategory: async ({
                body,
                successCallback
            }) => {
                await reqDeleteProductCategory({
                    body: body,
                    successCallback: () => {
                        router.replace({
                            pathname: router.pathname
                        })
                        successCallback();
                    }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <Layout
                    sidebar={
                        <SearchFieldComponent
                            productCategories={productCategories}
                            productCategory={productCategory}

                            onSubmitModifyProductCategoryName={__handle.submit.modifyProductCategoryName}
                            onSubmitDeleteProductCategory={__handle.submit.deleteProductCategory}
                        />
                    }
                    sidebarName='상품조회'
                    sidebarColor={'#fff'}
                    headerName='상품관리'
                    desktopWidth={300}
                    mobileWidth={250}
                >
                    <ProductListFieldComponent />
                </Layout>
            </Container>

            <AddFloatButtonComponent />
        </>
    );
}
export default ProductDashboardMainComponent;