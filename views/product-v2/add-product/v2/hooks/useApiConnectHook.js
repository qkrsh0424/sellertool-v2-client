import { productDataConnect } from "../../../../../data_connect/productDataConnect";

export function useApiConnectHook() {
    const onReqProductOptionBulkCreateExcelUpload = async (options = { formData: null, params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productDataConnect().productOptionBulkCreateExcelUpload(options?.formData, options?.headers)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            });
    }

    return {
        onReqProductOptionBulkCreateExcelUpload
    }
}