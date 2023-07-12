import { useSelector } from "react-redux";
import { useApiConnectHook, useProductCategoriesHook, useProductHook, useProductOptionsHook, useProductSubCategoriesHook } from "./hooks";
import { Container } from "./index.styled";
import { useEffect } from "react";
import { FdCategory, FdSubCategory } from "./components";
import { FdBottomFixedSubmit } from "./components/FdBottomFixedSubmit/v1/FdBottomFixedSubmit";
import { customBackdropController } from "/components/backdrop/default/v1";
import { FdProduct } from "./components/FdProduct/v1/FdProduct";
import { useRouter } from "next/router";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { FdProductOptions } from "./components/FdProductOptions/v1";
import { isNumericValue } from "../../../../utils/numberFormatUtils";
import { v4 as uuidv4 } from 'uuid';

export default function MainComponent(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    let wsId = workspaceRedux?.workspaceInfo?.id;
    const customBackdropControl = customBackdropController();
    const {
        onReqProductOptionBulkCreateExcelUpload
    } = useApiConnectHook();

    const {
        productCategories,
        selectedProductCategory,
        onReqFetchProductCategories,
        onSetProductCategories,
        onSetSelectedProductCategory,
        checkProductCategoryIdFormatValid
    } = useProductCategoriesHook();

    const {
        productSubCategories,
        selectedProductSubCategory,
        onReqFetchProductSubCategories,
        onSetProductSubCategories,
        onSetSelectedProductSubCategory,
        checkProductSubCategoryIdFormatValid
    } = useProductSubCategoriesHook();

    const {
        product,
        onReqCreateProduct,
        onChangeProductValueOfName,
        onChangeProductThumbnailUri,
        checkProductFormatValid
    } = useProductHook();

    const {
        productOptions,
        onSetProductOptions,
        onPushNewProductOption,
        onPushNewProductOptionsWithNames,
        onConcatNewProductOptions,
        onDeleteProductOption,
        onChangeOptionValueOfName,
        onBatchChangeOptionTagsWithOptionName,
        onBatchChangeValueOfName,
        checkOptionValuesForamtValid
    } = useProductOptionsHook();

    useEffect(() => {
        if (!wsId) { return; }

        async function initialize() {
            await onReqFetchProductCategories({
                headers: { wsId: wsId }
            },
                (results) => onSetProductCategories(results)
            );
        }

        initialize();
    }, [wsId]);

    const handleSelectProductCategory = async (productCategory) => {
        onSetSelectedProductCategory(productCategory);

        if (!productCategory) {
            onSetProductSubCategories([]);
            onSetSelectedProductSubCategory(null);
            return;
        }

        await onReqFetchProductSubCategories({
            params: { productCategoryId: productCategory?.id },
            headers: { wsId: wsId }
        },
            (results) => onSetProductSubCategories(results)
        );
    }

    const handleSelectProductSubCategory = async (productSubCategory) => {
        onSetSelectedProductSubCategory(productSubCategory);
    }

    const handleReqCreate = async () => {
        const body = returnMergedBody();
        if (body) {
            customBackdropControl.showBackdrop();
            await onReqCreateProduct({
                body: body, headers: { wsId: wsId }
            },
                () => { router.back() }
            );
            customBackdropControl.hideBackdrop();
        }
    }

    const returnMergedBody = () => {
        try {
            checkProductCategoryIdFormatValid();
            checkProductSubCategoryIdFormatValid();
            checkProductFormatValid();
            checkOptionValuesForamtValid();
        } catch (err) {
            let message = err.message;
            customToast.error(message, {
                ...defaultOptions,
                toastId: message
            });
            return;
        }
        const body = {
            id: product?.id,
            name: product?.name ? product?.name?.trim() : '',
            productTag: product?.productTag ? product?.productTag?.trim() : '',
            thumbnailUri: product?.thumbnailUri ? product?.thumbnailUri?.trim() : '',
            purchaseUri: product?.purchaseUri ? product?.purchaseUri?.trim() : '',
            memo: product?.memo ? product?.memo?.trim() : '',
            productSubCategoryId: selectedProductSubCategory?.id,
            workspaceId: wsId,
            productOptions: productOptions.map(r => {
                return {
                    id: r.id,
                    name: r.name.trim(),
                    optionTag: r.optionTag.trim(),
                    salesPrice: !r.salesPrice ? '0' : r.salesPrice.toString().trim(),
                    totalPurchasePrice: !r.totalPurchasePrice ? '0' : r.totalPurchasePrice.toString().trim(),
                    status: r.status.trim(),
                    memo: r.memo.trim(),
                    releaseLocation: r.releaseLocation.trim()
                }
            })
        }
        return body;
    }

    const handleReqProductOptionBulkCreateExcelUpload = async (formData, successCallback) => {
        customBackdropControl.showBackdrop();
        await onReqProductOptionBulkCreateExcelUpload({
            formData: formData,
            headers: { wsId: wsId }
        },
            (results, res) => {
                if (results) {
                    onConcatNewProductOptions(results?.map(r => {
                        return {
                            id: uuidv4(),
                            name: r?.name,
                            optionTag: r?.optionTag,
                            salesPrice: isNumericValue(r?.salesPrice) ? r?.salesPrice : '0',
                            totalPurchasePrice: isNumericValue(r?.totalPurchasePrice) ? r?.totalPurchasePrice : '0',
                            status: r?.status,
                            memo: r?.memo,
                            releaseLocation: r?.releaseLocation
                        }
                    }));
                }
                successCallback();
            }
        )
        customBackdropControl.hideBackdrop();
    }

    return (
        <>
            <Container>
                <FdCategory
                    productCategories={productCategories}
                    selectedProductCategory={selectedProductCategory}
                    onSelectProductCategory={(productCategory) => handleSelectProductCategory(productCategory)}
                />
                <FdSubCategory
                    productSubCategories={productSubCategories}
                    selectedProductSubCategory={selectedProductSubCategory}
                    onSelectProductSubCategory={(productSubCategory) => handleSelectProductSubCategory(productSubCategory)}
                />
                <FdProduct
                    product={product}
                    onChangeProductValueOfName={(name, value) => onChangeProductValueOfName(name, value)}
                    onChangeProductThumbnailUri={(imageUri) => onChangeProductThumbnailUri(imageUri)}
                />
                <FdProductOptions
                    productOptions={productOptions}
                    onPushNewProductOption={onPushNewProductOption}
                    onPushNewProductOptionsWithNames={onPushNewProductOptionsWithNames}
                    onDeleteProductOption={onDeleteProductOption}
                    onChangeOptionValueOfName={onChangeOptionValueOfName}
                    onBatchChangeOptionTagsWithOptionName={onBatchChangeOptionTagsWithOptionName}
                    onBatchChangeValueOfName={onBatchChangeValueOfName}
                    onReqProductOptionBulkCreateExcelUpload={handleReqProductOptionBulkCreateExcelUpload}
                />
                <FdBottomFixedSubmit
                    onSubmitCreate={handleReqCreate}
                />
            </Container>
        </>
    );
}