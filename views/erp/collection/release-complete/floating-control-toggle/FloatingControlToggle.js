import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal/ExcelDownloadModal.component";
import EditErpItemModalComponent from "./modal/EditErpItemsModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import ReleaseListModalComponent from "./modal/ReleaseListModal.component";
import StockReleaseModalComponent from "./modal/StockReleaseModal.component";
import ViewSelectedModalComponent from "./modal/ViewSelectedModal.component";
import WaybillRegistrationModalComponent from "./modal/WaybillRegistrationModal.component";
import { Container } from "./styles/FloatingControlBar.styled";

export default function FloatingControlToggle({
    erpCollectionHeader,
    selectedErpItems,
    inventoryStocks,

    onActionClearAllSelectedItems,
    onActionClearSelectedItem,

    onSubmitUpdateErpItems,
    onSubmitDeleteErpItems,
    onSubmitChangeStatusToSales,
    onSubmitCopyCreateErpItems,
    onSubmitStockRelease,
    onSubmitCancelStockRelease,
    onSubmitDownloadSampleExcelForWaybillRegistration,
    onSubmitUploadWaybillForm
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [controlDrawerOpen, setControlDrawerOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [changeStatusToSalesModalOpen, setChangeStatusToSalesModalOpen] = useState(false);
    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);
    const [copyCreateErpItemsModalOpen, setCopyCreateErpItemsModalOpen] = useState(false);
    const [viewSelectedModalOpen, setViewSelectedModalOpen] = useState(false);
    const [releaseListModalOpen, setReleaseListModalOpen] = useState(false);
    const [stockReleaseModalOpen, setStockReleaseModalOpen] = useState(false);
    const [cancelStockReleaseModalOpen, setCancelStockReleaseModalOpen] = useState(false);
    const [waybillRegistrationModalOpen, setWaybillRegistrationModalOpen] = useState(false);

    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        return () => {
            handleToggleControlDrawerOpen(false);
            handleToggleEditErpItemModalOpen(false);
            handleToggleDeleteErpItemsConfirmModalOpen(false);
            handleToggleChangeStatusToSalesModalOpen(false);
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
        if (setOpen) {
            let stockReflectedItems = [];

            selectedErpItems?.forEach(r => {
                if (r.stockReflectYn === 'y') {
                    stockReflectedItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                alert(`이미 재고반영 처리된 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }

        setDeleteErpItemsConfirmModalOpen(setOpen);
    }

    const handleToggleChangeStatusToSalesModalOpen = (setOpen) => {
        if (setOpen) {
            let stockReflectedItems = [];

            selectedErpItems?.forEach(r => {
                if (r.stockReflectYn === 'y') {
                    stockReflectedItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                alert(`이미 재고반영 처리된 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }
        setChangeStatusToSalesModalOpen(setOpen);
    }

    const handleToggleExcelDownloadModalOpen = (setOpen) => {
        setExcelDownloadModalOpen(setOpen);
    }

    const handleToggleReleaseListModalOpen = (setOpen) => {
        setReleaseListModalOpen(setOpen);
    }

    const handleToggleBackdropOpen = (setOpen) => {
        setBackdropOpen(setOpen);
    }

    const handleToggleStockReleaseModalOpen = (setOpen) => {
        if (setOpen) {
            let stockReflectedItems = [];
            let notSetReleaseOptionCodeItems = [];

            selectedErpItems?.forEach(r => {
                if (r.stockReflectYn === 'y') {
                    stockReflectedItems.push(r);
                }

                if (!r.releaseOptionCode) {
                    notSetReleaseOptionCodeItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                alert(`이미 재고반영 처리된 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }

            if (notSetReleaseOptionCodeItems?.length >= 1) {
                alert(`[M] 출고옵션코드가 지정되지 않은 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }
        setStockReleaseModalOpen(setOpen);
    }

    const handleToggleCancelStockReleaseModalOpen = (setOpen) => {
        if (setOpen) {
            let stockReflectNItems = [];

            selectedErpItems?.forEach(r => {
                if (r.stockReflectYn === 'n') {
                    stockReflectNItems.push(r);
                }
            });

            if (stockReflectNItems?.length >= 1) {
                alert(`재고반영이 되지 않은 데이터가 선택되었습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectNItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }
        setCancelStockReleaseModalOpen(setOpen);
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

    const handleToggleWaybillRegistrationModalOpen = (setOpen) => {
        setWaybillRegistrationModalOpen(setOpen);
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
            initializeFlag: false
        }
        await onSubmitChangeStatusToSales(body, () => {
            handleToggleChangeStatusToSalesModalOpen(false);
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

    const handleSubmitStockRelease = async (memo) => {
        handleToggleBackdropOpen(true);
        let body = {
            erpItemIds: selectedErpItems?.map(r => r.id),
            memo: memo
        }

        onSubmitStockRelease(body, () => {
            handleToggleStockReleaseModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        });
        handleToggleBackdropOpen(false);
    }

    const handleSubmitCancelStockRelease = async () => {
        handleToggleBackdropOpen(true);
        let body = {
            erpItemIds: selectedErpItems?.map(r => r.id),
        }

        onSubmitCancelStockRelease(body, () => {
            handleToggleCancelStockReleaseModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        });
        handleToggleBackdropOpen(false);
    }

    const handleSubmitDownloadSampleExcelForWaybillRegistration = async () => {
        handleToggleBackdropOpen(true);

        await onSubmitDownloadSampleExcelForWaybillRegistration();
        handleToggleBackdropOpen(false);
    }

    const handleSubmitUploadWaybillForm = async (formData, successCallback) => {
        handleToggleBackdropOpen(true);

        formData.append('workspaceId', workspaceRedux?.workspaceInfo?.id);
        formData.append('erpItemIds', selectedErpItems?.map(r => r.id));

        await onSubmitUploadWaybillForm(formData, () => {
            successCallback();
            handleToggleWaybillRegistrationModalOpen(false);
            handleToggleControlDrawerOpen(false);
            onActionClearAllSelectedItems();
        })
        handleToggleBackdropOpen(false);
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
                onActionOpenChangeStatusToReleaseModal={() => handleToggleChangeStatusToReleaseModalOpen(true)}
                onActionOpenChangeStatusToOrderModal={() => handleToggleChangeStatusToOrderModalOpen(true)}
                onActionOpenDeleteErpItemsConfirmModal={() => handleToggleDeleteErpItemsConfirmModalOpen(true)}
                onActionOpenExcelDownloadModal={() => handleToggleExcelDownloadModalOpen(true)}
                onActionOpenCopyCreateErpItemModal={() => handleToggleCopyCreateErpItemsModalOpen(true)}
                onActionOpenViewSelectedModal={() => handleToggleViewSelectedModalOpen(true)}
                onActionOpenReleaseListModal={() => handleToggleReleaseListModalOpen(true)}
                onActionOpenStockReleaseModal={() => handleToggleStockReleaseModalOpen(true)}
                onActionOpenCancelStockReleaseModal={() => handleToggleCancelStockReleaseModalOpen(true)}
                onActionOpenWaybillRegistrationModal={() => handleToggleWaybillRegistrationModalOpen(true)}

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
                open={changeStatusToSalesModalOpen}
                onClose={() => handleToggleChangeStatusToSalesModalOpen(false)}
                onConfirm={handleSubmitChangeStatusToSales}
                title={'출고취소 확인메세지'}
                message={'선택된 데이터를 출고취소 합니다.'}
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

            <CommonModalComponent
                open={releaseListModalOpen}
                onClose={() => handleToggleReleaseListModalOpen(false)}
                maxWidth={'xs'}
            >
                <ReleaseListModalComponent
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItems}
                    onClose={() => handleToggleReleaseListModalOpen(false)}
                />
            </CommonModalComponent>

            <StockReleaseModalComponent
                open={stockReleaseModalOpen}
                onClose={() => handleToggleStockReleaseModalOpen(false)}
                onConfirm={handleSubmitStockRelease}
            />

            <ConfirmModalComponentV2
                open={cancelStockReleaseModalOpen}
                onClose={() => handleToggleCancelStockReleaseModalOpen(false)}
                onConfirm={handleSubmitCancelStockRelease}
                message={
                    <div>선택된 데이터들의 재고반영을 취소 합니다.</div>
                }
            />

            <WaybillRegistrationModalComponent
                selectedErpItems={selectedErpItems}
                open={waybillRegistrationModalOpen}
                onClose={() => handleToggleWaybillRegistrationModalOpen(false)}
                onSubmitDownloadSampleExcelForWaybillRegistration={handleSubmitDownloadSampleExcelForWaybillRegistration}
                onSubmitUploadWaybillForm={handleSubmitUploadWaybillForm}
            />
            <BackdropLoadingComponent
                open={backdropOpen}
            />
        </>
    );
}