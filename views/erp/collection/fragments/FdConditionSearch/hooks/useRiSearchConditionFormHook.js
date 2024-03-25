import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Ri : Receiver Info, 수취인 정보에 대한 서치 쿼리의 활성화 유무
 */
export default function useRiSearchConditionFormHook(props) {
    const router = useRouter();
    const [riSearchYn, setRiSearchYn] = useState('n');
    const [riSearchCondition, setRiSearchCondition] = useState('');
    const [riSearchQuery, setRiSearchQuery] = useState('');

    useEffect(() => {
        if (!router?.query?.riSearchCondition) {
            setRiSearchCondition('');
            return;
        }

        setRiSearchCondition(router?.query?.riSearchCondition);
    }, [router?.query?.riSearchCondition]);

    useEffect(() => {
        if (!router?.query?.riSearchQuery) {
            setRiSearchQuery('');
            return;
        }

        setRiSearchQuery(router?.query?.riSearchQuery);
    }, [router?.query?.riSearchQuery]);

    useEffect(() => {
        if (!riSearchCondition || !riSearchQuery.trim()) {
            setRiSearchYn('n');
            return;
        }

        setRiSearchYn('y');
    }, [riSearchCondition, riSearchQuery]);

    const onChangeRiSearchCondition = (e) => {
        let value = e.target.value;

        setRiSearchCondition(value);
    }

    const onChangeRiSearchQuery = (e) => {
        let value = e.target.value;

        setRiSearchQuery(value);
    }

    return {
        riSearchYn,
        riSearchCondition,
        riSearchQuery,
        onChangeRiSearchCondition,
        onChangeRiSearchQuery
    }
}