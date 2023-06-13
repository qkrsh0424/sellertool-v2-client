import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import Ripple from "../../../../modules/button/Ripple";
import { Container, Wrapper } from "./styles/WorkspaceNameField.styled";
import ModifyWorkspaceNameModalComponent from "./modal/ModifyWorkspaceNameModal.component";

const WorkspaceNameFieldComponent = ({
    workspace,
    onSubmitModifyWorkspaceName
}) => {
    const [modifyWorkspaceNameModalOpen, setModifyWorkspaceNameModalOpen] = useState(false);

    const __handle = {
        action: {
            openModifyWorkspaceNameModal: () => {
                setModifyWorkspaceNameModalOpen(true);
            },
            closeModifyWorkspaceNameModal: () => {
                setModifyWorkspaceNameModalOpen(false);
            }
        },
        submit: {
            modifyWorkspaceName: (workspaceName) => {
                let body = {
                    id: workspace.id,
                    name: workspaceName
                }

                onSubmitModifyWorkspaceName({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyWorkspaceNameModal();
                    }
                });

            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        {workspace?.name}
                    </div>
                    {workspace?.masterFlag &&
                        (
                            <div className='button-box'>
                                <button
                                    type='button'
                                    className='button-el'
                                    onClick={() => __handle.action.openModifyWorkspaceNameModal()}
                                >
                                    <div className='button-icon-figure'>
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                            src='/images/icon/pen_icon2.png'
                                            layout='fill'
                                            alt="modify icon"
                                            className='button-icon'
                                            loading='lazy'
                                        ></Image>
                                    </div>
                                    <Ripple color={'#fff'} duration={1000}></Ripple>
                                </button>
                            </div>
                        )
                    }
                </Wrapper>
            </Container>

            {/* Modal */}
            {modifyWorkspaceNameModalOpen &&
                <CommonModalComponent
                    open={modifyWorkspaceNameModalOpen}

                    onClose={__handle.action.closeModifyWorkspaceNameModal}
                >
                    <ModifyWorkspaceNameModalComponent
                        workspace={workspace}

                        onClose={__handle.action.closeModifyWorkspaceNameModal}
                        onConfirm={__handle.submit.modifyWorkspaceName}
                    ></ModifyWorkspaceNameModalComponent>
                </CommonModalComponent>
            }
        </>
    );
}
export default WorkspaceNameFieldComponent;