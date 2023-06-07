import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import { Container, ControlButtonsContainer } from "./style/FloatingControlBar.styled";
import TotalStockTextFieldView from "./view/TotalStockTextField.view";

export default function FloatingControlBarComponent({
    selectedProductOptionsAndInventory,
    selectedProductOptionsInventorySum,
    onSelectClearAllProductOptions
}) {
    const [controlButtonsViewOpen, setControlButtonsViewOpen] = useState(false);

    const handleOpenControlButtonsView = () => {
        if (controlButtonsViewOpen) {
            setControlButtonsViewOpen(false);
            return;
        }
        setControlButtonsViewOpen(true);
    }

    return (
        <>
            <Container>
                <ControlButtonsContainer
                    controlButtonsViewOpen={controlButtonsViewOpen}
                >
                    <SingleBlockButton
                        type='button'
                        className='control-button-item'
                        onClick={() => onSelectClearAllProductOptions()}
                    >
                        전체해제
                    </SingleBlockButton>
                </ControlButtonsContainer>

                <TotalStockTextFieldView
                    selectedProductOptionsInventorySum={selectedProductOptionsInventorySum}
                />

                <SingleBlockButton
                    type='button'
                    className='floating-button-item'
                    onClick={() => handleOpenControlButtonsView()}
                >
                    <span className='accent'>{selectedProductOptionsAndInventory?.length || '0'}</span> 개 선택됨
                </SingleBlockButton>
            </Container>
        </>
    )
}