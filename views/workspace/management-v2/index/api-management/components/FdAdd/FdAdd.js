import { useState } from 'react';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdAdd.styled';
import { MdAdd } from './modals/MdAdd';
import { customBackdropController } from '../../../../../../../components/backdrop/default/v1';

export function FdAdd({
    onReqGenerateKey
}) {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModalOpen = (bool) => {
        setModalOpen(bool);
    }

    const handleSubmitGenerateKey = async (description) => {
        customBackdropController().showBackdrop();
        await onReqGenerateKey(description);
        toggleModalOpen(false);
        customBackdropController().hideBackdrop();
    }

    return (
        <>
            <St.Container>
                <St.AddButtonWrapper>
                    <CustomBlockButton
                        type='button'
                        onClick={() => toggleModalOpen(true)}
                    >
                        API키 생성
                    </CustomBlockButton>
                </St.AddButtonWrapper>
            </St.Container>

            {modalOpen &&
                <MdAdd
                    open={modalOpen}
                    toggleModalOpen={toggleModalOpen}
                    onSubmit={handleSubmitGenerateKey}
                />
            }
        </>
    );
}