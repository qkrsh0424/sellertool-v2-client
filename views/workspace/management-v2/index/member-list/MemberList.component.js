import Image from "next/image";
import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import usePermissionTargetMemberHook from "../hooks/usePermissionTargetMemberHook";
import useRemoveTargetMember from "../hooks/useRemoveTargetMemberHook";
import { Container, MemberListWrapper, TitleFieldWrapper } from "./styles/MemberList.styled";
import RemoveMemberModalComponent from "./modal/RemoveMemberModal.component";
import useWorkspaceMembersHook from "../hooks/useWorkspaceMembersHook";
import PermissionSettingModalV2Component from "./modal/PermissionSettingModalV2.component";


const MemberListComponent = ({
    workspace
}) => {
    const {
        workspaceMembers,
        reqFetchWorkspaceMembers,
        reqChangeWorkspaceAuthTemplate,
        reqDeleteMember
    } = useWorkspaceMembersHook({
        workspace: workspace
    });

    const {
        permissionTargetMember,
        onSetPermissionTargetMember,
    } = usePermissionTargetMemberHook();

    const {
        removeTargetMember,
        onSetRemoveTargetMember
    } = useRemoveTargetMember();

    const [permissionSettingModalOpen, setPermissionSettingModalOpen] = useState(false);
    const [removeMemberModalOpen, setRemoveMemberModalOpen] = useState(false);

    const __handle = {
        action: {
            openPermissionSettingModal: (workspaceMember) => {
                onSetPermissionTargetMember(workspaceMember);
                setPermissionSettingModalOpen(true);
            },
            closePermissionSettingModal: () => {
                setPermissionSettingModalOpen(false);
                onSetPermissionTargetMember(null);
            },
            openRemoveMemberModal: (workspaceMember) => {
                onSetRemoveTargetMember(workspaceMember);
                setRemoveMemberModalOpen(true);
            },
            closeRemoveMemberModal: () => {
                setRemoveMemberModalOpen(false);
                onSetRemoveTargetMember(null);
            }
        },
        submit: {
            fetchWorkspaceMembers: async () => {
                await reqFetchWorkspaceMembers();
            },
            changeWorkspaceAuthTemplate: async (body) => {
                await reqChangeWorkspaceAuthTemplate(
                    body,
                    () => {
                        __handle.action.closePermissionSettingModal();
                    }
                );
            },
            removeMember: async () => {
                let body = {
                    workspaceMemberId: removeTargetMember.id
                }

                await reqDeleteMember({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeRemoveMemberModal();
                    }
                })

            }
        }
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            관리자
                        </div>
                    </div>
                </TitleFieldWrapper>
                <MemberListWrapper>
                    {workspaceMembers?.filter(r => r.masterFlag)?.map((r, index) => {
                        return (
                            <div key={r.id} className='item-group'>
                                <div

                                    className='mgl-flex mgl-flex-alignItems-center'
                                >
                                    <div
                                        className='content-group mgl-flex mgl-flex-alignItems-center'
                                    >
                                        <div className='profile-image-figure'>
                                            <Image
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src={r?.profileImageUri || '/images/icon/person_default_808080.svg'}
                                                layout='responsive'
                                                width={1}
                                                height={1}
                                                objectFit={'cover'}
                                                alt='image'
                                                loading='lazy'
                                            ></Image>
                                        </div>
                                        <div>
                                            <p><span className='nickName'>{r?.nickname || '닉네임 미지정'}</span> <span className='memberType'>{r.masterFlag ? '관리자' : '매니저'}</span></p>
                                            <div className='info-group'>
                                                <div className='info-left'>Email.</div>
                                                <div>{r?.email || '이메일 미지정'}</div>
                                            </div>
                                            <div className='info-group'>
                                                <div className='info-left'>Phone.</div>
                                                <div>{r?.phoneNumber || '휴대전화 미지정'}</div>
                                            </div>
                                            <div className='info-group'>
                                                <div className='info-left'>권한 템플릿</div>
                                                <div style={{ color: !r?.workspaceAuthTemplateName ? 'var(--defaultRedColor)' : '' }}>{r?.workspaceAuthTemplateName || '권한 템플릿 미지정'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {workspace?.masterFlag &&
                                    (
                                        <div className='control-items mgl-flex mgl-flex-alignItems-center'>
                                            <SingleBlockButton
                                                type='button'
                                                className='control-item setting-button-el'
                                                onClick={() => __handle.action.openPermissionSettingModal(r)}
                                            >
                                                권한설정
                                            </SingleBlockButton>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </MemberListWrapper>
            </Container>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            멤버목록
                        </div>
                    </div>
                </TitleFieldWrapper>
                <MemberListWrapper>
                    {workspaceMembers?.filter(r => !r.masterFlag)?.map((r, index) => {
                        return (
                            <div key={r.id} className='item-group'>
                                <div

                                    className='mgl-flex mgl-flex-alignItems-center'
                                >
                                    <div
                                        className='content-group mgl-flex mgl-flex-alignItems-center'
                                    >
                                        <div className='profile-image-figure'>
                                            <Image
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src={r?.profileImageUri || '/images/icon/person_default_808080.svg'}
                                                layout='responsive'
                                                width={1}
                                                height={1}
                                                objectFit={'cover'}
                                                alt='image'
                                                loading='lazy'
                                            ></Image>
                                        </div>
                                        <div>
                                            <p><span className='nickName'>{r?.nickname || '닉네임 미지정'}</span> <span className='memberType'>{r.masterFlag ? '관리자' : '매니저'}</span></p>
                                            <div className='info-group'>
                                                <div className='info-left'>Email.</div>
                                                <div>{r?.email || '이메일 미지정'}</div>
                                            </div>
                                            <div className='info-group'>
                                                <div className='info-left'>Phone.</div>
                                                <div>{r?.phoneNumber || '휴대전화 미지정'}</div>
                                            </div>
                                            <div className='info-group'>
                                                <div className='info-left'>권한 템플릿</div>
                                                <div style={{ color: !r?.workspaceAuthTemplateName ? 'var(--defaultRedColor)' : '' }}>{r?.workspaceAuthTemplateName || '권한 템플릿 미지정'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {workspace?.masterFlag &&
                                    (
                                        <div className='control-items mgl-flex mgl-flex-alignItems-center'>
                                            <SingleBlockButton
                                                type='button'
                                                className='control-item setting-button-el'
                                                onClick={() => __handle.action.openPermissionSettingModal(r)}
                                            >
                                                권한설정
                                            </SingleBlockButton>
                                            <SingleBlockButton
                                                type='button'
                                                className='control-item remove-button-el'
                                                onClick={() => __handle.action.openRemoveMemberModal(r)}
                                            >
                                                삭제
                                            </SingleBlockButton>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </MemberListWrapper>
            </Container>

            {(permissionSettingModalOpen && permissionTargetMember) &&
                <PermissionSettingModalV2Component
                    targetMember={permissionTargetMember}
                    open={permissionSettingModalOpen}

                    onClose={__handle.action.closePermissionSettingModal}
                    onSubmit={__handle.submit.changeWorkspaceAuthTemplate}
                />
            }

            {(removeMemberModalOpen && removeTargetMember) &&
                (
                    <CommonModalComponent
                        open={removeMemberModalOpen}

                        onClose={__handle.action.closeRemoveMemberModal}
                    >
                        <RemoveMemberModalComponent
                            removeTargetMember={removeTargetMember}
                            onClose={__handle.action.closeRemoveMemberModal}
                            onConfirm={__handle.submit.removeMember}
                        />
                    </CommonModalComponent>
                )
            }
        </>
    );
}
export default MemberListComponent;