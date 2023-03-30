import _ from "lodash";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { excelTranslatorHeaderDataConnect } from "../../../data_connect/excelTranslatorHeaderDataConnect"
import { dateToYYYYMMDDhhmmssFile } from "../../../utils/dateFormatUtils";

export default function useExcelTranslatorHeaderHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const { enqueueSnackbar } = useSnackbar();
    const [excelTranslatorHeaders, setExcelTranslatorHeaders] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchExcelTranslatorHeaders();
    }, [workspaceRedux?.workspaceInfo?.id]);

    const reqFetchExcelTranslatorHeaders = async () => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await excelTranslatorHeaderDataConnect().searchList(headers)
            .then(res => {
                if (res.status === 200) {
                    setExcelTranslatorHeaders(res.data.data);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                if (res?.status === 403) {
                    enqueueSnackbar(res?.data?.memo, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true })
                }
            })
    }

    const reqCreateExcelTranslatorHeader = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await excelTranslatorHeaderDataConnect().createOne(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchExcelTranslatorHeaders();
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
    }

    const reqModifyExcelTranslatorHeader = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await excelTranslatorHeaderDataConnect().changeTitle(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchExcelTranslatorHeaders();
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
    }

    const reqDeleteExcelTranslatorHeader = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await excelTranslatorHeaderDataConnect().delete(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchExcelTranslatorHeaders();
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
    }

    const reqChangeUploadHeaderDetail = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await excelTranslatorHeaderDataConnect().changeUploadHeaderDetail(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchExcelTranslatorHeaders();
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
    }

    const reqChangeDownloadHeaderDetail = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await excelTranslatorHeaderDataConnect().changeDownloadHeaderDetail(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchExcelTranslatorHeaders();
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
    }

    const reqDownloadSampleExcelForUploadHeader = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await excelTranslatorHeaderDataConnect().downloadSampleExcelForUploadHeader(body, headers)
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
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await excelTranslatorHeaderDataConnect().downloadSampleExcelForDownloadHeader(body, headers)
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
        reqCreateExcelTranslatorHeader,
        reqModifyExcelTranslatorHeader,
        reqDeleteExcelTranslatorHeader,
        reqChangeUploadHeaderDetail,
        reqChangeDownloadHeaderDetail,
        reqDownloadSampleExcelForUploadHeader,
        reqDownloadSampleExcelForDownloadHeader
    }
}