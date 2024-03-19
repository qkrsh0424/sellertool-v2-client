import { useEffect } from "react";
import { CustomDialog } from "../../dialog/v1/CustomDialog";
import { useDataSourceHook, useMrPurchaseModuleHook } from "./hooks";
import { St } from "./index.styled";
import { useDispatch, useSelector } from "react-redux";
import { customBackdropController } from "../../backdrop/default/v1";
import { FdCalculator, FdModuleList } from "./components";

const customBackdropControl = customBackdropController();

export function PurchaseCostCalculatorModal({
    open,
    selectedMrPurchaseModuleId,
    onClose = () => { },
    onExport = () => { }
}) {
    const reduxDispatch = useDispatch();
    const mrBaseExchangeRateRedux = useSelector(state => state?.mrBaseExchangeRateRedux);
    const mrPurchaseModuleRedux = useSelector(state => state?.mrPurchaseModuleRedux);
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();
    const mrPurchaseModuleHook = useMrPurchaseModuleHook();

    useEffect(() => {
        if (!wsId || mrBaseExchangeRateRedux?.mrBaseExchangeRateList) {
            return;
        }

        handleReqFetchMrBaseExchangeRateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wsId, mrBaseExchangeRateRedux?.mrBaseExchangeRateList]);

    useEffect(() => {
        if (!wsId || mrPurchaseModuleRedux?.mrPurchaseModuleList) {
            return;
        }

        handleReqFetchMrPurchaseModuleList();
    }, [wsId, mrPurchaseModuleRedux?.mrPurchaseModuleList]);

    useEffect(() => {
        if (!mrPurchaseModuleRedux?.mrPurchaseModuleList || !selectedMrPurchaseModuleId) {
            return;
        }
        mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(mrPurchaseModuleRedux?.mrPurchaseModuleList?.find(r => r.id === selectedMrPurchaseModuleId) || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mrPurchaseModuleRedux?.mrPurchaseModuleList, selectedMrPurchaseModuleId])

    const handleReqFetchMrPurchaseModuleList = () => {
        dataSourceHook.onReqFetchMrPurchaseModuleList({ headers: { wsId: wsId } }, (results) => {
            reduxDispatch({
                type: 'MR_PURCHASE_MODULE_CHANGE_DATA',
                payload: {
                    name: 'mrPurchaseModuleList',
                    value: results
                }
            })
        });
    }

    const handleReqFetchMrBaseExchangeRateList = () => {
        dataSourceHook.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results) => {
            reduxDispatch({
                type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                payload: {
                    name: 'mrBaseExchangeRateList',
                    value: results
                }
            })
        });
    }

    const handleSubmitSavePurchaseUnitPriceForm = async (form) => {
        let body = {
            id: mrPurchaseModuleHook.selectedMrPurchaseModule?.id,
            ...form
        }

        let headers = {
            wsId: wsId
        }

        let newMrPurchaseModuleList = null;
        let newSelectedMrPurchaseModule = null;

        customBackdropControl.showBackdrop();
        // UPDATE
        await dataSourceHook.onReqChangeMrPurchaseModulePurchaseDataForm({
            headers: headers,
            body: body,
        });

        // RE-FETCH List
        await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers: { wsId: wsId } }, (results2) => {
            newMrPurchaseModuleList = results2;
        });

        if (newMrPurchaseModuleList) {
            newSelectedMrPurchaseModule = newMrPurchaseModuleList?.find(r => r.id === mrPurchaseModuleHook?.selectedMrPurchaseModule?.id);

            reduxDispatch({
                type: 'MR_PURCHASE_MODULE_CHANGE_DATA',
                payload: {
                    name: 'mrPurchaseModuleList',
                    value: newMrPurchaseModuleList
                }
            })

        }

        if (newSelectedMrPurchaseModule) {
            mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(newSelectedMrPurchaseModule);
        }

        customBackdropControl.hideBackdrop();
    }

    const handleSubmitAddPurchaseModule = async (form) => {
        customBackdropControl.showBackdrop();
        let headers = {
            wsId: wsId
        }

        let body = {
            id: form?.id,
            name: form?.name
        }

        let createdMrPurchaseModuleId = null;
        let newMrPurchaseModuleList = null;
        let newSelectedMrPurchaseModule = null;

        // 생성
        await dataSourceHook.onReqCreateMrPurchaseModule({ headers, body }, (results, response) => {
            createdMrPurchaseModuleId = results?.id;
        });

        // 정상적으로 생성되었다면 모듈 리스트를 재조회 및 재설정
        if (createdMrPurchaseModuleId) {
            await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers }, (results, response) => {
                newMrPurchaseModuleList = results;
            });

            reduxDispatch({
                type: 'MR_PURCHASE_MODULE_CHANGE_DATA',
                payload: {
                    name: 'mrPurchaseModuleList',
                    value: newMrPurchaseModuleList
                }
            })
        }

        // 새로운 모듈 리스트에서 새로운 선택 모듈을 세팅
        if (createdMrPurchaseModuleId && newMrPurchaseModuleList) {
            newSelectedMrPurchaseModule = newMrPurchaseModuleList?.find(r => r.id === createdMrPurchaseModuleId);
            mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(newSelectedMrPurchaseModule);
        }
        customBackdropControl.hideBackdrop();

    }

    const handleSubmitEditMrPurchaseModuleName = async (form) => {
        customBackdropControl.showBackdrop();
        let headers = {
            wsId: wsId
        }

        let body = {
            ...form
            // id: form?.id,
            // name: form?.name
        }

        let editedMrPurchaseModuleId = null;
        let newMrPurchaseModuleList = null;
        let newSelectedMrPurchaseModule = null;

        // 수정
        await dataSourceHook.onReqChangeMrPurchaseModuleName({ headers, body }, (results, response) => {
            editedMrPurchaseModuleId = results?.id;
        });

        // 정상적으로 생성되었다면 모듈 리스트를 재조회 및 재설정
        if (editedMrPurchaseModuleId) {
            await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers }, (results, response) => {
                newMrPurchaseModuleList = results;
            });

            reduxDispatch({
                type: 'MR_PURCHASE_MODULE_CHANGE_DATA',
                payload: {
                    name: 'mrPurchaseModuleList',
                    value: newMrPurchaseModuleList
                }
            })
        }

        // 새로운 모듈 리스트에서 새로운 선택 모듈을 세팅
        if (editedMrPurchaseModuleId && newMrPurchaseModuleList) {
            newSelectedMrPurchaseModule = newMrPurchaseModuleList?.find(r => r.id === editedMrPurchaseModuleId);
            mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(newSelectedMrPurchaseModule);
        }
        customBackdropControl.hideBackdrop();
    }

    const handleSubmitDeleteMrPurchaseModuleOne = async (mrPurchaseModuleId) => {
        customBackdropControl.showBackdrop();
        let headers = {
            wsId: wsId
        }

        let body = {
            id: mrPurchaseModuleId
        }

        let returnedMrPurchaseModuleId = null;
        let newMrPurchaseModuleList = null;

        // 삭제 실행
        await dataSourceHook.onReqDeleteMrPurchaseModuleOne({ headers, body }, (results, response) => {
            returnedMrPurchaseModuleId = results;
        })

        // 정상적으로 생성되었다면 모듈 리스트를 재조회 및 재설정
        if (returnedMrPurchaseModuleId) {
            await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers }, (results, response) => {
                newMrPurchaseModuleList = results;
            });

            reduxDispatch({
                type: 'MR_PURCHASE_MODULE_CHANGE_DATA',
                payload: {
                    name: 'mrPurchaseModuleList',
                    value: newMrPurchaseModuleList
                }
            })
        }

        mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(null);

        customBackdropControl.hideBackdrop();
    }

    const handleSubmitExport = () => {
        customBackdropControl.showBackdrop();
        onExport(mrPurchaseModuleHook?.selectedMrPurchaseModule);
        customBackdropControl.hideBackdrop();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="xl"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <St.Container>
                    <St.ModuleListFieldWrapper>
                        <FdModuleList
                            mrPurchaseModuleList={mrPurchaseModuleRedux?.mrPurchaseModuleList}
                            selectedMrPurchaseModule={mrPurchaseModuleHook?.selectedMrPurchaseModule}
                            onSubmitAdd={handleSubmitAddPurchaseModule}
                            onSubmitEdit={handleSubmitEditMrPurchaseModuleName}
                            onSubmitDelete={handleSubmitDeleteMrPurchaseModuleOne}
                            onSetSelectedMrPurchaseModule={mrPurchaseModuleHook.onSetSelectedMrPurchaseModule}
                        />
                    </St.ModuleListFieldWrapper>
                    {!mrPurchaseModuleHook?.selectedMrPurchaseModule &&
                        <div style={{ flex: '1', textAlign: 'center', fontSize: '16px', fontWeight: '600' }}>
                            매입정보 모듈을 먼저 선택해 주세요.
                        </div>
                    }
                    {mrPurchaseModuleHook?.selectedMrPurchaseModule &&
                        <>
                            <FdCalculator
                                mrBaseExchangeRateList={mrBaseExchangeRateRedux?.mrBaseExchangeRateList}
                                selectedMrPurchaseModule={mrPurchaseModuleHook?.selectedMrPurchaseModule}
                                handleSubmitSavePurchaseUnitPriceForm={handleSubmitSavePurchaseUnitPriceForm}
                                onSubmitExport={handleSubmitExport}
                            />
                        </>
                    }
                </St.Container>
            </CustomDialog>
        </>
    );
}
