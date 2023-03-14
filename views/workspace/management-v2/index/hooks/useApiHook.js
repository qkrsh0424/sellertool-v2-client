import { useDispatch } from "react-redux"
import { workspaceDataConnect } from "../../../../data_connect/workspaceDataConnect"

export default function useApiHook(props) {
    const reduxDispatch = useDispatch();

    const reqDispatchWorkspace = async (workspaceId) => {
        await workspaceDataConnect().getWorkspace(workspaceId)
            .then(res => {
                if (res.status === 200) {
                    reduxDispatch({
                        type: 'WORKSPACE_REDUX_SET_DATA',
                        payload: {
                            isLoading: false,
                            workspaceInfo: res.data.data
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err, err.response);
                reduxDispatch({
                    type: 'WORKSPACE_REDUX_CLEAR_WORKSPACE_INFO'
                })
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
                    reqDispatchWorkspace(body.id);
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
        reqChangeWorkspaceName
    }
}