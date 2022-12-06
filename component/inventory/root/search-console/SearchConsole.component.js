import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CustomImage from "../../../modules/image/CustomImage";
import CustomInput from "../../../modules/input/CustomInput";
import CustomSelect from "../../../modules/select/CustomSelect";
import useProductCategoriesHook from "./hooks/useProductCategoriesHook";
import CategorySelectorComponent from "./CategorySelector.component";
import HeaderComponent from "./Header.component";
import { BodyWrapper, CategorySelectorContainer, CategorySelectorWrapper, Container, HeaderWrapper, SearchConditionContainer, SubmitButtonContainer, Wrapper } from "./styles/SearchConsole.styled";
import SubCategorySelectorComponent from "./SubCategorySelector.component";
import useProductCategoryHook from "./hooks/useProductCategoryHook";
import useProductSubCategoriesHook from "./hooks/useProductSubCategoriesHook";
import useProductSubCategory from "./hooks/useProductSubCategory";
import useSearchConditionsHook from "./hooks/useSearchConditionsHook";
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
    } = useProductCategoryHook({
        productCategories: productCategories
    });

    const {
        productSubCategories
    } = useProductSubCategoriesHook({
        productCategory: productCategory
    });

    const {
        productSubCategory,
        onChangeProductSubCategory,
        onClearProductSubCategory
    } = useProductSubCategory({
        productSubCategories: productSubCategories
    });

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
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                productCategoryId: productCategory?.id,
                productSubCategoryId: productSubCategory?.id,
                searchCondition: searchCondition,
                searchQuery: searchQuery,
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
                    <HeaderComponent
                        fieldViewOpen={fieldViewOpen}
                        onActionCloseFieldView={handleCloseFieldView}
                        onActionOpenFieldView={handleOpenFieldView}
                    />
                    {fieldViewOpen &&
                        (
                            <BodyWrapper>
                                <form onSubmit={(e) => handleSubmitFetch(e)}>
                                    <CategorySelectorContainer>
                                        <CategorySelectorComponent
                                            productCategories={productCategories}
                                            productCategory={productCategory}
                                            onActionSelectCategory={handleSelectCategory}
                                        />
                                        <SubCategorySelectorComponent
                                            productSubCategory={productSubCategory}
                                            productSubCategories={productSubCategories}
                                            onActionSelectSubCategory={onChangeProductSubCategory}
                                        />
                                    </CategorySelectorContainer>
                                    <SearchConditionContainer>
                                        <div className='label'>조회 조건</div>
                                        <div className='control-group'>
                                            <div className='control-box'>
                                                <CustomSelect
                                                    className='select-item'
                                                    value={searchCondition || ''}
                                                    onChange={(e) => onChangeSearchCondition(e)}
                                                >
                                                    <option value=''>선택</option>
                                                    {SEARCH_CONDITIONS?.map(r => {
                                                        return (
                                                            <option
                                                                key={r.fieldName}
                                                                value={r.fieldName}
                                                            >
                                                                {r.name}
                                                            </option>
                                                        );
                                                    })}
                                                </CustomSelect>
                                            </div>
                                            {searchCondition &&
                                                <div className='control-box'>
                                                    <CustomInput
                                                        type='text'
                                                        className='input-item'
                                                        placeholder='검색어를 입력하세요.'
                                                        value={searchQuery || ''}
                                                        onChange={(e) => onChangeSearchQuery(e)}
                                                    ></CustomInput>
                                                </div>
                                            }
                                        </div>
                                    </SearchConditionContainer>
                                    <SubmitButtonContainer>
                                        <div className='button-group'>
                                            <SingleBlockButton
                                                type='button'
                                                className='button-item'
                                                onClick={() => handleClearAll()}
                                            >
                                                초기화
                                            </SingleBlockButton>
                                            <SingleBlockButton
                                                type='submit'
                                                className='button-item'
                                                style={{
                                                    background: 'var(--mainColor)'
                                                }}
                                            >
                                                조회
                                            </SingleBlockButton>
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

const SEARCH_CONDITIONS = [
    {
        fieldName: 'product.name',
        name: '상품명',
    },
    {
        fieldName: 'product.code',
        name: '상품코드',
    },
    {
        fieldName: 'product.productTag',
        name: '상품태그',
    },
    {
        fieldName: 'productOption.name',
        name: '옵션명',
    },
    {
        fieldName: 'productOption.code',
        name: '옵션코드',
    },
    {
        fieldName: 'productOption.optionTag',
        name: '옵션태그',
    },
    {
        fieldName: 'productOption.status',
        name: '옵션상태',
    },
    {
        fieldName: 'productOption.releaseLocation',
        name: '출고지',
    }
]
