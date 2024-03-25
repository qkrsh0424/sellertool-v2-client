import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Di : Delivery Info, 배송 정보에 대한 서치 쿼리의 활성화 유무
 */
export default function useDiSearchConditionFormHook(props) {
    const router = useRouter();
    const [diSearchYn, setDiSearchYn] = useState('n');
    const [diSearchCondition, setDiSearchCondition] = useState('');
    const [diSearchQuery, setDiSearchQuery] = useState('');

    useEffect(() => {
        if (!router?.query?.diSearchCondition) {
            setDiSearchCondition('');
            return;
        }

        setDiSearchCondition(router?.query?.diSearchCondition);
    }, [router?.query?.diSearchCondition]);

    useEffect(() => {
        if (!router?.query?.diSearchQuery) {
            setDiSearchQuery('');
            return;
        }

        setDiSearchQuery(router?.query?.diSearchQuery);

    }, [router?.query?.diSearchQuery]);

    useEffect(() => {
        if (!diSearchCondition || !diSearchQuery.trim()) {
            setDiSearchYn('n');
            return;
        }

        setDiSearchYn('y');
    }, [diSearchCondition, diSearchQuery]);

    const onChangeDiSearchCondition = (e) => {
        let value = e.target.value;

        setDiSearchCondition(value);
    }

    const onChangeDiSearchQuery = (e) => {
        let value = e.target.value;

        setDiSearchQuery(value);
    }

    return {
        diSearchYn,
        diSearchCondition,
        diSearchQuery,
        onChangeDiSearchCondition,
        onChangeDiSearchQuery
    }
}