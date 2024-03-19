import { useDispatch, useSelector } from "react-redux";
import { CustomDialog } from "../../dialog/v1/CustomDialog";
import { useDataSourceHook, useMrBaseExchangeRateHook } from "./hooks";
import { useEffect } from "react";
import { St } from "./index.styled";
import { FdAddButton, FdAddItem, FdEditItem, FdMrBaseExchangeRateList } from "./components";
import { useState } from "react";
import { customBackdropController } from "../../backdrop/default/v1";

const customBackdropControl = customBackdropController();

export function MrBaseExchangeRateModal({
    open = false,
    onClose = () => { },
    onSelect = () => { },
    onCreateCompleted = () => { },
    onUpdateCompleted = () => { },
    onDeleteCompleted = () => { }
}) {
    const reduxDispatch = useDispatch();
    const mrBaseExchangeRateRedux = useSelector(state => state?.mrBaseExchangeRateRedux);
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();

    const [addItemModeOpen, setAddItemModeOpen] = useState(false);
    const [editTargetItem, setEditTargetItem] = useState(null);
    const editItemModeOpen = editTargetItem ? true : false;

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function initialize() {
            await dataSourceHook.onReqFetchMrBaseExchangeRateList({
                headers: { wsId: wsId }
            }, (results, response) => {
                reduxDispatch({
                    type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                    payload: {
                        name: 'mrBaseExchangeRateList',
                        value: results
                    }
                })
            })
        }
        initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wsId]);

    const toggleAddItemModeOpen = (bool) => {
        setAddItemModeOpen(bool);
    }

    const handleSetEditTargetItem = (targetItem) => {
        setEditTargetItem(targetItem);
    }

    const handleSelect = async (mrBaseExchangeRate) => {
        await onSelect(mrBaseExchangeRate);
    }

    const handleReqCreateMrBaseExchangeRate = async (body) => {
        customBackdropControl.showBackdrop();
        let createdMrBaseExchangeRateId = null;
        await dataSourceHook.onReqCreateMrBaseExchangeRate({ headers: { wsId: wsId }, body: body }, (results, response) => {
            createdMrBaseExchangeRateId = results?.id;
        })

        if (createdMrBaseExchangeRateId) {
            toggleAddItemModeOpen(false);
            await dataSourceHook.onReqFetchMrBaseExchangeRateList({
                headers: { wsId: wsId }
            }, (results, response) => {
                reduxDispatch({
                    type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                    payload: {
                        name: 'mrBaseExchangeRateList',
                        value: results
                    }
                })
            })
        }
        onCreateCompleted();
        customBackdropControl.hideBackdrop();
    }

    const handleReqUpdateMrBaseExchangeRate = async (body) => {
        customBackdropControl.showBackdrop();
        let updatedMrBaseExchangeRateId = null;
        await dataSourceHook.onReqUpdateMrBaseExchangeRate({ headers: { wsId: wsId }, body: body }, (results, response) => {
            updatedMrBaseExchangeRateId = results?.id;
        })

        if (updatedMrBaseExchangeRateId) {
            handleSetEditTargetItem(null);
            await dataSourceHook.onReqFetchMrBaseExchangeRateList({
                headers: { wsId: wsId }
            }, (results, response) => {
                reduxDispatch({
                    type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                    payload: {
                        name: 'mrBaseExchangeRateList',
                        value: results
                    }
                })
            })
        }
        onUpdateCompleted();
        customBackdropControl.hideBackdrop();
    }

    const handleReqDeleteMrBaseExchangeRate = async (item) => {
        let body = {
            id: item?.id
        }

        customBackdropControl.showBackdrop();

        let deletedMrBaseExchangeRate = null;
        await dataSourceHook.onReqDeleteMrBaseExchangeRate({ headers: { wsId: wsId }, body: body }, (results, response) => {
            deletedMrBaseExchangeRate = results;
        });

        if (deletedMrBaseExchangeRate) {
            await dataSourceHook.onReqFetchMrBaseExchangeRateList({
                headers: { wsId: wsId }
            }, (results, response) => {
                reduxDispatch({
                    type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                    payload: {
                        name: 'mrBaseExchangeRateList',
                        value: results
                    }
                })
            })
        }

        onDeleteCompleted();
        customBackdropControl.hideBackdrop();
    }

    return (
        <>
            <CustomDialog
                open={open}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                {!addItemModeOpen && !editItemModeOpen &&
                    <St.Container>
                        <FdMrBaseExchangeRateList
                            mrBaseExchangeRateList={mrBaseExchangeRateRedux?.mrBaseExchangeRateList}
                            onSetEditTargetItem={handleSetEditTargetItem}
                            onSelect={handleSelect}
                            onDelete={handleReqDeleteMrBaseExchangeRate}
                        />
                        <FdAddButton
                            onClick={() => toggleAddItemModeOpen(true)}
                        />
                    </St.Container>
                }
                {addItemModeOpen &&
                    <St.Container>
                        <FdAddItem
                            mrBaseExchangeRateList={mrBaseExchangeRateRedux?.mrBaseExchangeRateList}
                            onClose={() => toggleAddItemModeOpen(false)}
                            onConfirm={(body) => handleReqCreateMrBaseExchangeRate(body)}
                        />
                    </St.Container>
                }

                {editItemModeOpen &&
                    <St.Container>
                        <FdEditItem
                            mrBaseExchangeRateList={mrBaseExchangeRateRedux?.mrBaseExchangeRateList}
                            editTargetItem={editTargetItem}
                            onClose={() => handleSetEditTargetItem(null)}
                            onConfirm={(body) => handleReqUpdateMrBaseExchangeRate(body)}
                        />
                    </St.Container>
                }
            </CustomDialog>
        </>
    );
}