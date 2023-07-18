import { useState } from "react";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { RegisteredStockByDateContainer } from "./FgRegisteredStockByDate.styled";
import { MdRegisteredStockByDate } from "../modals/MdRegisteredStockByDate";

export function FgRegisteredStockByDate(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModalOpen = (setOpen) => {
        setModalOpen(setOpen);
    }

    return (
        <>
            <RegisteredStockByDateContainer>
                <CustomBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => toggleModalOpen(true)}
                >
                    입/출고현황
                </CustomBlockButton>
            </RegisteredStockByDateContainer>
            {modalOpen &&
                <MdRegisteredStockByDate
                    open={modalOpen}
                    onClose={() => toggleModalOpen(false)}
                />
            }
        </>
    );
}