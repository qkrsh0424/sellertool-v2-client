import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useApiHook } from "./hooks/useApiHook";
import { useProductCategoryHook } from "./hooks/useProductCategoryHook";
import { Container } from "./index.styled";
import { useSelector } from "react-redux";
import { useProductSubCategoryHook } from "./hooks/useProductSubCategoryHook";
import { FdItemList } from "./components/FdItemList/FdItemList";
import { useInventoryAssetHook } from "./hooks/useInventoryAssetHook";
import { CustomDateUtils } from "../../../utils/CustomDateUtils";
import { FdAmount } from "./components/FdAmount/FdAmount";
import { Alert } from "@mui/material";
import { FdGraph } from "./components/FdGraph/FdGraph";
import { FdRecordDate } from "./components/FdRecordDate/FdRecordDate";
import { customBackdropController } from "../../../components/backdrop/default/v1";
import { SearchConsoleState } from "./components/SearchConsoleState";
import { useRouterSearchAggregationHook } from "./hooks/useRouterSearchAggregationHook";

const customDateUtils = CustomDateUtils();
const customBackdropControl = customBackdropController();

const CURRENT_LOCAL_DATETIME = new Date();
const YESTERDAY_LOCAL_DATETIME = customDateUtils.setPlusDate(CURRENT_LOCAL_DATETIME, 0, 0, -1);
const LAST30DAY_LOCAL_DATETIME = customDateUtils.setPlusDate(CURRENT_LOCAL_DATETIME, 0, 0, -30);
const YESTERDAY_DATE = customDateUtils.dateToYYYYMMDD(YESTERDAY_LOCAL_DATETIME, '-');

export default function Inventory_PropertyComponent() {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const productCategoryHook = useProductCategoryHook();
    const productSubCategoryHook = useProductSubCategoryHook();
    const inventoryAssetHook = useInventoryAssetHook();
    const routerSearchAggregationHook = useRouterSearchAggregationHook();

    const [recordDate, setRecordDate] = useState(YESTERDAY_DATE);

    // fetch productCategoryList
    useEffect(() => {
        async function fetchProductCategoryList() {
            if (!wsId) {
                return;
            }

            await apiHook.reqFetchProductCategoryList({ headers: { wsId: wsId } }, (results) => {
                productCategoryHook.onSetProductCategoryList(results);
            })
        }

        fetchProductCategoryList();
    }, [wsId]);

    // fetch productSubCategoryList
    useEffect(() => {
        async function fetchProductSubCategoryList() {
            if (!wsId || !routerSearchAggregationHook?.productCategoryId) {
                return;
            }

            await apiHook.reqFetchProductSubCategoryList({ params: { productCategoryId: routerSearchAggregationHook?.productCategoryId }, headers: { wsId: wsId } }, (results) => {
                productSubCategoryHook.onSetProductSubCategoryList(results);
            })
        }

        fetchProductSubCategoryList();
    }, [wsId, routerSearchAggregationHook?.productCategoryId]);

    // fetch inventoryAssetPage
    useEffect(() => {
        if (!wsId) {
            return;
        }

        handleReqFetchInventoryAssetPage();

    }, [
        wsId,
        routerSearchAggregationHook?.productCategoryId,
        routerSearchAggregationHook?.productSubCategoryId,
        routerSearchAggregationHook?.page,
        routerSearchAggregationHook?.size,
        routerSearchAggregationHook?.searchFilter,
        routerSearchAggregationHook?.sortTypes,
        recordDate
    ]);

    // fetch inventoryAssetAmount
    useEffect(() => {

        async function fetchInitialize() {
            if (!wsId) {
                return;
            }

            await handleReqFetchInventoryAssetAmountList();
        }

        fetchInitialize();

    }, [
        wsId,
        routerSearchAggregationHook?.productCategoryId,
        routerSearchAggregationHook?.productSubCategoryId,
        routerSearchAggregationHook?.searchFilter,
    ]);

    const handleReqFetchInventoryAssetPage = async () => {
        const params = {
            recordDate: recordDate,
            productCategoryId: routerSearchAggregationHook?.productCategoryId,
            productSubCategoryId: routerSearchAggregationHook?.productSubCategoryId,
            page: routerSearchAggregationHook?.page || 1,
            size: routerSearchAggregationHook?.size || 50,
            sortTypes: routerSearchAggregationHook?.sortTypes || routerSearchAggregationHook?.DEFAULT_SORT_TYPES,
            searchFilter: routerSearchAggregationHook?.searchFilter,
        }

        apiHook.reqFetchInventoryAssetPage({ params: params, headers: { wsId: wsId } }, (results, response) => {
            inventoryAssetHook.onSetInventoryAssetPage(results);
        });
    }

    const handleReqFetchInventoryAssetAmountList = async () => {
        const params = {
            startRecordDate: customDateUtils.dateToYYYYMMDD(LAST30DAY_LOCAL_DATETIME, '-'),
            lastRecordDate: customDateUtils.dateToYYYYMMDD(YESTERDAY_LOCAL_DATETIME, '-'),
            productCategoryId: routerSearchAggregationHook?.productCategoryId,
            productSubCategoryId: routerSearchAggregationHook?.productSubCategoryId,
            searchFilter: routerSearchAggregationHook?.searchFilter,
        }

        let inventoryAssetAmountList = null;
        let selectedInventoryAssetAmount = null;
        await apiHook.reqFetchInventoryAssetAmountList({ params: params, headers: { wsId: wsId } }, (results, response) => {
            inventoryAssetAmountList = results;
        });

        if (inventoryAssetAmountList) {
            selectedInventoryAssetAmount = inventoryAssetAmountList.find(r => r.recordDate === recordDate);
        }

        inventoryAssetHook.onSetInventoryAssetAmountList(inventoryAssetAmountList);
        inventoryAssetHook.onSetSelectedInventoryAssetAmount(selectedInventoryAssetAmount);
    }

    const handleReqSychronizeInventoryAssets = async () => {
        if (!wsId || !recordDate) {
            return;
        }
        customBackdropControl.showBackdrop();

        let headers = {
            wsId: wsId
        }

        let body = {
            recordDate: recordDate
        }

        await apiHook.reqSynchronizeInventoryAssets({ body, headers }, (results, response) => {
            if (results) {
                alert(`${recordDate} 의 재고자산 데이터를 동기화 했습니다.`);
                handleReqFetchInventoryAssetPage();
                handleReqFetchInventoryAssetAmountList();
            }
        })
        customBackdropControl.hideBackdrop();
    }

    const handleChangeRecordDate = (value) => {
        setRecordDate(value);
        let selectedInventoryAssetAmount = inventoryAssetHook?.inventoryAssetAmountList?.find(r => r.recordDate === value);
        inventoryAssetHook.onSetSelectedInventoryAssetAmount(selectedInventoryAssetAmount);
    }

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'통합 재고 관리'}
                    headerName={'재고자산'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <Alert>재고자산은 매일 09:00 AM 에 자동 업데이트 됩니다.</Alert>
                        <FdGraph
                            yesterdayLocalDateTime={YESTERDAY_LOCAL_DATETIME}
                            last30dayLocalDateTime={LAST30DAY_LOCAL_DATETIME}
                            inventoryAssetAmountList={inventoryAssetHook?.inventoryAssetAmountList}
                        />
                        <FdRecordDate
                            recordDate={recordDate}
                            yesterdayLocalDateTime={YESTERDAY_LOCAL_DATETIME}
                            last30dayLocalDateTime={LAST30DAY_LOCAL_DATETIME}
                            onChangeRecordDate={handleChangeRecordDate}
                            onReqSynchronizeInventoryAssets={handleReqSychronizeInventoryAssets}
                        />
                        <SearchConsoleState />
                        <FdAmount
                            inventoryAssetAmount={inventoryAssetHook?.selectedInventoryAssetAmount}
                        />
                        <FdItemList
                            inventoryAssetPage={inventoryAssetHook?.inventoryAssetPage}
                        />
                    </>
                </Layout>
            </Container>
        </>
    )
}