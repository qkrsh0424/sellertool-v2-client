import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import PagenationComponentV2 from "../../../modules/pagenation/PagenationComponentV2";
import CustomSelect from "../../../modules/select/CustomSelect";
import useProductsHook from "../hooks/useProductsHook";
import ProductCardComponent from "./ProductCard.component";
import { Container, ContentWrapper, ControllerWrapper, FoldableButtonWrapper, PagenationWrapper, SortSelectorWrapper } from "./styles/ProductListField.styled";
import { customBackdropController } from "../../../../components/backdrop/default/v1";

export default function ProductListFieldComponent(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const {
        products,
        reqChangeStockManagement,
        reqDeleteProduct
    } = useProductsHook();

    const customBackdropControl = customBackdropController();

    const __handle = {
        action: {
            unfoldAllOptions: () => {
                router.replace({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        optionsFoldable: 'unfold'
                    }
                })
            },
            foldAllOptions: () => {
                let newQuery = { ...router.query };
                if (newQuery?.optionsFoldable === 'fold') {
                    delete newQuery?.optionsFoldable
                    router.replace({
                        pathname: router.pathname,
                        query: {
                            ...newQuery
                        }
                    })
                    return;
                }

                router.replace({
                    pathname: router.pathname,
                    query: {
                        ...newQuery,
                        optionsFoldable: 'fold'
                    }
                })
            },
            changeSort: (e) => {
                let value = e.target.value;
                let newQuery = { ...router.query };
                router.replace({
                    pathname: router.pathname,
                    query: {
                        ...newQuery,
                        sort: value
                    }
                })
            }
        },
        submit: {
            changeStockManagement: async (productId) => {
                let product = products?.content?.find(r => r.id === productId);
                if (!product) {
                    alert('상품 데이터를 찾을 수 없습니다.');
                    return;
                }

                let body = {
                    productId: product.id,
                    stockManagementYn: product.stockManagementYn === 'y' ? 'n' : 'y',
                    workspaceId: workspaceRedux?.workspaceInfo?.id
                }

                customBackdropControl.showBackdrop();
                await reqChangeStockManagement({
                    body: body,
                    successCallback: () => {

                    }
                });
                customBackdropControl.hideBackdrop();
            },
            deleteProduct: async ({
                productId,
                successCallback
            }) => {
                let body = {
                    productId: productId
                }

                customBackdropControl.showBackdrop();
                await reqDeleteProduct({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                });
                customBackdropControl.hideBackdrop();
            }
        }
    }

    return (
        <>
            <Container>
                <ControllerWrapper
                    className='mgl-flex mgl-flex-justifyContent-spaceBetween'
                >
                    <FoldableButtonWrapper
                        className='mgl-flex'
                    >
                        <SingleBlockButton
                            type='button'
                            className='button-item'
                            onClick={() => __handle.action.unfoldAllOptions()}
                        >전체 펼치기</SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            className='button-item'
                            onClick={() => __handle.action.foldAllOptions()}
                        >전체 접기</SingleBlockButton>
                    </FoldableButtonWrapper>
                    <SortSelectorWrapper>
                        <CustomSelect
                            className='select-item'
                            onChange={(e) => __handle.action.changeSort(e)}
                            value={router?.query?.sort || 'cid_desc'}
                        >
                            {SORTED_BY?.map((r, index) => {
                                return (
                                    <option
                                        key={r.sort + index}
                                        value={r.sort}
                                    >
                                        {r.name}
                                    </option>
                                );
                            })}
                        </CustomSelect>
                    </SortSelectorWrapper>
                </ControllerWrapper>
                <ContentWrapper>
                    {products?.content?.map(product => {
                        return (
                            <ProductCardComponent
                                key={product.id}
                                product={product}
                                onChangeStockManagement={__handle.submit.changeStockManagement}
                                onSubmitDeleteProduct={__handle.submit.deleteProduct}
                            />
                        );
                    })}
                </ContentWrapper>
                <PagenationWrapper>
                    <PagenationComponentV2
                        pageIndex={products?.number}
                        totalPages={products?.totalPages}
                        isFirst={products?.first}
                        isLast={products?.last}
                        totalElements={products?.totalElements}
                        sizeElements={[10, 20]}
                    />
                </PagenationWrapper>
            </Container>
        </>
    );
}

const SORTED_BY = [
    {
        sort: 'cid_asc',
        name: '등록일 오름차순'
    },
    {
        sort: 'cid_desc',
        name: '등록일 내림차순'
    },
    {
        sort: 'name_asc',
        name: '상품명 오름차순'
    },
    {
        sort: 'name_desc',
        name: '상품명 내림차순'
    }
]