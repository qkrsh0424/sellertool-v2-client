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
import { Container } from "./index.styled";
import SortFieldComponent from "./sort-field/SortField.component";
import { useSellertoolDatas } from "../../../../hooks/sellertool-datas";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect, useState } from "react";
import FdConditionSearch from "../fragments/FdConditionSearch/FdConditionSearch";

export default function MainComponent(props) {
    const sellertoolDatas = useSellertoolDatas();
    const erpcHoldHeaderId = sellertoolDatas?.holdHeaderIdForErpc;

    const apiHook = useApiHook();

    const {
        erpCollectionHeader
    } = useErpCollectionHeaderHook(erpcHoldHeaderId);

    const {
        erpItemPage,
        erpItemPagePending,
        totalSize,
        totalPages,

        reqChangeOptionCode,
        reqChangeReleaseOptionCode,
        reqUpdateErpItems,
        reqDeleteErpItems,
        reqChangeStatusHoldToOrder,
        reqCopyCreateErpItems
    } = useErpItemPageHook();

    const {
        inventoryStocks
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

    const [productOptionPackageInfoList, setProductOptionPackageInfoList] = useState({
        content: null,
        isLoading: true
    });

    useEffect(() => {
        if (!erpItemPage?.content || !sellertoolDatas?.wsId) {
            return;
        }

        async function fetchProductOptionPackageList() {
            const productOptionIds = Array.from(new Set(erpItemPage?.content?.filter(r => r.packageYn === 'y').map(r => r.productOptionId)));

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
    }, [erpItemPage?.content, sellertoolDatas?.wsId]);

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'통합 발주 관리'}
                    headerName={'보류 데이터'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <HeaderSettingComponent
                            erpCollectionHeader={erpCollectionHeader}
                            favoriteViewHeaderIdsForErpc={sellertoolDatas?.favoriteViewHeaderIdsForErpc}
                            onActionSelectHeaderId={(headerId) => sellertoolDatas?._onSetHoldHeaderIdForErpc(headerId)}
                        />
                        <FdConditionSearch
                            exposurePeriodTypes={['', 'createdAt', 'channelOrderDate', 'holdAt']}
                            defaultPeriodType='holdAt'
                        />
                        <SortFieldComponent />
                        <ErpItemListComponent
                            erpCollectionHeader={erpCollectionHeader}
                            erpItemPage={erpItemPage}
                            selectedErpItems={selectedErpItems}
                            inventoryStocks={inventoryStocks}
                            erpItemSameReceiverHints={erpItemSameReceiverHints}
                            productOptionPackageInfoList={productOptionPackageInfoList?.content || []}

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
                    onSubmitChangeStatusHoldToOrder={reqChangeStatusHoldToOrder}
                    onSubmitCopyCreateErpItems={reqCopyCreateErpItems}
                />
            }
        </>
    );
}