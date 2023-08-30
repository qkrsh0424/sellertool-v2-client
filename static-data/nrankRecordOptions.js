const RECORD_SEARCHABLE_DIFF_SECONDS = 60 * 10;     // 10분

// // server 설정값에 따라간다
const TOTAL_REQUEST_TIMEOUT_SIZE = 60       // 60초
const RECORD_PENDING_STATUS_EXCEED_SECONDS = TOTAL_REQUEST_TIMEOUT_SIZE + 15;

function getSearchableDiffSeconds() {
    return RECORD_SEARCHABLE_DIFF_SECONDS
}

function getRecordPendingStatusExceedSeconds() {
    return RECORD_PENDING_STATUS_EXCEED_SECONDS
}

export {
    getSearchableDiffSeconds,
    getRecordPendingStatusExceedSeconds
}