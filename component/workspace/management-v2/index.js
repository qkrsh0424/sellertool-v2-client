import MemberListComponent from "./member-list/MemberList.component";
import WorkspaceNameFieldComponent from "./workspace-name-field/WorkspaceNameField.component";
import { useRouter } from 'next/router';
import WorkspaceSelectorComponent from "./workspace-selector/WorkspaceSelector.component";
import styled from 'styled-components';
import useWorkspaceMembersHook from "./hooks/useWorkspaceMembersHook";
import useWorkspaceHook from "./hooks/useWorkspaceHook";
import LayoutComponent from "./layout/Layout.component";
import useInviteMembersHook from "./hooks/useInviteMembersHook";
import InviteMemberComponent from "./invite-member/InviteMember.component";

const Container = styled.div`
    background-color: var(--defaultBackground);
`;

const WorkspaceManagementMainComponent = (props) => {
    const router = useRouter();

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
                    <LayoutComponent>
                        {(!router.query?.settings || router.query?.settings === 'member-list') &&
                            (
                                <MemberListComponent
                                    workspace={workspace}
                                />
                            )
                        }
                        {(router.query?.settings && router.query?.settings === 'invite-member') &&
                            (
                                <InviteMemberComponent
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