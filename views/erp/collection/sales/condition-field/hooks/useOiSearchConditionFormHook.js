import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Oi : Order Info, 주문 정보에 대한 서치 쿼리의 활성화 유무
 */
export default function useOiSearchConditionFormHook(props) {
    const router = useRouter();
    const [oiSearchYn, setOiSearchYn] = useState('n');
    const [oiSearchCondition, setOiSearchCondition] = useState('');
    const [oiSearchQuery, setOiSearchQuery] = useState('');

    useEffect(()=>{
        if(!router?.query?.oiSearchCondition){
            setOiSearchCondition('');
            return;
        }

        setOiSearchCondition(router?.query?.oiSearchCondition);
    },[router?.query?.oiSearchCondition]);

    useEffect(()=>{
        if(!router?.query?.oiSearchQuery){
            setOiSearchQuery('');
            return;
        }

        setOiSearchQuery(router?.query?.oiSearchQuery);
    },[router?.query?.oiSearchQuery]);

    useEffect(() => {
        if (!oiSearchCondition || !oiSearchQuery.trim()) {
            setOiSearchYn('n');
            return;
        }

        setOiSearchYn('y');
    }, [oiSearchCondition, oiSearchQuery]);

    const onChangeOiSearchCondition = (e) => {
        let value = e.target.value;

        setOiSearchCondition(value);
    }

    const onChangeOiSearchQuery = (e) => {
        let value = e.target.value;

        setOiSearchQuery(value);
    }

    return {
        oiSearchYn,
        oiSearchCondition,
        oiSearchQuery,
        onChangeOiSearchCondition,
        onChangeOiSearchQuery
    }
}