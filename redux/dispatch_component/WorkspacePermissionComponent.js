import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { workspaceDataConnect } from "../../data_connect/workspaceDataConnect";

export default function WorkspacePermissionComponent(props) {
    const reduxDispatch = useDispatch();
    const userRedux = useSelector(state => state.userRedux);

    useEffect(() => {
        async function fetchInit() {
            if (userRedux?.userInfo?.id) {
                let workspaceId = localStorage.getItem('sellertool-wsId');
                await __handle.req.dispatchWorkspaceRedux(workspaceId);
            }
        }
        fetchInit();
    }, [userRedux?.userInfo?.id]);

    const __handle = {
        req: {
            dispatchWorkspaceRedux: async (workspaceId) => {
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
        }
    }
    return null;
}