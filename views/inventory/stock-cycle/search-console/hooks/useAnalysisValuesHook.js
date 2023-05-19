import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function useAnalysisValuesHook(props) {
    const router = useRouter();
    const [days, setDays] = useState(null);
    const [usingAvailableSalesDays, setUsingAvailableSalesDays] = useState(false);
    const [availableSalesDays, setAvailableSalesDays] = useState(null);

    useEffect(() => {
        onInitDays();
        onInitAvailableSalesDays();
    }, [router?.query]);

    const onInitDays = useCallback(() => {
        let value = router?.query?.days || '10';

        setDays(value);
    }, [router?.query?.days]);

    const onInitAvailableSalesDays = useCallback(() => {
        let value = router?.query?.availableSalesDays || null;
        setUsingAvailableSalesDays(value ? true : false);
        setAvailableSalesDays(value);
    }, [router?.query?.availableSalesDays]);

    const onChangeDays = (e) => {
        const value = e.target.value;
        let regex = /^[0-9]{0,2}$/


        if (regex.test(value) && value <= 90) {
            setDays(value);
        }
    }

    const onChangeAvailableSalesDays = (e) => {
        const value = e.target.value;
        let regex = /^[0-9]{0,2}$/

        if (regex.test(value) && value <= 90) {
            setAvailableSalesDays(value);
        }

    }

    const onToggleUsingAvailableSalesDays = () => {
        if (usingAvailableSalesDays) {
            setUsingAvailableSalesDays(false);
            setAvailableSalesDays(null);
        } else {
            setUsingAvailableSalesDays(true);
            setAvailableSalesDays('7');
        }
    }

    return {
        days,
        availableSalesDays,
        usingAvailableSalesDays,
        onChangeDays,
        onChangeAvailableSalesDays,
        onToggleUsingAvailableSalesDays
    }
}