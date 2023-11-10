import { useState } from "react";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FgStockReceiveController.styled";
import { MdStockReceiveFrame } from "./modals/MdStockReceiveFrame";

export function FgStockReceiveController(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModalOpen = (bool) => {
        setModalOpen(bool);
    }

    return (
        <>
            <St.Container>
                <CustomBlockButton
                    type='button'
                    onClick={() => toggleModalOpen(true)}
                >
                    입고등록
                </CustomBlockButton>
            </St.Container>

            {modalOpen &&
                <MdStockReceiveFrame
                    open={modalOpen}
                    onClose={() => toggleModalOpen(false)}
                />
            }
        </>
    );
}