import { useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../data_connect/erpItemDataConnect";
import { dateToYYYYMMDDhhmmssWithT } from "../../../../../utils/dateFormatUtils";
import { v4 as uuidv4 } from 'uuid';

export default function useUploadDatasHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [uploadDatas, setUploadDatas] = useState([]);

    const reqUploadWithExcel = async (formData, successCallback) => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await erpItemDataConnect().uploadWithExcel(formData, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    let results = res.data.data;
                    results = results?.map(r => {
                        return {
                            ...r,
                            id: uuidv4()
                        }
                    })
                    setUploadDatas([...uploadDatas, ...results]);
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

    const reqSaveUploadDatas = async (body, successCallback) => {
        let formData = {
            workspaceId: workspaceRedux?.workspaceInfo?.id,
            contents: body
        }

        await erpItemDataConnect().createAll(formData)
            .then(res => {
                if (res.status === 200) {
                    let results = res?.data?.data;

                    setUploadDatas(uploadDatas?.filter(uploadData => !results?.includes(uploadData?.id)));
                    alert(res.data.memo);
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

    const onFillEmptyChannerOrderDate = () => {
        if (uploadDatas?.length > 0) {
            setUploadDatas(uploadDatas?.map(r => {
                if (!r.channelOrderDate) {
                    return {
                        ...r,
                        channelOrderDate: dateToYYYYMMDDhhmmssWithT(new Date())
                    }
                }
                return {
                    ...r
                }
            }))
        }
    }

    const onSubmitUploadWithSingle = (form) => {
        form = form?.map(r => {
            return {
                ...r,
                id: uuidv4()
            }

        })
        setUploadDatas([
            ...uploadDatas,
            ...form
        ]);
    }

    const onDeleteUploadData = (reqIndex) => {
        setUploadDatas(uploadDatas.filter((r, index) => index !== reqIndex));
    }

    const onDeleteUploadDataAll = () => {
        setUploadDatas([]);
    }

    return {
        uploadDatas,
        reqUploadWithExcel,
        reqSaveUploadDatas,
        onFillEmptyChannerOrderDate,
        onSubmitUploadWithSingle,
        onDeleteUploadData,
        onDeleteUploadDataAll
    }
}