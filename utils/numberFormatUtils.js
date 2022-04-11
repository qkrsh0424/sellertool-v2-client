const numberWithCommas = (number) => {
    // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return new Intl.NumberFormat().format(number);
}

const getRemovedPrefixZero = (value) =>{
    return value.replace(/(^0+)/, "");
}

const roundToTwo = (number) =>{
    return +(Math.round(number + "e+2") + "e-2");
}

export {
    numberWithCommas,
    getRemovedPrefixZero,
    roundToTwo
}