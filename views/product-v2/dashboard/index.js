import { Container } from './styles/index.styled';
import Layout from './layout/Layout';
import SearchFieldComponent from './search-field/SearchField.component';
import AddFloatButtonComponent from './add-float-button/AddFloatButton.component';
import ProductListFieldComponent from './product-list-field/ProductListField.component';

const ProductDashboardMainComponent = (props) => {
    return (
        <>
            <Container>
                <Layout
                    sidebar={
                        ({ handleCloseSidebar }) => <SearchFieldComponent onCloseSidebar={handleCloseSidebar} />
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