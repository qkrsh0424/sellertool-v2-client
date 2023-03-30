import { useRouter } from "next/router";
import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import PagenationComponentV2 from "../../../../modules/pagenation/PagenationComponentV2";
import useRefWorkspaceAuthItems from "./hooks/useRefWorkspaceAuthItems";
import useWorkspaceAuthTemplatePageHook from "./hooks/useWorkspaceAuthTemplatePageHook";
import DeleteModalComponent from "./modal/DeleteModal.component";
import EditModalComponent from "./modal/EditModal.component";
import RegisterModalComponent from "./modal/RegisterModal.component";
import { Container, ListWrapper, RegisterButton, RegisterButtonBox, TitleFieldWrapper } from "./styles/AuthTemplateList.styled";

export default function AuthTemplateListComponent({
    workspace
}) {
    const {
        workspaceAuthTemplatePage,
        reqCreate,
        reqUpdate,
        reqDelete
    } = useWorkspaceAuthTemplatePageHook(workspace);

    const {
        refWorkspaceAuthItems
    } = useRefWorkspaceAuthItems();

    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [targetWorkspaceAuthTemplate, setTargetWorkspaceAuthTemplate] = useState(null);

    const toggleRegisterModalOpen = (open) => {
        setRegisterModalOpen(open);
    }

    const toggleEditModalOpen = (open, workspaceAuthTemplate) => {
        if (open) {
            setTargetWorkspaceAuthTemplate(workspaceAuthTemplate);
        } else {
            setTargetWorkspaceAuthTemplate(null);
        }
        setEditModalOpen(open);
    }

    const toggleDeleteModalOpen = (open, workspaceAuthTemplate) => {
        if (open) {
            setTargetWorkspaceAuthTemplate(workspaceAuthTemplate);
        } else {
            setTargetWorkspaceAuthTemplate(null);
        }
        setDeleteModalOpen(open);
    }

    const handleSubmitCreate = async (body) => {
        if (!workspace?.masterFlag) {
            alert('접근 권한이 없습니다.');
            return;
        }

        await reqCreate(body, () => toggleRegisterModalOpen(false));
    }

    const handleSubmitUpdate = async (body) => {
        if (!workspace?.masterFlag) {
            alert('접근 권한이 없습니다.');
            return;
        }

        await reqUpdate(body, () => toggleEditModalOpen(false));
    }

    const handleSubmitDelete = async () => {
        if (!workspace?.masterFlag) {
            alert('접근 권한이 없습니다.');
            return;
        }

        const body = {
            id: targetWorkspaceAuthTemplate?.id
        }
        await reqDelete(body, () => {
            toggleDeleteModalOpen(false);
        });
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            권한 템플릿 목록
                        </div>
                    </div>
                </TitleFieldWrapper>
                <RegisterButtonBox>
                    <CustomBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => toggleRegisterModalOpen(true)}
                    >
                        생성
                    </CustomBlockButton>
                </RegisterButtonBox>
                <ListWrapper>
                    {workspaceAuthTemplatePage?.content?.map(workspaceAuthTemplate => {
                        return (
                            <div
                                key={workspaceAuthTemplate?.id}
                                className='item-group mgl-flex mgl-flex-alignItems-center'
                            >
                                <div
                                    className='content-group'
                                >
                                    <div className='template-name'>
                                        {workspaceAuthTemplate?.name}
                                        {workspaceAuthTemplate?.useYn === 'y' ?
                                            <span className='use-tag use-tag-y'>사용중</span>
                                            :
                                            <span className='use-tag use-tag-n'>사용안함</span>
                                        }
                                    </div>
                                    <div className='time-info'>
                                        <div className='classify'>생성일</div>
                                        <div>{dateToYYYYMMDDhhmmss(workspaceAuthTemplate?.createdAt)}</div>
                                    </div>
                                    <div className='time-info'>
                                        <div className='classify'>마지막 수정일</div>
                                        <div>{dateToYYYYMMDDhhmmss(workspaceAuthTemplate?.updatedAt)}</div>
                                    </div>
                                </div>
                                <div className='control-items mgl-flex mgl-flex-alignItems-center'>
                                    <CustomBlockButton
                                        type='button'
                                        className='control-item setting-button-el'
                                        onClick={() => toggleEditModalOpen(true, workspaceAuthTemplate)}
                                    >
                                        수정
                                    </CustomBlockButton>
                                    <CustomBlockButton
                                        type='button'
                                        className='control-item remove-button-el'
                                        onClick={() => toggleDeleteModalOpen(true, workspaceAuthTemplate)}
                                    >
                                        삭제
                                    </CustomBlockButton>
                                </div>
                            </div>
                        );
                    })}
                </ListWrapper>

                <PagenationComponentV2
                    pageIndex={workspaceAuthTemplatePage?.number}
                    isFirst={workspaceAuthTemplatePage?.first}
                    isLast={workspaceAuthTemplatePage?.last}
                    totalElements={workspaceAuthTemplatePage?.totalElements}
                    totalPages={workspaceAuthTemplatePage?.totalPages}
                    sizeElements={[20, 50]}
                    style={{ marginTop: '20px' }}
                />
            </Container>

            {registerModalOpen &&
                <RegisterModalComponent
                    open={registerModalOpen}
                    refWorkspaceAuthItems={refWorkspaceAuthItems}
                    onClose={() => toggleRegisterModalOpen(false)}
                    onSubmit={handleSubmitCreate}
                />
            }

            {editModalOpen &&
                <EditModalComponent
                    open={editModalOpen}
                    refWorkspaceAuthItems={refWorkspaceAuthItems}
                    targetWorkspaceAuthTemplate={targetWorkspaceAuthTemplate}
                    onClose={() => toggleEditModalOpen(false)}
                    onSubmit={handleSubmitUpdate}
                />
            }
            {deleteModalOpen &&
                <DeleteModalComponent
                    open={deleteModalOpen}
                    onClose={() => toggleDeleteModalOpen(false)}
                    onSubmit={() => handleSubmitDelete()}
                />
            }
        </>
    );
}