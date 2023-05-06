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

const Container = styled.div`
    background-color: var(--defaultBackground);
    min-height: 800px;
`;

const WorkspaceManagementMainComponent = (props) => {
    const router = useRouter();
    const viewType = router?.query?.view;

    const {
        workspace,
        reqChangeWorkspaceName
    } = useWorkspaceHook();

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

                        onSubmitModifyWorkspaceName={__handle.submit.modifyWorkspaceName}
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
                    </LayoutComponent>
                </>
            }

        </Container>
    );
}
export default WorkspaceManagementMainComponent;