import { useEffect } from "react";
import { CustomDialog } from "../../dialog/v1/CustomDialog";
import { useDataSourceHook, useMrPurchaseModuleHook } from "./hooks";
import { St } from "./index.styled";
import { useSelector } from "react-redux";
import { customBackdropController } from "../../backdrop/default/v1";
import { FdModuleList, FdPurchaseUnitPriceCalculator } from "./components";
import { useMrBaseExchangeRateHook } from "./hooks";

const customBackdropControl = customBackdropController();

export function PurchaseCostCalculatorModal({
    open,
    onClose = () => { }
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();
    const mrPurchaseModuleHook = useMrPurchaseModuleHook();
    const mrBaseExchangeRateHook = useMrBaseExchangeRateHook();

    useEffect(() => {
        if (!wsId) {
            return;
        }

        dataSourceHook.onReqFetchMrPurchaseModuleList({ headers: { wsId: wsId } }, (results) => {
            mrPurchaseModuleHook.onSetMrPurchaseModuleList(results);
        });
        dataSourceHook.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results) => {
            mrBaseExchangeRateHook.onSetMrBaseExchangeRateList(results);
        })
    }, [wsId]);

    const handleReqFetchMrBaseExchangeRateList = () => {
        dataSourceHook.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results) => {
            mrBaseExchangeRateHook.onSetMrBaseExchangeRateList(results);
        })
    }

    const handleSubmitSavePurchaseUnitPriceForm = async (form) => {
        let body = {
            ...mrPurchaseModuleHook.selectedMrPurchaseModule,
            ...form
        }

        let headers = {
            wsId: wsId
        }

        let newMrPurchaseModuleList = null;
        let newSelectedMrPurchaseModule = null;

        customBackdropControl.showBackdrop();
        // UPDATE
        await dataSourceHook.onReqChangeMrPurchaseModulePurchaseUnitPriceForm({
            headers: headers,
            body: body,
        });

        // RE-FETCH List
        await dataSourceHook.onReqFetchMrPurchaseModuleList({ headers: { wsId: wsId } }, (results2) => {
            newMrPurchaseModuleList = results2;
        });

        if (newMrPurchaseModuleList) {
            newSelectedMrPurchaseModule = newMrPurchaseModuleList?.find(r => r.id === mrPurchaseModuleHook?.selectedMrPurchaseModule?.id);
            mrPurchaseModuleHook.onSetMrPurchaseModuleList(newMrPurchaseModuleList);
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

            mrPurchaseModuleHook.onSetMrPurchaseModuleList(newMrPurchaseModuleList);
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

            mrPurchaseModuleHook.onSetMrPurchaseModuleList(newMrPurchaseModuleList);
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

            mrPurchaseModuleHook.onSetMrPurchaseModuleList(newMrPurchaseModuleList);
        }

        mrPurchaseModuleHook.onSetSelectedMrPurchaseModule(null);

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
                            mrPurchaseModuleList={mrPurchaseModuleHook?.mrPurchaseModuleList}
                            selectedMrPurchaseModule={mrPurchaseModuleHook?.selectedMrPurchaseModule}
                            onSubmitAdd={handleSubmitAddPurchaseModule}
                            onSubmitEdit={handleSubmitEditMrPurchaseModuleName}
                            onSubmitDelete={handleSubmitDeleteMrPurchaseModuleOne}
                            onSetSelectedMrPurchaseModule={mrPurchaseModuleHook.onSetSelectedMrPurchaseModule}
                        />
                    </St.ModuleListFieldWrapper>
                    {!mrPurchaseModuleHook?.selectedMrPurchaseModule &&
                        <div style={{ flex: '1' }}>

                        </div>
                    }
                    {mrPurchaseModuleHook?.selectedMrPurchaseModule &&
                        <>
                            <St.InputFieldWrapper>
                                <FdPurchaseUnitPriceCalculator
                                    baseExchangeRateList={mrBaseExchangeRateHook?.mrBaseExchangeRateList}
                                    selectedMrPurchaseModule={mrPurchaseModuleHook?.selectedMrPurchaseModule}
                                    handleSubmitSavePurchaseUnitPriceForm={handleSubmitSavePurchaseUnitPriceForm}
                                    onRefetchMrBaseExchangeRateList={handleReqFetchMrBaseExchangeRateList}
                                />
                            </St.InputFieldWrapper>
                            <St.InputFieldWrapper>
                                <FdPurchaseUnitPriceCalculator
                                    baseExchangeRateList={mrBaseExchangeRateHook?.mrBaseExchangeRateList}
                                    selectedMrPurchaseModule={mrPurchaseModuleHook?.selectedMrPurchaseModule}
                                    handleSubmitSavePurchaseUnitPriceForm={handleSubmitSavePurchaseUnitPriceForm}
                                />
                            </St.InputFieldWrapper>
                            <St.InputFieldWrapper>
                            </St.InputFieldWrapper>
                        </>
                    }
                </St.Container>
            </CustomDialog>
        </>
    );
}
