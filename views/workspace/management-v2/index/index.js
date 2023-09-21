import MemberListComponent from "./member-list/MemberList.component";
import WorkspaceNameFieldComponent from "./workspace-name-field/WorkspaceNameField.component";
import { useRouter } from 'next/router';
import WorkspaceSelectorComponent from "./workspace-selector/WorkspaceSelector.component";
import styled from 'styled-components';
import useWorkspaceHook from "./hooks/useWorkspaceHook";
import LayoutComponent from "./layout/Layout.component";
import InviteMemberComponent from "./invite-member/InviteMember.component";
import AuthTemplateListComponent from "./auth-template-list/AuthTemplateList.component";
import ProfileComponent from "./profile/Profile.component";
import SettingsComponent from "./settings/Settings.component";
import SubscriptionPlanComponent from "./subscription-plan";

const Container = styled.div`
    background-color: var(--defaultBackground);
    min-height: 800px;
`;

const WorkspaceManagementMainComponent = (props) => {
    const router = useRouter();
    const viewType = router?.query?.view;

    const {
        workspace,
        reqChangeWorkspaceName,
        reqDeleteWorkspace,
        reqChangeSubscriptionPlanToPrivate
    } = useWorkspaceHook();

    const handleSubmitModifyWorkspaceName = async (
        body,
        successCallback
    ) => {
        await reqChangeWorkspaceName({
            body: body,
            successCallback: () => {
                successCallback();
            }
        })
    }

    const handleSubmitDeleteWorkspace = async () => {
        await reqDeleteWorkspace(null, () => {
            window.location.replace('/');
        })
    }

    const handleSubmitChangeSubscriptionPlanToPrivate = async (successCallback) => {
        await reqChangeSubscriptionPlanToPrivate(null, () => {
            successCallback();
        });
    }

    return (
        <Container>
            <WorkspaceSelectorComponent />
            {workspace &&
                <>
                    <WorkspaceNameFieldComponent
                        workspace={workspace}
                    />
                    <LayoutComponent
                        workspace={workspace}
                        isWorkspaceMaster={workspace?.masterFlag}
                    >
                        {
                            (!viewType || viewType === 'PROFILE') &&
                            (
                                <ProfileComponent
                                    workspace={workspace}
                                />
                            )
                        }
                        {
                            (viewType === 'MEMBER_LIST') &&
                            (
                                <MemberListComponent
                                    workspace={workspace}
                                />
                            )
                        }
                        {
                            (workspace?.masterFlag && viewType && viewType === 'INVITE_MEMBER') &&
                            (
                                <InviteMemberComponent
                                    workspace={workspace}
                                />
                            )
                        }
                        {
                            (workspace?.masterFlag && viewType && viewType === 'AUTH_TEMPLATE') &&
                            (
                                <AuthTemplateListComponent
                                    workspace={workspace}
                                />
                            )
                        }
                        {
                            (workspace?.masterFlag && viewType && viewType === 'SETTINGS') &&
                            (
                                <SettingsComponent
                                    workspace={workspace}
                                    onSubmitModifyWorkspaceName={handleSubmitModifyWorkspaceName}
                                    onSubmitDeleteWorkspace={handleSubmitDeleteWorkspace}
                                    onSubmitChangeSubscriptionPlanToPrivate={handleSubmitChangeSubscriptionPlanToPrivate}
                                />
                            )
                        }
                        {
                            (workspace?.masterFlag && viewType && viewType === 'SUBSCRIPTION_PLAN') &&
                            (
                                <SubscriptionPlanComponent
                                    workspace={workspace}
                                />
                            )
                        }
                    </LayoutComponent>
                </>
            }
        </Container>
    );
}
export default WorkspaceManagementMainComponent;