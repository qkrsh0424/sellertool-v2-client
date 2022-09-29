import { useEffect, useState } from "react";
import CustomCheckbox from "../../../modules/checkbox/CustomCheckbox";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../modules/modal/ConfirmModalComponent";
import FieldLoading from "../../../modules/loading/FieldLoading";
import { Container, PermissionModalWrapper, TitleFieldWrapper } from "./MemberTable.styled";
import TableFieldView from "./TableField.view";
import styled from 'styled-components';

const HeadTitleField = styled.div`
    padding: 10px 10px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #e0e0e0;
`;

const FormField = styled.div`
    padding:10px;

    .checkbox-item-box{
        margin-top: 20px;
    }
`;

const ButtonField = styled.div`
    margin-top: 20px;
    display: flex;

    .button-el{
        position:relative;
        overflow: hidden;

        width:100%;

        padding:8px 0;

        background:white;
        border:1px solid #fff;

        font-weight: 500;
        
        cursor: pointer;

        &:hover{
            background:#e0e0e040;
        }
    }
`;

function PermissionModal({ permissionTargetMember, onChangeCheckedOfName, onActionConfirm, onClose, disabledBtn }) {
    return (
        <PermissionModalWrapper>
            <div className='head-title'>워크스페이스 권한 설정</div>
            <div className='form-wrapper'>
                <div className='checkbox-item-box'>
                    <CustomCheckbox
                        checked={permissionTargetMember.writePermissionYn === 'y'}
                        name={'writePermissionYn'}
                        onChange={onChangeCheckedOfName}
                        size={'20px'}
                        label="워크스페이스 쓰기 권한"
                        labelSize="16px"
                        gap={10}
                    />
                </div>
                <div className='checkbox-item-box'>
                    <CustomCheckbox
                        checked={permissionTargetMember.updatePermissionYn === 'y'}
                        name={'updatePermissionYn'}
                        onChange={onChangeCheckedOfName}
                        size={'20px'}
                        label="워크스페이스 수정 권한"
                        labelSize="16px"
                        gap={10}
                    />
                </div>
                <div className='checkbox-item-box'>
                    <CustomCheckbox
                        checked={permissionTargetMember.deletePermissionYn === 'y'}
                        name={'deletePermissionYn'}
                        onChange={onChangeCheckedOfName}
                        size={'20px'}
                        label="워크스페이스 삭제 권한"
                        labelSize="16px"
                        gap={10}
                    />
                </div>
            </div>
            <div className='button-wrapper'>
                <button
                    className='button-el'
                    style={{ color: '#ff6961' }}
                    onClick={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
                >취소</button>
                <button
                    className='button-el'
                    style={{ color: '#2C73D2' }}
                    onClick={onActionConfirm}
                    disabled={disabledBtn}
                >저장</button>
            </div>
        </PermissionModalWrapper>
    );
}
const MemberTableComponent = (props) => {
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [deleteTargetMemberId, setDeleteTargetMemberId] = useState(null);
    const [deleteMemberConfirmModalOpen, setDeleteMemberConfirmModalOpen] = useState(false);

    const [permissionTargetMember, setPermissionTargetMember] = useState(null);
    const [permissionModalOpen, setPermissionModalOpen] = useState(false);

    useEffect(() => {
        if (!props.workspaceMembers) {
            setIsLoading(true);
            return;
        }
        setIsLoading(false);
    }, [props.workspaceMembers]);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 500)

        return () => clearTimeout(timeout);
    }, [disabledBtn]);

    if (!props.workspaceMembers) {
        return null;
    }

    const onActionOpenDeleteMemberModal = (workspaceMemberId) => {
        setDisabledBtn(true);
        setDeleteMemberConfirmModalOpen(true);
        setDeleteTargetMemberId(workspaceMemberId);

    }

    const onActionConfirmDeleteMember = async () => {
        await props.onSubmitDeleteWorkspaceMember(deleteTargetMemberId);
        setDeleteMemberConfirmModalOpen(false);
        setDeleteTargetMemberId(null);
    }

    const __permission = {
        action: {
            openModal: (workspaceMember) => {
                setPermissionTargetMember(workspaceMember);
                setPermissionModalOpen(true);
            },
            closeModal: () => {
                setPermissionModalOpen(false);
                setPermissionTargetMember(null);
            },
            confirm: () => {
                setDisabledBtn(true);
                props.onSubmitChangePermissions(permissionTargetMember);
                __permission.action.closeModal();
            }
        },
        change: {
            checkedOfName: (e) => {
                let name = e.target.name;
                let checked = e.target.checked;

                setPermissionTargetMember({
                    ...permissionTargetMember,
                    [name]: checked ? 'y' : 'n'
                });
            }
        }
    }
    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    멤버 리스트
                </TitleFieldWrapper>
                {isLoading &&
                    <FieldLoading
                        marginTop={100}
                        marginBottom={100}
                    />
                }
                <TableFieldView
                    workspaceMembers={props.workspaceMembers}
                    disabledBtn={disabledBtn}

                    onActionDeleteMember={onActionOpenDeleteMemberModal}
                    onActionOpenPermissionModal={__permission.action.openModal}
                ></TableFieldView>
            </Container>

            {/* Modal */}
            <ConfirmModalComponent
                open={deleteMemberConfirmModalOpen}
                message={'해당 멤버를 정말 제명 하시겠습니까?'}

                onClose={() => setDeleteMemberConfirmModalOpen(false)}
                onConfirm={onActionConfirmDeleteMember}
            ></ConfirmModalComponent>

            {(permissionModalOpen && permissionTargetMember) &&
                <CommonModalComponent
                    open={permissionModalOpen}

                    onClose={__permission.action.closeModal}
                >
                    <PermissionModal
                        permissionTargetMember={permissionTargetMember}
                        onChangeCheckedOfName={__permission.change.checkedOfName}
                        onActionConfirm={__permission.action.confirm}
                        onClose={__permission.action.closeModal}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }
        </>
    );
}
export default MemberTableComponent;