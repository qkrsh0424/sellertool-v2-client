import { useState } from "react";
import { Container } from "./styles/Operator.styled";
import { CategoryControlFieldView } from "./view/CategoryControlField.view";
import { SearchInfoFieldView } from "./view/SearchInfoField.view";
import { CategoryControlModalComponent } from "../category-control-modal/v1";
import SearchOperatorFieldView from "./view/SearchOperatorField.view";
import useSearchOperatorFormHook from "./hooks/useSearchOperatorFormHook";
import { useRouter } from "next/router";

export function OperatorComponent({
    categories,
    recordList,
    rankSearchInfo,
    onSearchNRankRecordCategories
}) {
    const router = useRouter();

    const [categoryControlModalOpen, setCategoryControlModalOpen] = useState(false);
    
    const {
        searchCondition,
        searchQuery,
        searchCategoryId,
        searchStatus,
        sortColumn,
        onChangeSearchCondition,
        onChangeSearchQuery,
        onChangeSearchCategory,
        onChangeSearchStatus,
        onChangeSortColumn
    } = useSearchOperatorFormHook();

    const handleOpenCategoryControlModal = () => {
        setCategoryControlModalOpen(true)
    }

    const handleCloseCategoryControlModal = () => {
        setCategoryControlModalOpen(false);
    }

    const handleSubmitClear = () => {
        router.replace({
            pathname: router?.pathname,
            query: {
                page: 1,
                size: 20
            }
        }, undefined, { scroll: false })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let params = {
            ...router.query
        }

        if (searchCondition) {
            params.searchCondition = searchCondition
            params.searchQuery = searchQuery
        } else {
            delete params.searchCondition
            delete params.searchQuery
        }

        if (searchCategoryId) {
            params.searchCategoryId = searchCategoryId
        } else {
            delete params.searchCategoryId
        }

        if (searchStatus) {
            params.searchStatus = searchStatus
        } else {
            delete params.searchStatus
        }

        if (sortColumn) {
            params.sortColumn = sortColumn
        } else {
            delete params.sortColumn
        }

        router.replace({
            pathname: router?.pathname,
            query: {
                ...params,
                page: 1,

            }
        }, undefined, { scroll: false })
    }

    return (
        <>
            <Container>
                <SearchInfoFieldView
                    recordList={recordList}
                    rankSearchInfo={rankSearchInfo}
                />

                <SearchOperatorFieldView
                    categories={categories}
                    searchCondition={searchCondition}
                    searchQuery={searchQuery}
                    searchCategoryId={searchCategoryId}
                    searchStatus={searchStatus}
                    sortColumn={sortColumn}
                    onChangeSearchCondition={onChangeSearchCondition}
                    onChangeSearchQuery={onChangeSearchQuery}
                    onChangeSearchCategory={onChangeSearchCategory}
                    onChangeSearchStatus={onChangeSearchStatus}
                    onChangeSortColumn={onChangeSortColumn}
                    handleSubmitClear={handleSubmitClear}
                    handleSubmit={handleSubmit}
                />

                <CategoryControlFieldView
                    handleOpenCategoryControlModal={handleOpenCategoryControlModal}
                />

                {categoryControlModalOpen &&
                    <CategoryControlModalComponent
                        open={categoryControlModalOpen}
                        onClose={handleCloseCategoryControlModal}
                        categories={categories}
                        onSearchNRankRecordCategories={onSearchNRankRecordCategories}
                    />
                }
            </Container>
        </>
    )
}
