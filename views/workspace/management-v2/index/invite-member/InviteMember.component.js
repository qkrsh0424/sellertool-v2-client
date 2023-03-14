import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import useInviteMembersHook from "../hooks/useInviteMembersHook";
import InviteMemberModalComponent from "./modal/InviteMemberModal.component";
import { Container, ListWrapper, TitleFieldWrapper } from "./styles/InviteMember.styled";

export default function InviteMemberComponent({
    workspace,
    isWorkspaceMaster
}) {
    const userRedux = useSelector(state => state.userRedux);
    const {
        inviteMembers,
        reqFetchInviteMembers,
        reqCreateInviteMemberOne,
        reqDeleteInviteMemberOne,
        reqRetryInviteMember
    } = useInviteMembersHook({
        workspace: workspace
    });

    const [inviteMemberModalOpen, setInviteMemberModalOpen] = useState(false);

    const __handle = {
        action: {
            openInviteMemberModal: () => {
                setInviteMemberModalOpen(true);
            },
            closeInviteMemberModal: () => {
                setInviteMemberModalOpen(false);
            }
        },
        submit: {
            fetchInviteMembers: async () => {
                await reqFetchInviteMembers();
            },
            inviteMember: async ({ inviteMemberForm }) => {
                let body = {
                    workspaceId: workspace?.id,
                    username: inviteMemberForm?.username
                }

                await reqCreateInviteMemberOne({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeInviteMemberModal();
                    }
                })
            },
            removeInvitedMember: async ({ inviteMember }) => {
                let body = {
                    inviteMemberId: inviteMember.id
                }

                await reqDeleteInviteMemberOne({
                    body,
                    successCallback: () => {
                        __handle.action.closeInviteMemberModal()
                    }
                })
            },
            retryInviteMember: async ({ inviteMember }) => {
                let body = {
                    inviteMemberId: inviteMember.id
                }

                await reqRetryInviteMember({
                    body,
                    successCallback: () => { }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper
                    className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'
                >
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div className='title'>
                            멤버초대
                        </div>
                        <SingleBlockButton
                            type='button'
                            className='refresh-button-el'
                            onClick={() => __handle.submit.fetchInviteMembers()}
                        >
                            <div className='refresh-button-icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/refresh_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                        </SingleBlockButton>
                    </div>
                    {isWorkspaceMaster &&
                        (
                            <SingleBlockButton
                                type='button'
                                className='invite-button-el'
                                onClick={() => __handle.action.openInviteMemberModal()}
                            >
                                초대
                            </SingleBlockButton>
                        )
                    }
                </TitleFieldWrapper>
                <ListWrapper>
                    {inviteMembers?.map((r, index) => {
                        return (
                            <div
                                key={r.id}
                                className='item-group mgl-flex mgl-flex-alignItems-center'
                            >
                                <div
                                    className='content-group mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'
                                >
                                    <div className='profile-image-figure'>
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                            src={r?.user?.profileImageUri || '/images/icon/person_default_808080.svg'}
                                            layout='responsive'
                                            width={1}
                                            height={1}
                                            objectFit={'cover'}
                                            alt='image'
                                            loading='lazy'
                                        ></Image>
                                    </div>

                                    <div className='info-items mgl-flex'>
                                        <div className='tag-items'>
                                            <div
                                                className='status-tag'
                                                style={{
                                                    color: r.status === 'rejected' ? 'var(--defaultRedColor)' : '',
                                                    border: r.status === 'rejected' ? '1px solid var(--defaultRedColor)' : '',
                                                }}
                                            >
                                                {returnConvertedStatus(r.status)}
                                            </div>
                                        </div>
                                        <div className='user-items'>
                                            <div className='user-item mgl-font-color-primary'>{r.user.username}</div>
                                            <div className='user-item'>{r.user.nickname}</div>
                                        </div>
                                    </div>
                                </div>
                                {isWorkspaceMaster &&
                                    (
                                        <div className='control-items mgl-flex mgl-flex-alignItems-center'>
                                            {r.status === 'rejected' &&
                                                (
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='control-item retry-button-el'
                                                        onClick={() => __handle.submit.retryInviteMember({ inviteMember: r })}
                                                    >
                                                        재요청
                                                    </SingleBlockButton>
                                                )
                                            }
                                            <SingleBlockButton
                                                type='button'
                                                className='control-item remove-button-el'
                                                onClick={() => __handle.submit.removeInvitedMember({ inviteMember: r })}
                                            >
                                                삭제
                                            </SingleBlockButton>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </ListWrapper>
            </Container>

            <CommonModalComponent
                open={inviteMemberModalOpen}

                onClose={__handle.action.closeInviteMemberModal}
            >
                <InviteMemberModalComponent
                    onConfirm={__handle.submit.inviteMember}
                    onClose={__handle.action.closeInviteMemberModal}
                />
            </CommonModalComponent>
        </>
    );
}

function returnConvertedStatus(status) {
    switch (status) {
        case 'pending':
            return '대기중...'
        case 'rejected':
            return '거절됨'
        default:
            return '';
    }
}