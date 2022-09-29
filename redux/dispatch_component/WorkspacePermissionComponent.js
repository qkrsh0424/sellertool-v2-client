import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { workspaceDataConnect } from "../../data_connect/workspaceDataConnect";

export default function WorkspacePermissionComponent(props) {
    const reduxDispatch = useDispatch();
    const router = useRouter();
    const userRedux = useSelector(state => state.userRedux);

    useEffect(() => {
        async function fetchInit() {
            if (!router.isReady) {
                return;
            }

            if (userRedux.userInfo) {
                let workspaceId = localStorage.getItem('sellertool-wsId');
                await __handle.req.dispatchWorkspaceRedux(workspaceId);
            }
        }
        fetchInit();
    }, [userRedux.userInfo]);

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