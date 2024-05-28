import Layout from "../layout/Layout";
import ErpItemListComponent from "./erp-item-list/ErpItemListV3.component";
import FloatingControlToggle from "./floating-control-toggle/FloatingControlToggle";
import FloatingPagenationComponent from "./floating-pagenation/FloatingPagenation.component";
import HeaderSetting from "./header-setting/HeaderSetting";
import useErpCollectionHeaderHook from "./hooks/useErpCollectionHeaderHook";
import useErpItemSameReceiverHintsHook from "./hooks/useErpItemSameReceiverHintsHook";
import useInventoryStocksHook from "./hooks/useInventoryStocksHook";
import { Container } from "./index.styled";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect, useState } from "react";
import { FdClassification } from "./components/FdClassification/FdClassification";
import FdConditionSearch from "./components/FdConditionSearch/FdConditionSearch";
import { ViewOptionsProvider } from "./contexts/ViewOptionsProvider";
import { FdViewOptions } from "./components/FdViewOptions/FdViewOptions";
import { ErpItemProvider, useErpItemValueHook } from "./contexts/ErpItemProvider";
import { useRouter } from "next/router";
import { SelectedErpItemListProvider } from "./contexts/SelectedErpItemListProvider";
import { useErpItemFetcherHook } from "./hooks/useErpItemFetcherHook";
import { ErpCollectionHeaderProvider } from "./contexts/ErpCollectionHeaderProvider";
import { SellertoolDatasGlobalProvider, useSellertoolDatasValueHook } from "../../../../contexts/SellertoolDatasGlobalProvider";

/* 
    TODO:
    1. 복사생성 신규 로직 적용 - 완료 240524
    2. 운송장 일괄등록 신규 로직 적용 - 완료 240524
    3. 재고반영 신규로직 적용 - 완료 240527
    4. 재고반영 취소 신규로직 적용 - 완료 240527
    5. 선택 데이터 보기 신규로직 적용 - 완료 240513
    6. 상품리스트 신규 로직 적용
    7. 엑셀 다운로드 신규 로직 적용
    8. 주문건 필드에 주문 상태 뱃지 추가 [신규-그린,확정-오렌지,출고-블루,보류-그레이] - 완료 240513
    9. 데이터 삭제 신규 로직 적용 - 완료 240526
    10. 탭별로 뷰헤더 각각 설정 하도록 설정 - 완료 240528
    11. 탭 이동시 조회 조건 및 보기 옵션 초기화 시키기 - 완료 240528
    12. 선택 데이터 수정 신규 로직 적용
    13. 주문건 리스트 최적화 하기 - 완료 240528
    14. 동일 수취인 모달창 신규 로직 적용 - 진행중
*/
export default function MainComponent(props) {
    return (
        <SellertoolDatasGlobalProvider>
            <ErpItemProvider>
                <SelectedErpItemListProvider>
                    <ViewOptionsProvider>
                        <ErpCollectionHeaderProvider>
                            <MainComponentCore />
                        </ErpCollectionHeaderProvider>
                    </ViewOptionsProvider>
                </SelectedErpItemListProvider>
            </ErpItemProvider>
        </SellertoolDatasGlobalProvider>
    );
}

function MainComponentCore() {
    const router = useRouter();
    const sellertoolDatasValueHook = useSellertoolDatasValueHook();
    
    const apiHook = useApiHook();
    const erpItemFetcherHook = useErpItemFetcherHook();
    
    const erpItemValueHook = useErpItemValueHook();

    const {
        erpCollectionHeader
    } = useErpCollectionHeaderHook();

    const {
        inventoryStocks
    } = useInventoryStocksHook(erpItemValueHook?.content?.content);

    const {
        erpItemSameReceiverHints
    } = useErpItemSameReceiverHintsHook(erpItemValueHook?.content);

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
            !sellertoolDatasValueHook?.wsId
        ) {
            return;
        }
        erpItemFetcherHook.reqFetchErpItemSlice();
    }, [
        isRenderLoading,
        sellertoolDatasValueHook?.wsId,
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
            !sellertoolDatasValueHook?.wsId
        ) {
            return;
        }

        erpItemFetcherHook.reqCountErpItems();
    }, [
        isRenderLoading,
        sellertoolDatasValueHook?.wsId,
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
        if (!erpItemValueHook?.content?.content || !sellertoolDatasValueHook?.wsId) {
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
                wsId: sellertoolDatasValueHook?.wsId
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
    }, [erpItemValueHook?.content?.content, sellertoolDatasValueHook?.wsId]);

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
                        <HeaderSetting
                            erpCollectionHeader={erpCollectionHeader}
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
            />
        </>
    );
}