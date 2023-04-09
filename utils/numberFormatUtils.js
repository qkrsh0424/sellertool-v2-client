const numberWithCommas = (number) => {
    // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return new Intl.NumberFormat().format(number);
}

const getRemovedPrefixZero = (value) => {
    return value.replace(/(^0+)/, "");
}

const roundToTwo = (number) => {
    return +(Math.round(number + "e+2") + "e-2");
}


const numberFormatUtils = {
    numberWithCommas: (number) => {
        let formatedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formatedNumber;
    },
    isNumberValueWithDecimalPoint: (number, numberOfDigitsAfterDecimalPoint = 2) => {
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
}

export {
    numberFormatUtils,
    numberWithCommas,
    getRemovedPrefixZero,
    roundToTwo
}