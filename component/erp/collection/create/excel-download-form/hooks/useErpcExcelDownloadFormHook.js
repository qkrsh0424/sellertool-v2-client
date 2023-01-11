import { erpcExcelDownloadFormDataConnect } from "../../../../../../data_connect/erpcExcelDownloadFormDataConnect";

export default function useErpcExcelDownloadFormHook(props) {
    const reqCreateErpcExcelDownloadForm = async (body, successCallback) => {
        await erpcExcelDownloadFormDataConnect().create(body)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;
                if (!res) {
                    alert('네트워크가 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    return {
        reqCreateErpcExcelDownloadForm
    }
}