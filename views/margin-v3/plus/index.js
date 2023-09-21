import { useEffect, useState } from "react";
import Layout from "../layout";
import { FdCalculator, FdMarginRecordList, FdResultMber } from "./components";
import { St } from "./index.styled";
import { useDispatch, useSelector } from "react-redux";
import { useDataSourceHook, useMarginRecordHook } from "./hooks";
import { customBackdropController } from "../../../components/backdrop/default/v1";
import { CustomNumberUtils } from "../../../utils/CustomNumberUtils";

const customBackdropControl = customBackdropController();
const customNumberUtils = CustomNumberUtils();

export default function MainComponent(props) {
    const reduxDispatch = useDispatch();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const mrBaseExchangeRateRedux = useSelector(state => state?.mrBaseExchangeRateRedux);
    const mrPurchaseModuleRedux = useSelector(state => state?.mrPurchaseModuleRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();
    const marginRecordHook = useMarginRecordHook();

    const [resultMberId, setResultMberId] = useState("75a58be7-37f9-11ee-8d3c-06fe28321f8c");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function initialize() {
            handleReqFetchMrBaseExchangeRateList();
            handleReqFetchMrPurchaseModuleList();
            handleReqFetchMarginRecordList();
        }

        initialize();

        return () => {
            reduxDispatch({
                type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                payload: {
                    name: 'mrBaseExchangeRateList',
                    value: null
                }
            });
            reduxDispatch({
                type: 'MR_PURCHASE_MODULE_CHANGE_DATA',
                payload: {
                    name: 'mrPurchaseModuleList',
                    value: null
                }
            })
        }
    }, [wsId]);

    const handleReqFetchMarginRecordList = async (e) => {
        if (e) {
            e.preventDefault();
        }

        await dataSourceHook.onReqFetchMarginRecordList(
            {
                headers: { wsId: wsId },
                params: {
                    sort: ['createdAt_asc'],
                    searchQuery: searchQuery || ''
                }
            },
            (results) => {
                marginRecordHook.onSetMarginRecordList(results);
            })
    }

    const handleReqFetchMrBaseExchangeRateList = async () => {
        await dataSourceHook.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results) => {
            reduxDispatch({
                type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                payload: {
                    name: 'mrBaseExchangeRateList',
                    value: results
                }
            })
        })
    }

    const handleReqFetchMrPurchaseModuleList = async () => {
        await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers: { wsId: wsId } }, (results) => {
            reduxDispatch({
                type: 'MR_PURCHASE_MODULE_CHANGE_DATA',
                payload: {
                    name: 'mrPurchaseModuleList',
                    value: results
                }
            })
        })
    }

    const handleReqCreateMarginRecord = async (body, callbackFn) => {
        let createdMarginRecordId = null;
        let newMarginRecordList = null;

        customBackdropControl.showBackdrop();
        await dataSourceHook.onReqCreateMarginRecord({ headers: { wsId, wsId }, body: body }, (results) => {
            createdMarginRecordId = results?.id;
        });


        if (createdMarginRecordId) {
            callbackFn();
            await dataSourceHook.onReqFetchMarginRecordList({ headers: { wsId: wsId } }, (results) => {
                newMarginRecordList = results;
            })
        }

        if (newMarginRecordList) {
            let newSelectedMarginRecord = newMarginRecordList?.find(r => r?.id === createdMarginRecordId);
            marginRecordHook.onSetMarginRecordList(newMarginRecordList);
            marginRecordHook.onSetSelectedMarginRecord(newSelectedMarginRecord);
        }
        customBackdropControl.hideBackdrop();
    }

    const handleSelectMarginRecord = (value) => {
        if (marginRecordHook?.selectedMarginRecord?.id === value?.id) {
            marginRecordHook.onSetSelectedMarginRecord(null);
            return;
        }
        marginRecordHook.onSetSelectedMarginRecord(value);
    }

    const handleReqUpdate = async (form) => {
        let headers = { wsId: wsId };
        let body = { ...form };

        customBackdropControl.showBackdrop();
        let updatedMarginRecordId = null;

        await dataSourceHook.onReqUpdateMarginRecord({ headers: headers, body: body }, (results, respones) => {
            updatedMarginRecordId = results?.id;
        });

        if (updatedMarginRecordId) {
            handleReqFetchMarginRecordList();
        }
        customBackdropControl.hideBackdrop();
    }

    const handleReqDelete = async (form) => {
        let headers = { wsId: wsId };
        let body = { id: marginRecordHook?.selectedMarginRecord?.id };
        customBackdropControl.showBackdrop();
        let deletedMarginRecordId = null;

        await dataSourceHook.onReqDeleteMarginRecord({ headers: headers, body: body }, (results, respones) => {
            deletedMarginRecordId = results;
        });

        if (deletedMarginRecordId) {
            marginRecordHook.onSetSelectedMarginRecord(null);
            handleReqFetchMarginRecordList();
        }
        customBackdropControl.hideBackdrop();
    }

    const handleChangeResultMberId = (id) => {
        setResultMberId(id);
    }

    const handleChangeSearchQueryFromEvent = (e) => {
        const value = e.target.value;

        setSearchQuery(value);
    }

    const resultMrBaseExchangeRate = mrBaseExchangeRateRedux?.mrBaseExchangeRateList?.find(r => r?.id === resultMberId);
    const resultMrBaseExchangeRateValue = customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateRedux?.mrBaseExchangeRateList, resultMberId);

    return (
        <>
            <Layout>
                <St.Container>
                    <St.Title>
                        <div className='title'>마진율 계산기</div>
                        <div className='tagBadge'>플러스+</div>
                    </St.Title>
                    <FdResultMber
                        selectedMrBaseExchangeRate={resultMrBaseExchangeRate}
                        selectedMrBaseExchangeRateValue={resultMrBaseExchangeRateValue}
                        onSelectResultMberId={handleChangeResultMberId}
                    />
                    <St.BodyWrapper>
                        <div className='marginRecordList-wrapper'>
                            <FdMarginRecordList
                                marginRecordList={marginRecordHook?.marginRecordList}
                                selectedMarginRecord={marginRecordHook?.selectedMarginRecord}
                                mrBaseExchangeRateList={mrBaseExchangeRateRedux?.mrBaseExchangeRateList}
                                mrPurchaseModuleList={mrPurchaseModuleRedux?.mrPurchaseModuleList}
                                selectResultMber={resultMrBaseExchangeRate}
                                selectResultMberValue={resultMrBaseExchangeRateValue}
                                searchQuery={searchQuery}

                                onReqFetchMarginRecordList={handleReqFetchMarginRecordList}
                                onChangeSearchQueryFromEvent={handleChangeSearchQueryFromEvent}
                                onSelectMarginRecord={handleSelectMarginRecord}
                                onReqCreateMarginRecord={handleReqCreateMarginRecord}
                            />
                        </div>
                        <div className='calculator-wrapper'>
                            {marginRecordHook?.selectedMarginRecord ?
                                <FdCalculator
                                    mrBaseExchangeRateList={mrBaseExchangeRateRedux?.mrBaseExchangeRateList}
                                    mrPurchaseModuleList={mrPurchaseModuleRedux?.mrPurchaseModuleList}
                                    selectedMarginRecord={marginRecordHook?.selectedMarginRecord}
                                    selectResultMber={resultMrBaseExchangeRate}
                                    selectResultMberValue={resultMrBaseExchangeRateValue}
                                    onReqSave={handleReqUpdate}
                                    onReqDelete={handleReqDelete}
                                />
                                :
                                <div className="emptyField">상품을 선택해 주세요.</div>
                            }
                        </div>
                    </St.BodyWrapper>
                </St.Container>
            </Layout>
        </>
    );
}