import { useRouter } from "next/router";
import { FdBottomFixedSubmit, FdCategory, FdProduct, FdProductOptions, FdSubCategory } from "./components";
import { Container } from "./index.styled";
import { useSelector } from "react-redux";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect } from "react";
import { useProductCategoriesHook, useProductHook, useProductOptionsHook, useProductSubCategoriesHook } from "./hooks";
import { customBackdropController } from "../../../../components/backdrop/default/v1";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { isNumericValue } from "../../../../utils/numberFormatUtils";
import { v4 as uuidv4 } from 'uuid';

export default function MainComponent(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;
    const productId = router?.query?.productId;
    const customBackdropControl = customBackdropController();

    const { onReqFetchProductCategories, onReqFetchProductWithRelatedData, onReqFetchProductSubCategories, onReqProductOptionBulkCreateExcelUpload, onReqUpdateProduct } = useApiHook();
    const { productCategories, selectedProductCategory, onSetProductCategories, onSetSelectedProductCategory, checkProductCategoryIdFormatValid } = useProductCategoriesHook();
    const { productSubCategories, selectedProductSubCategory, onSetProductSubCategories, onSetSelectedProductSubCategory, checkProductSubCategoryIdFormatValid } = useProductSubCategoriesHook();
    const { product, onSetProduct, onChangeProductValueOfName, onChangeProductThumbnailUri, checkProductFormatValid } = useProductHook();
    const { productOptions, onSetProductOptions, onPushNewProductOption, onPushNewProductOptionsWithNames, onConcatNewProductOptions, onDeleteProductOption, onChangeOptionValueOfName, onBatchChangeOptionTagsWithOptionName, onBatchChangeValueOfName, checkOptionValuesForamtValid } = useProductOptionsHook();

    useEffect(() => {
        if (!productId || !wsId) {
            return;
        }

        async function initialize() {
            let resultCategories = [];
            let resultProdcutRelatedData = null;
            let resultSelectedCategory = null;
            let resultSubCategories = [];
            let resultSelectedSubCategory = null;
            let resultProductOptions = [];

            await onReqFetchProductCategories({
                headers: { wsId: wsId }
            },
                (results, response) => {
                    resultCategories = results;
                }
            )
            await onReqFetchProductWithRelatedData({
                params: { productId: productId },
                headers: { wsId: wsId }
            },
                (results, response) => {
                    resultProdcutRelatedData = results;
                }
            );

            resultSelectedCategory = resultCategories?.find(r => r?.id === resultProdcutRelatedData?.productSubCategory?.productCategoryId);
            resultProductOptions = resultProdcutRelatedData?.productOptions?.map(r => {
                return {
                    id: r?.id,
                    code: r?.code,
                    name: r?.name,
                    optionTag: r?.optionTag,
                    salesPrice: r?.salesPrice,
                    totalPurchasePrice: r?.totalPurchasePrice,
                    status: r?.status,
                    memo: r?.memo,
                    releaseLocation: r?.releaseLocation,
                }
            });

            if (resultSelectedCategory) {
                await onReqFetchProductSubCategories({
                    params: { productCategoryId: resultSelectedCategory?.id },
                    headers: { wsId: wsId }
                },
                    (results, response) => {
                        resultSubCategories = results;
                    }
                );
            }

            resultSelectedSubCategory = resultSubCategories?.find(r => r?.id === resultProdcutRelatedData?.productSubCategoryId);

            onSetProductCategories(resultCategories);
            onSetSelectedProductCategory(resultSelectedCategory);
            onSetProductSubCategories(resultSubCategories);
            onSetSelectedProductSubCategory(resultSelectedSubCategory);
            onSetProduct({
                id: resultProdcutRelatedData?.id,
                code: resultProdcutRelatedData?.code,
                name: resultProdcutRelatedData?.name,
                productTag: resultProdcutRelatedData?.productTag,
                thumbnailUri: resultProdcutRelatedData?.thumbnailUri,
                purchaseUri: resultProdcutRelatedData?.purchaseUri,
                memo: resultProdcutRelatedData?.memo,
            });
            onSetProductOptions([...resultProductOptions]);
        }

        initialize();
    }, [productId, wsId]);

    const handleReqUpdate = async () => {
        const body = returnMergedBody();
        if (body) {
            customBackdropControl.showBackdrop();
            await onReqUpdateProduct({
                body: body, headers: { wsId: wsId }
            },
                (results, response) => { router.back() }
            );
            customBackdropControl.hideBackdrop();
        }
    }

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

    const handleReqProductOptionBulkCreateExcelUpload = async (formData, successCallback) => {
        customBackdropControl.showBackdrop();
        await onReqProductOptionBulkCreateExcelUpload({
            formData: formData,
            headers: { wsId: wsId }
        },
            (results, res) => {
                if (results) {
                    let updatedOptions = productOptions?.map(productOption => {
                        let matched = results?.find(r => r?.code === productOption?.code);
                        if (matched) {
                            return {
                                ...productOption,
                                name: matched?.name,
                                optionTag: matched?.optionTag,
                                salesPrice: isNumericValue(matched?.salesPrice) ? matched?.salesPrice : '0',
                                totalPurchasePrice: isNumericValue(matched?.totalPurchasePrice) ? matched?.totalPurchasePrice : '0',
                                status: matched?.status,
                                memo: matched?.memo,
                                releaseLocation: matched?.releaseLocation
                            }
                        } else {
                            return { ...productOption }
                        }
                    });

                    let newOptions = results?.filter(result => !productOptions?.find(r => r?.code === result?.code)).map(r => {
                        return {
                            id: uuidv4(),
                            code: '',
                            name: r?.name,
                            optionTag: r?.optionTag,
                            salesPrice: isNumericValue(r?.salesPrice) ? r?.salesPrice : '0',
                            totalPurchasePrice: isNumericValue(r?.totalPurchasePrice) ? r?.totalPurchasePrice : '0',
                            status: r?.status,
                            memo: r?.memo,
                            releaseLocation: r?.releaseLocation
                        }
                    });

                    onSetProductOptions([...updatedOptions, ...newOptions]);
                }
                successCallback();
            }
        )
        customBackdropControl.hideBackdrop();
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
            code: product?.code,
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
                    code: r?.code,
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
                    onSubmitUpdate={handleReqUpdate}
                />
            </Container>
        </>
    );
}