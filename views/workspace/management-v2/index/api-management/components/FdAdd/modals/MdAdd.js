import { useState } from 'react';
import CustomBlockButton from '../../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { CustomDialog } from '../../../../../../../../components/dialog/v1/CustomDialog';
import CustomInput from '../../../../../../../../components/input/with-label/v1/CustomInput';
import * as St from './MdAdd.styled';

export function MdAdd({
    open,
    toggleModalOpen,
    onSubmit
}) {
    const [description, setDescription] = useState('');

    const handleClose = () => {
        toggleModalOpen(false);
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        await onSubmit(description);
    }

    const handleChangeDescription = (e) => {
        const value = e.target.value;

        setDescription(value);
    }

    return (
        <>
            <CustomDialog open={open} onClose={() => handleClose()} backgroundColor={'#ffffff'}>
                <form onSubmit={(e) => handleConfirm(e)}>
                    <St.BodyContainer>
                        <CustomInput
                            label={'API 설명'}
                            value={description || ''}
                            onChange={handleChangeDescription}
                        />
                    </St.BodyContainer>
                    <St.FooterContainer>
                        <div className='wrapper'>
                            <CustomBlockButton
                                type='button'
                                className='cancel'
                                onClick={() => handleClose()}
                            >
                                취소
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='submit'
                                className='confirm'
                            >
                                확인
                            </CustomBlockButton>
                        </div>
                    </St.FooterContainer>
                </form>
            </CustomDialog>
        </>
    );
}