import { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workspaceDataConnect } from '../../../data_connect/workspaceDataConnect';
import CommonModalComponent from '../../modules/CommonModalComponent';
import { Container, SelectorBtn, SelectorBtnBox, Wrapper } from './index.styled';
import WorkspacesModalComponent from './workspaces-modal/WorkspacesModal.component';

const SecondaryNavbarMainComponent = (props) => {
    const dispatch = useDispatch();
    const workspaceRdx = useSelector(state => state.workspaceState);
    const userRdx = useSelector(state => state.userState)

    const [workspaces, dispatchWorkspaces] = useReducer(workspacesReducer, initialWorkspaces);
    const [workspaceListModalOpen, setWorkspaceListModalOpen] = useState(false);

    const __workspace = {
        req: {
            fetchList: async () => {
                await workspaceDataConnect().getWorkspaces()
                    .then(res => {
                        if (res.status === 200) {
                            dispatchWorkspaces({
                                type: 'SET_DATA',
                                payload: res.data?.data
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        console.log(res);
                    })
            },
            set: async function (workspaceId) {
                await workspaceDataConnect().getWorkspace(workspaceId)
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
        },
        action: {
            select: async (workspace) => {
                await __workspace.req.set(workspace.id);
                __workspace.action.modalClose();
            },
            modalOpen: async () => {
                await __workspace.req.fetchList();
                setWorkspaceListModalOpen(true)
            },
            modalClose: () => {
                setWorkspaceListModalOpen(false);
                dispatchWorkspaces({
                    type: 'CLEAR'
                })
            }
        }
    }
    return (
        <>
            {workspaceRdx.info &&
                <Container>
                    <Wrapper>
                        <SelectorBtnBox>
                            <SelectorBtn onClick={__workspace.action.modalOpen}>
                                {workspaceRdx.info.name}
                            </SelectorBtn>
                        </SelectorBtnBox>
                    </Wrapper>
                </Container>
            }

            {/* Modal */}
            {(workspaceListModalOpen && userRdx.info && workspaceRdx.info && workspaces) &&
                <CommonModalComponent
                    open={workspaceListModalOpen}

                    onClose={__workspace.action.modalClose}
                >
                    <WorkspacesModalComponent
                        userInfo={userRdx?.info}
                        workspaceInfo={workspaceRdx?.info}
                        workspaces={workspaces}

                        onActionSelectWorkspace={__workspace.action.select}
                    ></WorkspacesModalComponent>
                </CommonModalComponent>
            }
        </>
    );
}
export default SecondaryNavbarMainComponent;

const initialWorkspaces = null;

const workspacesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialWorkspaces;
        default: return initialWorkspaces;
    }
}