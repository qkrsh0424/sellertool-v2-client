import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { Container, PaperBox, TitleFieldWrapper } from "./Settings.styled";
import DeleteWorkspaceModalComponent from "./modal/DeleteWorkspaceModal.component";

export default function SettingsComponent({
    workspace,
    onSubmitDeleteWorkspace
}) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const toggleDeleteModalOpen = (setOpen) => {
        setDeleteModalOpen(setOpen);
    }

    const handleSubmitDeleteWorkspace = () => {
        if (!workspace) {
            return;
        }

        onSubmitDeleteWorkspace();
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

            {deleteModalOpen &&
                <DeleteWorkspaceModalComponent
                    open={deleteModalOpen}
                    onClose={() => toggleDeleteModalOpen(false)}
                    workspace={workspace}
                    onSubmitDeleteWorkspace={handleSubmitDeleteWorkspace}
                />
            }
        </>
    );
}