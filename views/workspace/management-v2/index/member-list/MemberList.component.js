import Image from "next/image";
import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import usePermissionTargetMemberHook from "../hooks/usePermissionTargetMemberHook";
import useRemoveTargetMember from "../hooks/useRemoveTargetMemberHook";
import { Container, MemberListWrapper, TitleFieldWrapper } from "./styles/MemberList.styled";
import PermissionSettingModalComponent from "./modal/PermissionSettingModal.component";
import RemoveMemberModalComponent from "./modal/RemoveMemberModal.component";
import useWorkspaceMembersHook from "../hooks/useWorkspaceMembersHook";


const MemberListComponent = ({
    workspace,
    isWorkspaceMaster
}) => {
    const {
        workspaceMembers,
        reqFetchWorkspaceMembers,
        reqChangePermissions,
        reqDeleteMember
    } = useWorkspaceMembersHook({
        workspace: workspace
    });

    const {
        permissionTargetMember,
        onSetPermissionTargetMember,
        onActionChangePermissionOfName,
        onCheckPermissionsFormatValid
    } = usePermissionTargetMemberHook();

    const {
        removeTargetMember,
        onSetRemoveTargetMember
    } = useRemoveTargetMember();

    const [permissionSettingModalOpen, setPermissionSettingModalOpen] = useState(false);
    const [removeMemberModalOpen, setRemoveMemberModalOpen] = useState(false);

    if (!workspaceMembers) {
        return null;
    }

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
            changePermissions: async () => {
                try {
                    onCheckPermissionsFormatValid();
                    let body = {
                        workspaceId: permissionTargetMember.workspaceId,
                        workspaceMemberId: permissionTargetMember.id,
                        readPermissionYn: permissionTargetMember.readPermissionYn,
                        writePermissionYn: permissionTargetMember.writePermissionYn,
                        updatePermissionYn: permissionTargetMember.updatePermissionYn,
                        deletePermissionYn: permissionTargetMember.deletePermissionYn
                    }
                    await reqChangePermissions({
                        body: body,
                        successCallback: () => {
                            __handle.action.closePermissionSettingModal();
                        }
                    });
                } catch (err) {
                    alert(err.message);
                    return;
                }
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
                            멤버목록
                        </div>
                        <SingleBlockButton
                            type='button'
                            className='refresh-button-el'
                            onClick={() => __handle.submit.fetchWorkspaceMembers()}
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
                </TitleFieldWrapper>
                <MemberListWrapper>
                    {workspaceMembers.map((r, index) => {
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
                                            <div className='grade-tag'>{returnConvertedGrade(r.grade)}</div>
                                        </div>
                                        <div className='user-items'>
                                            <div className='user-item mgl-font-color-primary'>{r.user.nickname}</div>
                                            <div className='user-item'>{r.user.email}</div>
                                        </div>
                                    </div>
                                </div>
                                {isWorkspaceMaster &&
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
                                                멤버제명
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
                <CommonModalComponent
                    open={permissionSettingModalOpen}

                    onClose={__handle.action.closePermissionSettingModal}
                >
                    <PermissionSettingModalComponent
                        permissionTargetMember={permissionTargetMember}
                        onActionChangePermissionOfName={onActionChangePermissionOfName}
                        onClose={__handle.action.closePermissionSettingModal}
                        onConfirm={__handle.submit.changePermissions}
                    />
                </CommonModalComponent>
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

function returnConvertedGrade(grade) {
    switch (grade) {
        case 'host':
            return '관리자'
        default: return '멤버'
    }
}