import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { workspaceAuthTemplateDataConnect } from "../../../../../../data_connect/workspaceAuthTemplateDateConnect";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 20;

export default function useWorkspaceAuthTemplatePageHook(workspace) {
    const router = useRouter();
    const page = router?.query?.page || DEFAULT_PAGE;
    const size = router?.query?.size || DEFAULT_SIZE;

    const [workspaceAuthTemplatePage, setWorkspaceAuthTemplatePage] = useState(null);

    useEffect(() => {
        if (!workspace?.id) {
            return;
        }

        reqFetch();
    }, [workspace?.id, page, size]);

    const reqFetch = async () => {
        const headers = {
            wsId: workspace?.id
        }

        const params = {
            size: size,
            page: page
        }

        await workspaceAuthTemplateDataConnect().searchPage(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setWorkspaceAuthTemplatePage(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
            ;

    }

    const reqCreate = async (body, successCallback = () => { }) => {
        const headers = {
            wsId: workspace?.id
        }

        await workspaceAuthTemplateDataConnect().create(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetch();
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

    const reqUpdate = async (body, successCallback) => {
        const headers = {
            wsId: workspace?.id
        }

        await workspaceAuthTemplateDataConnect().update(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetch();
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
            });
        ;
    }

    const reqDelete = async (body, successCallback) => {
        const headers = {
            wsId: workspace?.id
        }

        await workspaceAuthTemplateDataConnect().delete(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetch();
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
            });
    }

    return {
        workspaceAuthTemplatePage,
        reqCreate,
        reqUpdate,
        reqDelete
    }
}