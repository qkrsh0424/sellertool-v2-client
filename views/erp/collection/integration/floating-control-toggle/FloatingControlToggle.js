import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal-v2/ExcelDownloadModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import StockReleaseModalComponent from "./modal/StockReleaseModal.component";
import { Container } from "./styles/FloatingControlBar.styled";
import { ProductListModalComponent } from "../../fragments/product-list-modal";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../contexts/SelectedErpItemListProvider";
import { useApiHook } from "../hooks/useApiHook";
import { useRouter } from "next/router";
import { MdChangeStatus } from "./modal/MdChangeStatus/MdChangeStatus";
import { useErpItemFetcherHook } from "../hooks/useErpItemFetcherHook";
import MdViewSelected from "./modal/MdViewSelected/MdViewSelected";
import { MdCopyCreate } from "./modal/MdCopyCreate/MdCopyCreate";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { MdDeleteSelected } from "./modal/MdDeleteSelected/MdDeleteSelected";
import { MdWaybillBulkUpdate } from "./modal/MdWaybillBulkUpdate/MdWaybillBulkUpdate";
import { MdBulkUpdateErpItems } from "./modal/MdBulkUpdateErpItems/v1/MdBulkUpdateErpItems";
import { StatusUtils } from "../utils/StatusUtils";
import { MdStockRelease } from "./modal/MdStockRelease/MdStockRelease";

export default function FloatingControlToggle({
    erpCollectionHeader,
    inventoryStocks,

    onSubmitStockRelease,
    onSubmitCancelStockRelease,
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const apiHook = useApiHook();
    const erpItemFetcherHook = useErpItemFetcherHook();

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

    const [backdropOpen, setBackdropOpen] = useState(false);

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

    const toggleBackdropOpen = (setOpen) => {
        setBackdropOpen(setOpen);
    }

    const toggleStockReleaseModalOpen = (setOpen) => {
        // if (setOpen) {
        //     let stockReflectedItems = [];
        //     let notSetReleaseOptionCodeItems = [];
        //     let notCompleteItems = [];

        //     selectedErpItemListValueHook?.forEach(r => {
        //         const classificationType = StatusUtils().getClassificationTypeForFlags({ salesYn: r?.salesYn, releaseYn: r?.releaseYn, holdYn: r?.holdYn });

        //         if (r.stockReflectYn === 'y') {
        //             stockReflectedItems.push(r);
        //         }

        //         if (!r.releaseOptionCode) {
        //             notSetReleaseOptionCodeItems.push(r);
        //         }

        //         if (classificationType !== 'COMPLETE') {
        //             notCompleteItems.push(r);
        //         }

        //     });

        //     if (stockReflectedItems?.length >= 1) {
        //         alert(`이미 재고반영 처리된 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
        //         return;
        //     }

        //     if (notSetReleaseOptionCodeItems?.length >= 1) {
        //         alert(`[M] 출고옵션코드가 지정되지 않은 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${notSetReleaseOptionCodeItems?.map(r => r.uniqueCode)?.join()}`);
        //         return;
        //     }

        //     if (notCompleteItems?.length >= 1) {
        //         alert(`출고완료 상태가 아닌 주문건이 있습니다. 해당 주문건을 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${notCompleteItems?.map(r => r.uniqueCode)?.join()}`)
        //         return;
        //     }
        // }
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
        setChangeStatusModalOpen(bool);
    }

    const handleClearAllSelectedItems = () => {
        selectedErpItemListActionsHook.onSet([]);
    }

    // 재고반영 : 선택된 모든 주문건
    const handleSubmitStockRelease = async (memo) => {
        toggleBackdropOpen(true);
        let body = {
            erpItemIds: selectedErpItemListValueHook?.map(r => r.id),
            memo: memo
        }

        await onSubmitStockRelease(body, () => {
            toggleStockReleaseModalOpen(false);
            toggleControlDrawerOpen(false);
            handleClearAllSelectedItems();
        });
        toggleBackdropOpen(false);
    }

    // 재고반영 취소 : 선택된 모든 주문건
    const handleSubmitCancelStockRelease = async () => {
        toggleBackdropOpen(true);
        let body = {
            erpItemIds: selectedErpItemListValueHook?.map(r => r.id),
        }

        await onSubmitCancelStockRelease(body, () => {
            toggleCancelStockReleaseModalOpen(false);
            toggleControlDrawerOpen(false);
            handleClearAllSelectedItems();
        });
        toggleBackdropOpen(false);
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

            {/* TODO : 재고반영 모달 구성 */}
            {/* {stockReleaseModalOpen &&
                <StockReleaseModalComponent
                    open={stockReleaseModalOpen}
                    onClose={() => toggleStockReleaseModalOpen(false)}
                    onConfirm={handleSubmitStockRelease}
                />
            } */}
            {stockReleaseModalOpen &&
                <MdStockRelease 
                    open={stockReleaseModalOpen}
                    toggleStockReleaseModalOpen={toggleStockReleaseModalOpen}
                    toggleControlDrawerOpen={toggleControlDrawerOpen}

                    erpCollectionHeader={erpCollectionHeader}
                />
            }


            {cancelStockReleaseModalOpen &&
                <ConfirmModalComponentV2
                    open={cancelStockReleaseModalOpen}
                    onClose={() => toggleCancelStockReleaseModalOpen(false)}
                    onConfirm={handleSubmitCancelStockRelease}
                    message={
                        <div>선택된 데이터들의 재고반영을 취소 합니다.</div>
                    }
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
            <BackdropLoadingComponent
                open={backdropOpen}
            />
        </>
    );
}