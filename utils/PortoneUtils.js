const IMP_CODE = process.env.NODE_ENV == 'development' ? process.env.development.portoneImpCode : process.env.production.portoneImpCode
const PORTONE_NOTICE_URL = process.env.NODE_ENV == 'development' ? process.env.development.portoneNoticeUrl : process.env.production.portoneNoticeUrl
const CLIENT_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.clientAddress : process.env.production.clientAddress

export const PortoneUtils = () => {
    return {
        requestPay: requestPay
    }
}

/*
options.payData = {
    pg: "string",
    pay_method: "string",
    merchant_uid: "string",
    name: "string",
    amount: 0,
    buyer_email: "string",
    buyer_name: "string",
    buyer_tel: "string",
    buyer_addr: "string",
    buyer_postcode: "string"
}
*/
const requestPay = async (options = { payData, params }, callbackFn = (response) => { }) => {
    if (!window.IMP) return;
    /* 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(IMP_CODE); // 가맹점 식별코드

    /* 결제 창 호출하기 */
    await IMP.request_pay({
        ...options?.payData,
        notice_url: PORTONE_NOTICE_URL,
        m_redirect_url: `${CLIENT_ADDRESS}/payments/complete?wsId=${options?.params?.wsId}`
    }, (response) => callbackFn(response));
}
