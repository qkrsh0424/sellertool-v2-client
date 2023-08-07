import moment from 'moment';

function diffTimeToHHmmss(startDate, endDate) {
    let diffTime = new Date(endDate) - new Date(startDate);
    let tempTime = moment.duration(diffTime);
    return moment.utc(tempTime.asMilliseconds()).format('HH : mm : ss');
}

function setPlusTime(idate, hour, min, sec) {
    var date = new Date(idate);
    date.setHours(date.getHours() + hour);
    date.setMinutes(date.getMinutes() + min);
    date.setSeconds(date.getSeconds() + sec);
    return new Date(moment(date));
}

function dateToStrYYYYMMDD(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYY.MM.DD");
}

function dateToStrHHmm(idate) {
    var date = new Date(idate);
    // var h = date.getHours() < 12 ? "오전 " : "오후 ";
    return moment(date).format("HH:mm");
}

function strToYYYYMMDD(strDate) {
    var year = strDate.substring(0, 4);
    var month = strDate.substring(4, 6);
    var day = strDate.substring(6, 8);

    var date = new Date(year, month, day);
    return moment(date).format("YYYY년 MM월 DD일");
}

export {
    setPlusTime,
    diffTimeToHHmmss,
    dateToStrYYYYMMDD,
    dateToStrHHmm,
    strToYYYYMMDD,
}