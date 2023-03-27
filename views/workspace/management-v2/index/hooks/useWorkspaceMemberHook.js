import { useEffect, useState } from "react";
import { workspaceMemberDataConnect } from "../../../../../data_connect/workspaceMemberDataConnect";

export default function useWorkspaceMemberHook(workspace) {
    const [workspaceMember, setWorkspaceMember] = useState(null);

    useEffect(() => {
        if (!workspace?.id) {
            return;
        }

        reqFetch();
    }, [workspace?.id]);

    const reqFetch = async () => {
        const headers = {
            wsId: workspace?.id
        }
        await workspaceMemberDataConnect().searchMe(headers)
            .then(res => {
                if (res.status === 200) {
                    setWorkspaceMember(res?.data?.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqChangeProfileImageUri = async (body, successCallback) => {
        await workspaceMemberDataConnect().changeProfileImageUri(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetch();
                    successCallback();
                }
            })
            .catch(err => {
                console.log(err);
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

    const reqChangeNickname = async (body, successCallback) => {
        await workspaceMemberDataConnect().changeNickname(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetch();
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

    const reqChangePhoneNumber = async (body, successCallback) => {
        await workspaceMemberDataConnect().changePhoneNumber(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetch();
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

    const reqChangeEmail = async (body, successCallback) => {
        await workspaceMemberDataConnect().changeEmail(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetch();
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
        workspaceMember,
        reqChangeProfileImageUri,
        reqChangeNickname,
        reqChangePhoneNumber,
        reqChangeEmail,
    }
}