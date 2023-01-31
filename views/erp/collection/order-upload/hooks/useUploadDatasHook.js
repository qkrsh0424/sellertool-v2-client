import { useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../data_connect/erpItemDataConnect";

export default function useUploadDatasHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [uploadDatas, setUploadDatas] = useState([]);

    const reqUploadWithExcel = async (formData, successCallback) => {
        formData.append('workspaceId', workspaceRedux?.workspaceInfo?.id);

        await erpItemDataConnect().uploadWithExcel(formData)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    setUploadDatas([...uploadDatas.concat(res.data.data)]);
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
                    setUploadDatas([]);
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

    const onSubmitUploadWithSingle = (form) => {
        setUploadDatas([...uploadDatas.concat(form)]);
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
        onSubmitUploadWithSingle,
        onDeleteUploadData,
        onDeleteUploadDataAll
    }
}