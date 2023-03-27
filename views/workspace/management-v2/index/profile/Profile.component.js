import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import useWorkspaceMemberHook from "../hooks/useWorkspaceMemberHook";
import EditEmailModalComponent from "./modal/EditEmailModal.component";
import EditNicknameModalComponent from "./modal/EditNicknameModal.component";
import EditPhoneNumberModalComponent from "./modal/EditPhoneNumberModal.component";
import EditProfileImageUriModalComponent from "./modal/EditProfileImageUriModal.component";
import { Container, ProfileWrapper, TitleFieldWrapper } from "./Profile.styled";

export default function ProfileComponent({
    workspace
}) {
    const {
        workspaceMember,
        reqChangeProfileImageUri,
        reqChangeNickname,
        reqChangePhoneNumber,
        reqChangeEmail
    } = useWorkspaceMemberHook(workspace);

    const [editProfileImageUriModalOpen, setEditProfileImageUriModalOpen] = useState(false);
    const [editNicknameModalOpen, setEditNicknameModalOpen] = useState(false);
    const [editPhoneNumberModalOpen, setEditPhoneNumberModalOpen] = useState(false);
    const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);

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

    const handleSubmitChangeProfileImageUri = async (profileImageUri) => {
        const body = {
            workspaceMemberId: workspaceMember?.id,
            profileImageUri: profileImageUri
        }

        await reqChangeProfileImageUri(body, () => {
            toggleEditProfileImageUriModalOpen(false);
        });
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
                {editProfileImageUriModalOpen &&
                    <EditProfileImageUriModalComponent
                        open={editProfileImageUriModalOpen}
                        onClose={() => toggleEditProfileImageUriModalOpen(false)}
                        profileImageUri={workspaceMember?.profileImageUri}
                        onSubmit={handleSubmitChangeProfileImageUri}
                    />
                }
                {editNicknameModalOpen &&
                    <EditNicknameModalComponent
                        open={editNicknameModalOpen}
                        onClose={() => toggleEditNicknameModalOpen(false)}
                        nickname={workspaceMember?.nickname}
                        onSubmit={handleSubmitChangeNickname}
                    />
                }
                {editPhoneNumberModalOpen &&
                    <EditPhoneNumberModalComponent
                        open={editPhoneNumberModalOpen}
                        onClose={() => toggleEditPhoneNumberModalOpen(false)}
                        phoneNumber={workspaceMember?.phoneNumber}
                        onSubmit={handleSubmitChangePhoneNumber}
                    />
                }
                {editEmailModalOpen &&
                    <EditEmailModalComponent
                        open={editEmailModalOpen}
                        onClose={() => toggleEditEmailModalOpen(false)}
                        email={workspaceMember?.email}
                        onSubmit={handleSubmitChangeEmail}
                    />
                }
            </Container>
        </>
    );
}