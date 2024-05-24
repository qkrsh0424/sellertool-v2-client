import Layout from "../layout/Layout";
import ErpItemListComponent from "./erp-item-list/ErpItemListV2.component";
import FloatingControlToggle from "./floating-control-toggle/FloatingControlToggle";
import FloatingPagenationComponent from "./floating-pagenation/FloatingPagenation.component";
import HeaderSettingComponent from "./header-setting/HeaderSetting.component";
import useErpCollectionHeaderHook from "./hooks/useErpCollectionHeaderHook";
import useErpItemPageHook from "./hooks/useErpItemPageHook";
import useErpItemSameReceiverHintsHook from "./hooks/useErpItemSameReceiverHintsHook";
import useInventoryStocksHook from "./hooks/useInventoryStocksHook";
import useWaybillRegistrationHook from "./hooks/useWaybillRegistrationHook";
import { Container } from "./index.styled";
import { useSellertoolDatas } from "../../../../hooks/sellertool-datas";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect, useState } from "react";
import { FdClassification } from "./components/FdClassification/FdClassification";
import FdConditionSearch from "./components/FdConditionSearch/FdConditionSearch";
import { ViewOptionsProvider } from "./contexts/ViewOptionsProvider";
import { FdViewOptions } from "./components/FdViewOptions/FdViewOptions";
import { ErpItemProvider, useErpItemValueHook } from "./contexts/ErpItemProvider";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { SelectedErpItemListProvider } from "./contexts/SelectedErpItemListProvider";
import { useErpItemFetcherHook } from "./hooks/useErpItemFetcherHook";

/* 
    TODO:
    1. 복사생성 신규 로직 적용 - 진행중 240522
    2. 운송장 일괄등록 신규 로직 적용
    3. 재고반영 신규로직 적용
    4. 재고반영 취소 신규로직 적용
    5. 선택 데이터 보기 신규로직 적용 - 완료 240513
    6. 상품리스트 신규 로직 적용
    7. 엑셀 다운로드 신규 로직 적용
    8. 주문건 필드에 주문 상태 뱃지 추가 [신규-그린,확정-오렌지,출고-블루,보류-그레이] - 완료 240513
*/
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
    const erpItemFetcherHook = useErpItemFetcherHook();

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
        erpItemFetcherHook.reqFetchErpItemSlice();
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

        erpItemFetcherHook.reqCountErpItems();
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

                onSubmitCopyCreateErpItems={reqCopyCreateErpItems}
                onSubmitStockRelease={handleSubmitStockRelease}
                onSubmitCancelStockRelease={handleSubmitCancelStockRelease}
                onSubmitDownloadSampleExcelForWaybillRegistration={handleSubmitDownloadSampleExcelForWaybillRegistration}
                onSubmitUploadWaybillForm={handleSubmitUploadWaybillForm}
            />
        </>
    );
}