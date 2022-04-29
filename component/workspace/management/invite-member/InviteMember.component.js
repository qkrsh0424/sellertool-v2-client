import { useEffect, useReducer, useState } from "react";
import CommonModalComponent from "../../../modules/CommonModalComponent";
import ConfirmModalComponent from "../../../modules/ConfirmModalComponent";
import FieldLoading from "../../../modules/FieldLoading";
import InviteModalComponent from "../invite-modal/InviteModal.component";
import { Container, HeadFieldWrapper, ListFieldWrapper } from "./InviteMember.styled";

function HeaderFieldView({ onActionOpenInviteModal }) {
    return (
        <HeadFieldWrapper>
            <div className='title-el'>
                멤버 초대
            </div>
            <button
                className='button-el'
                onClick={onActionOpenInviteModal}
            >
                초대하기
            </button>
        </HeadFieldWrapper>
    );
}
const InviteMemberComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [cancelInviteModalOpen, setCancelInviteModalOpen] = useState(false);
    const [selectedCancelInviteMember, dispatchSelectedCancelInviteMember] = useReducer(selectedCancelInviteMemberReducer, initialSelectedCancelInviteMember);

    useEffect(() => {
        if (!props.inviteMembers) {
            setIsLoading(true);
            return;
        }

        setIsLoading(false);

    }, [props.inviteMembers])
    const __invite = {
        action: {
            openModal: () => {
                setInviteModalOpen(true);
            },
            closeModal: () => {
                setInviteModalOpen(false);
            },
            openCancelModal: (inviteMember) => {
                dispatchSelectedCancelInviteMember({
                    type: 'SET_DATA',
                    payload: inviteMember
                })
                setCancelInviteModalOpen(true);
            },
            closeCancelModal: () => {
                setCancelInviteModalOpen(false);
                dispatchSelectedCancelInviteMember({
                    type: 'CLEAR'
                })
            },
            confirmCancel: () => {
                if (!selectedCancelInviteMember) {
                    return;
                }

                props.onActionCancelInviteRequest(selectedCancelInviteMember);
                __invite.action.closeCancelModal();
            }
        }
    }
    return (
        <>
            <Container>
                <HeaderFieldView
                    onActionOpenInviteModal={__invite.action.openModal}
                />
                {isLoading &&
                    <FieldLoading
                        marginTop={100}
                        marginBottom={100}
                    />
                }
                {(!isLoading && props.inviteMembers?.length <= 0) &&
                    <div style={{ textAlign: 'center', margin: '150px 0', fontWeight: '500' }}>현재 대기중인 초대 요청이 없습니다.</div>
                }
                {(props.inviteMembers && props.inviteMembers?.length > 0) &&
                    <ListFieldWrapper>
                        <div className='list-box'>
                            {props.inviteMembers?.map(r => {
                                return (
                                    <div
                                        key={r.id}
                                        className='item-box'
                                    >
                                        <div style={{ fontSize: '13px', color: '#57606a' }}>
                                            요청 번호 {r.id.split('-')[0]}
                                        </div>
                                        <div className='head-box'>
                                            {r.user.username}
                                        </div>
                                        <div className='footer-box'>
                                            <div className='status-el'>요청 수락 대기중.</div>
                                            <button
                                                type='button'
                                                className='delete-button-el'
                                                onClick={() => __invite.action.openCancelModal(r)}
                                            >
                                                요청철회
                                            </button>
                                        </div>
                                    </div>

                                );
                            })}
                        </div>
                    </ListFieldWrapper>
                }
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={inviteModalOpen}

                onClose={__invite.action.closeModal}
            >
                <InviteModalComponent
                    workspace={props.workspace}
                    onClose={__invite.action.closeModal}
                    onFetchInviteMembers={props.onFetchInviteMembers}
                ></InviteModalComponent>
            </CommonModalComponent>

            {/* 초대 요청 철회 확인 메세지 */}
            <ConfirmModalComponent
                open={cancelInviteModalOpen}
                message={'해당 유저의 초대 요청을 철회 하시겠습니까?'}

                onClose={__invite.action.closeCancelModal}
                onConfirm={__invite.action.confirmCancel}
            />
        </>
    );
}
export default InviteMemberComponent;

const initialSelectedCancelInviteMember = null;

const selectedCancelInviteMemberReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedCancelInviteMember;
        default: return initialSelectedCancelInviteMember;
    }
}