import Image from "next/image";
import { Container, ContentContainer, ItemCardBox, ItemInfoContainer, ItemInfoWrapper, SearchConsoleContainer, SearchConsoleWrapper } from "../styles/StockRegisterStatusModal.styled";
// ------------ MUI DatePicker Import Start
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import { TextField } from "@mui/material";
import useInventoryStockRegisterStatusesHook from "../hooks/useInventoryStockRegisterStatusesHook";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { dateToYYMMDDhhmmss, getDiffDate } from "../../../../../utils/dateFormatUtils";
import CustomImage from "../../../../modules/image/CustomImage";
import { useState } from "react";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import EditStockMemoModalComponent from "./EditStockMemoModal.component";
import { useSelector } from "react-redux";
// ------------ MUI DatePicker Import End

export default function StockRegisterStatusModalComponent({
    selectedProductOption,
    onClose
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const {
        inventoryStockRegisterStatuses,
        startDateTime,
        endDateTime,
        onChangeStartDateTime,
        onChangeEndDateTime,
        reqFetchInventoryStockRegisterStatuses,
        reqChangeInventoryReceiveMemo,
        reqChangeInventoryReleaseMemo
    } = useInventoryStockRegisterStatusesHook({
        selectedProductOption: selectedProductOption
    });

    const [editMemoModalOpen, setEditMemoModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        let diffDate = getDiffDate(startDateTime, endDateTime);
        if (diffDate > 30 || diffDate < 1) {
            alert('최대 30일 범위 이내로만 조회 가능합니다.');
            return;
        }
        reqFetchInventoryStockRegisterStatuses();
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
                        reqFetchInventoryStockRegisterStatuses();
                    }
                })
                break;
            case 'release':
                await reqChangeInventoryReleaseMemo({
                    body,
                    successCallback: () => {
                        handleCloseEditMemoModal();
                        reqFetchInventoryStockRegisterStatuses();
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
                        옵션별 입/출고현황
                    </div>
                </div>

                <SearchConsoleContainer>
                    <SearchConsoleWrapper>
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={'ko-KR'}
                            >
                                <DatePicker
                                    label="조회 시작일"
                                    inputFormat="YYYY.MM.DD"
                                    mask={'____.__.__'}
                                    toolbarFormat="YY.MM.DD dd"
                                    showToolbar={false}
                                    disableFuture={true}
                                    value={dayjs(startDateTime || new Date())}
                                    onChange={(value) => onChangeStartDateTime(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className='date-picker'
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={'ko-KR'}
                            >
                                <DatePicker
                                    label="조회 종료일"
                                    inputFormat="YYYY.MM.DD"
                                    mask={'____.__.__'}
                                    toolbarFormat="YY.MM.DD dd"
                                    showToolbar={false}
                                    disableFuture={true}
                                    value={dayjs(endDateTime || new Date())}
                                    onChange={(value) => onChangeEndDateTime(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className='date-picker'
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="search-button-box">
                            <SingleBlockButton
                                type='button'
                                className='search-button-item'
                                onClick={(e) => handleSubmitSearch(e)}
                            >
                                조회
                            </SingleBlockButton>
                        </div>
                    </SearchConsoleWrapper>
                </SearchConsoleContainer>
                <ItemInfoContainer>
                    <ItemInfoWrapper>
                        <div className='mgl-flex mgl-flex-alignItems-center'>
                            <div className='thumbnail-figure'>
                                <CustomImage
                                    src={selectedProductOption?.product?.thumbnailUri}
                                />
                            </div>
                            <div>
                                <div className='categoryInfo'>
                                    {selectedProductOption?.productCategory?.name} / {selectedProductOption?.productSubCategory?.name}
                                </div>
                                <div className='productInfo'>
                                    {selectedProductOption?.product?.name} / {selectedProductOption?.name}
                                </div>
                            </div>
                        </div>
                    </ItemInfoWrapper>
                </ItemInfoContainer>
                <ContentContainer>
                    {inventoryStockRegisterStatuses?.map(r => {
                        return (
                            <ItemCardBox
                                key={r.id}
                            >
                                <div className='mgl-flex mgl-flex-justifyContent-spaceBetween'>
                                    <div className='status-box'><span className={`${r.type === 'receive' ? 'status-receive' : r.type === 'release' ? 'status-release' : ''}`}>{r.type === 'receive' ? '입고' : r.type === 'release' ? '출고' : ''}</span> ( {dateToYYMMDDhhmmss(r.createdAt || new Date)} )</div>
                                    <div className='unit-box'>수량: {r.type === 'receive' ? <span className='receive-unit'>+{r.unit}</span> : r.type === 'release' ? <span className='release-unit'>-{r.unit}</span> : ''}</div>
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
                            </ItemCardBox>
                        );
                    })}
                </ContentContainer>
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