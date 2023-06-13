import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function useAnalysisValuesHook(props) {
    const router = useRouter();
    const [days, setDays] = useState(null);
    const [leadTime, setLeadTime] = useState(null);
    const [loeLeadTimeOnlyYn, setLoeLeadTimeOnlyYn] = useState('n');

    useEffect(() => {
        onInitDays();
        onInitLeadTime();
        onInitLoeLeadTimeOnlyYn();
    }, [router?.query]);

    const onInitDays = useCallback(() => {
        let value = router?.query?.days || '30';

        setDays(value);
    }, [router?.query?.days]);

    const onInitLeadTime = useCallback(() => {
        let value = router?.query?.leadTime || null;

        setLeadTime(value);
    }, [router?.query?.leadTime]);

    const onInitLoeLeadTimeOnlyYn = useCallback(() => {
        let value = router?.query?.loeLeadTimeOnlyYn || 'n';

        setLoeLeadTimeOnlyYn(value);
    }, [router?.query?.loeLeadTimeOnlyYn]);

    const onChangeDays = (e) => {
        const value = e.target.value;
        let regex = /^[0-9]{0,2}$/


        if (regex.test(value) && value <= 90) {
            setDays(value);
        }
    }

    const onChangeLeadTime = (e) => {
        const value = e.target.value;
        let regex = /^[0-9]{0,2}$/


        if (regex.test(value) && value <= 90) {
            setLeadTime(value);
        }
    }

    const onToggleLoeLoadTimeOnlyYn = () => {
        setLoeLeadTimeOnlyYn(loeLeadTimeOnlyYn === 'y' ? 'n' : 'y')
    }

    return {
        days,
        leadTime,
        loeLeadTimeOnlyYn,
        onChangeDays,
        onChangeLeadTime,
        onToggleLoeLoadTimeOnlyYn,
    }
}