import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import useUserHook from "../hooks/useUserHook";
import ModifyEmailModalComponent from "./modal/ModifyEmailModal.component";
import ModifyNameModalComponent from "./modal/ModifyNameModal.component";
import ModifyNicknameModalComponent from "./modal/ModifyNicknameModal.component";
import ModifyPasswordModalComponent from "./modal/ModifyPasswordModal.component";
import ModifyPhoneNumberModalComponent from "./modal/ModifyPhoneNumberModal.component";
import ModifyProfileImageUriModalComponent from "./modal/ModifyProfileImageUriModal.component";
import { Container, ProfileWrapper, TitleFieldWrapper } from "./styles/Information.styled";

export default function InformationComponent(props) {
    const userRedux = useSelector(state => state.userRedux);
    const [modifyProfileImageUriModalOpen, setModifyProfileImageUriModalOpen] = useState(false);
    const [modifyNicknameModalOpen, setModifyNicknameModalOpen] = useState(false);
    const [modifyNameModalOpen, setModifyNameModalOpen] = useState(false);
    const [modifyPhoneNumberModalOpen, setModifyPhoneNumberModalOpen] = useState(false);
    const [modifyEmailModalOpen, setModifyEmailModalOpen] = useState(false);
    const [modifyPasswordModalOpen, setModifyPasswordModalOpen] = useState(false);

    const {
        reqChangeProfileImageUri,
        reqChangeNickname,
        reqChangeName,
        reqChangePhoneNumber,
        reqChangeEmail,
        reqChangePassword
    } = useUserHook();

    const __handle = {
        action: {
            openModifyProfileImageUriModal: () => {
                setModifyProfileImageUriModalOpen(true);
            },
            closeModifyProfileImageUriModal: () => {
                setModifyProfileImageUriModalOpen(false);
            },
            openModifyNicknameModal: () => {
                setModifyNicknameModalOpen(true);
            },
            closeModifyNicknameModal: () => {
                setModifyNicknameModalOpen(false);
            },
            openModifyNameModal: () => {
                setModifyNameModalOpen(true);
            },
            closeModifyNameModal: () => {
                setModifyNameModalOpen(false);
            },
            openModifyPhoneNumberModal: () => {
                setModifyPhoneNumberModalOpen(true);
            },
            closeModifyPhoneNumberModal: () => {
                setModifyPhoneNumberModalOpen(false);
            },
            openModifyEmailModal: () => {
                setModifyEmailModalOpen(true);
            },
            closeModifyEmailModal: () => {
                setModifyEmailModalOpen(false);
            },
            openModifyPasswordModal: () => {
                setModifyPasswordModalOpen(true);
            },
            closeModifyPasswordModal: () => {
                setModifyPasswordModalOpen(false);
            }
        },
        submit: {
            changeProfileImageUri: async (imageUri) => {
                let body = {
                    profileImageUri: imageUri
                }

                await reqChangeProfileImageUri(body, () => {
                    __handle.action.closeModifyProfileImageUriModal();
                });
            },
            changeNickname: async ({ nickname }) => {
                let body = {
                    nickname: nickname
                }
                await reqChangeNickname({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyNicknameModal();
                    }
                });
            },
            changeName: async ({ name }) => {
                let body = {
                    name: name
                }

                await reqChangeName({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyNameModal();
                    }
                });
            },
            changePhoneNumber: async ({
                phoneNumber,
                phoneNumberValidationCode
            }) => {
                let body = {
                    phoneNumber: phoneNumber,
                    phoneNumberValidationCode: phoneNumberValidationCode
                };

                await reqChangePhoneNumber({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyPhoneNumberModal();
                    }
                });
            },
            changeEmail: async ({
                email,
                emailValidationCode
            }) => {
                let body = {
                    email: email,
                    emailValidationCode: emailValidationCode
                };

                await reqChangeEmail({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyEmailModal();
                    }
                });
            },
            changePassword: async ({
                currentPassword,
                newPassword,
                newPasswordChecker
            }) => {
                let body = {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    newPasswordChecker: newPasswordChecker
                }

                await reqChangePassword({
                    body: body,
                    successCallback: () => {
                        alert('비밀번호가 재설정 되었습니다.\n모든 환경에서 로그아웃 됩니다.');
                    }
                });
            }
        }
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    기본정보
                </TitleFieldWrapper>
                {userRedux?.userInfo &&
                    <ProfileWrapper>
                        <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                            <div
                                className='profile-image-figure'
                                onClick={() => __handle.action.openModifyProfileImageUriModal()}
                            >
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={userRedux?.userInfo?.profileImageUri || '/images/icon/person_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <div className='info-group'>
                                <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                    <div className='info-text info-text-primary'>
                                        {userRedux?.userInfo.nickname}
                                    </div>
                                    <div>
                                        <SingleBlockButton
                                            type='button'
                                            className='modify-button modify-button-w-md'
                                            onClick={() => __handle.action.openModifyNicknameModal()}
                                        >
                                            닉네임 수정
                                        </SingleBlockButton>
                                    </div>
                                </div>
                                <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                    <div className='info-text info-text-secondary'>
                                        ID: {userRedux?.userInfo.username}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                            <div className='icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/person_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                <div className='info-text'>
                                    {userRedux?.userInfo.name || '이름을 등록해주세요.'}
                                </div>
                                <div>
                                    <SingleBlockButton
                                        type='button'
                                        className='modify-button'
                                        onClick={() => __handle.action.openModifyNameModal()}
                                    >
                                        수정
                                    </SingleBlockButton>
                                </div>
                            </div>
                        </div>
                        <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                            <div className='icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/phone_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                <div className='info-text'>
                                    {userRedux?.userInfo.phoneNumber}
                                </div>
                                <div>
                                    <SingleBlockButton
                                        type='button'
                                        className='modify-button'
                                        onClick={() => __handle.action.openModifyPhoneNumberModal()}
                                    >
                                        수정
                                    </SingleBlockButton>
                                </div>
                            </div>
                        </div>
                        <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                            <div className='icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/mail_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                <div className='info-text'>
                                    {userRedux?.userInfo.email}
                                </div>
                                <div>
                                    <SingleBlockButton
                                        type='button'
                                        className='modify-button'
                                        onClick={() => __handle.action.openModifyEmailModal()}
                                    >
                                        수정
                                    </SingleBlockButton>
                                </div>
                            </div>
                        </div>
                        <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                            <div className='icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/lock_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                <div className='info-text'>
                                    비밀번호
                                </div>
                                <div>
                                    <SingleBlockButton
                                        type='button'
                                        className='modify-button'
                                        onClick={() => __handle.action.openModifyPasswordModal()}
                                    >
                                        수정
                                    </SingleBlockButton>
                                </div>
                            </div>
                        </div>
                    </ProfileWrapper>
                }
            </Container>

            {modifyProfileImageUriModalOpen &&
                <ModifyProfileImageUriModalComponent
                    open={modifyProfileImageUriModalOpen}
                    onClose={__handle.action.closeModifyProfileImageUriModal}
                    onSubmit={__handle.submit.changeProfileImageUri}
                />
            }

            {modifyNicknameModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyNicknameModalOpen}

                        onClose={__handle.action.closeModifyNicknameModal}
                    >
                        <ModifyNicknameModalComponent
                            onClose={__handle.action.closeModifyNicknameModal}
                            onConfirm={__handle.submit.changeNickname}
                        />
                    </CommonModalComponent>
                )
            }

            {modifyNameModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyNameModalOpen}

                        onClose={__handle.action.closeModifyNameModal}
                    >
                        <ModifyNameModalComponent
                            onClose={__handle.action.closeModifyNameModal}
                            onConfirm={__handle.submit.changeName}
                        />
                    </CommonModalComponent>
                )
            }

            {modifyPhoneNumberModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyPhoneNumberModalOpen}

                        onClose={__handle.action.closeModifyPhoneNumberModal}
                    >
                        <ModifyPhoneNumberModalComponent
                            onClose={__handle.action.closeModifyPhoneNumberModal}
                            onConfirm={__handle.submit.changePhoneNumber}
                        />
                    </CommonModalComponent>
                )
            }

            {modifyEmailModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyEmailModalOpen}

                        onClose={__handle.action.closeModifyEmailModal}
                    >
                        <ModifyEmailModalComponent
                            onClose={__handle.action.closeModifyEmailModal}
                            onConfirm={__handle.submit.changeEmail}
                        />
                    </CommonModalComponent>
                )
            }

            {modifyPasswordModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyPasswordModalOpen}

                        onClose={__handle.action.closeModifyPasswordModal}
                    >
                        <ModifyPasswordModalComponent
                            onClose={__handle.action.closeModifyPasswordModal}
                            onConfirm={__handle.submit.changePassword}
                        />
                    </CommonModalComponent>
                )
            }
        </>
    );
}