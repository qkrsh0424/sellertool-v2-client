import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import CustomImage from "../../../../modules/image/CustomImage";
import useWorkspaceMemberHook from "../hooks/useWorkspaceMemberHook";
import DropWorkspaceModalComponent from "./modal/DropWorkspaceModal.component";
import EditEmailModalComponent from "./modal/EditEmailModal.component";
import EditNicknameModalComponent from "./modal/EditNicknameModal.component";
import EditPhoneNumberModalComponent from "./modal/EditPhoneNumberModal.component";
import EditProfileImageUriModalComponent from "./modal/EditProfileImageUriModal.component";
import { Container, DropWorkspaceButtonBox, ProfileWrapper, TitleFieldWrapper } from "./Profile.styled";

export default function ProfileComponent({
    workspace,
    isWorkspaceMaster
}) {
    const {
        workspaceMember,
        reqChangeProfileImageUri,
        reqChangeNickname,
        reqChangePhoneNumber,
        reqChangeEmail,
        reqLeaveWorkspace
    } = useWorkspaceMemberHook(workspace);
    const {
        open: backdropOpen,
        onActionOpen: onOpenBackdrop,
        onActionClose: onCloseBackdrop
    } = useBackdropHook()

    const [editProfileImageUriModalOpen, setEditProfileImageUriModalOpen] = useState(false);
    const [editNicknameModalOpen, setEditNicknameModalOpen] = useState(false);
    const [editPhoneNumberModalOpen, setEditPhoneNumberModalOpen] = useState(false);
    const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);
    const [dropWorkspaceModalOpen, setDropWorkspaceModalOpen] = useState(false);

    const toggleEditProfileImageUriModalOpen = (open) => {
        setEditProfileImageUriModalOpen(open);
    }

    const toggleEditNicknameModalOpen = (open) => {
        setEditNicknameModalOpen(open);
    }

    const toggleEditPhoneNumberModalOpen = (open) => {
        setEditPhoneNumberModalOpen(open);
    }

    const toggleEditEmailModalOpen = (open) => {
        setEditEmailModalOpen(open);
    }

    const toggleDropWorkspaceModalOpen = (open) => {
        setDropWorkspaceModalOpen(open)
    }

    const handleSubmitChangeProfileImageUri = async (profileImageUri) => {
        const body = {
            workspaceMemberId: workspaceMember?.id,
            profileImageUri: profileImageUri
        }

        await reqChangeProfileImageUri(body, () => {
            toggleEditProfileImageUriModalOpen(false);
        });
        onCloseBackdrop();
    }

    const handleSubmitChangeNickname = async (nickname) => {
        const body = {
            workspaceMemberId: workspaceMember?.id,
            nickname: nickname
        }

        await reqChangeNickname(body, () => {
            alert('닉네임이 변경되었습니다.');
            toggleEditNicknameModalOpen(false);
        })
        onCloseBackdrop();
    }

    const handleSubmitChangePhoneNumber = async (phoneNumber) => {
        const body = {
            workspaceMemberId: workspaceMember?.id,
            phoneNumber: phoneNumber
        }

        await reqChangePhoneNumber(body, () => {
            alert('휴대전화가 변경되었습니다.');
            toggleEditPhoneNumberModalOpen(false);
        })
        onCloseBackdrop();
    }

    const handleSubmitChangeEmail = async (email) => {
        const body = {
            workspaceMemberId: workspaceMember?.id,
            email: email
        }

        await reqChangeEmail(body, () => {
            alert('이메일이 변경되었습니다.');
            toggleEditEmailModalOpen(false);
        })
        onCloseBackdrop();
    }

    const handleSubmitDropWorkspace = async () => {
        const body = {
            workspaceMemberId: workspaceMember?.id,
        }

        await reqLeaveWorkspace(body, () => {
            toggleDropWorkspaceModalOpen(false);
        })
        onCloseBackdrop();
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            프로필
                        </div>
                    </div>
                </TitleFieldWrapper>
                <ProfileWrapper>
                    <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                        <div
                            className='profile-image-figure'
                            onClick={() => toggleEditProfileImageUriModalOpen(true)}
                        >
                            <CustomImage
                                src={workspaceMember?.profileImageUri || '/images/icon/person_default_808080.svg'}
                            />
                        </div>
                        <div className='info-group'>
                            <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                <div className='info-text info-text-primary'>
                                    {workspaceMember?.nickname}
                                </div>
                                <div>
                                    <CustomBlockButton
                                        type='button'
                                        className='modify-button modify-button-w-md'
                                        onClick={() => toggleEditNicknameModalOpen(true)}
                                    >
                                        닉네임 수정
                                    </CustomBlockButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                        <div className='icon-figure'>
                            <CustomImage
                                src={'/images/icon/phone_default_808080.svg'}
                            />
                        </div>
                        <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                            <div className='info-text'>
                                {workspaceMember?.phoneNumber}
                            </div>
                            <div>
                                <CustomBlockButton
                                    type='button'
                                    className='modify-button'
                                    onClick={() => toggleEditPhoneNumberModalOpen(true)}
                                >
                                    수정
                                </CustomBlockButton>
                            </div>
                        </div>
                    </div>
                    <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                        <div className='icon-figure'>
                            <CustomImage
                                src={'/images/icon/mail_default_808080.svg'}
                            />
                        </div>
                        <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                            <div className='info-text'>
                                {workspaceMember?.email}
                            </div>
                            <div>
                                <CustomBlockButton
                                    type='button'
                                    className='modify-button'
                                    onClick={() => toggleEditEmailModalOpen(true)}
                                >
                                    수정
                                </CustomBlockButton>
                            </div>
                        </div>
                    </div>
                </ProfileWrapper>
                {!isWorkspaceMaster &&
                    <DropWorkspaceButtonBox>
                        <CustomBlockButton
                            type='button'
                            className='button'
                            onClick={() => toggleDropWorkspaceModalOpen(true)}
                        >
                            워크스페이스 탈퇴
                        </CustomBlockButton>
                    </DropWorkspaceButtonBox>
                }
            </Container>
            {editProfileImageUriModalOpen &&
                <EditProfileImageUriModalComponent
                    open={editProfileImageUriModalOpen}
                    onClose={() => toggleEditProfileImageUriModalOpen(false)}
                    onSubmit={handleSubmitChangeProfileImageUri}
                    onOpenBackdrop={onOpenBackdrop}
                    onCloseBackdrop={onCloseBackdrop}
                />
            }
            {editNicknameModalOpen &&
                <EditNicknameModalComponent
                    open={editNicknameModalOpen}
                    onClose={() => toggleEditNicknameModalOpen(false)}
                    nickname={workspaceMember?.nickname}
                    onSubmit={handleSubmitChangeNickname}
                    onOpenBackdrop={onOpenBackdrop}
                />
            }
            {editPhoneNumberModalOpen &&
                <EditPhoneNumberModalComponent
                    open={editPhoneNumberModalOpen}
                    onClose={() => toggleEditPhoneNumberModalOpen(false)}
                    phoneNumber={workspaceMember?.phoneNumber}
                    onSubmit={handleSubmitChangePhoneNumber}
                    onOpenBackdrop={onOpenBackdrop}
                />
            }
            {editEmailModalOpen &&
                <EditEmailModalComponent
                    open={editEmailModalOpen}
                    onClose={() => toggleEditEmailModalOpen(false)}
                    email={workspaceMember?.email}
                    onSubmit={handleSubmitChangeEmail}
                    onOpenBackdrop={onOpenBackdrop}
                />
            }
            {dropWorkspaceModalOpen &&
                <DropWorkspaceModalComponent
                    open={dropWorkspaceModalOpen}
                    onClose={() => toggleDropWorkspaceModalOpen(false)}
                    onSubmit={handleSubmitDropWorkspace}
                />
            }
            {backdropOpen &&
                <BackdropHookComponent
                    open={backdropOpen}
                />
            }
        </>
    );
}