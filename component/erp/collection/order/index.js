import { useState } from "react";
import { useLocalStorageHook } from "../../../../hooks/local_storage/useLocalStorageHook";
import Layout from "../layout/Layout";
import ConditionFieldComponent from "./condition-field/ConditionField.component";
import ErpItemListComponent from "./erp-item-list/ErpItemList.component";
import FloatingControlBarComponent from "./erp-item-list/FloatingControlBar.component";
import FloatingPagenationComponent from "./floating-pagenation/FloatingPagenation.component";
import HeaderSettingComponent from "./header-setting/HeaderSetting.component";
import useErpCollectionHeaderHook from "./hooks/useErpCollectionHeaderHook";
import useErpItemPageHook from "./hooks/useErpItemPageHook";
import useInventoryStocksHook from "./hooks/useInventoryStocksHook";
import useSelectedErpItemsHook from "./hooks/useSelectedErpItemsHook";
import { Container } from "./index.styled";
import SortFieldComponent from "./sort-field/SortField.component";

export default function MainComponent(props) {
    const [selectedErpCollectionHeaderIds, setSelectedErpCollectionHeaderIds] = useLocalStorageHook('erp_collection_headers', { orderHeaderId: null, salesHeaderId: null, releaseCompleteHeaderId: null });

    const {
        erpCollectionHeader
    } = useErpCollectionHeaderHook(selectedErpCollectionHeaderIds?.orderHeaderId);

    const {
        erpItemPage,
        erpItemPagePending,
        totalSize,
        totalPages,
        reqChangeOptionCode,
        reqChangeReleaseOptionCode,
        reqUpdateErpItems,
        reqDeleteErpItems,
        reqChangeStatusToSales
    } = useErpItemPageHook();

    const {
        inventoryStocks
    } = useInventoryStocksHook(erpItemPage?.content);

    const {
        selectedErpItems,
        onSelectErpItem,
        onSelectAllErpItems,
        onSelectClearAllErpItemsInPage,
        onSelectClearAllErpItems,
        onSelectClearErpItem,
        reqFetchSelectedErpItems,
    } = useSelectedErpItemsHook();


    const handleSelectOrderHeaderId = (erpCollectionHeaderId) => {
        setSelectedErpCollectionHeaderIds({
            ...selectedErpCollectionHeaderIds,
            orderHeaderId: erpCollectionHeaderId
        })
    }

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'발주관리'}
                    headerName={'주문관리'}
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
                <FloatingControlBarComponent
                    selectedErpItems={selectedErpItems}
                    onSelectClearAllErpItems={onSelectClearAllErpItems}
                    onSelectClearErpItem={onSelectClearErpItem}
                    reqUpdateErpItems={reqUpdateErpItems}
                    reqFetchSelectedErpItems={reqFetchSelectedErpItems}
                    reqDeleteErpItems={reqDeleteErpItems}
                    reqChangeStatusToSales={reqChangeStatusToSales}
                />
            }
        </>
    );
}