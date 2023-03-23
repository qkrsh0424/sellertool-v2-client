import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { excelTranslatorHeaderDataConnect } from "../../../data_connect/excelTranslatorHeaderDataConnect";
import { dateToYYYYMMDDhhmmssFile } from "../../../utils/dateFormatUtils";

export default function useExcelTranslatorDatasHook({
    excelTranslatorHeader
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [excelTranslatorDatas, setExcelTranslatorDatas] = useState(null);

    useEffect(() => {
        clearExcelTranslatorDatas();
    }, [excelTranslatorHeader]);

    const clearExcelTranslatorDatas = () => {
        setExcelTranslatorDatas(null);
    }

    const reqUploadData = async ({
        formData,
        successCallback
    }) => {
        if (!excelTranslatorHeader) return;

        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        let excelTranslatorHeaderId = excelTranslatorHeader.id;
        await excelTranslatorHeaderDataConnect().uploadData(excelTranslatorHeaderId, formData, headers)
            .then(res => {
                if (res.status === 200) {
                    setExcelTranslatorDatas(res.data.data);
                    successCallback();
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
            })
            ;
    }

    const reqDownloadData = async ({
        body,
        successCallback
    }) => {
        if (!excelTranslatorHeader) return;

        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let excelTranslatorHeaderId = excelTranslatorHeader.id;
        await excelTranslatorHeaderDataConnect().downloadData(excelTranslatorHeaderId, body.excelTranslatorDatas, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const link = document.createElement('a');
                    const blobUrl = URL.createObjectURL(blob);
                    let date = dateToYYYYMMDDhhmmssFile(new Date());
                    link.href = blobUrl;
                    link.download = `${date}_(${body.uploadHeaderTitle}_${body.downloadHeaderTitle}).xlsx`;
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
        excelTranslatorDatas,
        reqUploadData,
        reqDownloadData
    }
}