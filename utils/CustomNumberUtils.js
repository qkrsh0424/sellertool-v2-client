export const CustomNumberUtils = () => {
    return {
        numberWithCommas: numberWithCommas,
        numberWithCommas2: numberWithCommas2,
        isNumberValueWithDecimalPoint: isNumberValueWithDecimalPoint,
        toPriceUnitFormat: toPriceUnitFormat,
        isNumericValue: isNumericValue,
        getRemovedPrefixZero: getRemovedPrefixZero,
        roundToTwo: roundToTwo,
        roundToDigit: roundToDigit,
        hasPrefixZero: hasPrefixZero,
        returnExchangeRateValue: returnExchangeRateValue
    }
}

function numberWithCommas(number) {
    let formatedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formatedNumber;
};

// 소숫점 아래에는 콤마 표시를 하지않는 버전
function numberWithCommas2(number) {
    let num = number || '';
    // 숫자를 정수 부분과 소수 부분으로 분리
    let parts = num.toString().split(".");

    // 정수 부분에만 쉼표 추가
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 정수 부분과 소수 부분을 다시 합치기
    return parts.join(".");
};

function isNumberValueWithDecimalPoint(number, numberOfDigitsAfterDecimalPoint = 2) {
    /**
     * 1. 0-9 숫자와 소숫점 "." 만 입력 받을 수 있음.
     * 2. "."는 단독으로 사용할 수 없음.
     * 3. 소숫점 아래는 2자리까지만 허용함.
     * 4. 첫글자가 0이 오면 뒤에 글자는 "." 이외에는 입력받을 수 없음.
     */
    // const regex = /^(([1-9]\d*)|0)(\.\d{0,2})?$/
    const regex = new RegExp(`^(([1-9]\\d*)|0)(\\.\\d{0,${numberOfDigitsAfterDecimalPoint}})?$`);
    return regex.test(number);
}

function hasPrefixZero(number) {
    const regex = /^0.+/;
    return regex.test(number);
}

function toPriceUnitFormat(price) {
    let priceSize = price?.toString().length;

    if (priceSize > 8) {
        return parseFloat((price / (10 ** 8)).toFixed(2)) + ' 억원';
    } else if (priceSize > 7) {
        return parseFloat((price / (10 ** 7)).toFixed(2)) + ' 천만원';
    } else if (priceSize > 6) {
        return parseFloat((price / (10 ** 6)).toFixed(2)) + ' 백만원';
    } else if (priceSize > 4) {
        return parseFloat((price / (10 ** 4)).toFixed(2)) + ' 만원';
    } else if (priceSize > 3) {
        return parseFloat((price / (10 ** 3)).toFixed(2)) + ' 천원';
    } else {
        return price + ' 원';
    }
}

function isNumericValue(value) {
    if (/^\d+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}

const getRemovedPrefixZero = (value) => {
    return value.replace(/(^0+)/, "");
}

const roundToTwo = (number) => {
    return +(Math.round(number + "e+2") + "e-2");
}

const roundToDigit = (number, digit) => {
    return +(Math.round(number + `e+${digit}`) + `e-${digit}`);
}

const returnExchangeRateValue = (baseExchangeRateList, currentBaseExchangeRateId) => {
    let baseExchangeRate = baseExchangeRateList?.find(r => r.id === currentBaseExchangeRateId) || baseExchangeRateList[0];
    if (baseExchangeRate?.valueType === 'STATIC') {
        return baseExchangeRate?.staticValue;
    } else if (baseExchangeRate?.valueType === 'DYNAMIC') {
        let dynamicExchangeRate = baseExchangeRateList?.find(r => r.id === baseExchangeRate?.dynamicValueRelatedId) || baseExchangeRateList[0];
        let value = dynamicExchangeRate?.staticValue + dynamicExchangeRate?.extraValue;

        return value;
    } else {
        return baseExchangeRateList[0]?.staticValue;
    }
}