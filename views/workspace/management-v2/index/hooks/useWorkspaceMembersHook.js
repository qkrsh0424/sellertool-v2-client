import { useEffect, useState } from "react";
import { workspaceMemberDataConnect } from "../../../../../data_connect/workspaceMemberDataConnect";

export default function useWorkspaceMembersHook({
    workspace
}) {
    const [workspaceMembers, setWorkspaceMembers] = useState(null);

    useEffect(() => {
        if (!workspace?.id) {
            return;
        }

        reqFetchWorkspaceMembers();
    }, []);

    const reqFetchWorkspaceMembers = async () => {
        await workspaceMemberDataConnect().searchListByWorkspaceId({
            workspaceId: workspace.id
        })
            .then(res => {
                if (res.status === 200) {
                    setWorkspaceMembers(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
            ;
    }

    const reqChangeWorkspaceAuthTemplate = async (
        body,
        successCallback
    ) => {
        const headers = {
            wsId: workspace?.id
        }

        await workspaceMemberDataConnect().changeWorkspaceAuthTemplate(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchWorkspaceMembers();
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

    const reqDeleteMember = async ({
        body,
        successCallback
    }) => {
        await workspaceMemberDataConnect().deleteOne({ body })
            .then(res => {
                if (res.status === 200) {
                    reqFetchWorkspaceMembers();
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

    return {
        workspaceMembers,
        reqFetchWorkspaceMembers,
        reqChangeWorkspaceAuthTemplate,
        reqDeleteMember
    }
}