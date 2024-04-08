import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Di : Delivery Info, 배송 정보에 대한 서치 쿼리의 활성화 유무
 */
export default function useMmSearchConditionFormHook(props) {
    const router = useRouter();
    const [mmSearchYn, setMmSearchYn] = useState('n');
    const [mmSearchCondition, setMmSearchCondition] = useState('');
    const [mmSearchQuery, setMmSearchQuery] = useState('');

    useEffect(() => {
        if (!router?.query?.mmSearchCondition) {
            setMmSearchCondition('');
            return;
        }

        setMmSearchCondition(router?.query?.mmSearchCondition);
    }, [router?.query?.mmSearchCondition]);

    useEffect(() => {
        if (!router?.query?.mmSearchQuery) {
            setMmSearchQuery('');
            return;
        }

        setMmSearchQuery(router?.query?.mmSearchQuery);

    }, [router?.query?.mmSearchQuery]);

    useEffect(() => {
        if (!mmSearchCondition || !mmSearchQuery.trim()) {
            setMmSearchYn('n');
            return;
        }

        setMmSearchYn('y');
    }, [mmSearchCondition, mmSearchQuery]);

    const onChangeMmSearchCondition = (e) => {
        let value = e.target.value;

        setMmSearchCondition(value);
    }

    const onChangeMmSearchQuery = (e) => {
        let value = e.target.value;

        setMmSearchQuery(value);
    }

    return {
        mmSearchYn,
        mmSearchCondition,
        mmSearchQuery,
        onChangeMmSearchCondition,
        onChangeMmSearchQuery
    }
}