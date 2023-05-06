import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ViewHeadersModalComponent from "./modal/ViewHeadersModal.component";
import { Container, Wrapper } from "./styles/HeaderSetting.styled";

export default function HeaderSettingComponent({
    erpCollectionHeader,
    favoriteViewHeaderIdsForErpc,
    onActionSelectHeaderId
}) {
    const [viewHeadersModalOpen, setViewHeadersModalOpen] = useState(false);

    const handleOpenViewHeadersModal = () => {
        setViewHeadersModalOpen(true);
    }

    const handleCloseViewHeadersModal = () => {
        setViewHeadersModalOpen(false);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleOpenViewHeadersModal()}
                    >
                        뷰헤더 선택
                    </SingleBlockButton>
                </Wrapper>
            </Container>

            {viewHeadersModalOpen &&
                <CommonModalComponent
                    open={viewHeadersModalOpen}
                    onClose={handleCloseViewHeadersModal}
                >
                    <ViewHeadersModalComponent
                        erpCollectionHeader={erpCollectionHeader}
                        favoriteViewHeaderIdsForErpc={favoriteViewHeaderIdsForErpc}
                        onClose={handleCloseViewHeadersModal}
                        onActionSelectHeaderId={onActionSelectHeaderId}
                    />
                </CommonModalComponent>
            }
        </>
    );
}