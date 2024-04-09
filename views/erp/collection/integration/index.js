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
import { Container } from "./index.styled";
import { useSellertoolDatas } from "../../../../hooks/sellertool-datas";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect, useState } from "react";
import { FdClassification } from "./components/FdClassification/FdClassification";
import FdConditionSearch from "./components/FdConditionSearch/FdConditionSearch";
import { ViewOptionsProvider } from "./contexts/ViewOptionsProvider";
import { FdViewOptions } from "./components/FdViewOptions/FdViewOptions";
import { ErpItemProvider, useErpItemActionsHook, useErpItemValueHook } from "./contexts/ErpItemProvider";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CustomDateUtils } from "../../../../utils/CustomDateUtils";
import { CustomURIEncoderUtils } from "../../../../utils/CustomURIEncoderUtils";
import { CLASSIFICATIONS } from "./References";
import { SelectedErpItemListProvider } from "./contexts/SelectedErpItemListProvider";

const customDateUtils = CustomDateUtils();
const customURIEncoderUtils = CustomURIEncoderUtils();

export default function MainComponent(props) {
    return (
        <ErpItemProvider>
            <SelectedErpItemListProvider>
                <ViewOptionsProvider>
                    <MainComponentCore />
                </ViewOptionsProvider>
            </SelectedErpItemListProvider>
        </ErpItemProvider>
    );
}

function MainComponentCore() {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const sellertoolDatas = useSellertoolDatas();
    const erpcReleaseCompleteHeaderId = sellertoolDatas?.releaseCompleteHeaderIdForErpc;

    const apiHook = useApiHook();

    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();

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

    const {
        downloadSampleExcelForWaybillRegistration
    } = useWaybillRegistrationHook();

    const [isRenderLoading, setIsRenderLoading] = useState(true);

    const [productOptionPackageInfoList, setProductOptionPackageInfoList] = useState({
        content: null,
        isLoading: true
    });


    useEffect(() => {
        if (router.isReady) {
            setIsRenderLoading(false);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (
            isRenderLoading ||
            !workspaceRedux?.workspaceInfo?.id
        ) {
            return;
        }
        handleReqFetchErpItemSlice();
    }, [
        isRenderLoading,
        workspaceRedux?.workspaceInfo?.id,
        router?.query?.classificationType,
        router?.query?.periodSearchCondition,
        router?.query?.startDateTime,
        router?.query?.endDateTime,
        router?.query?.mpSearchCondition,
        router?.query?.mpSearchQuery,
        router?.query?.oiSearchCondition,
        router?.query?.oiSearchQuery,
        router?.query?.riSearchCondition,
        router?.query?.riSearchQuery,
        router?.query?.diSearchCondition,
        router?.query?.diSearchQuery,
        router?.query?.mmSearchCondition,
        router?.query?.mmSearchQuery,
        router?.query?.stockReflectYn,
        router?.query?.sortTypes,
        router?.query?.size,
        router?.query?.matchedCode,
        router?.query?.page,
        router?.query?.sort,
    ]);

    // count를 호출할때는 페이지 변경, sort 변경에서는 반응하지 않도록 한다.
    useEffect(() => {
        if (
            isRenderLoading ||
            !workspaceRedux?.workspaceInfo?.id
        ) {
            return;
        }

        handleReqCountErpItems();
    }, [
        isRenderLoading,
        workspaceRedux?.workspaceInfo?.id,
        router?.query?.classificationType,
        router?.query?.periodSearchCondition,
        router?.query?.startDateTime,
        router?.query?.endDateTime,
        router?.query?.mpSearchCondition,
        router?.query?.mpSearchQuery,
        router?.query?.oiSearchCondition,
        router?.query?.oiSearchQuery,
        router?.query?.riSearchCondition,
        router?.query?.riSearchQuery,
        router?.query?.diSearchCondition,
        router?.query?.diSearchQuery,
        router?.query?.mmSearchCondition,
        router?.query?.mmSearchQuery,
        router?.query?.stockReflectYn,
        router?.query?.size,
        router?.query?.matchedCode,
    ]);

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

    const handleReqCountErpItems = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            periodSearchCondition: router?.query?.periodSearchCondition,
            startDateTime: router?.query?.startDateTime && customDateUtils.getStartDate(router?.query?.startDateTime),
            endDateTime: router?.query?.endDateTime && customDateUtils.getEndDate(router?.query?.endDateTime),
            mpSearchCondition: router?.query?.mpSearchCondition,
            mpSearchQuery: router?.query?.mpSearchQuery,
            oiSearchCondition: router?.query?.oiSearchCondition,
            oiSearchQuery: router?.query?.oiSearchQuery,
            riSearchCondition: router?.query?.riSearchCondition,
            riSearchQuery: router?.query?.riSearchQuery,
            diSearchCondition: router?.query?.diSearchCondition,
            diSearchQuery: router?.query?.diSearchQuery,
            mmSearchCondition: router?.query?.mmSearchCondition,
            mmSearchQuery: router?.query?.mmSearchQuery,
            matchedCode: router?.query?.matchedCode || 'releaseOptionCode',
            stockReflectYn: router?.query?.stockReflectYn || null,
        }

        switch (router?.query?.classificationType) {
            case 'NEW':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'CONFIRM':
                params.salesYn = 'y';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'COMPLETE':
                params.salesYn = 'y';
                params.releaseYn = 'y';
                params.holdYn = 'n';
                break;
            case 'HOLD':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'y';
                break;
        }

        const result = await apiHook.reqCountErpItems({ params, headers });

        if (result) {
            let totalSize = result?.content?.totalSize;
            let size = router?.query?.size || 50;

            if (totalSize <= 0) {
                erpItemActionsHook.totalSize.onSet(0);
                erpItemActionsHook.totalPages.onSet(1);
                return;
            }

            let totalPages = Math.ceil(totalSize / size);

            erpItemActionsHook.totalSize.onSet(totalSize);
            erpItemActionsHook.totalPages.onSet(totalPages);
        }
    }

    const handleReqFetchErpItemSlice = async () => {
        erpItemActionsHook.isLoading.onSet(true);

        const currClassification = CLASSIFICATIONS.find(r => r.classificationType === router?.query?.classificationType) || CLASSIFICATIONS[0];

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            periodSearchCondition: router?.query?.periodSearchCondition,
            startDateTime: router?.query?.startDateTime && customDateUtils.getStartDate(router?.query?.startDateTime),
            endDateTime: router?.query?.endDateTime && customDateUtils.getEndDate(router?.query?.endDateTime),
            mpSearchCondition: router?.query?.mpSearchCondition,
            mpSearchQuery: router?.query?.mpSearchQuery,
            oiSearchCondition: router?.query?.oiSearchCondition,
            oiSearchQuery: router?.query?.oiSearchQuery,
            riSearchCondition: router?.query?.riSearchCondition,
            riSearchQuery: router?.query?.riSearchQuery,
            diSearchCondition: router?.query?.diSearchCondition,
            diSearchQuery: router?.query?.diSearchQuery,
            mmSearchCondition: router?.query?.mmSearchCondition,
            mmSearchQuery: router?.query?.mmSearchQuery,
            page: router?.query?.page || 1,
            size: router?.query?.size || 50,
            sort: router?.query?.sort?.split(',') || 'releaseAt_asc',
            matchedCode: router?.query?.matchedCode || 'releaseOptionCode',
            stockReflectYn: router?.query?.stockReflectYn || null,
            sortTypes: router?.query?.sortTypes || customURIEncoderUtils.encodeJSONList(currClassification.defaultSortTypes),
        }

        switch (router?.query?.classificationType) {
            case 'NEW':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'CONFIRM':
                params.salesYn = 'y';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'COMPLETE':
                params.salesYn = 'y';
                params.releaseYn = 'y';
                params.holdYn = 'n';
                break;
            case 'HOLD':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'y';
                break;
        }

        const result = await apiHook.reqFetchErpItemSlice({ params, headers });

        if (result) {
            erpItemActionsHook.content.onSet(result?.content);
        }

        erpItemActionsHook.isLoading.onSet(false);
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
                        <FdViewOptions
                            isLoading={erpItemValueHook.isLoading}
                        />
                        <ErpItemListComponent
                            erpCollectionHeader={erpCollectionHeader}
                            inventoryStocks={inventoryStocks}
                            erpItemSameReceiverHints={erpItemSameReceiverHints}
                            productOptionPackageInfoList={productOptionPackageInfoList?.content || []}
                        />
                    </>
                </Layout>
            </Container>

            <FloatingPagenationComponent
                erpItemPage={erpItemValueHook.content}
                totalSize={erpItemValueHook.totalSize}
                totalPages={erpItemValueHook.totalPages}
            />

            <FloatingControlToggle
                erpCollectionHeader={erpCollectionHeader}
                inventoryStocks={inventoryStocks}

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
                onReqCountErpItems={handleReqCountErpItems}
            />
        </>
    );
}