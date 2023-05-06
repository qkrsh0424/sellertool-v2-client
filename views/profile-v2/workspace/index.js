import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import { inviteMemberDataConnect } from '../../../data_connect/inviteMemberDataConnect';
import { workspaceDataConnect } from '../../../data_connect/workspaceDataConnect';
import LineBreakerBottom from '../../modules/fragment/LineBreakerBottom';
import Layout from '../layout/Layout';
import HeadComponent from './head/Head.component';
import useInviteMembersHook from './hooks/useInviteMembersHook';
import useWorkspacesHook from './hooks/useWorkspacesHook';
import RequestListComponent from './request-list/RequestList.component';
import WorkspaceListComponent from './workspace-list/WorkspaceList.component';

const Container = styled.div`
    overflow: hidden;
    background-color: var(--defaultBackground);
    min-height: 800px;
`;

const ProfileWorkspaceMainComponent = (props) => {
    const {
        workspaces,
        reqFetchWorkspaces
    } = useWorkspacesHook();

    const {
        inviteMembers,
        reqFetchInviteMembers,
        reqAcceptWorkspace,
        reqRejectWorkspace
    } = useInviteMembersHook();

    const __handle = {
        submit: {
            refreshWorkspaces: () => {
                reqFetchWorkspaces();
            },
            refreshInviteMembers: () => {
                reqFetchInviteMembers();
            },
            acceptWorkspace: async ({
                body,
                successCallback
            }) => {
                await reqAcceptWorkspace({
                    body: body,
                    successCallback: () => {
                        successCallback();
                        reqFetchInviteMembers();
                        reqFetchWorkspaces();
                    }
                })
            },
            rejectWorkspace: async ({
                body,
                successCallback
            }) => {
                await reqRejectWorkspace({
                    body: body,
                    successCallback: () => {
                        successCallback();
                        reqFetchInviteMembers();
                    }
                })
            }
        }
    }
    // const __inviteMember = {
    //     req: {
    //         acceptWorkspace: async (inviteMemberId) => {
    //             await csrfDataConnect().getApiCsrf();
    //             await inviteMemberDataConnect().actionAccept({ inviteMemberId })
    //                 .catch(err => {
    //                     let res = err?.response;

    //                     if (!res) {
    //                         alert('네트워크 연결이 원활하지 않습니다.');
    //                         return;
    //                     }

    //                     if (res?.status === 500) {
    //                         alert('undefined error.');
    //                         return;
    //                     }

    //                     alert(res?.data?.memo);
    //                 })
    //         },
    //         rejectWorkspace: async (inviteMemberId) => {
    //             await csrfDataConnect().getApiCsrf();
    //             await inviteMemberDataConnect().actionReject({ inviteMemberId })
    //                 .catch(err => {
    //                     let res = err?.response;

    //                     if (!res) {
    //                         alert('네트워크 연결이 원활하지 않습니다.');
    //                         return;
    //                     }

    //                     if (res?.status === 500) {
    //                         alert('undefined error.');
    //                         return;
    //                     }

    //                     alert(res?.data?.memo);
    //                 })
    //         }
    //     },
    //     submit: {
    //         acceptWorkspace: async (inviteMemberId) => {
    //             await __inviteMember.req.acceptWorkspace(inviteMemberId);
    //             await __inviteMember.req.fetchInviteMembers();
    //             await __workspace.req.fetchWorkspaces();
    //         },
    //         rejectWorkspace: async (inviteMemberId) => {
    //             await __inviteMember.req.rejectWorkspace(inviteMemberId);
    //             await __inviteMember.req.fetchInviteMembers();
    //         }
    //     }
    // }

    return (
        <>
            <Container>
                <HeadComponent></HeadComponent>
                <Layout>
                    <>
                        <WorkspaceListComponent
                            workspaces={workspaces}

                            onSubmitRefreshWorkspaces={__handle.submit.refreshWorkspaces}
                        />
                        <RequestListComponent
                            inviteMembers={inviteMembers}

                            onSubmitRefreshInviteMembers={__handle.submit.refreshInviteMembers}
                            onSubmitAcceptWorkspace={__handle.submit.acceptWorkspace}
                            onSubmitRejectWorkspace={__handle.submit.rejectWorkspace}
                        />
                    </>
                </Layout>
            </Container>
            {/* <Layout>
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
            </Layout> */}
        </>
    );
}
export default ProfileWorkspaceMainComponent;