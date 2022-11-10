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
        productCategories
    } = useProductCategoriesHook();

    console.log(productCategories);
    return (
        <>
            <Container>
                <HeadComponent />
                <Layout>
                    <SearchFieldComponent
                        productCategories={productCategories}
                    />
                </Layout>
            </Container>

            <AddFloatButtonComponent />
        </>
    );
}
export default ProductDashboardMainComponent;