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
}

export {
    numberFormatUtils,
    numberWithCommas,
    getRemovedPrefixZero,
    roundToTwo
}