import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workspaceDataConnect } from "../../../../data_connect/workspaceDataConnect";

export default function useWorkspaceHook(props) {
    const router = useRouter();
    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        reqFetchWorkspace();
    }, [router])

    const reqFetchWorkspace = async () => {
        let workspaceId = router.query.wsId;

        await workspaceDataConnect().getWorkspace(workspaceId)
            .then(res => {
                if (res.status === 200) {
                    setWorkspace(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqChangeWorkspaceName = async ({
        body,
        successCallback
    }) => {
        await workspaceDataConnect().patchWorkspaceName({
            body: body
        })
            .then(res => {
                if (res.status === 200) {
                    reqFetchWorkspace();
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
        workspace,
        reqChangeWorkspaceName
    }
}