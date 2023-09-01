import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import RegisteredStockByDateModalComponent from "./modal/RegisteredStockByDateModal.component";
import { RegisteredStockByDateContainer } from "./styles/RegisteredStockByDate.styled";

export default function RegisteredStockByDateComponent(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <RegisteredStockByDateContainer>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => handleOpenModal()}
                >
                    입/출고현황
                </SingleBlockButton>
            </RegisteredStockByDateContainer>

            <CommonModalComponent
                open={modalOpen}
                onClose={handleCloseModal}
            >
                <RegisteredStockByDateModalComponent
                    onClose={handleCloseModal}
                />
            </CommonModalComponent>
        </>
    );
}