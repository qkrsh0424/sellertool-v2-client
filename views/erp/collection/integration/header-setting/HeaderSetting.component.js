import { useState } from "react";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ViewHeadersModalComponent from "./modal/ViewHeadersModal.component";
import { Container, Wrapper } from "./styles/HeaderSetting.styled";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { MdSelectViewHeader } from "./modal/MdSelectViewHeader/MdSelectViewHeader";

export default function HeaderSettingComponent({
    erpCollectionHeader,
    favoriteViewHeaderIdsForErpc,
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
                    <CustomBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleOpenViewHeadersModal()}
                    >
                        뷰헤더 선택
                    </CustomBlockButton>
                </Wrapper>
            </Container>

            {viewHeadersModalOpen &&
                <MdSelectViewHeader
                    open={viewHeadersModalOpen}
                    onClose={handleCloseViewHeadersModal}
                    erpCollectionHeader={erpCollectionHeader}
                />
                // <CommonModalComponent
                //     open={viewHeadersModalOpen}
                //     onClose={handleCloseViewHeadersModal}
                // >
                //     <ViewHeadersModalComponent
                //         erpCollectionHeader={erpCollectionHeader}
                //         favoriteViewHeaderIdsForErpc={favoriteViewHeaderIdsForErpc}
                //         onClose={handleCloseViewHeadersModal}
                //     />
                // </CommonModalComponent>
            }
        </>
    );
}