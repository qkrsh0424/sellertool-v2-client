import { useState } from "react";
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../components/image/CustomImage";
import * as ITheme from "../../themes/InventoryTheme";
import * as St from './FgSearchConsole.styled';
import CustomSelect from "../../../../components/select/default/v1/CustomSelect";
import CustomInput from "../../../../components/input/default/v1/CustomInput";
import { MdSelectCategory } from "./modals/MdSelectCategory";
import { MdSelectSubCategory } from "./modals/MdSelectSubCategory";

export function FgSearchConsole({
    SEARCH_CONDITIONS,
    SORT_METHODS,
    DEFAULT_SORT_DIRECTION,

    productCategoryList,
    productSubCategoryList,
    productCategory,
    productSubCategory,

    searchFilterList,
    sortMethodList,

    onSelectProductCategoryId,
    onSelectProductSubCategoryId,
    onChangeSearchFilter,
    onChangeSortTypes,
    onClear
}) {
    const [isHide, setIsHide] = useState(true);
    const [productCategoryListModalOpen, setProductCategoryListModalOpen] = useState(false);
    const [productSubCategoryListModalOpen, setProductSubCategoryListModalOpen] = useState(false);
    const [searchCondition, setSearchCondition] = useState('PRODUCT_NAME');
    const [searchQuery, setSearchQuery] = useState('');


    const toggleIsHide = (bool) => {
        setIsHide(bool);
    }

    const toggleProductCategoryListModalOpen = (bool) => {
        setProductCategoryListModalOpen(bool);
    }
    const toggleProductSubCategoryListModalOpen = (bool) => {
        setProductSubCategoryListModalOpen(bool);
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

        onChangeSearchFilter(currentSearchFilterList);
        setSearchQuery('');
    }

    const handleRemoveSearchFilter = (targetSearchCondtion) => {
        let currentSearchFilterList = [...searchFilterList].filter(r => r.searchCondition !== targetSearchCondtion);

        if (!currentSearchFilterList || currentSearchFilterList?.length <= 0) {
            onChangeSearchFilter([]);
        } else {
            onChangeSearchFilter(currentSearchFilterList);
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

        onChangeSortTypes(newSortMethodList);
    }

    const handleRemoveSortMethod = (sortTarget) => {
        let newSortMethodList = [...sortMethodList].filter(r => r.sortTarget !== sortTarget);
        onChangeSortTypes(newSortMethodList);
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

        onChangeSortTypes(newSortMethodList);
    }

    const handleClearAll = () => {
        onClear();
    }

    return (
        <>
            <ITheme.Style>
                <St.Container>
                    <St.FieldLayout>
                        <Header
                            isHide={isHide}
                            toggleIsHide={toggleIsHide}
                        />
                        {isHide &&
                            <>
                                <Body
                                    SEARCH_CONDITIONS={SEARCH_CONDITIONS}
                                    SORT_METHODS={SORT_METHODS}

                                    productCategory={productCategory}
                                    productSubCategory={productSubCategory}
                                    searchFilterList={searchFilterList}
                                    sortMethodList={sortMethodList}

                                    searchCondition={searchCondition}
                                    searchQuery={searchQuery}

                                    toggleProductCategoryListModalOpen={toggleProductCategoryListModalOpen}
                                    toggleProductSubCategoryListModalOpen={toggleProductSubCategoryListModalOpen}
                                    handleChangeSearchConditionFromEvent={handleChangeSearchConditionFromEvent}
                                    handleChangeSearchQueryFromEvent={handleChangeSearchQueryFromEvent}
                                    handlePushSearchFilter={handlePushSearchFilter}
                                    handleRemoveSearchFilter={handleRemoveSearchFilter}
                                    handlePushSortMethod={handlePushSortMethod}
                                    handleRemoveSortMethod={handleRemoveSortMethod}
                                    handleChangeSortDirection={handleChangeSortDirection}
                                />
                                <Footer
                                    handleClearAll={handleClearAll}
                                />
                            </>
                        }
                    </St.FieldLayout>
                </St.Container>
                {productCategoryListModalOpen &&
                    <MdSelectCategory
                        open={productCategoryListModalOpen}
                        productCategoryList={productCategoryList}
                        productCategory={productCategory}
                        onSelect={(productCategoryId) => onSelectProductCategoryId(productCategoryId)}
                        onClose={() => toggleProductCategoryListModalOpen(false)}
                    />
                }

                {productSubCategoryListModalOpen &&
                    <MdSelectSubCategory
                        open={productSubCategoryListModalOpen}
                        productSubCategoryList={productSubCategoryList}
                        productSubCategory={productSubCategory}
                        onSelect={(productSubCategoryId) => onSelectProductSubCategoryId(productSubCategoryId)}
                        onClose={() => toggleProductSubCategoryListModalOpen(false)}
                    />
                }
            </ITheme.Style>
        </>
    );
}

function Header({
    isHide,
    toggleIsHide
}) {
    return (
        <St.HeaderLayout>
            <div className="f__header3">상세조회</div>
            {isHide ?
                <CustomBlockButton
                    type='button'
                    className='button__icon'
                    onClick={() => toggleIsHide(false)}
                >
                    <CustomImage
                        src='/images/icon/arrowDropUp_default_000000.svg'
                    />
                </CustomBlockButton>
                :
                <CustomBlockButton
                    type='button'
                    className='button__icon'
                    onClick={() => toggleIsHide(true)}
                >
                    <CustomImage
                        src='/images/icon/arrowDropDown_default_000000.svg'
                    />
                </CustomBlockButton>
            }
        </St.HeaderLayout>
    )
}

function Body({
    SEARCH_CONDITIONS,
    SORT_METHODS,

    productCategory,
    productSubCategory,
    searchFilterList,
    sortMethodList,

    searchCondition,
    searchQuery,

    toggleProductCategoryListModalOpen,
    toggleProductSubCategoryListModalOpen,
    handleChangeSearchConditionFromEvent,
    handleChangeSearchQueryFromEvent,
    handlePushSearchFilter,
    handleRemoveSearchFilter,
    handlePushSortMethod,
    handleRemoveSortMethod,
    handleChangeSortDirection
}) {
    return (
        <St.BodyLayout>
            <St.BodyLayout__CategorySelectorContainer>
                <div className='categorySelector__box'>
                    <label className='f__normal'>카테고리</label>
                    <CustomBlockButton
                        type='button'
                        className='select-button'
                        onClick={() => toggleProductCategoryListModalOpen(true)}
                    >
                        {productCategory?.name ?? '전체'}
                    </CustomBlockButton>
                </div>
                <div className='categorySelector__box'>
                    <label className='f__normal'>서브 카테고리</label>
                    <CustomBlockButton
                        type='button'
                        className='select-button'
                        onClick={() => toggleProductSubCategoryListModalOpen(true)}
                    >
                        {productSubCategory?.name ?? '전체'}
                    </CustomBlockButton>
                </div>
            </St.BodyLayout__CategorySelectorContainer>
            <St.BodyLayout__SearchFilterContainer>
                <form className='form__box' onSubmit={(e) => { e.preventDefault(); handlePushSearchFilter() }}>
                    <div className='eventControl__box'>
                        <CustomSelect
                            className='f__normal'
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
                        <>
                            <div className='eventControl__box'>
                                <CustomInput
                                    type='text'
                                    className='f__normal'
                                    placeholder='검색어를 입력하세요.'
                                    value={searchQuery || ''}
                                    onChange={(e) => handleChangeSearchQueryFromEvent(e)}
                                    autoFocus
                                ></CustomInput>
                            </div>
                            <div className='eventControl__box'>
                                <CustomBlockButton
                                    type='submit'
                                    className='add-button f__normal fw__700'
                                >추가</CustomBlockButton>
                            </div>
                        </>
                    }
                </form>
                {(searchFilterList && searchFilterList?.length > 0) &&
                    <div className='itemList__box'>
                        <div className='f__normal'>검색 집합 : </div>
                        {searchFilterList?.map((searchFilter, index) => {
                            const searchConditionName = SEARCH_CONDITIONS?.find(r => r.fieldName === searchFilter?.searchCondition)?.name;
                            return (
                                <div key={index} className='item__box'>
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
                }
            </St.BodyLayout__SearchFilterContainer>
            <St.BodyLayout__SortTypeContainer>
                <div className='eventControlGroup__box'>
                    <div className='eventControl__box'>
                        <CustomSelect
                            className='f__normal'
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
                {(sortMethodList && sortMethodList?.length > 0) &&
                    <div className='itemList__box'>
                        <div className='f__normal'>정렬 순서 : </div>
                        {sortMethodList?.map((sortMethod, index) => {
                            const sortName = SORT_METHODS?.find(r => r.sortTarget === sortMethod.sortTarget)?.name;
                            return (
                                <div key={index} className='item__box'>
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
                }
            </St.BodyLayout__SortTypeContainer>
        </St.BodyLayout>
    );
}

function Footer({
    handleClearAll
}) {
    return (
        <St.FooterLayout>
            <St.FooterLayout__ButtonGroupContainer>
                <CustomBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => handleClearAll()}
                >
                    초기화
                </CustomBlockButton>
            </St.FooterLayout__ButtonGroupContainer>
        </St.FooterLayout>
    );
}