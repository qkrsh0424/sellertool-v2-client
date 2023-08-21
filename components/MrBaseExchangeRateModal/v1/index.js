import { useSelector } from "react-redux";
import { CustomDialog } from "../../dialog/v1/CustomDialog";
import { useDataSourceHook, useMrBaseExchangeRateHook } from "./hooks";
import { useEffect } from "react";
import { St } from "./index.styled";
import { FdAddButton, FdAddItem, FdMrBaseExchangeRateList } from "./components";
import { useState } from "react";

export function MrBaseExchangeRateModal({
    open = false,
    onClose = () => { },
    onSelect = () => { },
    onCreateCompleted = () => { }
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();
    const mrBaseExchangeRateHook = useMrBaseExchangeRateHook();

    const [addItemModeOpen, setAddItemModeOpen] = useState(false);

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function initialize() {
            await dataSourceHook.onReqFetchMrBaseExchangeRateList({
                headers: { wsId: wsId }
            }, (results, response) => {
                mrBaseExchangeRateHook.onSetMrBaseExchangeRateList(results);
            })
        }
        initialize();
    }, [wsId]);

    const toggleAddItemModeOpen = (bool) => {
        setAddItemModeOpen(bool);
    }

    const handleSelect = async (mrBaseExchangeRate) => {
        await onSelect(mrBaseExchangeRate);
    }

    const handleReqCreateMrBaseExchangeRate = async (body) => {
        let createdMrBaseExchangeRateId = null;
        await dataSourceHook.onReqCreateMrBaseExchangeRate({ headers: { wsId: wsId }, body: body }, (results, response) => {
            createdMrBaseExchangeRateId = results?.id;
        })

        if (createdMrBaseExchangeRateId) {
            toggleAddItemModeOpen(false);
            await dataSourceHook.onReqFetchMrBaseExchangeRateList({
                headers: { wsId: wsId }
            }, (results, response) => {
                mrBaseExchangeRateHook.onSetMrBaseExchangeRateList(results);
            })
        }
        onCreateCompleted();
    }
    return (
        <>
            <CustomDialog
                open={open}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                {!addItemModeOpen &&
                    <St.Container>
                        <FdMrBaseExchangeRateList
                            mrBaseExchangeRateList={mrBaseExchangeRateHook?.mrBaseExchangeRateList}
                            onSelect={handleSelect}
                        />
                        <FdAddButton
                            onClick={() => toggleAddItemModeOpen(true)}
                        />
                    </St.Container>
                }
                {addItemModeOpen &&
                    <St.Container>
                        <FdAddItem
                            mrBaseExchangeRateList={mrBaseExchangeRateHook?.mrBaseExchangeRateList}
                            onClose={() => toggleAddItemModeOpen(false)}
                            onConfirm={(body) => handleReqCreateMrBaseExchangeRate(body)}
                        />
                    </St.Container>
                }
            </CustomDialog>
        </>
    );
}