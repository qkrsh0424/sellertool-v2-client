import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { Container, PaperBox, TitleFieldWrapper } from "./Settings.styled";
import DeleteWorkspaceModalComponent from "./modal/DeleteWorkspaceModal.component";
import ChangePrivateModalComponent from "./modal/ChangePrivateModal.component";
import { customBackdropController } from "../../../../../components/backdrop/default/v1";
import MdModifyWorkspaceName from "./modal/MdModifyWorkspaceName";

export default function SettingsComponent({
    workspace,
    onSubmitModifyWorkspaceName,
    onSubmitDeleteWorkspace,
    onSubmitChangeSubscriptionPlanToPrivate
}) {
    const [modifyWorkspaceNameModalOpen, setModifyWorkspaceNameModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [changePrivateModalOpen, setChangePrivateModalOpen] = useState(false);

    const customBackdropControl = customBackdropController();

    const toggleModifyWorkspaceNameModalOpen = (bool) => {
        setModifyWorkspaceNameModalOpen(bool);
    }

    const toggleDeleteModalOpen = (setOpen) => {
        setDeleteModalOpen(setOpen);
    }

    const toggleChangePrivateModalOpen = (setOpen) => {
        setChangePrivateModalOpen(setOpen);
    }

    const handleSubmitModifyWorkspaceName = async (body) => {
        if (!workspace) {
            return;
        }

        customBackdropControl.showBackdrop();
        await onSubmitModifyWorkspaceName(body, () => {
            toggleModifyWorkspaceNameModalOpen(false);
        })
        customBackdropControl.hideBackdrop();
    }

    const handleSubmitDeleteWorkspace = async () => {
        if (!workspace) {
            return;
        }

        customBackdropControl.showBackdrop();
        await onSubmitDeleteWorkspace();
        customBackdropControl.hideBackdrop();
    }

    const handleSubmitChangePrivate = async () => {
        if (!workspace) {
            return;
        }
        customBackdropControl.showBackdrop();
        await onSubmitChangeSubscriptionPlanToPrivate(() => {
            toggleChangePrivateModalOpen(false);
        })
        customBackdropControl.hideBackdrop();
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            설정
                        </div>
                    </div>
                </TitleFieldWrapper>
                <PaperBox className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                    <div>
                        <div className='title'>워크스페이스 이름 변경</div>
                        <div className='description'>해당 워크스페이스의 이름을 변경합니다.</div>
                    </div>
                    <CustomBlockButton
                        type='button'
                        className='common-btn'
                        onClick={() => toggleModifyWorkspaceNameModalOpen(true)}
                    >변경</CustomBlockButton>
                </PaperBox>
                <PaperBox className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween' style={{ opacity: workspace?.subscriptionPlan === 'NONE' ? 1 : 0.5 }}>
                    <div>
                        <div className='title'>개인 워크스페이스로 전환</div>
                        <div className='description'>해당 워크스페이스를 개인 워크스페이스로 전환 됩니다.</div>
                    </div>
                    <CustomBlockButton
                        type='button'
                        className='warning-btn'
                        onClick={workspace?.subscriptionPlan === 'NONE' ? () => toggleChangePrivateModalOpen(true) : () => { }}
                    >전환</CustomBlockButton>
                </PaperBox>
                <PaperBox className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                    <div>
                        <div className='title'>워크스페이스 삭제</div>
                        <div className='description'>워크스페이스를 한번 삭제하시면 복구가 불가능 합니다.</div>
                    </div>
                    <CustomBlockButton
                        type='button'
                        className='delete-btn'
                        onClick={() => toggleDeleteModalOpen(true)}
                    >삭제</CustomBlockButton>
                </PaperBox>
            </Container>

            {/* Modal */}
            {modifyWorkspaceNameModalOpen &&
                <MdModifyWorkspaceName
                    open={modifyWorkspaceNameModalOpen}
                    workspace={workspace}
                    onClose={() => toggleModifyWorkspaceNameModalOpen(false)}
                    onSubmit={handleSubmitModifyWorkspaceName}
                />
            }

            {deleteModalOpen &&
                <DeleteWorkspaceModalComponent
                    open={deleteModalOpen}
                    onClose={() => toggleDeleteModalOpen(false)}
                    workspace={workspace}
                    onSubmitDeleteWorkspace={handleSubmitDeleteWorkspace}
                />
            }

            {changePrivateModalOpen &&
                <ChangePrivateModalComponent
                    open={changePrivateModalOpen}
                    onClose={() => toggleChangePrivateModalOpen(false)}
                    workspace={workspace}
                    onSubmitChangePrivate={handleSubmitChangePrivate}
                />
            }
        </>
    );
}