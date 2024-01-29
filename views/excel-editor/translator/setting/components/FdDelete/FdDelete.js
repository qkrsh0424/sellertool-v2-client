import { useState } from 'react';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdDelete.styled';
import { MdDeleteConfirmation } from './modals/MdDeleteConfirmation/MdDeleteConfirmation';

export function FdDelete({
    onReqDelete
}) {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModalOpen = (bool) => {
        setModalOpen(bool)
    }

    const handleSubmitDelete = () => {
        onReqDelete({
            successCallback: () => {
                toggleModalOpen(false);
            }
        })
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.Title>
                        변환기 삭제
                    </St.Title>
                    <St.ContentLayout>
                        <div className='description'>
                            변환기를 한번 삭제하면 복구가 불가능 합니다.
                        </div>
                        <div className='deleteButtonBox'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => toggleModalOpen(true)}
                            >
                                영구삭제
                            </CustomBlockButton>
                        </div>
                    </St.ContentLayout>
                </St.Wrapper>
            </St.Container>

            {modalOpen &&
                <MdDeleteConfirmation
                    open={modalOpen}
                    onClose={() => toggleModalOpen(false)}
                    onConfirm={() => handleSubmitDelete()}
                />
            }
        </>
    );
}