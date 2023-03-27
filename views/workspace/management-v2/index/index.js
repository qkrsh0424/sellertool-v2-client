import MemberListComponent from "./member-list/MemberList.component";
import WorkspaceNameFieldComponent from "./workspace-name-field/WorkspaceNameField.component";
import { useRouter } from 'next/router';
import WorkspaceSelectorComponent from "./workspace-selector/WorkspaceSelector.component";
import styled from 'styled-components';
import useWorkspaceHook from "./hooks/useWorkspaceHook";
import LayoutComponent from "./layout/Layout.component";
import InviteMemberComponent from "./invite-member/InviteMember.component";
import useIsWorkspaceMasterHook from "./hooks/useIsWorkspaceMasterHook";
import AuthTemplateListComponent from "./auth-template-list/AuthTemplateList.component";
import ProfileComponent from "./profile/Profile.component";

const Container = styled.div`
    background-color: var(--defaultBackground);
`;

const WorkspaceManagementMainComponent = (props) => {
    const router = useRouter();
    const viewType = router?.query?.view;

    const {
        workspace,
        reqChangeWorkspaceName
    } = useWorkspaceHook();

    const {
        isWorkspaceMaster
    } = useIsWorkspaceMasterHook({
        workspace: workspace
    })

    const __handle = {
        submit: {
            modifyWorkspaceName: async ({
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
        }
    }

    return (
        <Container>
            <WorkspaceSelectorComponent />
            {workspace &&
                <>
                    <WorkspaceNameFieldComponent
                        workspace={workspace}
                        isWorkspaceMaster={isWorkspaceMaster}

                        onSubmitModifyWorkspaceName={__handle.submit.modifyWorkspaceName}
                    />
                    <LayoutComponent
                        isWorkspaceMaster={isWorkspaceMaster}
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
                                    isWorkspaceMaster={isWorkspaceMaster}
                                />
                            )
                        }
                        {
                            (isWorkspaceMaster && viewType && viewType === 'INVITE_MEMBER') &&
                            (
                                <InviteMemberComponent
                                    workspace={workspace}
                                    isWorkspaceMaster={isWorkspaceMaster}
                                />
                            )
                        }
                        {
                            (isWorkspaceMaster && viewType && viewType === 'AUTH_TEMPLATE') &&
                            (
                                <AuthTemplateListComponent
                                    workspace={workspace}
                                    isWorkspaceMaster={isWorkspaceMaster}
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