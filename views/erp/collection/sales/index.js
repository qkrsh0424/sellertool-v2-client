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
import { Container, ViewOptionsContainer } from "./index.styled";
import SortFieldComponent from "./sort-field/SortField.component";
import { useSellertoolDatas } from "../../../../hooks/sellertool-datas";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect, useState } from "react";
import FdConditionSearch from "../fragments/FdConditionSearch/FdConditionSearch";
import { FdSortTypes } from "../fragments/FdSortTypes/FdSortTypes";
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";

export default function MainComponent(props) {
    const sellertoolDatas = useSellertoolDatas();
    const erpcSalesHeaderId = sellertoolDatas?.salesHeaderIdForErpc;

    const apiHook = useApiHook();

    const {
        erpCollectionHeader
    } = useErpCollectionHeaderHook(erpcSalesHeaderId);

    const {
        erpItemPage,
        erpItemPagePending,
        totalSize,
        totalPages,

        reqChangeOptionCode,
        reqChangeReleaseOptionCode,
        reqUpdateErpItems,
        reqDeleteErpItems,
        reqChangeStatusToSales,
        reqChangeStatusToRelease,
        reqChangeStatusToOrder,
        reqChangeStatusToHold,
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

    const [viewOptions, setViewOptions] = useState({
        stockOptionType: 'ALL',
        receiverOptionType: 'ALL'
    })

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

    const handleChangeViewOptions = (type, value) => {
        switch (type) {
            case 'stockOption':
                setViewOptions(prev => {
                    return { ...prev, stockOptionType: value }
                })
                break;
            case 'receiverOption':
                setViewOptions(prev => {
                    return { ...prev, receiverOptionType: value }
                })
                break;
        }
    }

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'통합 발주 관리'}
                    headerName={'주문확정'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <HeaderSettingComponent
                            erpCollectionHeader={erpCollectionHeader}
                            favoriteViewHeaderIdsForErpc={sellertoolDatas?.favoriteViewHeaderIdsForErpc}
                            onActionSelectOrderHeaderId={(headerId) => sellertoolDatas._onSetSalesHeaderIdForErpc(headerId)}
                        />
                        <FdConditionSearch
                            exposurePeriodTypes={['', 'createdAt', 'channelOrderDate', 'salesAt']}
                            defaultPeriodType='salesAt'
                        />
                        <FdSortTypes
                            isLoading={erpItemPagePending}
                        />
                        <ViewOptionsContainer>
                            <div className='wrapper'>
                                <h3 className='title'>보기옵션</h3>
                                <div className='gridWrapper'>
                                    <section className='mgl-flex mgl-flex-alignItems-center mgl-flex-gap-10'>
                                        <label>재고:</label>
                                        <div className='mgl-flex'>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleChangeViewOptions('stockOption', 'ALL')}
                                                className={`${viewOptions?.stockOptionType === 'ALL' ? 'active' : ''}`}
                                            >
                                                전체
                                            </CustomBlockButton>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleChangeViewOptions('stockOption', 'EXIST')}
                                                className={`${viewOptions?.stockOptionType === 'EXIST' ? 'active' : ''}`}
                                            >
                                                있음
                                            </CustomBlockButton>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleChangeViewOptions('stockOption', 'NOT_EXIST')}
                                                className={`${viewOptions?.stockOptionType === 'NOT_EXIST' ? 'active' : ''}`}
                                            >
                                                없음
                                            </CustomBlockButton>
                                        </div>
                                    </section>
                                    <section className='mgl-flex mgl-flex-alignItems-center mgl-flex-gap-10'>
                                        <label>수취인:</label>
                                        <div className='mgl-flex'>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleChangeViewOptions('receiverOption', 'ALL')}
                                                className={`${viewOptions?.receiverOptionType === 'ALL' ? 'active' : ''}`}
                                            >
                                                전체
                                            </CustomBlockButton>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleChangeViewOptions('receiverOption', 'SINGLE')}
                                                className={`${viewOptions?.receiverOptionType === 'SINGLE' ? 'active' : ''}`}
                                            >
                                                단일주문
                                            </CustomBlockButton>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleChangeViewOptions('receiverOption', 'MULTI')}
                                                className={`${viewOptions?.receiverOptionType === 'MULTI' ? 'active' : ''}`}
                                            >
                                                복수주문
                                            </CustomBlockButton>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </ViewOptionsContainer>
                        <ErpItemListComponent
                            erpCollectionHeader={erpCollectionHeader}
                            erpItemPage={erpItemPage}
                            selectedErpItems={selectedErpItems}
                            inventoryStocks={inventoryStocks}
                            erpItemSameReceiverHints={erpItemSameReceiverHints}
                            productOptionPackageInfoList={productOptionPackageInfoList?.content || []}
                            viewOptions={viewOptions}

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
                    onSubmitChangeStatusToRelease={reqChangeStatusToRelease}
                    onSubmitChangeStatusToOrder={reqChangeStatusToOrder}
                    onSubmitChangeStatusToHold={reqChangeStatusToHold}
                    onSubmitCopyCreateErpItems={reqCopyCreateErpItems}
                />
            }
        </>
    );
}