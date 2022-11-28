import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function useSearchConditionsHook(props) {
    const router = useRouter();

    const [searchCondition, setSearchCondition] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        onInitSearchCondition();
        onInitSearchQuery();
    }, [router?.query]);

    const onInitSearchCondition = useCallback(() => {
        let value = router?.query?.searchCondition || '';

        setSearchCondition(value);
    }, [router?.query?.searchCondition]);

    const onInitSearchQuery = useCallback(() => {
        let value = router?.query?.searchQuery || '';

        setSearchQuery(value);
    }, [router?.query?.searchQuery]);

    const onChangeSearchCondition = useCallback((e) => {
        let value = e.target.value;

        setSearchCondition(value);
    }, []);

    const onChangeSearchQuery = useCallback((e) => {
        let value = e.target.value;

        setSearchQuery(value);
    }, []);

    return {
        searchCondition,
        searchQuery,
        onChangeSearchCondition,
        onChangeSearchQuery
    }
}