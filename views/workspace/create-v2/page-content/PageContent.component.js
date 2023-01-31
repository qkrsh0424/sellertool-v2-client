import { useState } from "react";
import formatValidUtils from "../../../../utils/formatValidUtils";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import useWorkspaceCreateFormHook from "../hooks/useWorkspaceCreateFormHook";
import WorkspaceCreateModalComponent from "../modal/WorkspaceCreateModal.component";
import ItemListFieldView from "./ItemListField.view";
import OperationFieldView from "./OperationField.view";
import { Container } from "./PageContent.styled";

const PageContentComponent = ({
    onSubmitCreateWorkspace
}) => {
    const {
        workspaceCreateForm,
        onActionSelectPublic,
        onActionSelectPrivate
    } = useWorkspaceCreateFormHook();

    const [workspaceCreateModalOpen, setWorkspaceCreateModalOpen] = useState(false);

    const __handle = {
        action: {
            openWorkspaceCreateModal: () => {
                setWorkspaceCreateModalOpen(true);
            },
            closeWorkspaceCreateModal: () => {
                setWorkspaceCreateModalOpen(false);
            }
        },
        submit: {
            create: (workspaceName) => {
                if (!formatValidUtils.isWorkspaceNameFormatValid(workspaceName)) {
                    alert('워크스페이스 이름은 2-30자, 처음과 마지막의 공백은 허용하지 않습니다.');
                    return;
                }

                let body = {
                    ...workspaceCreateForm,
                    name: workspaceName
                }

                onSubmitCreateWorkspace({
                    body: body,
                    successCallback: () => { }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <ItemListFieldView
                    workspaceCreateForm={workspaceCreateForm}

                    onActionSelectPublic={onActionSelectPublic}
                    onActionSelectPrivate={onActionSelectPrivate}
                />
                <OperationFieldView
                    onContinue={__handle.action.openWorkspaceCreateModal}
                />
            </Container>

            {workspaceCreateModalOpen &&
                (
                    <CommonModalComponent
                        open={workspaceCreateModalOpen}
                        onClose={__handle.action.closeWorkspaceCreateModal}
                    >
                        <WorkspaceCreateModalComponent
                            onClose={__handle.action.closeWorkspaceCreateModal}
                            onConfirm={__handle.submit.create}
                        />
                    </CommonModalComponent>
                )
            }
        </>
    );
}
export default PageContentComponent;