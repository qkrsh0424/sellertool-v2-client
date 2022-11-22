import { useSelector } from "react-redux";
import useProductsHook from "../hooks/useProductsHook";
import ProductCardComponent from "./ProductCard.component";
import { Container } from "./styles/ProductListField.styled";

export default function ProductListFieldComponent(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const {
        products,
        reqChangeStockManagement,
        reqDeleteProduct
    } = useProductsHook();

    const __handle = {
        submit: {
            changeStockManagement: async (productId) => {
                let product = products?.find(r => r.id === productId);
                if (!product) {
                    alert('상품 데이터를 찾을 수 없습니다.');
                    return;
                }

                let body = {
                    productId: product.id,
                    stockManagementYn: product.stockManagementYn === 'y' ? 'n' : 'y',
                    workspaceId: workspaceRedux?.workspaceInfo?.id
                }

                await reqChangeStockManagement({
                    body: body,
                    successCallback: () => {

                    }
                })
            },
            deleteProduct: async ({
                productId,
                successCallback
            }) => {
                let body = {
                    productId: productId
                }

                await reqDeleteProduct({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            }
        }
    }
    return (
        <>
            <Container>
                {products?.map(product => {
                    return (
                        <ProductCardComponent
                            key={product.id}
                            product={product}
                            onChangeStockManagement={__handle.submit.changeStockManagement}
                            onSubmitDeleteProduct={__handle.submit.deleteProduct}
                        />
                    );
                })}
            </Container>
        </>
    );
}