import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import InventoryReceiveModalComponent from "./modal/InventoryReceiveModal.component";
import InventoryReleaseModalComponent from "./modal/InventoryReleaseModal.component";
import { Container, ControlButtonsContainer } from "./styles/FloatingControlBar.styled";

export default function FloatingControlBarComponent({
    selectedProductOptions,
    onSelectClearAllProductOptions,
    onReqFetchInventoryStocks
}) {
    const [controlButtonsViewOpen, setControlButtonsViewOpen] = useState(false);
    const [inventoryReceiveModalOpen, setInventoryReceiveModalOpen] = useState(false);
    const [inventoryReleaseModalOpen, setInventoryReleaseModalOpen] = useState(false);

    const handleOpenControlButtonsView = () => {
        if (controlButtonsViewOpen) {
            setControlButtonsViewOpen(false);
            return;
        }
        setControlButtonsViewOpen(true);
    }

    const handleOpenInventoryReceiveModal = () => {
        setInventoryReceiveModalOpen(true);
    }

    const handleCloseInventoryReceiveModal = () => {
        setInventoryReceiveModalOpen(false);
    }

    const handleOpenInventoryReleaseModal = () => {
        setInventoryReleaseModalOpen(true);
    }

    const handleCloseInventoryReleaseModal = () => {
        setInventoryReleaseModalOpen(false);
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
                        onClick={() => handleOpenInventoryReceiveModal()}
                    >
                        입고등록
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='control-button-item'
                        onClick={() => handleOpenInventoryReleaseModal()}
                    >
                        출고등록
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='control-button-item'
                    >
                        입고현황
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='control-button-item'
                    >
                        출고현황
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='control-button-item'
                        onClick={() => onSelectClearAllProductOptions()}
                    >
                        전체해제
                    </SingleBlockButton>
                </ControlButtonsContainer>
                <SingleBlockButton
                    type='button'
                    className='floating-button-item'
                    onClick={() => handleOpenControlButtonsView()}
                >
                    <span className='accent'>{selectedProductOptions?.length || '0'}</span> 개 선택됨
                </SingleBlockButton>
            </Container>

            <CommonModalComponent
                open={inventoryReceiveModalOpen}
                onClose={handleCloseInventoryReceiveModal}
                maxWidth={'sm'}
            >
                <InventoryReceiveModalComponent
                    selectedProductOptions={selectedProductOptions}
                    onClose={handleCloseInventoryReceiveModal}
                    onReqFetchInventoryStocks={onReqFetchInventoryStocks}
                />
            </CommonModalComponent>

            <CommonModalComponent
                open={inventoryReleaseModalOpen}
                onClose={handleCloseInventoryReleaseModal}
                maxWidth={'sm'}
            >
                <InventoryReleaseModalComponent
                    selectedProductOptions={selectedProductOptions}
                    onClose={handleCloseInventoryReleaseModal}
                    onReqFetchInventoryStocks={onReqFetchInventoryStocks}
                />
            </CommonModalComponent>
        </>
    );
}