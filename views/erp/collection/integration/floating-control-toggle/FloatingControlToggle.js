import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal-v2/ExcelDownloadModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import StockReleaseModalComponent from "./modal/StockReleaseModal.component";
import ViewSelectedModalComponent from "./modal/ViewSelectedModalV2.component";
import WaybillRegistrationModalComponent from "./modal/WaybillRegistrationModal.component";
import { Container } from "./styles/FloatingControlBar.styled";
import { ProductListModalComponent } from "../../fragments/product-list-modal";
import { MdBulkUpdateErpItems } from "../../fragments/MdBulkUpdateErpItems/v1";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../contexts/SelectedErpItemListProvider";
import { useApiHook } from "../hooks/useApiHook";
import { useRouter } from "next/router";
import { useErpItemActionsHook, useErpItemValueHook } from "../contexts/ErpItemProvider";

export default function FloatingControlToggle({
    erpCollectionHeader,
    inventoryStocks,

    onSubmitUpdateErpItems,
    onSubmitDeleteErpItems,
    onSubmitChangeStatusToSales,
    onSubmitChangeStatusToHold,
    onSubmitCopyCreateErpItems,
    onSubmitStockRelease,
    onSubmitCancelStockRelease,
    onSubmitDownloadSampleExcelForWaybillRegistration,
    onSubmitUploadWaybillForm,
    onReqCountErpItems
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const apiHook = useApiHook();
    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [controlDrawerOpen, setControlDrawerOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [changeStatusToSalesModalOpen, setChangeStatusToSalesModalOpen] = useState(false);
    const [changeStatusToHoldModalOpen, setChangeStatusToHoldModalOpen] = useState(false);
    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);
    const [copyCreateErpItemsModalOpen, setCopyCreateErpItemsModalOpen] = useState(false);
    const [viewSelectedModalOpen, setViewSelectedModalOpen] = useState(false);
    const [productListModalOpen, setProductListModalOpen] = useState(false);
    const [stockReleaseModalOpen, setStockReleaseModalOpen] = useState(false);
    const [cancelStockReleaseModalOpen, setCancelStockReleaseModalOpen] = useState(false);
    const [waybillRegistrationModalOpen, setWaybillRegistrationModalOpen] = useState(false);

    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        return () => {
            toggleControlDrawerOpen(false);
            toggleEditErpItemModalOpen(false);
            toggleDeleteErpItemsConfirmModalOpen(false);
            toggleChangeStatusToSalesModalOpen(false);
            toggleExcelDownloadModalOpen(false);
            toggleBackdropOpen(false);
            toggleCopyCreateErpItemsModalOpen(false);
            toggleViewSelectedModalOpen(false);
            setBackdropOpen(false);
        };
    }, []);

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

    const toggleChangeStatusToSalesModalOpen = (setOpen) => {
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
        setChangeStatusToSalesModalOpen(setOpen);
    }

    const toggleChangeStatusToHoldModalOpen = (setOpen) => {
        setChangeStatusToHoldModalOpen(setOpen);
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
        if (setOpen) {
            let stockReflectedItems = [];
            let notSetReleaseOptionCodeItems = [];

            selectedErpItemListValueHook?.forEach(r => {
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
                alert(`[M] 출고옵션코드가 지정되지 않은 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${notSetReleaseOptionCodeItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }
        }
        setStockReleaseModalOpen(setOpen);
    }

    const toggleCancelStockReleaseModalOpen = (setOpen) => {
        if (setOpen) {
            let stockReflectNItems = [];

            selectedErpItemListValueHook?.forEach(r => {
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

    const handleClearAllSelectedItems = () => {
        selectedErpItemListActionsHook.onSet([]);
    }

    const handleClearSelectedItem = (erpItemId) => {
        selectedErpItemListActionsHook.onSet([...selectedErpItemListValueHook].filter(r => r.id !== erpItemId));
    }
    
    const handleSubmitUpdateErpItems = async (body) => {
        toggleBackdropOpen(true)

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        const updateResult = await apiHook.reqUpdateErpItemList({ body, headers });

        if (updateResult?.content) {
            const updateIds = [...updateResult?.content];

            const fetchResult = await apiHook.reqFetchErpItemListByIds({
                body: {
                    ids: updateIds,
                    matchedCode: router?.query?.matchedCode
                },
                headers: headers
            })

            if (fetchResult?.content) {
                let newErpItemContent = _.cloneDeep(erpItemValueHook?.content);
                let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

                newErpItemContent.content = newErpItemContent?.content?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                newSelectedErpItemList = newSelectedErpItemList?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                erpItemActionsHook.content.onSet(newErpItemContent);
                selectedErpItemListActionsHook.onSet(newSelectedErpItemList);

                toggleEditErpItemModalOpen(false);
                toggleControlDrawerOpen(false);
                customToast.success(`${body?.length}건이 수정되었습니다.`, {
                    ...defaultOptions
                })
            }
        }
        toggleBackdropOpen(false);
    }

    const handleSubmitDeleteErpItems = async () => {
        toggleBackdropOpen(true);

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let body = {
            ids: selectedErpItemListValueHook?.map(r => r.id)
        }

        const deleteResult = await apiHook.reqDeleteErpItemList({ body, headers });

        if (deleteResult?.content) {
            const fetchIds = [...deleteResult?.content];
            let newErpItemContent = _.cloneDeep(erpItemValueHook?.content);
            let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

            newErpItemContent.content = newErpItemContent?.content?.filter(erpItem => {
                if (fetchIds?.includes(erpItem?.id)) {
                    return false;
                } else {
                    return true;
                }
            })

            newSelectedErpItemList = newSelectedErpItemList?.filter(erpItem => {
                if (fetchIds?.includes(erpItem?.id)) {
                    return false;
                } else {
                    return true;
                }
            })

            erpItemActionsHook.content.onSet(newErpItemContent);
            selectedErpItemListActionsHook.onSet(newSelectedErpItemList);

            
            onReqCountErpItems();
            toggleDeleteErpItemsConfirmModalOpen(false);
            toggleControlDrawerOpen(false);
            handleClearAllSelectedItems();
        }

        toggleBackdropOpen(false);
    }

    // TODO : 새로운 버전 적용하기
    const handleSubmitChangeStatusToSales = async () => {
        toggleBackdropOpen(true)
        let body = {
            ids: selectedErpItemListValueHook?.map(r => r.id),
            initializeFlag: false
        }
        await onSubmitChangeStatusToSales(body, () => {
            toggleChangeStatusToSalesModalOpen(false);
            toggleControlDrawerOpen(false);
            handleClearAllSelectedItems();
        })
        toggleBackdropOpen(false);
    }

    const handleSubmitChangeStatusToHold = async () => {
        toggleBackdropOpen(true)
        let body = {
            ids: selectedErpItemListValueHook?.map(r => r.id),
            initializeFlag: true
        }
        await onSubmitChangeStatusToHold(body, () => {
            toggleChangeStatusToHoldModalOpen(false);
            toggleControlDrawerOpen(false);
            handleClearAllSelectedItems();
        })
        toggleBackdropOpen(false);
    }

    const handleSubmitCopyCreateErpItems = async () => {
        toggleBackdropOpen(true)
        let body = {
            erpItemIds: selectedErpItemListValueHook?.map(r => r.id)
        }

        await onSubmitCopyCreateErpItems(body, () => {
            toggleCopyCreateErpItemsModalOpen(false);
            toggleControlDrawerOpen(false);
            handleClearAllSelectedItems();
        })
        toggleBackdropOpen(false);
    }

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

    const handleSubmitDownloadSampleExcelForWaybillRegistration = async () => {
        toggleBackdropOpen(true);

        await onSubmitDownloadSampleExcelForWaybillRegistration();
        toggleBackdropOpen(false);
    }

    const handleSubmitUploadWaybillForm = async (formData, successCallback) => {
        toggleBackdropOpen(true);

        formData.append('workspaceId', workspaceRedux?.workspaceInfo?.id);
        formData.append('erpItemIds', selectedErpItemListValueHook?.map(r => r.id));

        await onSubmitUploadWaybillForm(formData, () => {
            successCallback();
            toggleWaybillRegistrationModalOpen(false);
            toggleControlDrawerOpen(false);
            handleClearAllSelectedItems();
        })
        toggleBackdropOpen(false);
    }

    if (selectedErpItemListValueHook?.length <= 0) {
        return null;
    }

    return (
        <>
            <Container>
                <SingleBlockButton
                    type='button'
                    className='floating-button-item'
                    onClick={() => toggleControlDrawerOpen(true)}
                >
                    <span className='accent'>{selectedErpItemListValueHook?.length || '0'}</span> 개 선택됨
                </SingleBlockButton>
            </Container>

            <FloatingControlBarModalComponent
                open={controlDrawerOpen}
                selectedErpItems={selectedErpItemListValueHook}

                onClose={() => toggleControlDrawerOpen(false)}

                onActionOpenEditErpItemsModal={() => toggleEditErpItemModalOpen(true)}
                onActionOpenChangeStatusToSalesModal={() => toggleChangeStatusToSalesModalOpen(true)}
                onActionOpenChangeStatusToHoldModal={() => toggleChangeStatusToHoldModalOpen(true)}
                onActionOpenDeleteErpItemsConfirmModal={() => toggleDeleteErpItemsConfirmModalOpen(true)}
                onActionOpenExcelDownloadModal={() => toggleExcelDownloadModalOpen(true)}
                onActionOpenCopyCreateErpItemModal={() => toggleCopyCreateErpItemsModalOpen(true)}
                onActionOpenViewSelectedModal={() => toggleViewSelectedModalOpen(true)}
                onActionOpenProductListModal={() => toggleProductListModalOpen(true)}
                onActionOpenStockReleaseModal={() => toggleStockReleaseModalOpen(true)}
                onActionOpenCancelStockReleaseModal={() => toggleCancelStockReleaseModalOpen(true)}
                onActionOpenWaybillRegistrationModal={() => toggleWaybillRegistrationModalOpen(true)}

                onActionClearAllSelectedItems={handleClearAllSelectedItems}
            />

            {editErpItemsModalOpen &&
                <MdBulkUpdateErpItems
                    open={editErpItemsModalOpen}
                    onClose={() => toggleEditErpItemModalOpen(false)}
                    maxWidth={'xl'}
                    selectedErpItems={selectedErpItemListValueHook}
                    onSubmitUpdateErpItems={handleSubmitUpdateErpItems}
                />
            }

            <ConfirmModalComponentV2
                open={deleteErpItemsConfirmModalOpen}
                onClose={() => toggleDeleteErpItemsConfirmModalOpen(false)}
                onConfirm={handleSubmitDeleteErpItems}
                title={'삭제 확인메세지'}
                message={'선택된 데이터를 영구 삭제 합니다.'}
                confirmBtnStyle={{
                    background: 'var(--defaultRedColor)'
                }}
            />

            <ConfirmModalComponentV2
                open={changeStatusToSalesModalOpen}
                onClose={() => toggleChangeStatusToSalesModalOpen(false)}
                onConfirm={handleSubmitChangeStatusToSales}
                title={'출고취소 확인메세지'}
                message={'선택된 데이터를 출고취소 합니다.'}
            />

            <ConfirmModalComponentV2
                open={changeStatusToHoldModalOpen}
                onClose={() => toggleChangeStatusToHoldModalOpen(false)}
                onConfirm={handleSubmitChangeStatusToHold}
                title={'보류 데이터 전환'}
                message={'선택된 데이터를 보류 데이터로 전환합니다.'}
                confirmBtnStyle={{
                    background: 'var(--mainColor)'
                }}
            />

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

            <ConfirmModalComponentV2
                open={copyCreateErpItemsModalOpen}
                onClose={() => toggleCopyCreateErpItemsModalOpen(false)}
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
                onClose={() => toggleViewSelectedModalOpen(false)}
                maxWidth={'xl'}
            >
                <ViewSelectedModalComponent
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItemListValueHook}
                    onClose={() => toggleViewSelectedModalOpen(false)}
                    onActionClearSelectedItem={handleClearSelectedItem}
                />
            </CommonModalComponent>

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
                <StockReleaseModalComponent
                    open={stockReleaseModalOpen}
                    onClose={() => toggleStockReleaseModalOpen(false)}
                    onConfirm={handleSubmitStockRelease}
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

            <WaybillRegistrationModalComponent
                selectedErpItems={selectedErpItemListValueHook}
                open={waybillRegistrationModalOpen}
                onClose={() => toggleWaybillRegistrationModalOpen(false)}
                onSubmitDownloadSampleExcelForWaybillRegistration={handleSubmitDownloadSampleExcelForWaybillRegistration}
                onSubmitUploadWaybillForm={handleSubmitUploadWaybillForm}
            />
            <BackdropLoadingComponent
                open={backdropOpen}
            />
        </>
    );
}