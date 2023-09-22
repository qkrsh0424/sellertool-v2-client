import styled from 'styled-components';
import CustomBlockButton from '../../../../../components/buttons/block-button/v1/CustomBlockButton';
import useDisabledBtn from '../../../../../hooks/button/useDisabledBtn';
import { useState } from 'react';
import { CustomDialog } from '../../../../../components/dialog/v1/CustomDialog';

const Container = styled.div`
    /* margin-bottom: 20px; */
`;

const Wrapper = styled.div`
    display: flex;

    .flexible-wrapper{
        display: flex;
        flex:1;
    }

    .deleteBtn{
        background: #fff;
        border: 1px solid var(--defaultRedColor);
        color:var(--defaultRedColor);
    }
`;

const ActionButton = styled(CustomBlockButton)`
    height: 30px;
    font-size: 11px;
    font-weight: 700;
    width: 65px;
    border-radius: 5px;
    margin-left: 3px;
    background: #efefef;
    border: none;
    color: #444;
`;

const DeleteConfirmModalContainer = styled.div`
    padding: 20px;

    .wrapper{
        /* display: flex;
        flex-direction: column;
        gap: 20px; */
    }

    .description{
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
        font-size: 16px;
        font-weight: 600;
        color:#404040;
    }

    .button-group{
        display: flex;

        .buttonEl{
            flex:1;
            height: 48px;
            border-radius: 5px;
            background: none;
            border:none;
            color:#606060;
            font-weight: 700;
            &:hover{
                background: #f0f0f0;
            }
        }

        .deleteBtn{
            color: var(--defaultRedColor);
        }
    }
`;

export default function ButtonGroupsView({
    resultDetailModeOpen,
    onSubmitDelete,
    onToggleResultDetailModeOpen
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    const toggleDeleteConfirmModalOpen = (bool) => {
        setDeleteConfirmModalOpen(bool)
    }

    const handleSubmitDelete = async () => {
        setDisabledBtn(true);

        onSubmitDelete();
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <div className='flexible-wrapper'>
                        <ActionButton
                            type='button'
                            className='deleteBtn'
                            onClick={() => toggleDeleteConfirmModalOpen(true)}
                        >
                            삭제
                        </ActionButton>
                    </div>
                    <div className='flexible-wrapper' style={{ justifyContent: 'flex-end' }}>
                        <ActionButton
                            type='button'
                            onClick={() => onToggleResultDetailModeOpen()}
                        >
                            {resultDetailModeOpen ? '결과 간략히' : '결과 자세히'}
                        </ActionButton>
                    </div>
                </Wrapper>
            </Container>

            {deleteConfirmModalOpen &&
                <DeleteConfirmModal
                    deleteConfirmModalOpen={deleteConfirmModalOpen}
                    disabledBtn={disabledBtn}
                    toggleDeleteConfirmModalOpen={toggleDeleteConfirmModalOpen}
                    handleSubmitDelete={handleSubmitDelete}
                />
            }
        </>
    );
}

function DeleteConfirmModal({
    deleteConfirmModalOpen,
    disabledBtn,
    toggleDeleteConfirmModalOpen,
    handleSubmitDelete,
}) {
    return (
        <CustomDialog
            open={deleteConfirmModalOpen}
            onClose={() => toggleDeleteConfirmModalOpen(false)}
        >
            <CustomDialog.CloseButton onClose={() => toggleDeleteConfirmModalOpen(false)} />
            <DeleteConfirmModalContainer>
                <div className='wrapper'>
                    <div className='description'>마진율 상품을 삭제하시겠습니까?</div>
                    <div className='button-group'>
                        <CustomBlockButton
                            type='button'
                            className='buttonEl'
                            onClick={() => toggleDeleteConfirmModalOpen(false)}
                        >취소</CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='buttonEl deleteBtn'
                            disabled={disabledBtn}
                            onClick={() => handleSubmitDelete()}
                        >삭제</CustomBlockButton>
                    </div>
                </div>
            </DeleteConfirmModalContainer>
        </CustomDialog>
    );
}