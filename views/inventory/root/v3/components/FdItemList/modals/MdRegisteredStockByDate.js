import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { Container, ItemInfoContainer, ItemInfoWrapper, SearchConsoleContainer, SearchConsoleWrapper } from "./MdRegisteredStockByDate.styled";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useApiHook, useRegisteredStocksHook } from "../../../hooks";
import { dateToYYMMDDhhmmss, getEndDate, getStartDate } from "../../../../../../../utils/dateFormatUtils";
import CustomImage from "../../../../../../../components/image/CustomImage";
import { EditMemoModalComponent as EditInventoryStockMemoModal } from "../../../../../fragments/inventory-stock-list-modal/v1";

export function MdRegisteredStockByDate({
    open = false,
    onClose = () => { }
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const registeredStocksHook = useRegisteredStocksHook();

    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [editMemoModalOpen, setEditMemoModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function initialize() {
            await apiHook.onReqFetchRegisteredStocks({
                body: {
                    startDateTime: getStartDate(startDateTime || new Date()),
                    endDateTime: getEndDate(endDateTime || new Date())
                },
                headers: { wsId: wsId }
            },
                (results, response) => {
                    registeredStocksHook.onSetRegisteredStocks(results);
                }
            )
        }

        initialize();
    }, [wsId]);

    const handleChangeDateTime = (value) => {
        setStartDateTime(new Date(value));
        setEndDateTime(new Date(value));
    }

    const handleSubmitSearch = async () => {
        await apiHook.onReqFetchRegisteredStocks({
            body: {
                startDateTime: getStartDate(startDateTime || new Date()),
                endDateTime: getEndDate(endDateTime || new Date())
            },
            headers: { wsId: wsId }
        },
            (results, response) => {
                registeredStocksHook.onSetRegisteredStocks(results);
            }
        )
    }

    const handleSubmitChangeMemo = async (memo) => {
        let body = {
            id: selectedItem?.id,
            memo: memo,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        switch (selectedItem?.type) {
            case 'receive':
                await apiHook.onReqChangeInventoryReceiveMemo({
                    body: body,
                    headers: { wsId: wsId }
                },
                    (results, response) => {
                        handleCloseEditMemoModal();
                        apiHook.onReqFetchRegisteredStocks({
                            body: {
                                startDateTime: getStartDate(startDateTime || new Date()),
                                endDateTime: getEndDate(endDateTime || new Date())
                            },
                            headers: { wsId: wsId }
                        },
                            (results, response) => {
                                registeredStocksHook.onSetRegisteredStocks(results);
                            }
                        )
                    }
                )
                break;
            case 'release':
                await apiHook.onReqChangeInventoryReleaseMemo({
                    body: body,
                    headers: { wsId: wsId }
                },
                    (results, response) => {
                        handleCloseEditMemoModal();
                        apiHook.onReqFetchRegisteredStocks({
                            body: {
                                startDateTime: getStartDate(startDateTime || new Date()),
                                endDateTime: getEndDate(endDateTime || new Date())
                            },
                            headers: { wsId: wsId }
                        },
                            (results, response) => {
                                registeredStocksHook.onSetRegisteredStocks(results);
                            }
                        )
                    }
                )
                break;
            default: break;
        }
    }

    const handleOpenEditMemoModal = (item) => {
        setSelectedItem(item);
        setEditMemoModalOpen(true);
    }

    const handleCloseEditMemoModal = () => {
        setEditMemoModalOpen(false);
        setSelectedItem(null);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>날짜별 전체 입/출고 현황</CustomDialog.Title>
                <Container>
                    <SearchConsoleContainer>
                        <SearchConsoleWrapper>
                            <div
                                className='mgl-flex mgl-flex-alignItems-center'
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale={'ko-KR'}
                                >
                                    <DatePicker
                                        label="날짜"
                                        inputFormat="YYYY.MM.DD"
                                        mask={'____.__.__'}
                                        toolbarFormat="YY.MM.DD dd"
                                        showToolbar={false}
                                        disableFuture={true}
                                        value={dayjs(startDateTime || new Date())}
                                        onChange={(value) => handleChangeDateTime(value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className='date-picker'
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <div className="search-button-box">
                                    <CustomBlockButton
                                        type='button'
                                        className='search-button-item'
                                        onClick={(e) => handleSubmitSearch(e)}
                                    >
                                        조회
                                    </CustomBlockButton>
                                </div>
                            </div>
                        </SearchConsoleWrapper>
                    </SearchConsoleContainer>
                    <ItemInfoContainer>
                        {registeredStocksHook?.registeredStocks?.map(r => {
                            return (
                                <ItemInfoWrapper key={r.id}>
                                    <div className='mgl-flex mgl-flex-justifyContent-spaceBetween' style={{ marginBottom: '5px' }}>
                                        <div className='status-box'>
                                            {r.type === 'receive' &&
                                                <span className='status-receive'>입고 </span>
                                            }
                                            {r.type === 'release' &&
                                                <span className='status-release'>출고 </span>
                                            }
                                            ( {dateToYYMMDDhhmmss(r.createdAt)} )
                                        </div>
                                        <div className='unit-box'>
                                            수량:
                                            {r.type === 'receive' &&
                                                <span className='receive-unit'> +{r.unit}</span>
                                            }
                                            {r.type === 'release' &&
                                                <span className='release-unit'> -{r.unit}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className='mgl-flex mgl-flex-alignItems-center'>
                                        <div className='thumbnail-figure'>
                                            <CustomImage
                                                src={r?.thumbnailUri}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className='productInfo'>
                                                {r.productName} / {r.productOptionName}
                                            </div>
                                            <div className='memo-box'>
                                                <div className='memo'>
                                                    메모: {r.memo}
                                                </div>
                                                <div>
                                                    <CustomBlockButton
                                                        type='button'
                                                        className='edit-button-item'
                                                        onClick={() => handleOpenEditMemoModal(r)}
                                                    >
                                                        <CustomImage
                                                            src='/images/icon/rename_default_808080.svg'
                                                        />
                                                    </CustomBlockButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ItemInfoWrapper>
                            );
                        })}
                    </ItemInfoContainer>
                </Container>
            </CustomDialog>

            {editMemoModalOpen &&
                <EditInventoryStockMemoModal
                    inventoryStockData={selectedItem}
                    open={editMemoModalOpen}
                    onClose={handleCloseEditMemoModal}
                    onConfirm={handleSubmitChangeMemo}
                />
            }
        </>
    );
}