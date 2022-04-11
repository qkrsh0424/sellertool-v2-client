import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { workspaceDataConnect } from '../../data_connect/workspaceDataConnect';

const Container = styled.div`

`;

const DispatchWorkspaceComponent = (props) => {
    const dispatch = useDispatch();
    const userRdx = useSelector(state => state.userState);
    const router = useRouter();

    useEffect(() => {
        async function fetchInit() {

            let workspaceId = localStorage.getItem('sellertool-wsId');
            if (userRdx.isLoading === false && userRdx.info) {
                await _getWorkspace(workspaceId);
            } else {
                dispatch({
                    type: 'WORKSPACE_STATE_CLEAR_INFO'
                })
            }
        }
        fetchInit();
    }, [userRdx.isLoading, userRdx.info]);

    const _getWorkspace = async (workspaceId) => {
        let params = {
            workspaceId: workspaceId
        }
        await workspaceDataConnect().getWorkspace(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    if (res.data?.data) {
                        dispatch({
                            type: 'WORKSPACE_STATE_INIT_INFO',
                            payload: res.data?.data
                        });
                        localStorage.setItem('sellertool-wsId', res.data?.data?.id);
                    } else {
                        dispatch({
                            type: 'WORKSPACE_STATE_CLEAR_INFO'
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            })
    }
    return (
        <></>
    );
}
export default DispatchWorkspaceComponent;