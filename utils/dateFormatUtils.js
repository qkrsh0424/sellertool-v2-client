import moment from 'moment';

function getRemainingDateCount(closingDate) {
    let currDate = new Date();
    let nextDate = new Date(closingDate);

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.ceil((nextDate - currDate) / oneDay);

    return diffDays;
}

// For API Fetch
function getStartDate(date) {
    // Prev version
    // let cdate = new Date(date);
    // cdate.setHours(0);
    // cdate.setMinutes(1);
    // cdate.setSeconds(0);
    // cdate.setMilliseconds(0);
    // return cdate;

    // New version
    let cdate = new Date(date);
    cdate.setHours(0);
    cdate.setMinutes(0);
    cdate.setSeconds(0);
    cdate.setMilliseconds(0);
    return cdate;
}

// For API Fetch
function getEndDate(date) {
    let cdate = new Date(date);
    cdate.setHours(23);
    cdate.setMinutes(59);
    cdate.setSeconds(59);
    cdate.setMilliseconds(0);
    return cdate
}

function dateToYYMMDD(date) {
    var d = new Date(date)
    return moment(d).format("YY.MM.DD");
}

function dateToYYYYMMDD(date) {
    var d = new Date(date)
    return moment(d).format("YYYY-MM-DD");
}

function dateToYYYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function dateToYYYYMMDDhhmmssWithT(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYY-MM-DDTHH:mm:ss");
}

function dateToYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YY/MM/DD HH:mm:ss");
}

function dateToYYYYMMDDhhmmssFile(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYYMMDDHHmmss");
}

function getDiffDate(startDate, endDate) {
    let diffTime = new Date(endDate) - new Date(startDate);
    let diffDay = diffTime / (1000 * 60 * 60 * 24);

    return Math.floor(diffDay) <= 0 ? 1 : Math.floor(diffDay);
}

function dateToHHmm(idate) {
    var date = new Date(idate);
    return moment(date).format("HH:mm");
}

function getDiffHourWithUTC() {
    return Math.abs(new Date().getTimezoneOffset() / 60);
}

export {
    getStartDate,
    getEndDate,
    dateToYYMMDD,
    dateToYYYYMMDD,
    dateToYYYYMMDDhhmmss,
    dateToYYYYMMDDhhmmssWithT,
    dateToYYMMDDhhmmss,
    dateToYYYYMMDDhhmmssFile,
    getRemainingDateCount,
    getDiffDate,
    dateToHHmm,
    getDiffHourWithUTC
}