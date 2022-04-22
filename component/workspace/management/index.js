import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfDataConnect } from "../../../data_connect/csrfDataConnect";
import { inviteMemberDataConnect } from "../../../data_connect/inviteMemberDataConnect";
import { workspaceDataConnect } from "../../../data_connect/workspaceDataConnect";
import { workspaceMemberDataConnect } from "../../../data_connect/workspaceMemberDataConnect";
import NotAllowedComponent from "../../modules/not-allowed/NotAllowedComponent";
import InviteMemberComponent from "./invite-member/InviteMember.component";
import MemberTableComponent from "./member-table/MemberTable.component";
import TitleComponent from "./title/Title.component";
import { useRouter } from 'next/router';
import WorkspaceSelectorComponent from "./workspace-selector/WorkspaceSelector.component";
import styled from 'styled-components';

const Container = styled.div`
`;

const WorkspaceManagementMainComponent = (props) => {
    const router = useRouter();
    const userRdx = useSelector(state => state.userState);

    const [workspace, dispatchWorkspace] = useReducer(workspaceReducer, initialWorkspace);
    const [workspaceMembers, dispatchWorkspaceMembers] = useReducer(workspaceMembersReducer, initialWorkspaceMembers);
    const [inviteMembers, dispatchInviteMembers] = useReducer(inviteMembersReducer, initialInviteMembers);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (router.query.wsId) {
            __workspace.req.fetchWorkspace();
        } else {
            dispatchWorkspace({
                type: 'CLEAR'
            })
        }
    }, [router]);

    useEffect(() => {
        if (!workspace) {
            return;
        }

        __workspaceMember.req.fetchWorkspaceMember();
        __inviteMember.req.fetchInviteMembers();
    }, [workspace])

    const __workspace = {
        req: {
            fetchWorkspace: async () => {
                let workspaceId = router.query.wsId;

                await workspaceDataConnect().getWorkspace(workspaceId)
                    .then(res => {
                        if (res.status === 200) {
                            dispatchWorkspace({
                                type: 'SET_DATA',
                                payload: res.data?.data
                            });
                        }
                    })
            },
            changeWorkspaceName: async (body) => {
                await csrfDataConnect().getApiCsrf();
                await workspaceDataConnect().changeWorkspaceName(body)
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        action: {
            changeWorkspacename: async (editName) => {
                if (!workspace) {
                    return;
                }
                let body = {
                    workspaceId: workspace.id,
                    name: editName
                }

                await __workspace.req.changeWorkspaceName(body);
                await __workspace.req.fetchWorkspace();
            }
        }
    }
    const __workspaceMember = {
        req: {
            fetchWorkspaceMember: async () => {
                if (!workspace) {
                    return;
                }

                let workspaceId = workspace.id;

                await workspaceMemberDataConnect().searchList(workspaceId)
                    .then(res => {
                        if (res.status === 200) {
                            dispatchWorkspaceMembers({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            }
        }
    }

    const __inviteMember = {
        req: {
            fetchInviteMembers: async () => {
                if (!workspace) {
                    return;
                }

                let workspaceId = workspace.id;

                await inviteMemberDataConnect().searchListByWorkspaceId(workspaceId)
                    .then(res => {
                        if (res.status === 200) {
                            dispatchInviteMembers({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            },
            deleteByWorkspaceIdAndInviteMemberId: async (workspaceId, inviteMemberId) => {
                await csrfDataConnect().getApiCsrf();
                await inviteMemberDataConnect().deleteByWorkspaceIdAndInviteMemberId(workspaceId, inviteMemberId)
                    .catch(err => {
                        let res = err?.response;

                        if (res?.status === 500) {
                            alert('undefined error.')
                            return;
                        }

                        if (res?.status === 401) {
                            alert(res?.data.memo);
                            router.replace('/');
                        }

                    })
            }
        },
        action: {
            cancelRequest: async (inviteMember) => {
                if (!workspace || !inviteMember) {
                    return;
                }

                await __inviteMember.req.deleteByWorkspaceIdAndInviteMemberId(workspace.id, inviteMember.id);
                await __inviteMember.req.fetchInviteMembers();
            }
        }
    }

    if (userRdx.isLoading === true) {
        return null;
    }

    if (userRdx.isLoading === false && !userRdx.info) {
        return (
            <NotAllowedComponent></NotAllowedComponent>
        );
    }

    return (
        <Container>
            <WorkspaceSelectorComponent />
            {!workspace &&
                <div style={{ textAlign: 'center', margin: '150px 0', fontWeight: '500' }}>워크스페이스를 먼저 선택해 주세요.</div>
            }
            {workspace &&
                <>
                    <TitleComponent
                        workspaceInfo={workspace}

                        onSubmitChangeWorkspaceName={__workspace.action.changeWorkspacename}
                    ></TitleComponent>
                    <MemberTableComponent
                        workspaceMembers={workspaceMembers}
                    ></MemberTableComponent>
                    <InviteMemberComponent
                        workspace={workspace}
                        inviteMembers={inviteMembers}

                        onFetchInviteMembers={__inviteMember.req.fetchInviteMembers}
                        onActionCancelInviteRequest={__inviteMember.action.cancelRequest}
                    ></InviteMemberComponent>
                </>
            }

        </Container>
    );
}
export default WorkspaceManagementMainComponent;

const initialWorkspace = null;
const initialWorkspaceMembers = null;
const initialInviteMembers = null;

const workspaceReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialWorkspace;
        default: return initialWorkspace;
    }
}

const workspaceMembersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialWorkspaceMembers;
    }
}

const inviteMembersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialInviteMembers;
    }
}