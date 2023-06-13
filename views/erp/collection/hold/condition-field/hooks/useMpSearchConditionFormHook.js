import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Mp : Management Product, 관리 상품 정보에 대한 서치 쿼리의 활성화 유무
 */
export default function useMpSearchConditionFormHook(props) {
    const router = useRouter();
    const [mpSearchYn, setMpSearchYn] = useState('n');
    const [mpSearchCondition, setMpSearchCondition] = useState('');
    const [mpSearchQuery, setMpSearchQuery] = useState('');

    useEffect(() => {
        if (!router?.query?.mpSearchCondition) {
            setMpSearchCondition('');
            return;
        }

        setMpSearchCondition(router?.query?.mpSearchCondition);
    }, [router?.query?.mpSearchCondition]);

    useEffect(() => {
        if (!router?.query?.mpSearchQuery) {
            setMpSearchQuery('');
            return;
        }

        setMpSearchQuery(router?.query?.mpSearchQuery);

    }, [router?.query?.mpSearchQuery]);

    useEffect(() => {
        if (!mpSearchCondition || !mpSearchQuery.trim()) {
            setMpSearchYn('n');
            return;
        }

        setMpSearchYn('y');
    }, [mpSearchCondition, mpSearchQuery]);

    const onChangeMpSearchCondition = (e) => {
        let value = e.target.value;

        setMpSearchCondition(value);
    }

    const onChangeMpSearchQuery = (e) => {
        let value = e.target.value;

        setMpSearchQuery(value);
    }

    return {
        mpSearchYn,
        mpSearchCondition,
        mpSearchQuery,
        onChangeMpSearchCondition,
        onChangeMpSearchQuery
    }
}