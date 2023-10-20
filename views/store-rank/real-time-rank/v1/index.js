import Layout from "../../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, OperatorComponent, RecordItemListComponent } from "./components";
import useSearchInputHook from "./hooks/useSearchInputHook";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { useSelector } from "react-redux";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect } from "react";
import { setPlusTime } from "./utils/dateFormatUtils";
import { getRecordPendingStatusExceedSeconds } from "../../../../static-data/nRankRecordOptions";
import useSubscriptionPlanSearchInfoHook from "./hooks/useSubscriptionPlanSearchInfoHook";
import useNRankRecordCategoriesHook from "./hooks/useNRankRecordCategoriesHook";
import { useRouter } from "next/router";
import FloatingPagenationComponent from "./components/floating-pagenation/FloatingPagenation.component";
import useItemCountHook from "./hooks/useItemCountHook";

const DEFAULT_SORT_COLUMN = 'created_at';
const DEFAULT_SORT_DIRECTION = 'desc';
const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 20;

const RECORD_STATUS_ENUM = {
    NONE: 'NONE',
    PENDING: 'PENDING',
    COMPLETE: 'COMPLETE',
    FAIL: 'FAIL'
}
    
export const Container = styled.div`
    background: var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){
    const router = useRouter()
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const {
        onReqSearchSubscriptionPlanSearchInfo,
        onReqCreateSearchInput,
        onReqDeleteNRankRecord,
        onReqSearchNRankRecordList,
        onReqSearchNRankRecordListCount,
        onReqChangeNRankRecordListStatusToFail,
        onReqSearchNRankRecordCategories
    } = useApiHook();

    const { rankSearchInfo, onSetRankSearchInfo } = useSubscriptionPlanSearchInfoHook();
    const { keyword, mallName, onChangeKeyword, onChangeMallName, onClearKeyword, onClearMallName, checkSearchInfoForm } = useSearchInputHook();
    const { recordList, recordListPage, currentPendingRecordIds, onSetRecordList, onSetRecordListPage, onSetCurrentPendingRecordIds } = useNRankRecordListHook();
    const { categories, onSetCategories } = useNRankRecordCategoriesHook();
    const { totalSize, totalPages, onSetTotalSize, onSetTotalPages } = useItemCountHook();

    useEffect(() => {
        if(!wsId) {
            return;
        }

        handleReqSearchNRankRecordList();
        handleReqSearchNRankRecordListCount();
    }, [wsId, router?.query])

    useEffect(() => {
        if(!wsId) {
            return;
        }

        async function initialize() {
            handleReqSearchSubscriptionPlanSearchInfo();
            handleReqSearchNRankRecordCategories();
        }

        initialize();
    }, [wsId])

    useEffect(() => {
        if(!(currentPendingRecordIds?.length > 0)) {
            return;
        }

        // poling 방식 nrank record 조회 요청
        const fetch = setInterval(() => {
            handleReqSearchNRankRecordList();
            handleReqSearchNRankRecordListCount();
        }, [3000])

        return () => clearInterval(fetch);
    }, [currentPendingRecordIds])

    const handleReqCreateRecordInput = async (e) => {
        e.preventDefault();

        try {
            if(recordList?.find(r => r.keyword === keyword && r.mall_name === mallName)) {
                throw Error("동일한 검색 항목이 존재합니다")
            }

            checkSearchInfoForm();
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            });
            return;
        }
        
        await onReqCreateSearchInput({
            body: {
                keyword: keyword?.trim(),
                mall_name: mallName?.trim()
            },
            headers: { wsId: wsId }
        },{
            success: () => {
                onClearKeyword();
                onClearMallName();
                handleReqSearchNRankRecordList();
                handleReqSearchNRankRecordListCount();
            }
        })
    }

    const handleReqDeleteRankRecord = async (selectedId, modalClose) => {
        await onReqDeleteNRankRecord({
            params: { id: selectedId },
            headers: { wsId: wsId }
        },{
            success: () => {
                let content = `정상적으로 제거되었습니다.`
                customToast.success(content, {
                    ...defaultOptions,
                    toastId: content
                });
                modalClose();
                handleReqSearchNRankRecordList();
                handleReqSearchNRankRecordListCount();
            }
        })
    }

    const handleReqChangeNRankRecordListStatusToFail = async (ids) => {
        await onReqChangeNRankRecordListStatusToFail({
            body: {record_ids: ids},
            headers: { wsId: wsId }
        }, {
            success: () => {
                handleReqSearchSubscriptionPlanSearchInfo()
            }
        });
    }

    const handleReqSearchSubscriptionPlanSearchInfo = async () => {
        await onReqSearchSubscriptionPlanSearchInfo({
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                onSetRankSearchInfo(results);
            }
        })
    }

    const handleReqSearchNRankRecordList = async () => {
        const params = {
            search_condition: router?.query?.searchCondition,
            search_query: router?.query?.searchQuery,
            search_category_id: router?.query?.searchCategoryId,
            search_status: router?.query?.searchStatus,

            sort_column: router?.query?.sortColumn || DEFAULT_SORT_COLUMN,
            sort_direction: router?.query?.sortDirection || DEFAULT_SORT_DIRECTION,
            page: router?.query?.page || DEFAULT_PAGE,
            size: router?.query?.size || DEFAULT_SIZE
        }

        await onReqSearchNRankRecordList({
            headers: { wsId: wsId },
            params
        }, {
            success: (results) => {
                let contents = results?.content;

                onSetRecordListPage(results);
                onSetRecordList(contents);

                handleUpdateRecordStatus(contents);
                handleChangeLongPendingRecordStatusToFail(contents);
            }
        })
    }

    const handleReqSearchNRankRecordListCount = async () => {
        let size = router?.query?.size || DEFAULT_SIZE;

        const params = {
            search_condition: router?.query?.searchCondition,
            search_query: router?.query?.searchQuery,
            search_category_id: router?.query?.searchCategoryId,
            search_status: router?.query?.searchStatus,

            sort_column: router?.query?.sortColumn || DEFAULT_SORT_COLUMN,
            sort_direction: router?.query?.sortDirection || DEFAULT_SORT_DIRECTION,
            page: router?.query?.page || DEFAULT_PAGE,
            size
        }

        await onReqSearchNRankRecordListCount({
            headers: { wsId: wsId },
            params
        }, {
            success: (results) => {
                let resTotalSize = results.total_size;
                if (resTotalSize <= 0) {
                    onSetTotalSize(0);
                    onSetTotalPages(1);
                    return;
                }

                let totalPages = Math.ceil(resTotalSize / size);
                onSetTotalSize(resTotalSize);
                onSetTotalPages(totalPages);
            }
        })
    }

    const handleUpdateRecordStatus = (results) => {
        let recordIds = [];

        results.forEach(r => {
            if (r.status === RECORD_STATUS_ENUM.PENDING) {
                recordIds.push(r.id);
            }

            // pending -> complete / fail 로 update된 경우
            if (currentPendingRecordIds?.includes(r.id)) {
                switch (r.status) {
                    case (RECORD_STATUS_ENUM.COMPLETE):
                        var content = `[${r.keyword} - ${r.mall_name}] 랭킹 업데이트 완료 !`
                        customToast.success(content, {
                            ...defaultOptions,
                            toastId: content
                        });
                        break;
                    case (RECORD_STATUS_ENUM.FAIL):
                        var content = `[${r.keyword} - ${r.mall_name}] 랭킹 검색 실패. 재시도 해주세요.`
                        customToast.error(content, {
                            ...defaultOptions,
                            toastId: content
                        });
                        break;
                    default:
                        break;
                }
            }
        })

        onSetCurrentPendingRecordIds([...recordIds]);
    }

    const handleChangeLongPendingRecordStatusToFail = (results) => {
        let recordIds = []
        let currentDate = new Date()

        results.forEach(r => {
            if(r.status === RECORD_STATUS_ENUM.PENDING && r.status_updated_at) {
                let exceedTargetTime = setPlusTime(r.status_updated_at, 0, 0, getRecordPendingStatusExceedSeconds());
                if(currentDate > exceedTargetTime) {
                    recordIds.push(r.id)
                }
            }
        });

        if(recordIds.length > 0) {
            handleReqChangeNRankRecordListStatusToFail(recordIds);
        }
    }

    const handleReqSearchNRankRecordCategories = async () => {
        await onReqSearchNRankRecordCategories({
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                onSetCategories(results);
            }
        })
    }

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'스토어 랭킹'}
                    headerName={'실시간 랭킹'}
                    sidebarColor={'#ffffff'}
                >
                    <InputFieldComponent
                        keyword={keyword}
                        mallName={mallName}
                        onChangeKeyword={onChangeKeyword}
                        onChangeMallName={onChangeMallName}
                        onSubmitRecordInput={handleReqCreateRecordInput}
                    />

                    <OperatorComponent
                        categories={categories}
                        recordList={recordList}
                        rankSearchInfo={rankSearchInfo}
                        onSearchNRankRecordCategories={handleReqSearchNRankRecordCategories}
                    />
                    
                    <RecordItemListComponent
                        keyword={keyword}
                        mallName={mallName}
                        recordList={recordList}
                        rankSearchInfo={rankSearchInfo}
                        currentPendingRecordIds={currentPendingRecordIds}
                        categories={categories}
                        onDeleteRankRecord={handleReqDeleteRankRecord}
                        onSetCurrentPendingRecordIds={onSetCurrentPendingRecordIds}
                        onSearchSubscriptionPlanSearchInfo={handleReqSearchSubscriptionPlanSearchInfo}
                        onSearchNRankRecordList={handleReqSearchNRankRecordList}
                        onSearchNRankRecordListCount={handleReqSearchNRankRecordListCount}
                        onSearchNRankRecordCategories={handleReqSearchNRankRecordCategories}
                    />
                </Layout>
            </Container>

            <FloatingPagenationComponent
                itemPage={recordListPage}
                totalSize={totalSize}
                totalPages={totalPages}
            />
        </>
    );
}