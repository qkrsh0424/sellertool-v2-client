import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function usePeriodSearchConditionFormHook(props) {
    const router = useRouter();
    const [periodSearchYn, setPeriodSearchYn] = useState('n');
    const [periodSearchCondition, setPeriodSearchCondition] = useState('');
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());

    useEffect(() => {
        if (!router?.query?.periodSearchCondition) {
            setPeriodSearchCondition('');
            return;
        }

        setPeriodSearchCondition(router?.query?.periodSearchCondition);
    }, [router?.query?.periodSearchCondition]);

    useEffect(() => {
        if (!router?.query?.startDateTime) {
            return;
        }

        setStartDateTime(new Date(router?.query?.startDateTime));
    }, [router?.query?.startDateTime]);

    useEffect(() => {
        if (!router?.query?.endDateTime) {
            return;
        }

        setEndDateTime(new Date(router?.query?.endDateTime));
    }, [router?.query?.endDateTime])

    useEffect(() => {
        if (!periodSearchCondition || !startDateTime || !endDateTime) {
            setPeriodSearchYn('n');
            return;
        }

        setPeriodSearchYn('y');
    }, [periodSearchCondition, startDateTime, endDateTime]);

    const onChangePeriodType = (e) => {
        let value = e.target.value;
        setPeriodSearchCondition(value);
    }

    const onChangeStartDateTime = (value) => {
        setStartDateTime(new Date(value));
    }

    const onChangeEndDateTime = (value) => {
        setEndDateTime(new Date(value));
    }

    const onChangePeriod = (value) => {
        setStartDateTime(value.startDateTime);
        setEndDateTime(value.endDateTime);
    }

    return {
        periodSearchYn,
        periodSearchCondition,
        startDateTime,
        endDateTime,
        onChangePeriodType,
        onChangeStartDateTime,
        onChangeEndDateTime,
        onChangePeriod
    }
}