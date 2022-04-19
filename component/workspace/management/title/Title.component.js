import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import CommonModalComponent from "../../../modules/CommonModalComponent";
import Ripple from "../../../modules/Ripple";
import { Container, Wrapper, EditNameModalWrapper } from "./Title.styled";

function EditNameModal({ editName, onChangeEditName, onClose, onConfirm }) {
    const [disabledBtn, setDisabledBtn] = useState(false);

    const onActionConfirm = (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        onConfirm();
    }

    return (
        <EditNameModalWrapper>
            <div className='title'>
                워크스페이스 이름 변경
            </div>
            <form onSubmit={onActionConfirm}>
                <div className='input-box'>
                    <div className='input-label'>워크스페이스 이름</div>
                    <input
                        type='text'
                        className='input-el'
                        value={editName || ''}
                        onChange={onChangeEditName}
                        required
                    ></input>
                </div>
                <div className='button-wrapper'>
                    <button
                        type='button'
                        className='button-el'
                        style={{ color: '#ff6961' }}
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: `${disabledBtn ? '#e0e0e0' : '#2C73D2'}` }}
                        disabled={disabledBtn}
                    >
                        확인
                    </button>
                </div>
            </form>
        </EditNameModalWrapper>
    );
}

const TitleComponent = (props) => {
    const [editName, dispatchEditName] = useReducer(editNameReducer, initialEditName);
    const [editNameModalOpen, setEditNameModalOpen] = useState(false);

    useEffect(() => {
        if (!editNameModalOpen || !props.workspaceInfo) {
            return;
        }

        dispatchEditName({
            type: 'SET_DATA',
            payload: props.workspaceInfo.name
        });

    }, [editNameModalOpen, props.workspaceInfo])

    const __workspace = {
        action: {
            openEditNameModal: () => {
                setEditNameModalOpen(true);
            },
            closeEditNameModal: () => {
                setEditNameModalOpen(false);
            },
            changeWorkspaceName: () => {
                if (!editName) {
                    return;
                }

                props.onSubmitChangeWorkspaceName(editName);
                __workspace.action.closeEditNameModal();
            }
        },
        change: {
            editName: (e) => {
                let value = e.target.value;

                dispatchEditName({
                    type: 'SET_DATA',
                    payload: value
                })
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title-box'>
                        {props.workspaceInfo.name}
                    </div>
                    <div className='button-box'>
                        <button
                            type='button'
                            className='button-el'
                            onClick={__workspace.action.openEditNameModal}
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/pen_icon2.png'
                                    layout='fill'
                                    alt=""
                                    className='button-icon'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <Ripple color={'#fff'} duration={1000}></Ripple>
                        </button>
                    </div>
                </Wrapper>
            </Container>

            {/* Modal */}
            {editNameModalOpen &&
                <CommonModalComponent
                    open={editNameModalOpen}

                    onClose={__workspace.action.closeEditNameModal}
                >
                    <EditNameModal
                        editName={editName}

                        onChangeEditName={__workspace.change.editName}
                        onClose={__workspace.action.closeEditNameModal}
                        onConfirm={__workspace.action.changeWorkspaceName}
                    ></EditNameModal>
                </CommonModalComponent>
            }
        </>
    );
}
export default TitleComponent;

const initialEditName = '';

const editNameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialEditName;
    }
}