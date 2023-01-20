import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal/ExcelDownloadModal.component";
import EditErpItemModalComponent from "./modal/EditErpItemsModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import ViewSelectedModalComponent from "./modal/ViewSelectedModal.component";
import { Container } from "./styles/FloatingControlBar.styled";

export default function FloatingControlToggle({
    erpCollectionHeader,
    selectedErpItems,
    inventoryStocks,

    onActionClearAllSelectedItems,
    onActionClearSelectedItem,

    onSubmitUpdateErpItems,
    onSubmitFetchSelectedErpItems,
    onSubmitDeleteErpItems,
    onSubmitChangeStatusToRelease,
    onSubmitChangeStatusToOrder,
    onSubmitCopyCreateErpItems,
}) {
    const [controlDrawerOpen, setControlDrawerOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [changeStatusToReleaseModalOpen, setChangeStatusToReleaseModalOpen] = useState(false);
    const [changeStatusToOrderModalOpen, setChangeStatusToOrderModalOpen] = useState(false);
    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);
    const [copyCreateErpItemsModalOpen, setCopyCreateErpItemsModalOpen] = useState(false);
    const [viewSelectedModalOpen, setViewSelectedModalOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        return () => {
            handleToggleControlDrawerOpen(false);
            handleToggleEditErpItemModalOpen(false);
            handleToggleDeleteErpItemsConfirmModalOpen(false);
            handleToggleChangeStatusToReleaseModalOpen(false);
            handleToggleChangeStatusToOrderModalOpen(false);
            handleToggleExcelDownloadModalOpen(false);
            handleToggleBackdropOpen(false);
            handleToggleCopyCreateErpItemsModalOpen(false);
            handleToggleViewSelectedModalOpen(false);
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

    const handleToggleChangeStatusToReleaseModalOpen = (setOpen) => {
        setChangeStatusToReleaseModalOpen(setOpen);
    }

    const handleToggleChangeStatusToOrderModalOpen = (setOpen) => {
        setChangeStatusToOrderModalOpen(setOpen);
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
            onSubmitFetchSelectedErpItems();
            handleToggleControlDrawerOpen(false);
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
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
    }

    const handleSubmitCopyCreateErpItems = async () => {
        handleToggleBackdropOpen(true)
        let body = {
            erpItemIds: selectedErpItems?.map(r => r.id)
        }

        await onSubmitCopyCreateErpItems(body, () => { handleToggleCopyCreateErpItemsModalOpen(false); handleToggleControlDrawerOpen(false); })
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
                onActionOpenDeleteErpItemsConfirmModal={() => handleToggleDeleteErpItemsConfirmModalOpen(true)}
                onActionOpenExcelDownloadModal={() => handleToggleExcelDownloadModalOpen(true)}
                onActionOpenCopyCreateErpItemModal={() => handleToggleCopyCreateErpItemsModalOpen(true)}
                onActionOpenViewSelectedModal={() => handleToggleViewSelectedModalOpen(true)}

                onActionClearAllSelectedItems={handleClearAllSelectedItems}
            />

            <CommonModalComponent
                open={editErpItemsModalOpen}
                onClose={() => handleToggleEditErpItemModalOpen(false)}
                maxWidth={'xl'}
            >
                <EditErpItemModalComponent
                    selectedErpItems={selectedErpItems}
                    onClose={() => handleToggleEditErpItemModalOpen(false)}
                    onSelectClearErpItem={handleClearSelectedItem}
                    onSubmitUpdateErpItems={handleSubmitUpdateErpItems}
                />
            </CommonModalComponent>

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


            <ConfirmModalComponentV2
                open={changeStatusToReleaseModalOpen}
                onClose={() => handleToggleChangeStatusToReleaseModalOpen(false)}
                onConfirm={handleSubmitChangeStatusToRelease}
                title={'출고전환 확인메세지'}
                message={'선택된 데이터를 출고전환 합니다.'}
            />

            <ConfirmModalComponentV2
                open={changeStatusToOrderModalOpen}
                onClose={() => handleToggleChangeStatusToOrderModalOpen(false)}
                onConfirm={handleSubmitChangeStatusToOrder}
                title={'판매취소 확인메세지'}
                message={'선택된 데이터를 판매취소 합니다.'}
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