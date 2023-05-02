import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal/ExcelDownloadModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import StatusNextModalComponent from "./modal/StatusNextModal.component";
import ViewSelectedModalComponent from "./modal/ViewSelectedModal.component";
import { Container } from "./styles/FloatingControlBar.styled";
import EditErpItemsModalComponent from "../../fragments/edit-erp-items-modal/EditErpItemsModal.component";

export default function FloatingControlToggle({
    erpCollectionHeader,
    selectedErpItems,
    inventoryStocks,

    onActionClearAllSelectedItems,
    onActionClearSelectedItem,

    onSubmitUpdateErpItems,
    onSubmitDeleteErpItems,
    onSubmitChangeStatusToSales,
    onSubmitChangeStatusToHold,
    onSubmitCopyCreateErpItems,
}) {
    const [controlDrawerOpen, setControlDrawerOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [changeStatusToSalesModalOpen, setChangeStatusToSalesModalOpen] = useState(false);
    const [changeStatusToHoldModalOpen, setChangeStatusToHoldModalOpen] = useState(false);
    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);
    const [copyCreateErpItemsModalOpen, setCopyCreateErpItemsModalOpen] = useState(false);
    const [viewSelectedModalOpen, setViewSelectedModalOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        return () => {
            setControlDrawerOpen(false);
            setEditErpItemsModalOpen(false);
            setDeleteErpItemsConfirmModalOpen(false);
            setChangeStatusToSalesModalOpen(false);
            setExcelDownloadModalOpen(false);
            setBackdropOpen(false);
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

    const handleToggleChangeStatusToSalesModalOpen = (setOpen) => {
        setChangeStatusToSalesModalOpen(setOpen);
    }

    const handleToggleChangeStatusToHoldModalOpen = (setOpen) => {
        setChangeStatusToHoldModalOpen(setOpen);
    }

    const handleToggleExcelDownloadModalOpen = (setOpen) => {
        setExcelDownloadModalOpen(setOpen);
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

    const handleSubmitChangeStatusToSales = async () => {
        handleToggleBackdropOpen(true)
        let body = {
            ids: selectedErpItems?.map(r => r.id),
            initializeFlag: true
        }
        await onSubmitChangeStatusToSales(body, () => {
            handleToggleChangeStatusToSalesModalOpen(false);
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
                onActionOpenChangeStatusToSalesModal={() => handleToggleChangeStatusToSalesModalOpen(true)}
                onActionOpenChangeStatusToHoldModal={() => handleToggleChangeStatusToHoldModalOpen(true)}
                onActionOpenDeleteErpItemsConfirmModal={() => handleToggleDeleteErpItemsConfirmModalOpen(true)}
                onActionOpenExcelDownloadModal={() => handleToggleExcelDownloadModalOpen(true)}
                onActionOpenCopyCreateErpItemModal={() => handleToggleCopyCreateErpItemsModalOpen(true)}
                onActionOpenViewSelectedModal={() => handleToggleViewSelectedModalOpen(true)}

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

            {changeStatusToSalesModalOpen &&
                <StatusNextModalComponent
                    open={changeStatusToSalesModalOpen}
                    onClose={() => handleToggleChangeStatusToSalesModalOpen(false)}
                    selectedErpItems={selectedErpItems}
                    onConfirm={handleSubmitChangeStatusToSales}
                />
            }

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
                    <div>선택된 데이터들을 복사 생성 합니다.</div>
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

            <BackdropLoadingComponent
                open={backdropOpen}
            />
        </>
    );
}