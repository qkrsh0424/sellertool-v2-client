import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import SingleUploaderModalComponent from "./modal/SingleUploaderModal.component";
import { ContentBox, Wrapper } from "./styles/SingleUploaderControl.styled";

export default function SingleUploaderControlComponent({
    onSubmitUploadWithSingle
}) {
    const [uploaderModalOpen, setUploaderModalOpen] = useState(false);

    const handleOpenUploaderModal = () => {
        setUploaderModalOpen(true);
    }

    const handleCloseUploaderModal = () => {
        setUploaderModalOpen(false);
    }

    const handleSubmitUploadWithSingle = (form) => {
        onSubmitUploadWithSingle(form);
    }
    return (
        <>
            <Wrapper>
                <ContentBox>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleOpenUploaderModal()}
                    >
                        발주단건등록
                    </SingleBlockButton>
                </ContentBox>
            </Wrapper>

            {uploaderModalOpen &&
                <CommonModalComponent
                    open={uploaderModalOpen}
                    onClose={handleCloseUploaderModal}
                    maxWidth={'lg'}
                >
                    <SingleUploaderModalComponent
                        onClose={handleCloseUploaderModal}
                        onConfirm={handleSubmitUploadWithSingle}
                    />
                </CommonModalComponent>
            }
        </>
    );
}