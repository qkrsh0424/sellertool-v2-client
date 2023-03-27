import { useRef } from 'react';
import styled from 'styled-components';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { CustomDialog } from '../../../../../../components/dialog/v1/CustomDialog';
import useDisabledBtn from '../../../../../../hooks/button/useDisabledBtn';
import useImageUploaderHooks from '../../../../../../hooks/uploader/useImageUploaderHooks';

const ContentContainer = styled.div`
    padding: 40px 20px;

    .image-button{
        border-radius: 5px;
        &:last-child{
            margin-top: 10px;
        }
    }

    .image-selector{
        border:1px solid var(--mainColor);
        color: var(--mainColor);
    }

    .default-image{
        color: #666;
    }
`;

export default function EditProfileImageUriModalComponent({
    open,
    onClose,
    onSubmit,
    onOpenBackdrop,
    onCloseBackdrop
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const imageUploaderRef = useRef();
    const { uploadImages } = useImageUploaderHooks({
        MAX_FILE_SIZE: 10485760
    });

    const handleOpenImageUploader = () => {
        imageUploaderRef.current.click();
    }

    const handleSubmitChangeToSelect = async (e) => {
        onOpenBackdrop();
        setDisabledBtn(true);
        let files = e.target.files;
        if (!files || files?.length <= 0) {
            alert('이미지를 선택해 주세요.');
            onCloseBackdrop();
            return;
        }

        let images = await uploadImages(files);

        if (!images) {
            onCloseBackdrop();
            return;
        }

        onSubmit(images[0]?.fileStorageUri);
    }

    const handleSubmitChangeToDefault = () => {
        onOpenBackdrop();
        setDisabledBtn(true);
        onSubmit(null);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>프로필 이미지 수정</CustomDialog.Title>
                <ContentContainer>
                    <CustomBlockButton
                        type='button'
                        className='image-button image-selector'
                        onClick={() => handleOpenImageUploader()}
                        disabled={disabledBtn}
                    >이미지 선택</CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        className='image-button default-image'
                        onClick={() => handleSubmitChangeToDefault()}
                        disabled={disabledBtn}
                    >기본 이미지로 설정</CustomBlockButton>
                </ContentContainer>
            </CustomDialog>
            <input
                ref={imageUploaderRef}
                type='file'
                accept="image/*"
                onClick={(e) => e.target.value = ''}
                onChange={(e) => handleSubmitChangeToSelect(e)}
                disabled={disabledBtn}
                hidden
            ></input>
        </>
    );
}