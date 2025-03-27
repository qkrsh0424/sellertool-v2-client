import { useEffect, useState } from "react";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal-v2/ExcelDownloadModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import { Container } from "./styles/FloatingControlBar.styled";
import { ProductListModalComponent } from "../../fragments/product-list-modal";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../contexts/SelectedErpItemListProvider";
import { useRouter } from "next/router";
import { MdChangeStatus } from "./modal/MdChangeStatus/MdChangeStatus";
import MdViewSelected from "./modal/MdViewSelected/MdViewSelected";
import { MdCopyCreate } from "./modal/MdCopyCreate/MdCopyCreate";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { MdDeleteSelected } from "./modal/MdDeleteSelected/MdDeleteSelected";
import { MdWaybillBulkUpdate } from "./modal/MdWaybillBulkUpdate/MdWaybillBulkUpdate";
import { MdBulkUpdateErpItems } from "./modal/MdBulkUpdateErpItems/v1/MdBulkUpdateErpItems";
import { MdStockRelease } from "./modal/MdStockRelease/MdStockRelease";
import { MdCancelStockRelease } from "./modal/MdCancelStockRelease/MdCancelStockRelease";

export default function FloatingControlToggle({
    erpCollectionHeader,
    inventoryStocks,
}) {
    const router = useRouter();

    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [controlDrawerOpen, setControlDrawerOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);
    const [copyCreateErpItemsModalOpen, setCopyCreateErpItemsModalOpen] = useState(false);
    const [viewSelectedModalOpen, setViewSelectedModalOpen] = useState(false);
    const [productListModalOpen, setProductListModalOpen] = useState(false);
    const [stockReleaseModalOpen, setStockReleaseModalOpen] = useState(false);
    const [cancelStockReleaseModalOpen, setCancelStockReleaseModalOpen] = useState(false);
    const [waybillRegistrationModalOpen, setWaybillRegistrationModalOpen] = useState(false);
    const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);

    useEffect(() => {
        selectedErpItemListActionsHook.onSet([]);
    }, [router?.query?.classificationType]);

    useEffect(() => {
        if (selectedErpItemListValueHook?.length <= 0) {
            toggleControlDrawerOpen(false);
            toggleViewSelectedModalOpen(false);
        }
    }, [selectedErpItemListValueHook])

    const toggleControlDrawerOpen = (setOpen) => {
        setControlDrawerOpen(setOpen);
    }

    const toggleEditErpItemModalOpen = (setOpen) => {
        if (setOpen) {
            if (selectedErpItemListValueHook?.length > 200) {
                alert('일괄 수정은 한번에 최대 200개 까지만 가능합니다.');
                return;
            }
        }
        setEditErpItemsModalOpen(setOpen)
    }

    const toggleDeleteErpItemsConfirmModalOpen = (setOpen) => {
        if (setOpen) {
            let stockReflectedItems = [];

            selectedErpItemListValueHook?.forEach(r => {
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

    const toggleExcelDownloadModalOpen = (setOpen) => {
        setExcelDownloadModalOpen(setOpen);
    }

    const toggleProductListModalOpen = (setOpen) => {
        setProductListModalOpen(setOpen);
    }

    const toggleStockReleaseModalOpen = (setOpen) => {
        setStockReleaseModalOpen(setOpen);
    }

    const toggleCancelStockReleaseModalOpen = (setOpen) => {
        if (setOpen) {
            let stockReflectedItems = [];

            selectedErpItemListValueHook?.forEach(r => {
                if (r.stockReflectYn === 'n') {
                    stockReflectedItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                alert(`재고반영이 되지 않은 데이터가 선택되었습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }
        setCancelStockReleaseModalOpen(setOpen);
    }

    const toggleCopyCreateErpItemsModalOpen = (setOpen) => {
        if (setOpen) {
            if (!selectedErpItemListValueHook || selectedErpItemListValueHook?.length < 1) {
                alert('데이터를 먼저 선택해 주세요.');
                return;
            } else if (selectedErpItemListValueHook?.length > 10) {
                alert('한번에 복사 생성 가능한 최대 개수는 10개 입니다.');
                return;
            }

            let stockReflectedItems = [];

            selectedErpItemListValueHook?.forEach(r => {
                if (r.stockReflectYn === 'y') {
                    stockReflectedItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                alert(`이미 재고반영 처리된 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }
        setCopyCreateErpItemsModalOpen(setOpen);
    }

    const toggleViewSelectedModalOpen = (setOpen) => {
        setViewSelectedModalOpen(setOpen)
    }

    const toggleWaybillRegistrationModalOpen = (setOpen) => {
        setWaybillRegistrationModalOpen(setOpen);
    }

    const toggleChangeStatusModalOpen = (bool) => {
        if (bool) {
            let stockReflectedItems = [];

            selectedErpItemListValueHook?.forEach(r => {
                if (r.stockReflectYn === 'y') {
                    stockReflectedItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                alert(`이미 재고반영 처리된 데이터가 있습니다.\n재고반영 처리된 데이터는 상태를 변경할 수 없습니다.\n해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }

        setChangeStatusModalOpen(bool);
    }

    const handleClearAllSelectedItems = () => {
        selectedErpItemListActionsHook.onSet([]);
    }

    if (selectedErpItemListValueHook?.length <= 0) {
        return null;
    }

    return (
        <>
            <Container>
                <CustomBlockButton
                    type='button'
                    className='floating-button-item'
                    onClick={() => toggleControlDrawerOpen(true)}
                >
                    <span className='accent'>{selectedErpItemListValueHook?.length || '0'}</span> 개 선택됨
                </CustomBlockButton>
            </Container>
            <FloatingControlBarModalComponent
                open={controlDrawerOpen}
                selectedErpItems={selectedErpItemListValueHook}

                onClose={() => toggleControlDrawerOpen(false)}

                onActionOpenEditErpItemsModal={() => toggleEditErpItemModalOpen(true)}
                onActionOpenDeleteErpItemsConfirmModal={() => toggleDeleteErpItemsConfirmModalOpen(true)}
                onActionOpenExcelDownloadModal={() => toggleExcelDownloadModalOpen(true)}
                onActionOpenCopyCreateErpItemModal={() => toggleCopyCreateErpItemsModalOpen(true)}
                onActionOpenViewSelectedModal={() => toggleViewSelectedModalOpen(true)}
                onActionOpenProductListModal={() => toggleProductListModalOpen(true)}
                onActionOpenStockReleaseModal={() => toggleStockReleaseModalOpen(true)}
                onActionOpenCancelStockReleaseModal={() => toggleCancelStockReleaseModalOpen(true)}
                onActionOpenWaybillRegistrationModal={() => toggleWaybillRegistrationModalOpen(true)}
                onActionOpenChangeStatusModal={() => toggleChangeStatusModalOpen(true)}

                onActionClearAllSelectedItems={handleClearAllSelectedItems}
            />

            {editErpItemsModalOpen &&
                <MdBulkUpdateErpItems
                    open={editErpItemsModalOpen}
                    maxWidth={'xl'}
                    toggleEditErpItemModalOpen={toggleEditErpItemModalOpen}
                    toggleControlDrawerOpen={toggleControlDrawerOpen}
                />
            }

            {deleteErpItemsConfirmModalOpen &&
                <MdDeleteSelected
                    open={deleteErpItemsConfirmModalOpen}
                    toggleDeleteErpItemsConfirmModalOpen={toggleDeleteErpItemsConfirmModalOpen}
                    toggleControlDrawerOpen={toggleControlDrawerOpen}

                    erpCollectionHeader={erpCollectionHeader}
                />
            }

            <CommonModalComponent
                open={excelDownloadModalOpen}
                onClose={() => toggleExcelDownloadModalOpen(false)}
                maxWidth={'xl'}
            >
                <ExcelDownloadModalComponent
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItemListValueHook}
                    inventoryStocks={inventoryStocks}

                    onClose={() => toggleExcelDownloadModalOpen(false)}
                />
            </CommonModalComponent>

            {copyCreateErpItemsModalOpen &&
                <MdCopyCreate
                    open={copyCreateErpItemsModalOpen}
                    toggleCopyCreateErpItemsModalOpen={toggleCopyCreateErpItemsModalOpen}
                    toggleControlDrawerOpen={toggleControlDrawerOpen}
                />
            }
            {viewSelectedModalOpen &&
                <MdViewSelected
                    open={viewSelectedModalOpen}
                    onClose={() => toggleViewSelectedModalOpen(false)}
                    erpCollectionHeader={erpCollectionHeader}
                />
            }

            {productListModalOpen &&
                <CommonModalComponent
                    open={productListModalOpen}
                    onClose={() => toggleProductListModalOpen(false)}
                    maxWidth={'xs'}
                >
                    <ProductListModalComponent
                        erpCollectionHeader={erpCollectionHeader}
                        selectedErpItems={selectedErpItemListValueHook}
                        onClose={() => toggleProductListModalOpen(false)}
                    />
                </CommonModalComponent>
            }

            {stockReleaseModalOpen &&
                <MdStockRelease
                    open={stockReleaseModalOpen}
                    toggleStockReleaseModalOpen={toggleStockReleaseModalOpen}
                    toggleControlDrawerOpen={toggleControlDrawerOpen}

                    erpCollectionHeader={erpCollectionHeader}
                />
            }

            {cancelStockReleaseModalOpen &&
                <MdCancelStockRelease
                    open={cancelStockReleaseModalOpen}
                    toggleCancelStockReleaseModalOpen={toggleCancelStockReleaseModalOpen}
                    toggleControlDrawerOpen={toggleControlDrawerOpen}
                />
            }

            {waybillRegistrationModalOpen &&
                <MdWaybillBulkUpdate
                    open={waybillRegistrationModalOpen}
                    toggleWaybillRegistrationModalOpen={toggleWaybillRegistrationModalOpen}
                    toggleControlDrawerOpen={toggleControlDrawerOpen}
                />
            }

            {changeStatusModalOpen &&
                <MdChangeStatus
                    open={changeStatusModalOpen}
                    onClose={() => toggleChangeStatusModalOpen(false)}
                    onCloseControlDrawer={() => toggleControlDrawerOpen(false)}
                />
            }
        </>
    );
}