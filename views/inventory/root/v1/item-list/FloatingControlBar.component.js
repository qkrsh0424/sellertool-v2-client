import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import InventoryReceiveModalComponent from "./modal/InventoryReceiveModal.component";
import InventoryReleaseModalComponent from "./modal/InventoryReleaseModal.component";
import { Container, ControlButtonsContainer } from "./styles/FloatingControlBar.styled";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function FloatingControlBarComponent({
    selectedProductOptions,
    onSelectClearAllProductOptions,
    onActionSelectProductOption,
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
        let memo = '';
        if (selectedProductOptions?.length > 50) {
            memo = `한번에 최대 50개의 옵션만 입고 등록이 가능합니다.\n초과되는 경우 나눠서 입고 등록을 해주시기 바랍니다.`;
            customToast.warn(memo, {
                ...defaultOptions,
                toastId: memo
            });
            return;
        }

        const packageOptions = selectedProductOptions?.filter(r => r.packageYn === 'y');
        if (packageOptions?.length >= 1) {
            memo = `패키지 상품은 입고 및 출고등록이 불가능 합니다.\n선택된 패키지 상품들을 제외하고 실행해 주세요.`;
            customToast.warn(memo, {
                ...defaultOptions,
                toastId: memo
            });
            return;
        }

        setInventoryReceiveModalOpen(true);
    }

    const handleCloseInventoryReceiveModal = () => {
        setInventoryReceiveModalOpen(false);
    }

    const handleOpenInventoryReleaseModal = () => {
        let memo = '';
        const packageOptions = selectedProductOptions?.filter(r => r.packageYn === 'y');
        if (packageOptions?.length >= 1) {
            memo = `패키지 상품은 입고 및 출고등록이 불가능 합니다.\n선택된 패키지 상품들을 제외하고 실행해 주세요.`;
            customToast.warn(memo, {
                ...defaultOptions,
                toastId: memo
            });
            return;
        }

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

            {inventoryReceiveModalOpen &&
                <CommonModalComponent
                    open={inventoryReceiveModalOpen}
                    onClose={handleCloseInventoryReceiveModal}
                    maxWidth={'sm'}
                >
                    <InventoryReceiveModalComponent
                        selectedProductOptions={selectedProductOptions}
                        onClose={handleCloseInventoryReceiveModal}
                        onActionSelectProductOption={onActionSelectProductOption}
                        onReqFetchInventoryStocks={onReqFetchInventoryStocks}
                    />
                </CommonModalComponent>
            }

            {inventoryReleaseModalOpen &&
                <CommonModalComponent
                    open={inventoryReleaseModalOpen}
                    onClose={handleCloseInventoryReleaseModal}
                    maxWidth={'sm'}
                >
                    <InventoryReleaseModalComponent
                        selectedProductOptions={selectedProductOptions}
                        onClose={handleCloseInventoryReleaseModal}
                        onActionSelectProductOption={onActionSelectProductOption}
                        onReqFetchInventoryStocks={onReqFetchInventoryStocks}
                    />
                </CommonModalComponent>
            }
        </>
    );
}