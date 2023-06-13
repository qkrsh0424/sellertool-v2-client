import { excelFormDataConnect } from "../../../../../data_connect/excelFormDataConnect";

export default function useWaybillRegistrationHook(props) {
    const downloadSampleExcelForWaybillRegistration = async () => {
        await excelFormDataConnect().downloadSampleExcelForWaybillRegistration()
            .then(res => {
                if (res.status === 200) {
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', '운송장일괄등록양식' + '.xlsx');
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    return {
        downloadSampleExcelForWaybillRegistration
    }
}