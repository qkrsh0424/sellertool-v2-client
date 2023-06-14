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
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import { customBackdropController } from "../../../../../components/backdrop/default/v1";
// ------------ MUI DatePicker Import End

function returnTotalUnitByType(inventoryStockRegisterStatuses, type) {
    const totalUnit = inventoryStockRegisterStatuses?.reduce((accumulator, currentValue, index, src) => {
        if (currentValue?.type === type) {
            accumulator += currentValue?.unit
        }
        return accumulator;
    }, 0);
    return totalUnit;
}

export default function StockRegisterStatusModalComponent({
    selectedProductOption,
    onClose,
    onReqFetchInventoryStocks
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const customBackground = customBackdropController();


    const {
        inventoryStockRegisterStatuses,
        startDateTime,
        endDateTime,
        onChangeStartDateTime,
        onChangeEndDateTime,
        reqFetchInventoryStockRegisterStatuses,
        reqChangeInventoryReceiveMemo,
        reqChangeInventoryReleaseMemo,
        reqDeleteInventoryReceive,
        reqDeleteInventoryRelease
    } = useInventoryStockRegisterStatusesHook({
        selectedProductOption: selectedProductOption
    });

    const [editMemoModalOpen, setEditMemoModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteInventoryStockRecordModalOpen, setDeleteInventoryStockRecordModalOpen] = useState(false);
    const [deleteInventoryStockRecordInfoModalOpen, setDeleteInventoryStockRecordInfoModalOpen] = useState(false);
    const totalReceiveUnit = returnTotalUnitByType(inventoryStockRegisterStatuses, 'receive');
    const totalReleaseUnit = returnTotalUnitByType(inventoryStockRegisterStatuses, 'release');

    const toggleDeleteInventoryStockRecordModalOpen = (setOpen, item) => {
        if (setOpen) {
            setSelectedItem(item);
            setDeleteInventoryStockRecordModalOpen(true);
        } else {
            setSelectedItem(null);
            setDeleteInventoryStockRecordModalOpen(false);
        }
    }

    const toggleDeleteInventoryStockRecordInfoModalOpen = (setOpen) => {
        setDeleteInventoryStockRecordInfoModalOpen(setOpen)
    }

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        let diffDate = getDiffDate(startDateTime, endDateTime);
        if (diffDate > 365 || diffDate < 1) {
            alert('최대 365일 범위 이내로만 조회 가능합니다.');
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

    const handleSubmitDeleteInventoryStockRecord = async () => {
        customBackground.showBackdrop();
        const body = {
            id: selectedItem?.id,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        switch (selectedItem?.type) {
            case 'receive':
                await reqDeleteInventoryReceive(
                    body,
                    async () => {
                        await reqFetchInventoryStockRegisterStatuses();
                        await onReqFetchInventoryStocks();
                        toggleDeleteInventoryStockRecordModalOpen(false);
                    }
                )
                break;
            case 'release':
                await reqDeleteInventoryRelease(
                    body,
                    async () => {
                        await reqFetchInventoryStockRegisterStatuses();
                        await onReqFetchInventoryStocks();
                        toggleDeleteInventoryStockRecordModalOpen(false);
                    }
                )
                break;
            default: break;
        }
        customBackground.hideBackdrop();

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
                        <div className='totalUnit-wrapper'>
                            <div className='item-group'>
                                <div className='item' style={{ color: 'var(--defaultGreenColor)' }}>
                                    기간내 총 입고 수량 : <span style={{ fontWeight: '700' }}>{totalReceiveUnit}</span> 개
                                </div>
                                <div className='item' style={{ color: 'var(--defaultRedColor)' }}>
                                    기간내 총 출고 수량 : <span style={{ fontWeight: '700' }}>{totalReleaseUnit}</span> 개
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
                                <div className='left-group'>
                                    {r.erpItemId ?
                                        <CustomBlockButton
                                            type='button'
                                            className='delete-button'
                                            onClick={() => toggleDeleteInventoryStockRecordInfoModalOpen(true)}
                                        >
                                            <CustomImage
                                                src='/images/icon/info_default_808080.svg'
                                            />
                                        </CustomBlockButton>
                                        :
                                        <CustomBlockButton
                                            type='button'
                                            className='delete-button'
                                            onClick={() => toggleDeleteInventoryStockRecordModalOpen(true, r)}
                                        >
                                            <CustomImage
                                                src='/images/icon/delete_default_e56767.svg'
                                            />
                                        </CustomBlockButton>
                                    }
                                </div>
                                <div className='right-group'>
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
                                </div>
                            </ItemCardBox>
                        );
                    })}
                </ContentContainer>
            </Container>

            {editMemoModalOpen &&
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
            }
            {deleteInventoryStockRecordModalOpen &&
                <CustomDialog
                    open={deleteInventoryStockRecordModalOpen}
                    onClose={() => toggleDeleteInventoryStockRecordModalOpen(false)}
                >
                    <CustomDialog.CloseButton onClose={() => toggleDeleteInventoryStockRecordModalOpen(false)} />
                    <CustomDialog.Title>{selectedItem?.type === 'release' ? '출고 기록 삭제' : selectedItem?.type === 'receive' ? '입고 기록 삭제' : ''}</CustomDialog.Title>
                    <div style={{ padding: '60px 20px', textAlign: 'center', fontWeight: '600' }}>
                        해당 재고 기록을 정말로 삭제하시겠습니까?
                    </div>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            style={{
                                width: '40%',
                                background: 'var(--defaultModalCloseColor)',
                                color: '#fff'
                            }}
                            onClick={() => toggleDeleteInventoryStockRecordModalOpen(false)}
                        >취소</CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='button'
                            style={{
                                flex: 1,
                                background: 'var(--defaultRedColor)',
                                color: '#fff'
                            }}
                            onClick={() => handleSubmitDeleteInventoryStockRecord()}
                        >삭제</CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </CustomDialog>
            }
            {deleteInventoryStockRecordInfoModalOpen &&
                <CustomDialog
                    open={deleteInventoryStockRecordInfoModalOpen}
                    onClose={() => toggleDeleteInventoryStockRecordInfoModalOpen(false)}
                >
                    <CustomDialog.CloseButton onClose={() => toggleDeleteInventoryStockRecordInfoModalOpen(false)} />
                    <CustomDialog.Title>입/출고 기록 삭제</CustomDialog.Title>
                    <div style={{ padding: '60px 20px', textAlign: 'center', fontWeight: '600', wordBreak: 'keep-all' }}>
                        해당 입/출고 기록의 삭제는 통합 발주 관리를 통해서만 가능합니다.
                    </div>
                    <CustomDialog.FooterButtonGroup>
                        <CustomDialog.FooterButton
                            type='button'
                            style={{
                                width: '100%',
                                background: 'var(--defaultModalCloseColor)',
                                color: '#fff'
                            }}
                            onClick={() => toggleDeleteInventoryStockRecordInfoModalOpen(false)}
                        >취소</CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </CustomDialog>
            }
        </>
    );
}