import styled from 'styled-components';
import Layout from '../layout/Layout';
import HeadComponent from './head/Head.component';
import useInviteMembersHook from './hooks/useInviteMembersHook';
import useWorkspacesHook from './hooks/useWorkspacesHook';
import RequestListComponent from './request-list/RequestList.component';
import WorkspaceListComponent from './workspace-list/WorkspaceList.component';
import { HocEmptyItemsWithBox, withPendingComponent } from '../../../hoc/loading';

const Container = styled.div`
    overflow: hidden;
    background-color: var(--defaultBackground);
    min-height: 800px;
`;

const WorkspaceListWithPending = withPendingComponent({
    Component: WorkspaceListComponent,
    EmptyComponent: () => <HocEmptyItemsWithBox element={'생성된 워크스페이스가 없습니다.'} />
});

const RequestListWithPending = withPendingComponent({
    Component: RequestListComponent,
    EmptyComponent: () => <HocEmptyItemsWithBox element={'다른 워크스페이스로부터의 초대 요청이 없습니다.'} />
})
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

    return (
        <>
            <Container>
                <HeadComponent></HeadComponent>
                <Layout>
                    <>
                        <WorkspaceListWithPending
                            pendingDatas={workspaces}
                            workspaces={workspaces}

                            onSubmitRefreshWorkspaces={__handle.submit.refreshWorkspaces}
                        />
                        <div style={{ marginTop: '40px' }}>
                            <RequestListWithPending
                                pendingDatas={inviteMembers}
                                inviteMembers={inviteMembers}

                                onSubmitRefreshInviteMembers={__handle.submit.refreshInviteMembers}
                                onSubmitAcceptWorkspace={__handle.submit.acceptWorkspace}
                                onSubmitRejectWorkspace={__handle.submit.rejectWorkspace}
                            />
                        </div>
                    </>
                </Layout>
            </Container>
        </>
    );
}
export default ProfileWorkspaceMainComponent;