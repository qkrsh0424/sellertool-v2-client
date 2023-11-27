import { useState } from "react";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FgStockReceiveController.styled";
import { MdStockReceiveFrame } from "./modals/MdStockReceiveFrame";
import { useRouter } from "next/router";

export function FgStockReceiveController(props) {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModalOpen = (bool) => {
        setModalOpen(bool);
    }

    const handleClickRegister = () => {
        router.push({
            pathname: '/inventory/stock-register/receive'
        });
    }

    return (
        <>
            <St.Container>
                <CustomBlockButton
                    type='button'
                    onClick={() => handleClickRegister()}
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