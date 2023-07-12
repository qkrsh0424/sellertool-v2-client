import moment from 'moment';

function diffTimeToHHmmss(startDate, endDate) {
    let diffTime = new Date(endDate) - new Date(startDate);
    let tempTime = moment.duration(diffTime);
    console.log(tempTime.asMilliseconds())
    return moment.utc(tempTime.asMilliseconds()).format('HH : mm : ss');
}

function setPlusTime(idate, hour, min, sec) {
    var date = new Date(idate);
    date.setHours(date.getHours() + hour);
    date.setMinutes(date.getMinutes() + min);
    date.setSeconds(date.getSeconds() + sec);
    return new Date(moment(date));
}

export {
    setPlusTime,
    diffTimeToHHmmss
}