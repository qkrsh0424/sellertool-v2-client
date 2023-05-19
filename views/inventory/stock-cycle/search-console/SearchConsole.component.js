import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CustomInput from "../../../modules/input/CustomInput";
import CustomSelect from "../../../modules/select/CustomSelect";
import useProductCategoriesHook from "./hooks/useProductCategoriesHook";
import CategorySelectorComponent from "./CategorySelector.component";
import HeaderComponent from "./Header.component";
import { BodyWrapper, CategorySelectorContainer, Container, DaysConditionContainer, SearchConditionContainer, SubmitButtonContainer, Wrapper } from "./styles/SearchConsole.styled";
import SubCategorySelectorComponent from "./SubCategorySelector.component";
import useProductCategoryHook from "./hooks/useProductCategoryHook";
import useProductSubCategoriesHook from "./hooks/useProductSubCategoriesHook";
import useProductSubCategory from "./hooks/useProductSubCategory";
import useSearchConditionsHook from "./hooks/useSearchConditionsHook";
import { useRouter } from "next/router";
import useAnalysisValuesHook from "./hooks/useAnalysisValuesHook";
import CustomCheckboxV2 from "../../../modules/checkbox/CustomCheckboxV2";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function SearchConsoleComponent() {
    const router = useRouter();
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

    const {
        days,
        availableSalesDays,
        usingAvailableSalesDays,
        onChangeDays,
        onChangeAvailableSalesDays,
        onToggleUsingAvailableSalesDays
    } = useAnalysisValuesHook();

    const [fieldViewOpen, setFieldViewOpen] = useState(true);


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
        if (!productCategory) {
            customToast.warning("카테고리는 필수 선택입니다.", {
                ...defaultOptions,
                toastId: "카테고리는 필수 선택입니다."
            });
            return;
        }

        if (days < 10 || days > 90) {
            customToast.warning("분석값은 10 이상 90 이하의 숫자만 입력가능합니다.", {
                ...defaultOptions,
                toastId: "분석값은 10 이상 90 이하의 숫자만 입력가능합니다."
            });
            return;
        }

        if (usingAvailableSalesDays && (availableSalesDays < 7 || availableSalesDays > 90)) {
            customToast.warning("재고순환값은 10 이상 90 이하의 숫자만 입력가능합니다.", {
                ...defaultOptions,
                toastId: "재고순환값은 10 이상 90 이하의 숫자만 입력가능합니다."
            });
            return;
        }

        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                productCategoryId: productCategory?.id,
                productSubCategoryId: productSubCategory?.id,
                searchCondition: searchCondition,
                searchQuery: searchQuery,
                days: days || '10',
                availableSalesDays: (usingAvailableSalesDays && availableSalesDays) ? availableSalesDays : null,
                page: 1
            }
        }, undefined, { scroll: false })
    }

    const handleClearAll = () => {
        router.replace({
            pathname: router?.pathname
        }, undefined, { scroll: false })
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
                                        <div className='label'>상세 조건</div>
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
                                    <DaysConditionContainer>
                                        <div className='label'>분석값 세팅 (필수)</div>
                                        <div className='control-group'>
                                            <div className='control-box'>
                                                <CustomInput
                                                    type='text'
                                                    className='input-item'
                                                    placeholder='10 ~ 90 숫자 입력'
                                                    value={days || ''}
                                                    onChange={(e) => onChangeDays(e)}
                                                ></CustomInput>
                                            </div>
                                            <div className='description'>
                                                <span style={{ color: 'var(--defaultBlueColor)', fontWeight: '700' }}>{days || 'NaN'}</span> 일 동안의 출고 내역을 분석합니다.
                                            </div>
                                        </div>
                                    </DaysConditionContainer>
                                    <DaysConditionContainer>
                                        <div className='control-group'>
                                            <CustomCheckboxV2
                                                className="label"
                                                label="재고순환값 설정"
                                                checked={usingAvailableSalesDays}
                                                onChange={() => onToggleUsingAvailableSalesDays()}
                                            />
                                            {usingAvailableSalesDays &&
                                                <>
                                                    <div className='control-box'>
                                                        <CustomInput
                                                            type='text'
                                                            className='input-item'
                                                            placeholder='7 ~ 90 숫자 입력'
                                                            value={availableSalesDays || ''}
                                                            onChange={(e) => onChangeAvailableSalesDays(e)}
                                                        ></CustomInput>
                                                    </div>
                                                    <div className='description'>
                                                        현재 재고로 판매 가능한 기간이 <span style={{ color: 'var(--defaultBlueColor)', fontWeight: '700' }}>{availableSalesDays || 'NaN'}</span> 일 이내인 제품들만 보여줍니다.
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </DaysConditionContainer>
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
                                                분석하기
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
        fieldName: 'PRODUCT_NAME',
        name: '상품명',
    },
    {
        fieldName: 'PRODUCT_CODE',
        name: '상품코드',
    },
    {
        fieldName: 'PRODUCT_TAG',
        name: '상품태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_NAME',
        name: '옵션명',
    },
    {
        fieldName: 'PRODUCT_OPTION_CODE',
        name: '옵션코드',
    },
    {
        fieldName: 'PRODUCT_OPTION_TAG',
        name: '옵션태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_STATUS',
        name: '옵션상태',
    }
]
