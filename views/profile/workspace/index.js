import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import { inviteMemberDataConnect } from '../../../data_connect/inviteMemberDataConnect';
import { workspaceDataConnect } from '../../../data_connect/workspaceDataConnect';
import LineBreakerBottom from '../../modules/fragment/LineBreakerBottom';
import Layout from '../layout/Layout';
import HeadComponent from './head/Head.component';
import RequestListComponent from './request-list/RequestList.component';
import WorkspaceListComponent from './workspace-list/WorkspaceList.component';

const Container = styled.div`
`;

const ProfileWorkspaceMainComponent = (props) => {
    const [workspaces, dispatchWorkspaces] = useReducer(workspacesReducer, initialWorkspaces);
    const [inviteMembers, dispatchInviteMembers] = useReducer(inviteMembersReducer, initialInviteMembers);

    useEffect(() => {
        __workspace.req.fetchWorkspaces();
        __inviteMember.req.fetchInviteMembers();
    }, []);

    const __workspace = {
        req: {
            fetchWorkspaces: async () => {
                await workspaceDataConnect().getWorkspaces()
                    .then(res => {
                        if (res.status === 200) {
                            dispatchWorkspaces({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        console.log(res);
                    })
            }
        }
    }

    const __inviteMember = {
        req: {
            fetchInviteMembers: async () => {
                await inviteMemberDataConnect().searchListByRequested()
                    .then(res => {
                        if (res.status === 200) {
                            dispatchInviteMembers({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        console.log(res);
                    })
            },
            acceptWorkspace: async (inviteMemberId) => {
                await csrfDataConnect().getApiCsrf();
                await inviteMemberDataConnect().actionAccept({ inviteMemberId })
                    .catch(err => {
                        let res = err?.response;

                        if (!res) {
                            alert('네트워크 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res?.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res?.data?.memo);
                    })
            },
            rejectWorkspace: async (inviteMemberId) => {
                await csrfDataConnect().getApiCsrf();
                await inviteMemberDataConnect().actionReject({ inviteMemberId })
                    .catch(err => {
                        let res = err?.response;

                        if (!res) {
                            alert('네트워크 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res?.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res?.data?.memo);
                    })
            }
        },
        submit: {
            acceptWorkspace: async (inviteMemberId) => {
                await __inviteMember.req.acceptWorkspace(inviteMemberId);
                await __inviteMember.req.fetchInviteMembers();
                await __workspace.req.fetchWorkspaces();
            },
            rejectWorkspace: async (inviteMemberId) => {
                await __inviteMember.req.rejectWorkspace(inviteMemberId);
                await __inviteMember.req.fetchInviteMembers();
            }
        }
    }

    return (
        <>
            <Layout>
                <Container>
                    <HeadComponent />
                    <WorkspaceListComponent
                        workspaces={workspaces}
                    />
                    <LineBreakerBottom />
                    <RequestListComponent
                        inviteMembers={inviteMembers}

                        onSubmitAcceptWorkspace={__inviteMember.submit.acceptWorkspace}
                        onSubmitRejectWorkspace={__inviteMember.submit.rejectWorkspace}
                    />
                </Container>
            </Layout>
        </>
    );
}
export default ProfileWorkspaceMainComponent;

const initialWorkspaces = null;
const initialInviteMembers = null;

const workspacesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialWorkspaces;
        default: return initialWorkspaces;
    }
}

const inviteMembersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialWorkspaces;
        default: return initialWorkspaces;
    }
}