import { useState } from "react";
import { St } from "./FdSearchConsole.styled";
import CustomBlockButton from "../../../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../../../../components/image/CustomImage";
import { MdSelectCategory } from "./modals/MdSelectCategory";
import { MdSelectSubCategory } from "./modals/MdSelectSubCategory";
import CustomSelect from "../../../../../../../../../../components/select/default/v1/CustomSelect";
import CustomInput from "../../../../../../../../../../components/input/default/v1/CustomInput";
import { CustomURIEncoderUtils } from "../../../../../../../../../../utils/CustomURIEncoderUtils";
import { useSearchAggregationActionsHook, useSearchAggregationValueHook } from "../../../../../../hooks/SearchAggregationHook";
import { SortFormatUtils } from "../../../../../../../../../../utils/sortFormatUtils";

const SORT_DIRECTION_ASC = 'ASC';
const SORT_DIRECTION_DESC = 'DESC';
const DEFAULT_SORT_DIRECTION = SORT_DIRECTION_ASC;

const customURIEncoderUtils = CustomURIEncoderUtils();
const sortFormatUtils = SortFormatUtils();

export function FdSearchConsole({
    productCategoryList,
    productSubCategoryList,
}) {
    const searchAggregationValueHook = useSearchAggregationValueHook();
    const searchAggregationActionsHook = useSearchAggregationActionsHook();

    const [isHide, setIsHide] = useState(false);
    const [selectCategoryModalOpen, setSelectCategoryModalOpen] = useState(false);
    const [selectSubCategoryModalOpen, setSelectSubCategoryModalOpen] = useState(false);
    const [searchCondition, setSearchCondition] = useState('PRODUCT_NAME');
    const [searchQuery, setSearchQuery] = useState('');

    let searchFilterList = searchAggregationValueHook?.searchFilter ? customURIEncoderUtils.decodeJSONList(searchAggregationValueHook?.searchFilter) : [];
    let sortMethodList = searchAggregationValueHook?.sortTypes ? sortFormatUtils.convertSortTypesToSortMethodList(customURIEncoderUtils.decodeJSONList(searchAggregationValueHook?.sortTypes)) : [];
    
    const toggleIsHide = (bool) => {
        setIsHide(bool);
    }

    const toggleSelectCategoryModalOpen = (bool) => {
        setSelectCategoryModalOpen(bool);
    }

    const toggleSelectSubCategoryModalOpen = (bool) => {
        setSelectSubCategoryModalOpen(bool);
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

        searchAggregationActionsHook.onChangeSearchFilter(currentSearchFilterList);
        setSearchQuery('');
    }

    const handleRemoveSearchFilter = (targetSearchCondtion) => {
        let currentSearchFilterList = [...searchFilterList].filter(r => r.searchCondition !== targetSearchCondtion);

        if (!currentSearchFilterList || currentSearchFilterList?.length <= 0) {
            searchAggregationActionsHook.onChangeSearchFilter([]);
        } else {
            searchAggregationActionsHook.onChangeSearchFilter(currentSearchFilterList);
        }
    }

    const handlePushSortMethod = (sortTarget) => {
        if (!sortTarget) {
            return;
        }

        let newSortMethodList = [...sortMethodList];
        let duplicatedSortMethod = newSortMethodList?.some(r => r.sortTarget === sortTarget);
        if (duplicatedSortMethod) {
            return;
        }

        newSortMethodList.push({
            sortTarget: sortTarget,
            sortDirection: DEFAULT_SORT_DIRECTION
        })

        const sortTypes = sortFormatUtils.convertSortMethodListToSortTypes(newSortMethodList);
        searchAggregationActionsHook.onChangeSortTypes(sortTypes);
    }

    const handleRemoveSortMethod = (sortTarget) => {
        let newSortMethodList = [...sortMethodList].filter(r => r.sortTarget !== sortTarget);
        const sortTypes = sortFormatUtils.convertSortMethodListToSortTypes(newSortMethodList);
        searchAggregationActionsHook.onChangeSortTypes(sortTypes);
    }

    const handleChangeSortDirection = (sortTarget) => {
        let newSortMethodList = [...sortMethodList].map(sortMethod => {
            if (sortMethod.sortTarget === sortTarget) {
                return {
                    ...sortMethod,
                    sortDirection: sortMethod.sortDirection === SORT_DIRECTION_ASC ? SORT_DIRECTION_DESC : SORT_DIRECTION_ASC
                }
            } else { return { ...sortMethod } }
        })

        const sortTypes = sortFormatUtils.convertSortMethodListToSortTypes(newSortMethodList);
        searchAggregationActionsHook.onChangeSortTypes(sortTypes);
    }

    const handleClearAll = () => {
        searchAggregationActionsHook.onClear();
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
                                        {searchAggregationValueHook?.productCategory?.name ?? '전체'}
                                    </CustomBlockButton>
                                </div>
                                <div className='control-box'>
                                    <div className='label'>서브 카테고리</div>
                                    <CustomBlockButton
                                        type='button'
                                        className='select-button'
                                        onClick={() => toggleSelectSubCategoryModalOpen(true)}
                                    >
                                        {searchAggregationValueHook?.productSubCategory?.name ?? '전체'}
                                    </CustomBlockButton>
                                </div>
                            </St.CategorySelectorContainer>
                            <St.SearchConditionContainer>
                                <form className='control-group' onSubmit={(e) => { e.preventDefault(); handlePushSearchFilter() }}>
                                    <div className='control-box'>
                                        <CustomSelect
                                            className='select-item'
                                            value={searchCondition || ''}
                                            onChange={(e) => handleChangeSearchConditionFromEvent(e)}
                                        >
                                            <option value=''>== 검색 항목 선택 ==</option>
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
                                    <div className='subject'>검색 집합 : </div>
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
                            <St.SortTypesContainer>
                                <div className='control-group'>
                                    <div className='control-box'>
                                        <CustomSelect
                                            className='select-item'
                                            value={''}
                                            onChange={(e) => handlePushSortMethod(e.target.value)}
                                        >
                                            <option value=''>== 정렬 항목 선택 ==</option>
                                            {SORT_METHODS?.filter(r => !sortMethodList?.some(r2 => r2.sortTarget === r.sortTarget))?.map(r => {
                                                return (
                                                    <option
                                                        key={r.sortTarget}
                                                        value={r.sortTarget}
                                                    >
                                                        {r.name}
                                                    </option>
                                                );
                                            })}
                                        </CustomSelect>
                                    </div>
                                </div>
                                <div className='aggregation-item-group'>
                                    <div className='subject'>정렬 순서 : </div>
                                    {sortMethodList?.map((sortMethod, index) => {
                                        const sortName = SORT_METHODS?.find(r => r.sortTarget === sortMethod.sortTarget)?.name;
                                        return (
                                            <div key={index} className='aggregation-item'>
                                                <div className='text'>{sortName}</div>
                                                <div
                                                    className='deleteIconBtn'
                                                    onClick={() => handleChangeSortDirection(sortMethod.sortTarget)}
                                                >
                                                    {sortMethod.sortDirection === 'DESC' ?
                                                        <CustomImage
                                                            src={'/images/icon/arrow_downward_808080.svg'}
                                                        />
                                                        :
                                                        <CustomImage
                                                            src={'/images/icon/arrow_upward_808080.svg'}
                                                        />
                                                    }
                                                </div>
                                                <div
                                                    className='deleteIconBtn'
                                                    onClick={() => handleRemoveSortMethod(sortMethod.sortTarget)}
                                                >
                                                    <CustomImage
                                                        src={'/images/icon/close_default_e56767.svg'}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </St.SortTypesContainer>
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
                        </>
                    }
                </St.Wrapper>
            </St.Container>

            {selectCategoryModalOpen &&
                <MdSelectCategory
                    open={selectCategoryModalOpen}
                    productCategories={productCategoryList}
                    onClose={() => toggleSelectCategoryModalOpen(false)}
                />
            }

            {selectSubCategoryModalOpen &&
                <MdSelectSubCategory
                    open={selectSubCategoryModalOpen}
                    productSubCategories={productSubCategoryList}
                    onClose={() => toggleSelectSubCategoryModalOpen(false)}
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

const SORT_METHODS = [
    {
        sortTarget: 'PRODUCT_CID',
        name: '상품등록'
    },
    {
        sortTarget: 'PRODUCT_NAME',
        name: '상품명'
    },
    {
        sortTarget: 'PRODUCT_TAG',
        name: '상품태그'
    },
    {
        sortTarget: 'PRODUCT_OPTION_NAME',
        name: '옵션명'
    },
    {
        sortTarget: 'PRODUCT_OPTION_TAG',
        name: '옵션태그'
    },
    {
        sortTarget: 'STATUS',
        name: '상태'
    },
    {
        sortTarget: 'RELEASE_LOCATION',
        name: '출고지'
    },
    {
        sortTarget: 'MEMO',
        name: '메모'
    },
]