import { Container, ContentContainer, ItemCardBox, ItemInfoContainer, ItemInfoWrapper, SearchConsoleContainer, SearchConsoleWrapper } from "./Main.styled";
// ------------ MUI DatePicker Import Start
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import { TextField } from "@mui/material";
// ------------ MUI DatePicker Import End

import { dateToYYMMDDhhmmss, getDiffDate } from "../../../../../../../utils/dateFormatUtils";
import CustomImage from "../../../../../../modules/image/CustomImage";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import { EditMemoModalComponent } from "../edit-memo-modal";
import { StockChartComponent } from "../stock-chart";
import useInventoryStockRegisterStatusesHook from "../../hooks/useInventoryStockRegisterStatusesHook";

function returnTotalUnitByType(inventoryStockRegisterStatuses, type) {
    const totalUnit = inventoryStockRegisterStatuses?.reduce((accumulator, currentValue, index, src) => {
        if (currentValue?.type === type) {
            accumulator += currentValue?.unit
        }
        return accumulator;
    }, 0);
    return totalUnit;
}

export function InventoryStockListModalComponent({
    readOnly = true,
    productOption,
    open,
    onClose,
    onDeleteCompleted
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const customBackground = customBackdropController();

    const {
        inventoryStockRegisterStatuses,
        startDateTime,
        endDateTime,
        chartStartDateTime,
        chartEndDateTime,
        onChangeStartDateTime,
        onChangeEndDateTime,
        reqFetchInventoryStockRegisterStatuses,
        reqChangeInventoryReceiveMemo,
        reqChangeInventoryReleaseMemo,
        reqDeleteInventoryReceive,
        reqDeleteInventoryRelease
    } = useInventoryStockRegisterStatusesHook({
        productOption: productOption
    });
    const [editMemoModalOpen, setEditMemoModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteInventoryStockRecordModalOpen, setDeleteInventoryStockRecordModalOpen] = useState(false);
    const [deleteInventoryStockRecordInfoModalOpen, setDeleteInventoryStockRecordInfoModalOpen] = useState(false);
    const totalReceiveUnit = returnTotalUnitByType(inventoryStockRegisterStatuses, 'receive');
    const totalReleaseUnit = returnTotalUnitByType(inventoryStockRegisterStatuses, 'release');

    const toggleDeleteInventoryStockRecordModalOpen = (setOpen, item) => {
        if (readOnly) {
            return;
        }

        if (setOpen) {
            setSelectedItem(item);
            setDeleteInventoryStockRecordModalOpen(true);
        } else {
            setSelectedItem(null);
            setDeleteInventoryStockRecordModalOpen(false);
        }
    }

    const toggleDeleteInventoryStockRecordInfoModalOpen = (setOpen) => {
        if (readOnly) {
            return;
        }
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
        if (readOnly) {
            return;
        }
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
        if (readOnly) {
            return;
        }

        setSelectedItem(item);
        setEditMemoModalOpen(true);
    }

    const handleCloseEditMemoModal = () => {
        if (readOnly) {
            return;
        }

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
                        await onDeleteCompleted();
                        toggleDeleteInventoryStockRecordModalOpen(false);
                    }
                )
                break;
            case 'release':
                await reqDeleteInventoryRelease(
                    body,
                    async () => {
                        await reqFetchInventoryStockRegisterStatuses();
                        await onDeleteCompleted();
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
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="xl"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>옵션별 입/출고 현황</CustomDialog.Title>
                <Container>
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
                                <CustomBlockButton
                                    type='button'
                                    className='search-button-item'
                                    onClick={(e) => handleSubmitSearch(e)}
                                >
                                    조회
                                </CustomBlockButton>
                            </div>
                        </SearchConsoleWrapper>
                    </SearchConsoleContainer>
                    <ItemInfoContainer>
                        <ItemInfoWrapper>
                            <div className='mgl-flex mgl-flex-alignItems-center'>
                                <div className='thumbnail-figure'>
                                    <CustomImage
                                        src={productOption?.product?.thumbnailUri}
                                    />
                                </div>
                                <div>
                                    <div className='categoryInfo'>
                                        {productOption?.productCategory?.name} &gt; {productOption?.productSubCategory?.name}
                                    </div>
                                    <div className='productInfo'>
                                        {productOption?.product?.name} &gt; {productOption?.name}
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
                    {inventoryStockRegisterStatuses &&
                        <StockChartComponent
                            inventoryStockRegisterStatuses={inventoryStockRegisterStatuses}
                            startDateTime={chartStartDateTime}
                            endDateTime={chartEndDateTime}
                        />
                    }
                    <ContentContainer>
                        {inventoryStockRegisterStatuses?.map(r => {
                            return (
                                <ItemCardBox
                                    key={r.id}
                                >
                                    {!readOnly &&

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
                                    }
                                    <div className='right-group'>
                                        <div className='mgl-flex mgl-flex-justifyContent-spaceBetween'>
                                            <div className='status-box'><span className={`${r.type === 'receive' ? 'status-receive' : r.type === 'release' ? 'status-release' : ''}`}>{r.type === 'receive' ? '입고' : r.type === 'release' ? '출고' : ''}</span> ( {dateToYYMMDDhhmmss(r.createdAt || new Date)} )</div>
                                            <div className='unit-box'>수량: {r.type === 'receive' ? <span className='receive-unit'>+{r.unit}</span> : r.type === 'release' ? <span className='release-unit'>-{r.unit}</span> : ''}</div>
                                        </div>
                                        <div className='memo-box'>
                                            <div className='memo'>
                                                메모: {r.memo}
                                            </div>
                                            {!readOnly &&
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
                                            }
                                        </div>
                                    </div>
                                </ItemCardBox>
                            );
                        })}
                    </ContentContainer>
                </Container>
            </CustomDialog>

            {editMemoModalOpen &&
                <EditMemoModalComponent
                    open={editMemoModalOpen}
                    inventoryStockData={selectedItem}
                    onClose={handleCloseEditMemoModal}
                    onConfirm={handleSubmitChangeMemo}
                />
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