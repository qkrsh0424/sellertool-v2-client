import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { excelTranslatorHeaderDataConnect } from "../../../../../../data_connect/excelTranslatorHeaderDataConnect"
import { dateToYYYYMMDDhhmmssFile } from "../../../../../../utils/dateFormatUtils";

export default function useExcelTranslatorHeadersHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [excelTranslatorHeaders, setExcelTranslatorHeaders] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchExcelTranslatorHeaders();
    }, [workspaceRedux?.workspaceInfo?.id]);

    const reqFetchExcelTranslatorHeaders = async () => {
        let params = {
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await excelTranslatorHeaderDataConnect().searchListByWorkspaceId(params)
            .then(res => {
                if (res.status === 200) {
                    setExcelTranslatorHeaders(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqDownloadSampleExcelForUploadHeader = async ({
        body,
        successCallback
    }) => {
        await excelTranslatorHeaderDataConnect().downloadSampleExcelForUploadHeader(body)
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

    const reqDownloadSampleExcelForDownloadHeader = async ({
        body,
        successCallback
    }) => {
        await excelTranslatorHeaderDataConnect().downloadSampleExcelForDownloadHeader(body)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const link = document.createElement('a');
                    const blobUrl = URL.createObjectURL(blob);
                    let date = dateToYYYYMMDDhhmmssFile(new Date());
                    link.href = blobUrl;
                    link.download = `${date}_다운로드엑셀양식.xlsx`;
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
        excelTranslatorHeaders,
        reqDownloadSampleExcelForUploadHeader,
        reqDownloadSampleExcelForDownloadHeader
    }
}