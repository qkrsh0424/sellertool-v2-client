import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CategoryFieldComponent from './category-field/CategoryField.component';
import useProductCategoriesHook from './hooks/useProductCategoriesHook';
import useProductHook from './hooks/useProductHook';
import useProductOptionsHook from './hooks/useProductOptionsHook';
import useProductSubCategoriesHook from './hooks/useProductSubCategoriesHook';
import ProductFieldComponent from './product-field/ProductField.component';
import ProductOptionFieldComponent from './product-option-field/ProductOptionField.component';
import SubCategoryFieldComponent from './sub-category-field/SubCategoryField.component';
import SubmitFieldComponent from './submit-field';

const Container = styled.div`
    padding-bottom: 150px;
    background:var(--defaultBackground);
    overflow: hidden;
    min-height: 800px;
`;

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const router = useRouter();

    const {
        productCategories,
        productCategoryId,
        onChangeProductCategoryId,
        checkProductCategoryIdFormatValid
    } = useProductCategoriesHook();

    const {
        productSubCategories,
        productSubCategoryId,
        onChangeProductSubCategoryId,
        checkProductSubCategoryIdFormatValid
    } = useProductSubCategoriesHook({
        productCategoryId: productCategoryId
    });

    const {
        product,
        reqCreateProduct,
        onChangeProductValueOfName,
        onChangeProductThumbnailUri,
        checkProductFormatValid,
        getSubmitValue: getSubmitValueOfProduct
    } = useProductHook();

    const {
        productOptions,
        onActionPushProductOption,
        onActionPushProductOptionsWithNames,
        onActionDeleteProductOption,
        onChangeOptionValueOfName,
        onChangeOptionNumberValueOfName,
        onSetOptionTagsWitchOptionNames,
        onSetOptionTagsWithInput,
        onSetSalesPricesWithInput,
        onSetTotalPurchasePricesWithInput,
        onSetReleaseLocationsWithInput,
        onSetStatusesWithInput,
        onSetMemosWithInput,
        getSubmitValue: getSubmitValueOfProductOptions,
        checkProductOptionsFormatValid
    } = useProductOptionsHook();

    const __handle = {
        submit: {
            add: async () => {
                try {
                    checkProductCategoryIdFormatValid();
                    checkProductSubCategoryIdFormatValid();
                    checkProductFormatValid();
                    checkProductOptionsFormatValid();
                } catch (err) {
                    alert(err.message);
                    return;
                }
                ;

                let newProduct = getSubmitValueOfProduct();

                let body = {
                    ...newProduct,
                    productOptions: getSubmitValueOfProductOptions(),
                    productSubCategoryId: productSubCategoryId,
                    workspaceId: workspaceRedux?.workspaceInfo?.id
                }

                await reqCreateProduct({
                    body: body,
                    successCallback: () => {
                        router.back();
                    }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <CategoryFieldComponent
                    productCategories={productCategories}
                    productCategoryId={productCategoryId}
                    onChangeProductCategoryId={onChangeProductCategoryId}
                />
                <SubCategoryFieldComponent
                    productSubCategories={productSubCategories}
                    productSubCategoryId={productSubCategoryId}
                    onChangeProductSubCategoryId={onChangeProductSubCategoryId}
                />
                <ProductFieldComponent
                    product={product}
                    onChangeProductValueOfName={onChangeProductValueOfName}
                    onChangeProductThumbnailUri={onChangeProductThumbnailUri}
                />
                <ProductOptionFieldComponent
                    productOptions={productOptions}
                    onActionPushProductOption={onActionPushProductOption}
                    onActionPushProductOptionsWithNames={onActionPushProductOptionsWithNames}
                    onActionDeleteProductOption={onActionDeleteProductOption}
                    onChangeOptionValueOfName={onChangeOptionValueOfName}
                    onChangeOptionNumberValueOfName={onChangeOptionNumberValueOfName}

                    onSetOptionTagsWitchOptionNames={onSetOptionTagsWitchOptionNames}
                    onSetOptionTagsWithInput={onSetOptionTagsWithInput}
                    onSetSalesPricesWithInput={onSetSalesPricesWithInput}
                    onSetTotalPurchasePricesWithInput={onSetTotalPurchasePricesWithInput}
                    onSetReleaseLocationsWithInput={onSetReleaseLocationsWithInput}
                    onSetStatusesWithInput={onSetStatusesWithInput}
                    onSetMemosWithInput={onSetMemosWithInput}
                />
            </Container>
            <SubmitFieldComponent
                onSubmitAdd={__handle.submit.add}
            />
        </>
    );
}