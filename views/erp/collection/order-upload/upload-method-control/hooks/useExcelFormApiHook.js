import { excelFormDataConnect } from "../../../../../../data_connect/excelFormDataConnect";
import { dateToYYYYMMDDhhmmssFile } from "../../../../../../utils/dateFormatUtils";

export default function useExcelFormApiHook(props) {
    const reqDownloadSampleExcelForErpCollectionOrderUpload = async (successCallback) => {
        await excelFormDataConnect().downloadSampleExcelForErpCollectionOrderUpload()
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const link = document.createElement('a');
                    const blobUrl = URL.createObjectURL(blob);
                    let date = dateToYYYYMMDDhhmmssFile(new Date());
                    link.href = blobUrl;
                    link.download = `${date}_업로드엑셀양식.xlsx`;
                    link.click();
                    URL.revokeObjectURL(blobUrl);
                }
            })
            .catch(async err => {
                let res = err.response;
                let data = JSON.parse(await err.response.data.text());

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(data.memo);
            })
            ;
    }
    return {
        reqDownloadSampleExcelForErpCollectionOrderUpload
    }
}