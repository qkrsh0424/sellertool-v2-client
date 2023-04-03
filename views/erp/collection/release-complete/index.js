import { useLocalStorageHook } from "../../../../hooks/local_storage/useLocalStorageHook";
import Layout from "../layout/Layout";
import ConditionFieldComponent from "./condition-field/ConditionField.component";
import ErpItemListComponent from "./erp-item-list/ErpItemList.component";
import FloatingControlToggle from "./floating-control-toggle/FloatingControlToggle";
import FloatingPagenationComponent from "./floating-pagenation/FloatingPagenation.component";
import HeaderSettingComponent from "./header-setting/HeaderSetting.component";
import useErpCollectionHeaderHook from "./hooks/useErpCollectionHeaderHook";
import useErpItemPageHook from "./hooks/useErpItemPageHook";
import useErpItemSameReceiverHintsHook from "./hooks/useErpItemSameReceiverHintsHook";
import useInventoryStocksHook from "./hooks/useInventoryStocksHook";
import useSelectedErpItemsHook from "./hooks/useSelectedErpItemsHook";
import useWaybillRegistrationHook from "./hooks/useWaybillRegistrationHook";
import { Container } from "./index.styled";
import SortFieldComponent from "./sort-field/SortField.component";

export default function MainComponent(props) {
    const [selectedErpCollectionHeaderIds, setSelectedErpCollectionHeaderIds] = useLocalStorageHook('erp_collection_headers', { orderHeaderId: null, salesHeaderId: null, releaseCompleteHeaderId: null });

    const {
        erpCollectionHeader
    } = useErpCollectionHeaderHook(selectedErpCollectionHeaderIds?.releaseCompleteHeaderId);

    const {
        erpItemPage,
        erpItemPagePending,
        totalSize,
        totalPages,

        reqFetchErpItemPage,
        reqChangeOptionCode,
        reqChangeReleaseOptionCode,
        reqUpdateErpItems,
        reqDeleteErpItems,
        reqChangeStatusToSales,
        reqChangeStatusToRelease,
        reqChangeStatusToOrder,
        reqCopyCreateErpItems,
        reqUploadWaybillForm
    } = useErpItemPageHook();

    const {
        inventoryStocks,
        reqStockRelease,
        reqCancelStockRelease
    } = useInventoryStocksHook(erpItemPage?.content);

    const {
        erpItemSameReceiverHints
    } = useErpItemSameReceiverHintsHook(erpItemPage);

    const {
        selectedErpItems,
        onSelectErpItem,
        onSelectAllErpItems,
        onSelectClearAllErpItemsInPage,
        onSelectClearAllErpItems,
        onSelectClearErpItem,
        reqFetchSelectedErpItems,
    } = useSelectedErpItemsHook();

    const {
        downloadSampleExcelForWaybillRegistration
    } = useWaybillRegistrationHook();

    const handleSelectOrderHeaderId = (erpCollectionHeaderId) => {
        setSelectedErpCollectionHeaderIds({
            ...selectedErpCollectionHeaderIds,
            releaseCompleteHeaderId: erpCollectionHeaderId
        })
    }

    const handleSubmitStockRelease = async (body, successCallback) => {
        await reqStockRelease(body, () => {
            alert('정상적으로 재고가 반영되었습니다.');
            reqFetchErpItemPage();
            successCallback();
        });
    }

    const handleSubmitCancelStockRelease = async (body, successCallback) => {
        await reqCancelStockRelease(body, () => {
            alert('정상적으로 재고반영이 취소되었습니다.');
            reqFetchErpItemPage();
            successCallback();
        })
    }

    const handleSubmitDownloadSampleExcelForWaybillRegistration = async () => {
        await downloadSampleExcelForWaybillRegistration();
    }

    const handleSubmitUploadWaybillForm = async (formData, successCallback) => {
        await reqUploadWaybillForm(formData, () => {
            reqFetchErpItemPage();
            successCallback();
        });
    }

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'통합 발주 관리'}
                    headerName={'출고완료'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <HeaderSettingComponent
                            erpCollectionHeader={erpCollectionHeader}
                            onActionSelectOrderHeaderId={handleSelectOrderHeaderId}
                        />
                        <ConditionFieldComponent />
                        <SortFieldComponent />
                        <ErpItemListComponent
                            erpCollectionHeader={erpCollectionHeader}
                            erpItemPage={erpItemPage}
                            selectedErpItems={selectedErpItems}
                            inventoryStocks={inventoryStocks}
                            erpItemSameReceiverHints={erpItemSameReceiverHints}

                            onSelectErpItem={onSelectErpItem}
                            onSelectAllErpItems={onSelectAllErpItems}
                            onSelectClearAllErpItemsInPage={onSelectClearAllErpItemsInPage}
                            onSelectClearAllErpItems={onSelectClearAllErpItems}
                            erpItemPagePending={erpItemPagePending}
                            onSubmitChangeOptionCode={reqChangeOptionCode}
                            onSubmitChangeReleaseOptionCode={reqChangeReleaseOptionCode}
                            onSelectClearErpItem={onSelectClearErpItem}
                        />
                    </>
                </Layout>
            </Container>

            <FloatingPagenationComponent
                erpItemPage={erpItemPage}
                totalSize={totalSize}
                totalPages={totalPages}
            />

            {selectedErpItems?.length > 0 &&
                <FloatingControlToggle
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItems}
                    inventoryStocks={inventoryStocks}

                    onActionClearAllSelectedItems={onSelectClearAllErpItems}
                    onActionClearSelectedItem={onSelectClearErpItem}

                    onSubmitUpdateErpItems={reqUpdateErpItems}
                    onSubmitFetchSelectedErpItems={reqFetchSelectedErpItems}
                    onSubmitDeleteErpItems={reqDeleteErpItems}
                    onSubmitChangeStatusToSales={reqChangeStatusToSales}
                    onSubmitChangeStatusToRelease={reqChangeStatusToRelease}
                    onSubmitChangeStatusToOrder={reqChangeStatusToOrder}
                    onSubmitCopyCreateErpItems={reqCopyCreateErpItems}
                    onSubmitStockRelease={handleSubmitStockRelease}
                    onSubmitCancelStockRelease={handleSubmitCancelStockRelease}
                    onSubmitDownloadSampleExcelForWaybillRegistration={handleSubmitDownloadSampleExcelForWaybillRegistration}
                    onSubmitUploadWaybillForm={handleSubmitUploadWaybillForm}
                />
            }
        </>
    );
}