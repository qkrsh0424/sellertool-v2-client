import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export default function useSearchOperatorFormHook() {
    const router = useRouter();
    
    const [searchCondition, setSearchCondition] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchCategoryId, setSearchCategoryId] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);

    useEffect(() => {
        if(!router?.query?.searchCondition) {
            setSearchCondition(null);
            return;
        }

        setSearchCondition(router?.query?.searchCondition);
    }, [router?.query?.searchCondition]);

    useEffect(() => {
        if(!router?.query?.searchQuery) {
            setSearchQuery(null);
        }

        setSearchQuery(router?.query?.searchQuery);
    }, [router?.query?.searchQuery])

    useEffect(() => {
        if(!router?.query?.searchCategoryId) {
            setSearchCategoryId(null);
            return;
        }

        setSearchCategoryId(router?.query?.searchCategoryId);
    }, [router?.query?.searchCategoryId]);

    useEffect(() => {
        if(!router?.query?.searchStatus) {
            setSearchStatus(null);
            return;
        }

        setSearchStatus(router?.query?.searchStatus);
    }, [router?.query?.searchStatus])

    useEffect(() => {
        if(!router?.query?.sortColumn) {
            setSortColumn(null);
            return;
        }

        setSortColumn(router?.query?.sortColumn);
    }, [router?.query?.sortColumn])

    const onChangeSearchCondition = (e) => {
        let value = e.target.value;

        setSearchCondition(value)
        if(!value) {
            setSearchQuery(null);
        }
    }

    const onChangeSearchQuery = (e) => {
        let value = e.target.value;

        setSearchQuery(value)
    }

    const onChangeSearchCategory = (e) => {
        let value = e.target.value;

        setSearchCategoryId(value)
    }

    const onChangeSearchStatus = (e) => {
        let value = e.target.value;

        setSearchStatus(value)
    }

    const onChangeSortColumn = (e) => {
        let value = e.target.value;

        setSortColumn(value);
    }

    return {
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
    }
}