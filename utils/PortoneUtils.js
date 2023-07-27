const IMP_CODE = process.env.NODE_ENV == 'development' ? process.env.development.portoneImpCode : process.env.production.portoneImpCode

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
const requestPay = async (options = { payData }, callbackFn = (response) => { }) => {
    if (!window.IMP) return;
    /* 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(IMP_CODE); // 가맹점 식별코드

    /* 결제 창 호출하기 */
    await IMP.request_pay({
        ...options?.payData,
        notice_url:'https://9830-175-197-128-183.ngrok.io/auth/v1/payments/portone-webhook'
    }, (response) => callbackFn(response));
}
