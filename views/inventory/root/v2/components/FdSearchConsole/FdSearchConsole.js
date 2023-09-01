import { useRouter } from "next/router";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../components/image/CustomImage";
import { BodyWrapper, CategorySelectorContainer, Container, HeaderWrapper, SearchConditionContainer, SubmitButtonContainer, Wrapper } from "./FdSearchConsole.styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useApiHook, useProductCategoriesHook, useProductSubCategoriesHook, useSearchConditionsHook } from "../../hooks";
import { FgCategorySelector, FgSearchCondition, FgSubCategorySelector } from "./fragments";

export function FdSearchConsole({ }) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const router = useRouter();

    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const productCategoriesHook = useProductCategoriesHook();
    const productSubCategoriesHook = useProductSubCategoriesHook();
    const searchConditionsHook = useSearchConditionsHook();

    const [fieldViewOpen, setFieldViewOpen] = useState(true);

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function _getResultProductCategories() {
            let resultProductCategories = [];
            await apiHook.onReqFetchProductCategories({
                headers: { wsId: wsId }
            },
                (results, response) => {
                    resultProductCategories = results;
                }
            )
            return resultProductCategories;
        }

        async function _getResultProductCategory(productCategories) {
            return productCategories?.find(r => r?.id === router?.query?.productCategoryId) ?? null;
        }

        async function _getResultProductSubCategories(productCategory) {
            let resultProductSubCategories = [];
            if (productCategory) {
                await apiHook?.onReqFetchProductSubCategories({
                    params: { productCategoryId: productCategory?.id },
                    headers: { wsId: wsId }
                },
                    (results, response) => {
                        resultProductSubCategories = results;
                    }
                )
            }
            return resultProductSubCategories;
        }

        async function _getResultProductSubCategory(productSubCategories) {
            return productSubCategories?.find(r => r?.id === router?.query?.productSubCategoryId) ?? null;
        }

        async function initialize() {
            let resultProductCategories = await _getResultProductCategories();
            let resultProductCategory = await _getResultProductCategory(resultProductCategories);
            let resultProductSubCategories = await _getResultProductSubCategories(resultProductCategory);
            let resultProductSubCategory = await _getResultProductSubCategory(resultProductSubCategories);
            let resultSearchCondition = router?.query?.searchCondition ?? searchConditionsHook?.SEARCH_CONDITIONS[0]?.fieldName;
            let resultSearchQuery = router?.query?.searchQuery ?? '';

            productCategoriesHook.onSetProductCategories(resultProductCategories);
            productCategoriesHook.onSetProductCategory(resultProductCategory);
            productSubCategoriesHook.onSetProductSubCategories(resultProductSubCategories);
            productSubCategoriesHook.onSetProductSubCategory(resultProductSubCategory);
            searchConditionsHook.onSetSearchCondition(resultSearchCondition);
            searchConditionsHook.onSetSearchQuery(resultSearchQuery);
        }

        initialize();

    }, [wsId, router?.query]);

    const toggleFieldViewOpen = (setOpen) => {
        setFieldViewOpen(setOpen);
    }

    const handleSelectCategory = async (item) => {
        productCategoriesHook.onSetProductCategory(item)

        // 전체를 선택했을때 서브 카테고리 null로 초기화
        if (!item) {
            productSubCategoriesHook.onSetProductSubCategories(null);
            productSubCategoriesHook.onSetProductSubCategory(null);
            return;
        }

        // 선택한 카테고리가 기존에 선택되어있던 카테고리와 다를때만 실행
        if (productCategoriesHook?.productCategory?.id !== item?.id) {
            await apiHook.onReqFetchProductSubCategories({
                params: { productCategoryId: item?.id },
                headers: { wsId: wsId }
            },
                (results, response) => {
                    productSubCategoriesHook.onSetProductSubCategories(results);
                    productSubCategoriesHook.onSetProductSubCategory(null);
                }
            )
        }
    }

    const handleSelectSubCategory = async (item) => {
        productSubCategoriesHook?.onSetProductSubCategory(item);
    }

    const handleSubmitFetch = (e) => {
        e.preventDefault();
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                productCategoryId: productCategoriesHook?.productCategory?.id,
                productSubCategoryId: productSubCategoriesHook?.productSubCategory?.id,
                searchCondition: searchConditionsHook?.searchCondition,
                searchQuery: searchConditionsHook?.searchQuery,
                page: 1
            }
        })
    }

    const handleClearAll = () => {
        router.replace({
            pathname: router?.pathname
        })
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderWrapper>
                        <div className='title'>상세조회</div>
                        {fieldViewOpen ?
                            (
                                <CustomBlockButton
                                    type='button'
                                    className='dropdown-button-item'
                                    onClick={() => toggleFieldViewOpen(false)}
                                >
                                    <CustomImage
                                        src='/images/icon/arrowDropUp_default_808080.svg'
                                    />
                                </CustomBlockButton>
                            )
                            :
                            (
                                <CustomBlockButton
                                    type='button'
                                    className='dropdown-button-item'
                                    onClick={() => toggleFieldViewOpen(true)}
                                >
                                    <CustomImage
                                        src='/images/icon/arrowDropDown_default_808080.svg'
                                    />
                                </CustomBlockButton>
                            )
                        }
                    </HeaderWrapper>
                    {fieldViewOpen &&
                        (
                            <BodyWrapper>
                                <form onSubmit={(e) => handleSubmitFetch(e)}>
                                    <CategorySelectorContainer>
                                        <FgCategorySelector
                                            productCategories={productCategoriesHook?.productCategories}
                                            productCategory={productCategoriesHook?.productCategory}
                                            onSelectCategory={(item) => handleSelectCategory(item)}
                                        />
                                        <FgSubCategorySelector
                                            productSubCategories={productSubCategoriesHook?.productSubCategories}
                                            productSubCategory={productSubCategoriesHook?.productSubCategory}
                                            onSelectSubCategory={(item) => handleSelectSubCategory(item)}
                                        />
                                    </CategorySelectorContainer>
                                    <SearchConditionContainer>
                                        <FgSearchCondition
                                            SEARCH_CONDITIONS={searchConditionsHook?.SEARCH_CONDITIONS}
                                            searchCondition={searchConditionsHook?.searchCondition}
                                            searchQuery={searchConditionsHook?.searchQuery}
                                            onSetSearchCondition={searchConditionsHook?.onSetSearchCondition}
                                            onSetSearchQuery={searchConditionsHook?.onSetSearchQuery}
                                        />
                                    </SearchConditionContainer>
                                    <SubmitButtonContainer>
                                        <div className='button-group'>
                                            <CustomBlockButton
                                                type='button'
                                                className='button-item'
                                                onClick={() => handleClearAll()}
                                            >
                                                초기화
                                            </CustomBlockButton>
                                            <CustomBlockButton
                                                type='submit'
                                                className='button-item'
                                                style={{
                                                    background: 'var(--mainColor)'
                                                }}
                                            >
                                                조회
                                            </CustomBlockButton>
                                        </div>
                                    </SubmitButtonContainer>
                                </form>
                            </BodyWrapper>
                        )
                    }
                </Wrapper>
            </Container>
        </>
    );
}