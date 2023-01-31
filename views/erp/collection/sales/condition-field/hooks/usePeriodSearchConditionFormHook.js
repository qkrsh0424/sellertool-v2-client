import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEndDate, getStartDate } from "../../../../../../utils/dateFormatUtils";

export default function usePeriodSearchConditionFormHook(props) {
    const router = useRouter();
    const [periodSearchYn, setPeriodSearchYn] = useState('n');
    const [periodSearchCondition, setPeriodSearchCondition] = useState('');
    const [startDateTime, setStartDateTime] = useState(getStartDate(new Date()));
    const [endDateTime, setEndDateTime] = useState(getEndDate(new Date()));

    useEffect(() => {
        if (!router?.query?.periodSearchCondition) {
            setPeriodSearchCondition('');
            return;
        }

        setPeriodSearchCondition(router?.query?.periodSearchCondition);
    }, [router?.query?.periodSearchCondition]);

    useEffect(() => {
        if (!router?.query?.startDateTime) {
            setStartDateTime(getStartDate(new Date()));
            return;
        }

        setStartDateTime(getStartDate(router?.query?.startDateTime));
    }, [router?.query?.startDateTime]);

    useEffect(() => {
        if (!router?.query?.endDateTime) {
            setEndDateTime(getEndDate(new Date()));
            return;
        }

        setEndDateTime(getEndDate(router?.query?.endDateTime));
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
        setStartDateTime(getStartDate(value || new Date()));
    }

    const onChangeEndDateTime = (value) => {
        setEndDateTime(getEndDate(value || new Date()));
    }

    return {
        periodSearchYn,
        periodSearchCondition,
        startDateTime,
        endDateTime,
        onChangePeriodType,
        onChangeStartDateTime,
        onChangeEndDateTime
    }
}