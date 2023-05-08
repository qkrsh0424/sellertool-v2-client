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
        reqDeleteWorkspace
    } = useWorkspaceHook();

    const handleSubmitModifyWorkspaceName = async ({
        body,
        successCallback
    }) => {
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

    return (
        <Container>
            <WorkspaceSelectorComponent />
            {workspace &&
                <>
                    <WorkspaceNameFieldComponent
                        workspace={workspace}

                        onSubmitModifyWorkspaceName={handleSubmitModifyWorkspaceName}
                    />
                    <LayoutComponent
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
                                    onSubmitDeleteWorkspace={handleSubmitDeleteWorkspace}
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