import { useState } from "react";
import { St } from "./FdSearchConsole.styled";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../components/image/CustomImage";
import { MdSelectCategory } from "./modals/MdSelectCategory";
import { MdSelectSubCategory } from "./modals/MdSelectSubCategory";
import CustomSelect from "../../../../../components/select/default/v1/CustomSelect";
import CustomInput from "../../../../../components/input/default/v1/CustomInput";
import { useRouter } from "next/router";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";

const customURIEncoderUtils = CustomURIEncoderUtils();

export function FdSearchConsole({
    productCategoryList,
    productSubCategoryList,
    productCategory,
    productSubCategory,
    onSelectProductCategory,
    onSelectProductSubCategory,
}) {
    const router = useRouter();
    const [isHide, setIsHide] = useState(false);
    const [selectCategoryModalOpen, setSelectCategoryModalOpen] = useState(false);
    const [selectSubCategoryModalOpen, setSelectSubCategoryModalOpen] = useState(false);
    const [searchCondition, setSearchCondition] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    let searchFilterList = customURIEncoderUtils.decodeJSONList(router?.query?.searchFilter)

    const toggleIsHide = (bool) => {
        setIsHide(bool);
    }

    const toggleSelectCategoryModalOpen = (bool) => {
        setSelectCategoryModalOpen(bool);
    }

    const toggleSelectSubCategoryModalOpen = (bool) => {
        setSelectSubCategoryModalOpen(bool);
    }

    const handleSelectProductCategory = (value) => {
        onSelectProductCategory(value);
    }

    const handleSelectSubProductCategory = (value) => {
        onSelectProductSubCategory(value);
    }

    const handleChangeSearchConditionFromEvent = (e) => {
        const value = e.target.value;
        setSearchCondition(value);
    }

    const handleChangeSearchQueryFromEvent = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    }

    const handlePushSearchFilter = () => {
        if (!searchCondition || !searchQuery) {
            return;
        }

        let currentSearchFilterList = [...searchFilterList];
        let targetSearchFilter = currentSearchFilterList?.find(r => r.searchCondition === searchCondition);

        if (targetSearchFilter) {
            targetSearchFilter.searchQuery = searchQuery;
        } else {
            currentSearchFilterList = [
                ...currentSearchFilterList,
                {
                    searchCondition: searchCondition,
                    searchQuery: searchQuery
                }
            ]
        }

        router.replace({
            pathname: router?.pathname,
            query: {
                ...router?.query,
                page: 1,
                searchFilter: customURIEncoderUtils.encodeJSONList(currentSearchFilterList)
            }
        }, undefined, { scroll: false })
        setSearchQuery('');
    }

    const handleRemoveSearchFilter = (targetSearchCondtion) => {
        let currentSearchFilterList = [...searchFilterList].filter(r => r.searchCondition !== targetSearchCondtion);
        let query = { ...router?.query };

        if (!currentSearchFilterList || currentSearchFilterList?.length <= 0) {
            delete query?.searchFilter
        } else {
            query.searchFilter = customURIEncoderUtils.encodeJSONList(currentSearchFilterList);
        }

        router.replace({
            pathname: router?.pathname,
            query: { ...query }
        }, undefined, { scroll: false })
    }

    const handleClearAll = () => {
        router.replace({
            pathname: router?.pathname
        }, undefined, { scroll: false });
    }
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <HeaderTitle
                        isHide={isHide}
                        toggleIsHide={toggleIsHide}
                    />
                    {!isHide &&
                        <>
                            <St.CategorySelectorContainer>
                                <div className='control-box'>
                                    <div className='label'>카테고리</div>
                                    <CustomBlockButton
                                        type='button'
                                        className='select-button'
                                        onClick={() => toggleSelectCategoryModalOpen(true)}
                                    >
                                        {productCategory?.name ?? '전체'}
                                    </CustomBlockButton>
                                </div>
                                <div className='control-box'>
                                    <div className='label'>서브 카테고리</div>
                                    <CustomBlockButton
                                        type='button'
                                        className='select-button'
                                        onClick={() => toggleSelectSubCategoryModalOpen(true)}
                                    >
                                        {productSubCategory?.name ?? '전체'}
                                    </CustomBlockButton>
                                </div>
                            </St.CategorySelectorContainer>
                            <St.SearchConditionContainer>
                                <div className='label'>조회 필터</div>
                                <form className='control-group' onSubmit={(e) => { e.preventDefault(); handlePushSearchFilter() }}>
                                    <div className='control-box'>
                                        <CustomSelect
                                            className='select-item'
                                            value={searchCondition || ''}
                                            onChange={(e) => handleChangeSearchConditionFromEvent(e)}
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
                                                onChange={(e) => handleChangeSearchQueryFromEvent(e)}
                                                autoFocus
                                            ></CustomInput>
                                        </div>
                                    }
                                    {searchCondition &&
                                        <div className='control-box'>
                                            <CustomBlockButton
                                                type='submit'
                                                className='add-button'
                                            >추가</CustomBlockButton>
                                        </div>
                                    }
                                </form>
                                <div className='searchFilter-item-group'>
                                    <div className='subject'>필터 집합 : </div>
                                    {searchFilterList?.map((searchFilter, index) => {
                                        const searchConditionName = SEARCH_CONDITIONS?.find(r => r.fieldName === searchFilter?.searchCondition)?.name;
                                        return (
                                            <div key={index} className='searchFilter-item'>
                                                <div className='text'>{searchConditionName} : {searchFilter?.searchQuery}</div>
                                                <div
                                                    className='deleteIconBtn'
                                                    onClick={() => handleRemoveSearchFilter(searchFilter?.searchCondition)}
                                                >
                                                    <CustomImage
                                                        src={'/images/icon/close_default_e56767.svg'}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </St.SearchConditionContainer>
                        </>
                    }
                    <St.FooterButtonContainer>
                        <div className='button-group'>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => handleClearAll()}
                            >
                                초기화
                            </CustomBlockButton>
                        </div>
                    </St.FooterButtonContainer>
                </St.Wrapper>
            </St.Container>

            {selectCategoryModalOpen &&
                <MdSelectCategory
                    open={selectCategoryModalOpen}
                    productCategory={productCategory}
                    productCategories={productCategoryList}
                    onClose={() => toggleSelectCategoryModalOpen(false)}
                    onSelectCategory={handleSelectProductCategory}
                />
            }

            {selectSubCategoryModalOpen &&
                <MdSelectSubCategory
                    open={selectSubCategoryModalOpen}
                    productSubCategory={productSubCategory}
                    productSubCategories={productSubCategoryList}
                    onClose={() => toggleSelectSubCategoryModalOpen(false)}
                    onSelectSubCategory={handleSelectSubProductCategory}
                />
            }
        </>
    );
}

function HeaderTitle({
    isHide,
    toggleIsHide
}) {
    return (
        <St.HeaderWrapper>
            <div className='title'>상세조회</div>
            {isHide ?
                <CustomBlockButton
                    type='button'
                    className='dropdown-button-item'
                    onClick={() => toggleIsHide(false)}
                >
                    <CustomImage
                        src='/images/icon/arrowDropDown_default_808080.svg'
                    />
                </CustomBlockButton>
                :
                <CustomBlockButton
                    type='button'
                    className='dropdown-button-item'
                    onClick={() => toggleIsHide(true)}
                >
                    <CustomImage
                        src='/images/icon/arrowDropUp_default_808080.svg'
                    />
                </CustomBlockButton>
            }
        </St.HeaderWrapper>
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
    },
    {
        fieldName: 'PRODUCT_OPTION_RELEASE_LOCATION',
        name: '출고지',
    }
]