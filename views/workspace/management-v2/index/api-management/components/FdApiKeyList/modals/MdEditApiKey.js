import * as St from './MdEditApiKey.styled';
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import CustomInput from '../../../../../../../../components/input/with-label/v1/CustomInput';
import CustomBlockButton from '../../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { useEffect, useState } from 'react';

export function MdEditApiKey({
    open,
    onClose,
    editApiKey,
    onSubmit
}) {
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        if (!editApiKey) {
            return;
        }

        setEditDescription(editApiKey?.description)
    }, [editApiKey]);

    const handleChangeEditDescription = (e) => {
        let value = e.target.value;

        setEditDescription(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onSubmit(editDescription);
    }

    return (
        <>
            <CustomDialog open={open} onClose={onClose} backgroundColor={'#fff'}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <St.BodyContainer>
                        <CustomInput
                            label={'설명'}
                            value={editDescription || ''}
                            onChange={(e) => handleChangeEditDescription(e)}
                        ></CustomInput>
                    </St.BodyContainer>
                    <St.FooterContainer>
                        <div className='wrapper'>
                            <CustomBlockButton
                                type='button'
                                className='cancel'
                                onClick={onClose}
                            >취소</CustomBlockButton>
                            <CustomBlockButton
                                type='submit'
                                className='confirm'
                            >수정</CustomBlockButton>
                        </div>
                    </St.FooterContainer>
                </form>
            </CustomDialog>
        </>
    );
}