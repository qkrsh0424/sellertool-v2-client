import Layout from "../layout/Layout";
import ErpItemListComponent from "./erp-item-list/ErpItemListV2.component";
import FloatingControlToggle from "./floating-control-toggle/FloatingControlToggle";
import FloatingPagenationComponent from "./floating-pagenation/FloatingPagenation.component";
import HeaderSettingComponent from "./header-setting/HeaderSetting.component";
import useErpCollectionHeaderHook from "./hooks/useErpCollectionHeaderHook";
import useErpItemPageHook from "./hooks/useErpItemPageHook";
import useErpItemSameReceiverHintsHook from "./hooks/useErpItemSameReceiverHintsHook";
import useInventoryStocksHook from "./hooks/useInventoryStocksHook";
import useSelectedErpItemsHook from "./hooks/useSelectedErpItemsHook";
import useWaybillRegistrationHook from "./hooks/useWaybillRegistrationHook";
import { Container, ViewOptionsContainer } from "./index.styled";
import { useSellertoolDatas } from "../../../../hooks/sellertool-datas";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect, useState } from "react";
import { FdClassification } from "./components/FdClassification/FdClassification";
import FdConditionSearch from "./components/FdConditionSearch/FdConditionSearch";
import { ViewOptionsProvider } from "./contexts/ViewOptionsProvider";
import { FdViewOptions } from "./components/FdViewOptions/FdViewOptions";
import { ErpItemFetcher, ErpItemProvider, useErpItemValueHook } from "./contexts/ErpItemProvider";

export default function MainComponent(props) {
    return (
        <ErpItemProvider>
            <ViewOptionsProvider>
                <ErpItemFetcher />
                <MainComponentCore />
            </ViewOptionsProvider>
        </ErpItemProvider>
    );
}

function MainComponentCore() {
    const sellertoolDatas = useSellertoolDatas();
    const erpcReleaseCompleteHeaderId = sellertoolDatas?.releaseCompleteHeaderIdForErpc;

    const apiHook = useApiHook();

    const erpItemValueHook = useErpItemValueHook();

    const {
        erpCollectionHeader
    } = useErpCollectionHeaderHook(erpcReleaseCompleteHeaderId);

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
        reqChangeStatusToHold,
        reqCopyCreateErpItems,
        reqUploadWaybillForm
    } = useErpItemPageHook();

    const {
        inventoryStocks,
        reqStockRelease,
        reqCancelStockRelease
    } = useInventoryStocksHook(erpItemValueHook?.content?.content);

    const {
        erpItemSameReceiverHints
    } = useErpItemSameReceiverHintsHook(erpItemValueHook?.content);

    const {
        selectedErpItems,
        onSelectErpItem,
        onSelectAllErpItems,
        onSelectClearAllErpItemsInPage,
        onSelectClearAllErpItems,
        onSelectClearErpItem,
        reqFetchSelectedErpItems,
    } = useSelectedErpItemsHook();

    const [productOptionPackageInfoList, setProductOptionPackageInfoList] = useState({
        content: null,
        isLoading: true
    });

    useEffect(() => {
        if (!erpItemValueHook?.content?.content || !sellertoolDatas?.wsId) {
            return;
        }

        async function fetchProductOptionPackageList() {
            const productOptionIds = Array.from(new Set(erpItemValueHook?.content?.content?.filter(r => r.packageYn === 'y').map(r => r.productOptionId)));

            if (!productOptionIds || productOptionIds?.length <= 0) {
                return;
            }

            let body = {
                productOptionIds: productOptionIds
            }

            let headers = {
                wsId: sellertoolDatas?.wsId
            }

            const result = await apiHook.reqFetchProductOptionPackageList({ body, headers });

            if (result?.content) {
                setProductOptionPackageInfoList({
                    isLoading: false,
                    content: result?.content
                })
            }
        }

        fetchProductOptionPackageList();
    }, [erpItemValueHook?.content?.content, sellertoolDatas?.wsId]);

    const {
        downloadSampleExcelForWaybillRegistration
    } = useWaybillRegistrationHook();

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
                    headerName={'통합주문관리'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <FdClassification />
                        <FdConditionSearch
                            exposurePeriodTypes={['', 'createdAt', 'channelOrderDate', 'salesAt', 'releaseAt', 'holdAt']}
                            viewStockReflectField={true}
                        />
                        <HeaderSettingComponent
                            erpCollectionHeader={erpCollectionHeader}
                            favoriteViewHeaderIdsForErpc={sellertoolDatas?.favoriteViewHeaderIdsForErpc}
                            onActionSelectOrderHeaderId={(headerId) => sellertoolDatas._onSetReleaseCompleteHeaderIdForErpc(headerId)}
                        />
                        {/* <FdSortTypes
                            isLoading={erpItemPagePending}
                        /> */}
                        <FdViewOptions
                            isLoading={erpItemValueHook.isLoading}
                        />
                        <ErpItemListComponent
                            erpCollectionHeader={erpCollectionHeader}
                            erpItemPage={erpItemValueHook.content}
                            erpItemPagePending={erpItemValueHook.isLoading}
                            selectedErpItems={selectedErpItems}
                            inventoryStocks={inventoryStocks}
                            erpItemSameReceiverHints={erpItemSameReceiverHints}
                            productOptionPackageInfoList={productOptionPackageInfoList?.content || []}

                            onSelectErpItem={onSelectErpItem}
                            onSelectAllErpItems={onSelectAllErpItems}
                            onSelectClearAllErpItemsInPage={onSelectClearAllErpItemsInPage}
                            onSelectClearAllErpItems={onSelectClearAllErpItems}
                            onSubmitChangeOptionCode={reqChangeOptionCode}
                            onSubmitChangeReleaseOptionCode={reqChangeReleaseOptionCode}
                            onSelectClearErpItem={onSelectClearErpItem}
                        />
                    </>
                </Layout>
            </Container>

            <FloatingPagenationComponent
                erpItemPage={erpItemValueHook.content}
                totalSize={erpItemValueHook.totalSize}
                totalPages={erpItemValueHook.totalPages}
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
                    onSubmitChangeStatusToHold={reqChangeStatusToHold}
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