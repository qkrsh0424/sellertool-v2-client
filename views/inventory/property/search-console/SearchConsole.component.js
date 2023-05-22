import { useState } from "react";
import { BodyWrapper, CategorySelectorContainer, Container, Wrapper } from "./style/SearchConsole.styled";
import HeaderFieldView from "./view/HeaderField.view";
import CategorySelectorFieldView from "./view/CategorySelectorField.view";
import useProductCategoriesHook from "./hooks/useProductCategoriesHook";
import useProductCategoryHook from "./hooks/useProductCategoryHook";
import useProductSubCategoriesHook from "./hooks/useProductSubCategoriesHook";
import useProductSubCategoryHook from "./hooks/useProductSubCategoryHook";
import SubCategorySelectorFieldView from "./view/SubCategorySelectorField.view";
import SearchConditionFieldView from "./view/SearchConditionField.view";
import useSearchConditionsHook from "./hooks/useSearchConditionHook";
import SubmitButtonFieldView from "./view/SubmitButtonField.view";
import { useRouter } from "next/router";

export default function SearchConsoleComponent() {
    const router = useRouter();

    const [fieldViewOpen, setFieldViewOpen] = useState(true);

    const {
        productCategories
    } = useProductCategoriesHook();

    const {
        productCategory,
        onChangeProductCategory
    } = useProductCategoryHook({ productCategories });

    const {
        productSubCategories
    } = useProductSubCategoriesHook({ productCategory });

    const {
        productSubCategory,
        onChangeProductSubCategory,
        onClearProductSubCategory
    } = useProductSubCategoryHook({ productSubCategories });

    const {
        searchCondition,
        searchQuery,
        onChangeSearchCondition,
        onChangeSearchQuery
    } = useSearchConditionsHook();

    const handleOpenFieldView = () => {
        setFieldViewOpen(true);
    }

    const handleCloseFieldView = () => {
        setFieldViewOpen(false);
    }

    const handleSelectCategory = (productCategory) => {
        onChangeProductCategory(productCategory);
        onClearProductSubCategory();
    }

    const handleSubmitFetch = (e) => {
        e.preventDefault();

        router.query.productCategoryId = productCategory?.id ?? '';
        router.query.productSubCategoryId = productSubCategory?.id ?? '';
        router.query.searchCondition = searchCondition;
        router.query.searchQuery = searchQuery;
        router.query.page = 1;

        router.replace({
            query: {
                ...router.query,
                productCategoryId: productCategory?.id ?? '',
                productSubCategoryId: productSubCategory?.id ?? '',
                searchCondition: searchCondition,
                searchQuery: searchQuery,
                page: 1,
            }
        });
    }

    const handleClearAll = () => {
        router.replace({
            pathname: router?.pathname
        });
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderFieldView
                        fieldViewOpen={fieldViewOpen}
                        onActionCloseFieldView={handleCloseFieldView}
                        onActionOpenFieldView={handleOpenFieldView}
                    />

                    {fieldViewOpen &&
                        (
                            <BodyWrapper>
                                <form onSubmit={(e) => handleSubmitFetch(e)}>
                                    <CategorySelectorContainer>
                                        <CategorySelectorFieldView
                                            productCategories={productCategories}
                                            productCategory={productCategory}
                                            onActionSelectCategory={handleSelectCategory}
                                        />
                                        <SubCategorySelectorFieldView
                                            productSubCategory={productSubCategory}
                                            productSubCategories={productSubCategories}
                                            onActionSelectSubCategory={onChangeProductSubCategory}
                                        />
                                    </CategorySelectorContainer>

                                    <SearchConditionFieldView
                                        searchCondition={searchCondition}
                                        searchQuery={searchQuery}
                                        onChangeSearchCondition={onChangeSearchCondition}
                                        onChangeSearchQuery={onChangeSearchQuery}
                                    />
                                    <SubmitButtonFieldView
                                        handleClearAll={handleClearAll}
                                    />
                                </form>
                            </BodyWrapper>
                        )
                    }
                </Wrapper>
            </Container>
        </>
    )
}