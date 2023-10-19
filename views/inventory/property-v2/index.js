import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { FdSearchConsole } from "./components/FdSearchConsole/FdSearchConsole";
import { useApiHook } from "./hooks/useApiHook";
import { useProductCategoryHook } from "./hooks/useProductCategoryHook";
import { Container } from "./index.styled";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useProductSubCategoryHook } from "./hooks/useProductSubCategoryHook";
import { FdItemList } from "./components/FdItemList/FdItemList";
import { useInventoryAssetHook } from "./hooks/useInventoryAssetHook";
import { CustomDateUtils } from "../../../utils/CustomDateUtils";
import { CustomURIEncoderUtils } from "../../../utils/CustomURIEncoderUtils";
import { FdAmount } from "./components/FdAmount/FdAmount";
import { Alert } from "@mui/material";
import { FdGraph } from "./components/FdGraph/FdGraph";

const customDateUtils = CustomDateUtils();
const customURIEncoderUtils = CustomURIEncoderUtils();
const CURRENT_LOCAL_DATETIME = new Date();
const YESTERDAY_LOCAL_DATETIME = customDateUtils.setPlusDate(CURRENT_LOCAL_DATETIME, 0, 0, -1);
const LAST30DAY_LOCAL_DATETIME = customDateUtils.setPlusDate(CURRENT_LOCAL_DATETIME, 0, 0, -30);
const YESTERDAY_DATE = customDateUtils.dateToYYYYMMDD(YESTERDAY_LOCAL_DATETIME, '-');

/*
    TODO : 재고자산 추이 그래프 나타내기 작업.
*/
export default function Inventory_PropertyComponent() {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const selectedProductCategoryId = router?.query?.productCategoryId;
    const selectedProductSubCategoryId = router?.query?.productSubCategoryId;
    const page = router?.query?.page;
    const size = router?.query?.size;
    const searchFilter = router?.query?.searchFilter;
    const sortTypes = router?.query?.sortTypes;

    const apiHook = useApiHook();
    const productCategoryHook = useProductCategoryHook();
    const productSubCategoryHook = useProductSubCategoryHook();
    const inventoryAssetHook = useInventoryAssetHook();

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
            if (!wsId || !selectedProductCategoryId) {
                return;
            }

            await apiHook.reqFetchProductSubCategoryList({ params: { productCategoryId: selectedProductCategoryId }, headers: { wsId: wsId } }, (results) => {
                productSubCategoryHook.onSetProductSubCategoryList(results);
            })
        }

        fetchProductSubCategoryList();
    }, [wsId, selectedProductCategoryId]);

    // fetch inventoryAssetPage
    useEffect(() => {
        if (!wsId) {
            return;
        }

        const params = {
            recordDate: recordDate,
            productCategoryId: selectedProductCategoryId,
            productSubCategoryId: selectedProductSubCategoryId,
            page: page || 1,
            size: size || 50,
            sortTypes: sortTypes || customURIEncoderUtils.encodeJSONList(['REMAINED_ASSETS$DESC']),
            searchFilter: searchFilter,
        }

        apiHook.reqFetchInventoryAssetPage({ params: params, headers: { wsId: wsId } }, (results, response) => {
            inventoryAssetHook.onSetInventoryAssetPage(results);
        });
    }, [
        wsId,
        selectedProductCategoryId,
        selectedProductSubCategoryId,
        page,
        size,
        sortTypes,
        searchFilter,
    ]);

    // fetch inventoryAssetAmount
    useEffect(() => {

        async function fetchInitialize() {
            if (!wsId) {
                return;
            }

            const params = {
                startRecordDate: LAST30DAY_LOCAL_DATETIME,
                lastRecordDate: recordDate,
                productCategoryId: selectedProductCategoryId,
                productSubCategoryId: selectedProductSubCategoryId,
                searchFilter: searchFilter,
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

        fetchInitialize();

    }, [
        wsId,
        selectedProductCategoryId,
        selectedProductSubCategoryId,
        searchFilter,
    ]);

    const handleSelectProductCategory = (value) => {
        const productCategoryId = value?.id;

        let query = { ...router?.query, page: 1 }

        delete query?.productSubCategoryId

        if (!productCategoryId) {
            delete query?.productCategoryId
        } else {
            query.productCategoryId = productCategoryId
        }

        router.replace({
            pathname: router?.pathname,
            query: { ...query }
        }, undefined, { scroll: false });
    }

    const handleSelectProductSubCategory = (value) => {
        const productSubCategoryId = value?.id;

        let query = {
            ...router?.query,
            page: 1
        }

        if (!productSubCategoryId) {
            delete query?.productSubCategoryId
        } else {
            query.productSubCategoryId = productSubCategoryId
        }

        router.replace({
            pathname: router?.pathname,
            query: { ...query }
        }, undefined, { scroll: false });
    }

    const productCategory = productCategoryHook?.productCategoryList?.find(r => r.id === selectedProductCategoryId);
    const productSubCategory = productSubCategoryHook?.productSubCategoryList?.find(r => r.id === selectedProductSubCategoryId);
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
                        {inventoryAssetHook?.inventoryAssetAmountList &&
                            <FdGraph
                                yesterdayLocalDateTime={YESTERDAY_LOCAL_DATETIME}
                                last30dayLocalDateTime={LAST30DAY_LOCAL_DATETIME}
                                inventoryAssetAmountList={inventoryAssetHook?.inventoryAssetAmountList}
                            />
                        }
                        <FdSearchConsole
                            productCategoryList={productCategoryHook?.productCategoryList}
                            productSubCategoryList={productSubCategoryHook?.productSubCategoryList}
                            productCategory={productCategory}
                            productSubCategory={productSubCategory}
                            onSelectProductCategory={handleSelectProductCategory}
                            onSelectProductSubCategory={handleSelectProductSubCategory}
                        />
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