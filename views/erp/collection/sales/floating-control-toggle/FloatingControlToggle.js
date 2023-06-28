import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal-v2/ExcelDownloadModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import StatusNextModalComponent from "./modal/StatusNextModal.component";
import ViewSelectedModalComponent from "./modal/ViewSelectedModalV2.component";
import { Container } from "./styles/FloatingControlBar.styled";
import EditErpItemsModalComponent from "../../fragments/edit-erp-items-modal/EditErpItemsModal.component";
import { ProductListModalComponent } from "../../fragments/product-list-modal";

export default function FloatingControlToggle({
    erpCollectionHeader,
    selectedErpItems,
    inventoryStocks,

    onActionClearAllSelectedItems,
    onActionClearSelectedItem,

    onSubmitUpdateErpItems,
    onSubmitDeleteErpItems,
    onSubmitChangeStatusToRelease,
    onSubmitChangeStatusToOrder,
    onSubmitChangeStatusToHold,
    onSubmitCopyCreateErpItems,
}) {
    const [controlDrawerOpen, setControlDrawerOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [changeStatusToReleaseModalOpen, setChangeStatusToReleaseModalOpen] = useState(false);
    const [changeStatusToOrderModalOpen, setChangeStatusToOrderModalOpen] = useState(false);
    const [changeStatusToHoldModalOpen, setChangeStatusToHoldModalOpen] = useState(false);
    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);
    const [copyCreateErpItemsModalOpen, setCopyCreateErpItemsModalOpen] = useState(false);
    const [viewSelectedModalOpen, setViewSelectedModalOpen] = useState(false);
    const [productListModalOpen, setProductListModalOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        return () => {
            handleToggleControlDrawerOpen(false);
            handleToggleEditErpItemModalOpen(false);
            handleToggleChangeStatusToReleaseModalOpen(false);
            handleToggleChangeStatusToOrderModalOpen(false);
            handleToggleChangeStatusToHoldModalOpen(false);
            handleToggleDeleteErpItemsConfirmModalOpen(false);
            handleToggleExcelDownloadModalOpen(false);
            handleToggleCopyCreateErpItemsModalOpen(false);
            handleToggleViewSelectedModalOpen(false);
            handleToggleProductListModalOpen(false);
            handleToggleBackdropOpen(false);
        };
    }, []);

    const handleToggleControlDrawerOpen = (setOpen) => {
        setControlDrawerOpen(setOpen);
    }

    const handleToggleEditErpItemModalOpen = (setOpen) => {
        setEditErpItemsModalOpen(setOpen)
    }

    const handleToggleDeleteErpItemsConfirmModalOpen = (setOpen) => {
        setDeleteErpItemsConfirmModalOpen(setOpen);
    }

    const handleToggleChangeStatusToReleaseModalOpen = (setOpen) => {
        setChangeStatusToReleaseModalOpen(setOpen);
    }

    const handleToggleChangeStatusToOrderModalOpen = (setOpen) => {
        setChangeStatusToOrderModalOpen(setOpen);
    }

    const handleToggleChangeStatusToHoldModalOpen = (setOpen) => {
        setChangeStatusToHoldModalOpen(setOpen);
    }

    const handleToggleExcelDownloadModalOpen = (setOpen) => {
        setExcelDownloadModalOpen(setOpen);
    }

    const handleToggleProductListModalOpen = (setOpen) => {
        setProductListModalOpen(setOpen);
    }

    const handleToggleBackdropOpen = (setOpen) => {
        setBackdropOpen(setOpen);
    }

    const handleToggleCopyCreateErpItemsModalOpen = (setOpen) => {
        if (setOpen) {
            if (!selectedErpItems || selectedErpItems?.length < 1) {
                alert('데이터를 먼저 선택해 주세요.');
                return;
            } else if (selectedErpItems?.length > 10) {
                alert('한번에 복사 생성 가능한 최대 개수는 10개 입니다.');
                return;
            }
        }
        setCopyCreateErpItemsModalOpen(setOpen);
    }

    const handleToggleViewSelectedModalOpen = (setOpen) => {
        setViewSelectedModalOpen(setOpen)
    }

    const handleSubmitUpdateErpItems = async (body) => {
        handleToggleBackdropOpen(true)
        await onSubmitUpdateErpItems(body, () => {
            handleToggleEditErpItemModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
    }

    const handleSubmitDeleteErpItems = async () => {
        handleToggleBackdropOpen(true)
        let body = {
            ids: selectedErpItems?.map(r => r.id)
        }
        await onSubmitDeleteErpItems(body, () => {
            handleToggleDeleteErpItemsConfirmModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
    }

    const handleSubmitChangeStatusToRelease = async () => {
        handleToggleBackdropOpen(true)
        let body = {
            ids: selectedErpItems?.map(r => r.id),
            initializeFlag: true
        }
        await onSubmitChangeStatusToRelease(body, () => {
            handleToggleChangeStatusToReleaseModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
    }
    const handleSubmitChangeStatusToOrder = async () => {
        handleToggleBackdropOpen(true)
        let body = {
            ids: selectedErpItems?.map(r => r.id),
            initializeFlag: true
        }
        await onSubmitChangeStatusToOrder(body, () => {
            handleToggleChangeStatusToOrderModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
    }

    const handleSubmitChangeStatusToHold = async () => {
        handleToggleBackdropOpen(true)
        let body = {
            ids: selectedErpItems?.map(r => r.id),
            initializeFlag: true
        }
        await onSubmitChangeStatusToHold(body, () => {
            handleToggleChangeStatusToHoldModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
    }

    const handleSubmitCopyCreateErpItems = async () => {
        handleToggleBackdropOpen(true)
        let body = {
            erpItemIds: selectedErpItems?.map(r => r.id)
        }

        await onSubmitCopyCreateErpItems(body, () => {
            handleToggleCopyCreateErpItemsModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
    }

    const handleClearAllSelectedItems = () => {
        onActionClearAllSelectedItems();
    }

    const handleClearSelectedItem = (erpItemId) => {
        onActionClearSelectedItem(erpItemId);
    }

    return (
        <>
            <Container>
                <SingleBlockButton
                    type='button'
                    className='floating-button-item'
                    onClick={() => handleToggleControlDrawerOpen(true)}
                >
                    <span className='accent'>{selectedErpItems?.length || '0'}</span> 개 선택됨
                </SingleBlockButton>
            </Container>

            <FloatingControlBarModalComponent
                open={controlDrawerOpen}
                selectedErpItems={selectedErpItems}

                onClose={() => handleToggleControlDrawerOpen(false)}

                onActionOpenEditErpItemsModal={() => handleToggleEditErpItemModalOpen(true)}
                onActionOpenChangeStatusToReleaseModal={() => handleToggleChangeStatusToReleaseModalOpen(true)}
                onActionOpenChangeStatusToOrderModal={() => handleToggleChangeStatusToOrderModalOpen(true)}
                onActionOpenChangeStatusToHoldModal={() => handleToggleChangeStatusToHoldModalOpen(true)}
                onActionOpenDeleteErpItemsConfirmModal={() => handleToggleDeleteErpItemsConfirmModalOpen(true)}
                onActionOpenExcelDownloadModal={() => handleToggleExcelDownloadModalOpen(true)}
                onActionOpenCopyCreateErpItemModal={() => handleToggleCopyCreateErpItemsModalOpen(true)}
                onActionOpenViewSelectedModal={() => handleToggleViewSelectedModalOpen(true)}
                onActionOpenProductListModal={() => handleToggleProductListModalOpen(true)}

                onActionClearAllSelectedItems={handleClearAllSelectedItems}
            />

            {editErpItemsModalOpen &&
                <EditErpItemsModalComponent
                    open={editErpItemsModalOpen}
                    onClose={() => handleToggleEditErpItemModalOpen(false)}
                    maxWidth={'xl'}
                    selectedErpItems={selectedErpItems}
                    onSelectClearErpItem={handleClearSelectedItem}
                    onSubmitUpdateErpItems={handleSubmitUpdateErpItems}
                />
            }

            <ConfirmModalComponentV2
                open={deleteErpItemsConfirmModalOpen}
                onClose={() => handleToggleDeleteErpItemsConfirmModalOpen(false)}
                onConfirm={handleSubmitDeleteErpItems}
                title={'삭제 확인메세지'}
                message={'선택된 데이터를 영구 삭제 합니다.'}
                confirmBtnStyle={{
                    background: 'var(--defaultRedColor)'
                }}
            />

            {changeStatusToReleaseModalOpen &&
                <StatusNextModalComponent
                    selectedErpItems={selectedErpItems}
                    open={changeStatusToReleaseModalOpen}
                    onClose={() => handleToggleChangeStatusToReleaseModalOpen(false)}
                    onConfirm={handleSubmitChangeStatusToRelease}
                />
            }

            <ConfirmModalComponentV2
                open={changeStatusToOrderModalOpen}
                onClose={() => handleToggleChangeStatusToOrderModalOpen(false)}
                onConfirm={handleSubmitChangeStatusToOrder}
                title={'주문확정 취소 확인메세지'}
                message={'선택된 데이터의 주문확정을 취소합니다.'}
            />

            <ConfirmModalComponentV2
                open={changeStatusToHoldModalOpen}
                onClose={() => handleToggleChangeStatusToHoldModalOpen(false)}
                onConfirm={handleSubmitChangeStatusToHold}
                title={'보류 데이터 전환'}
                message={'선택된 데이터를 보류 데이터로 전환합니다.'}
                confirmBtnStyle={{
                    background: 'var(--mainColor)'
                }}
            />

            <CommonModalComponent
                open={excelDownloadModalOpen}
                onClose={() => handleToggleExcelDownloadModalOpen(false)}
                maxWidth={'xl'}
            >
                <ExcelDownloadModalComponent
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItems}
                    inventoryStocks={inventoryStocks}

                    onClose={() => handleToggleExcelDownloadModalOpen(false)}
                />
            </CommonModalComponent>

            <ConfirmModalComponentV2
                open={copyCreateErpItemsModalOpen}
                onClose={() => handleToggleCopyCreateErpItemsModalOpen(false)}
                onConfirm={() => handleSubmitCopyCreateErpItems()}
                message={
                    <>
                        <div>선택된 데이터들을 복사 생성 합니다.</div>
                        <div>복사 생성된 데이터의 <span style={{ color: 'var(--defaultRedColor)' }}>[M] 주문수집번호, [M] 주문수집일시, [M] 주문확정일시, [M] 출고완료일시</span> 는 재설정 됩니디.</div>
                    </>
                }
            />

            <CommonModalComponent
                open={viewSelectedModalOpen}
                onClose={() => handleToggleViewSelectedModalOpen(false)}
                maxWidth={'xl'}
            >
                <ViewSelectedModalComponent
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItems}
                    onClose={() => handleToggleViewSelectedModalOpen(false)}
                    onActionClearSelectedItem={handleClearSelectedItem}
                />
            </CommonModalComponent>

            {productListModalOpen &&
                <CommonModalComponent
                    open={productListModalOpen}
                    onClose={() => handleToggleProductListModalOpen(false)}
                    maxWidth={'xs'}
                >
                    <ProductListModalComponent
                        erpCollectionHeader={erpCollectionHeader}
                        selectedErpItems={selectedErpItems}
                        onClose={() => handleToggleProductListModalOpen(false)}
                    />
                </CommonModalComponent>
            }

            <BackdropLoadingComponent
                open={backdropOpen}
            />
        </>
    );
}