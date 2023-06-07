import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useSearchConditionsHook() {
    const router = useRouter();

    const [searchCondition, setSearchCondition] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        onInitSearchCondition();
        onInitSearchQuery();
    }, [router?.query?.searchCondition, router?.query?.searchQuery]);

    const onInitSearchCondition = useCallback(() => {
        let value = router?.query?.searchCondition || 'PRODUCT_NAME';
        setSearchCondition(value);
    }, [router?.query?.searchCondition]);

    const onInitSearchQuery = useCallback(() => {
        let value = router?.query?.searchQuery || '';

        setSearchQuery(value);
    }, [router?.query?.searchQuery]);

    const onChangeSearchCondition = useCallback((e) => {
        let value = e.target.value;

        if (!value) {
            setSearchQuery('');
        }
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