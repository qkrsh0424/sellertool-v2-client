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

const WorkspaceManagementMainComponent = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const workspaceRdx = useSelector(state => state.workspaceState);
    const userRdx = useSelector(state => state.userState);

    const [workspaceMembers, dispatchWorkspaceMembers] = useReducer(workspaceMembersReducer, initialWorkspaceMembers);
    const [inviteMembers, dispatchInviteMembers] = useReducer(inviteMembersReducer, initialInviteMembers);

    useEffect(() => {
        if (!workspaceRdx?.info?.id) {
            return;
        }

        __workspaceMember.req.fetchWorkspaceMember(workspaceRdx.info.id);
        __inviteMember.req.fetchInviteMembers();
    }, [workspaceRdx?.info?.id])

    const __workspace = {
        req: {
            dispatchWorkspace: async () => {
                if (!workspaceRdx.info) {
                    return;
                }

                await workspaceDataConnect().getWorkspace(workspaceRdx.info.id)
                    .then(res => {
                        if (res.status === 200) {
                            dispatch({
                                type: 'WORKSPACE_STATE_INIT_INFO',
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
                if (!workspaceRdx.info) {
                    return;
                }
                let body = {
                    workspaceId: workspaceRdx.info.id,
                    name: editName
                }

                await __workspace.req.changeWorkspaceName(body);
                await __workspace.req.dispatchWorkspace();
            }
        }
    }
    const __workspaceMember = {
        req: {
            fetchWorkspaceMember: async (workspaceId) => {
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
                let workspaceId = workspaceRdx.info.id;
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
                if (!workspaceRdx.info || !inviteMember) {
                    return;
                }

                await __inviteMember.req.deleteByWorkspaceIdAndInviteMemberId(workspaceRdx.info.id, inviteMember.id);
                await __inviteMember.req.fetchInviteMembers();
            }
        }
    }

    if (userRdx.isLoading === true) {
        return null;
    }

    if (userRdx.isLoading === false && (!userRdx.info || !workspaceRdx.info)) {
        return (
            <NotAllowedComponent></NotAllowedComponent>
        );
    }

    return (
        <>
            <TitleComponent
                workspaceInfo={workspaceRdx.info}

                onSubmitChangeWorkspaceName={__workspace.action.changeWorkspacename}
            ></TitleComponent>
            <MemberTableComponent
                workspaceMembers={workspaceMembers}
            ></MemberTableComponent>
            <InviteMemberComponent
                inviteMembers={inviteMembers}

                onFetchInviteMembers={__inviteMember.req.fetchInviteMembers}
                onActionCancelInviteRequest={__inviteMember.action.cancelRequest}
            ></InviteMemberComponent>
        </>
    );
}
export default WorkspaceManagementMainComponent;

const initialWorkspaceMembers = null;
const initialInviteMembers = null;

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