import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dateToYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import useRegisteredStocksHook from "../hooks/useRegisteredStocksHook";
import { Container, ItemInfoContainer, ItemInfoWrapper, SearchConsoleContainer, SearchConsoleWrapper } from "../styles/RegisteredStockByDateModal.styled";
import EditStockMemoModalComponent from "./EditStockMemoModal.component";

export default function RegisteredStockByDateModalComponent({
    onClose
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const {
        registeredStocks,
        reqFetchRegisteredStocks,
        reqChangeInventoryReceiveMemo,
        reqChangeInventoryReleaseMemo
    } = useRegisteredStocksHook();

    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [editMemoModalOpen, setEditMemoModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleChangeDateTime = (value) => {
        setStartDateTime(new Date(value));
        setEndDateTime(new Date(value));
    }

    const handleSubmitSearch = () => {
        reqFetchRegisteredStocks(startDateTime, endDateTime);
    }

    const handleSubmitChangeMemo = async (memo) => {
        let body = {
            id: selectedItem?.id,
            memo: memo,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        switch (selectedItem?.type) {
            case 'receive':
                await reqChangeInventoryReceiveMemo({
                    body,
                    successCallback: () => {
                        handleCloseEditMemoModal();
                        reqFetchRegisteredStocks(startDateTime, endDateTime);
                    }
                })
                break;
            case 'release':
                await reqChangeInventoryReleaseMemo({
                    body,
                    successCallback: () => {
                        handleCloseEditMemoModal();
                        reqFetchRegisteredStocks(startDateTime, endDateTime);
                    }
                })
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
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div
                    className='title-box'
                >
                    <div className='title'>
                        날짜별 전체 입/출고현황
                    </div>
                </div>
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
                                <SingleBlockButton
                                    type='button'
                                    className='search-button-item'
                                    onClick={(e) => handleSubmitSearch(e)}
                                >
                                    조회
                                </SingleBlockButton>
                            </div>
                        </div>
                    </SearchConsoleWrapper>
                </SearchConsoleContainer>
                <ItemInfoContainer>
                    {registeredStocks?.map(r => {
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
                                                <SingleBlockButton
                                                    type='button'
                                                    className='edit-button-item'
                                                    onClick={() => handleOpenEditMemoModal(r)}
                                                >
                                                    <CustomImage
                                                        src='/images/icon/rename_default_808080.svg'
                                                    />
                                                </SingleBlockButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ItemInfoWrapper>
                        );
                    })}

                </ItemInfoContainer>
            </Container>

            <CommonModalComponent
                open={editMemoModalOpen}
                onClose={handleCloseEditMemoModal}
            >
                <EditStockMemoModalComponent
                    selectedItem={selectedItem}
                    onClose={handleCloseEditMemoModal}
                    onConfirm={handleSubmitChangeMemo}
                />
            </CommonModalComponent>
        </>
    );
}