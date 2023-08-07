import moment from 'moment';

export const CustomDateUtils = () => {
    return {
        getRemainingDateCount: getRemainingDateCount,
        getStartDate: getStartDate,
        getEndDate: getEndDate,
        dateToYYMMDD: dateToYYMMDD,
        dateToYYYYMMDD: dateToYYYYMMDD,
        dateToYYYYMMDDhhmmss: dateToYYYYMMDDhhmmss,
        dateToYYYYMMDDhhmmssWithT: dateToYYYYMMDDhhmmssWithT,
        dateToYYMMDDhhmmss: dateToYYMMDDhhmmss,
        dateToYYYYMMDDhhmmssFile: dateToYYYYMMDDhhmmssFile,
        getDiffDate: getDiffDate,
        dateToHHmm: dateToHHmm,
        getDiffHourWithUTC: getDiffHourWithUTC,
        setPlusDate: setPlusDate
    }
}


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

/**
 * 
 * ex)
 * customDateUtils.dateToYYMMDDhhmmss(payment?.paidAt, '-', ':')}
 * return 23-08-01 20:00:00 (String)
 * 
 * @returns 
 */
function dateToYYMMDDhhmmss(idate, dateSeperator, timeSeperator) {
    var date = new Date(idate);
    let dsep = dateSeperator ? dateSeperator : '/';
    let tsep = timeSeperator ? timeSeperator : ':';

    return moment(date).format(`YY${dsep}MM${dsep}DD HH${tsep}mm${tsep}ss`);
}

function dateToYYYYMMDDhhmmssFile(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYYMMDDHHmmss");
}

function getDiffDate(startDate, endDate) {
    const day = 24 * 60 * 60 * 1000;

    const fDateTime = new Date(startDate);
    const sDateTime = new Date(endDate);

    fDateTime.setHours(0, 0, 0, 0);
    sDateTime.setHours(0, 0, 0, 0);

    const diffMilli = Math.abs(sDateTime - fDateTime);
    const diffDays = Math.round(diffMilli / day);

    return diffDays + 1;
}

function dateToHHmm(idate) {
    var date = new Date(idate);
    return moment(date).format("HH:mm");
}

function getDiffHourWithUTC() {
    return Math.abs(new Date().getTimezoneOffset() / 60);
}

function setPlusDate(idate, prevYear, prevMonth, prevDay) {
    var date = new Date(idate);
    date.setFullYear(date.getFullYear() + prevYear)
    date.setMonth(date.getMonth() + prevMonth);
    date.setDate(date.getDate() + prevDay);
    return new Date(moment(date));
}