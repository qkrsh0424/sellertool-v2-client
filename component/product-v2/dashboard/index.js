import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Container } from './styles/index.styled';
import HeadComponent from './head/Head.component';
import Layout from './layout/Layout';
import SearchFieldComponent from './search-field/SearchField.component';
import AddFloatButtonComponent from './add-float-button/AddFloatButton.component';
import useProductCategoriesHook from './hooks/useProductCategoriesHook';

const ProductDashboardMainComponent = (props) => {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const {
        productCategories,
        productCategory,
        reqChangeProductCategoryName,
        reqDeleteProductCategory
    } = useProductCategoriesHook();

    console.log(productCategories, productCategory);

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
                <HeadComponent />
                <Layout>
                    <SearchFieldComponent
                        productCategories={productCategories}
                        productCategory={productCategory}

                        onSubmitModifyProductCategoryName={__handle.submit.modifyProductCategoryName}
                        onSubmitDeleteProductCategory={__handle.submit.deleteProductCategory}
                    />
                </Layout>
            </Container>

            <AddFloatButtonComponent />
        </>
    );
}
export default ProductDashboardMainComponent;