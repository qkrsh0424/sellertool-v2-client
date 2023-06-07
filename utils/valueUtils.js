const valueUtils = {
    /**
     * 넘어온 값이 빈값인지 체크.
     * [], {}, ' ' 빈값 처리
     * 숫자 0 통과
     */
    isEmptyValues: (value) => {
        return value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0);
    },
    isEmptyNumbers: (value) => {
        return value === undefined || value === null || isNaN(value) || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0);
    },
    emptyCheckAndGet: (value, emptyReturn) => {
        if (valueUtils.isEmptyValues(value)) {
            return emptyReturn || '';
        } else {
            return value;
        }
    },
    reorder: (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    },
}

// date1 < date2 -> return 1
// date1 === date2 -> return 0
// date1 > date2 -> return -1
export function compareDate(date1, date2) {
    if (!(date1 && date2)) {
        return;
    }

    let compareDate1 = new Date(date1);
    let compareDate2 = new Date(date2);

    if (compareDate2 < compareDate1) {
        return -1;
    } else if (compareDate1 > compareDate2) {
        return 1;
    } else {
        return 0;
    }
}

export default valueUtils;