import { useSelector } from "react-redux";
import { useApiHook, useInventoryReceiveCreateFormListHook, useInventoryStocksHook } from "../../../hooks";
import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { ContentContainer, TableBox, TableWrapper } from "./MdInventoryReceive.styeld";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../components/image/CustomImage";
import CustomInput from "../../../../../../../components/input/default/v1/CustomInput";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import { numberWithCommas } from "../../../../../../../utils/numberFormatUtils";
import { MdBulkChangeUnit } from "./MdBulkChangeUnit";
import { MdBulkChangeMemo } from "./MdBulkChangeMemo";
import { MdBulkChangePurchaseCost } from "./MdBulkChangePurchaseCost";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";

export function MdInventoryReceive({
    open,
    onClose,
    selectedProductOptions,
    onReqBulkCreateInventoryReceives
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const _apiHook = useApiHook();
    const _inventoryReceiveCreateFormListHook = useInventoryReceiveCreateFormListHook();
    const _inventoryStocksHook = useInventoryStocksHook();

    const [bulkChangeUnitModalOpen, setBulkChangeUnitModalOpen] = useState(false);
    const [bulkChangeMemoModalOpen, setBulkChangeMemoModalOpen] = useState(false);
    const [bulkChangePurchaseCostModalOpen, setBulkChangePurchaseCostModalOpen] = useState(false);

    useEffect(() => {
        if (!wsId || !selectedProductOptions) {
            return;
        }

        async function initInventoryReceiveCreateForm() {
            const newForm = selectedProductOptions?.map(selectedProductOption => {
                return _inventoryReceiveCreateFormListHook?.generate(selectedProductOption);
            });
            _inventoryReceiveCreateFormListHook?.onSetInventoryReceiveCreateFormList(newForm);
        }

        async function initInventoryStocks() {
            let productOptionIds = selectedProductOptions?.map(r => r.id);
            await _apiHook.onReqFetchInventoryStocks({
                body: { productOptionIds: productOptionIds },
                headers: { wsId: wsId }
            },
                (results, response) => {
                    _inventoryStocksHook?.onSetInventoryStocks(results);
                }
            )
        }

        async function initialize() {
            initInventoryReceiveCreateForm();
            initInventoryStocks();
        }
        initialize();

    }, [selectedProductOptions]);

    const toggleBulkChangeUnitModalOpen = (setOpen) => {
        setBulkChangeUnitModalOpen(setOpen);
    }

    const toggleBulkChangeMemoModalOpen = (setOpen) => {
        setBulkChangeMemoModalOpen(setOpen);
    }

    const toggleBulkChangePurchaseCostModalOpen = (setOpen) => {
        setBulkChangePurchaseCostModalOpen(setOpen);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        try {
            _inventoryReceiveCreateFormListHook.checkUnitFormatValid();
            _inventoryReceiveCreateFormListHook.checkMemoFormatValid();
            _inventoryReceiveCreateFormListHook.checkPurchaseCostFormatValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        await onReqBulkCreateInventoryReceives(_inventoryReceiveCreateFormListHook.inventoryReceiveCreateFormList, () => {
            onClose();
        })
    }
    return (
        <>
            <CustomDialog
                open={open}
                maxWidth="sm"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>입고등록</CustomDialog.Title>
                <form onSubmit={(e) => { e.stopPropagation(); handleSubmit(e) }}>
                    <ContentContainer>
                        <Table
                            inventoryReceiveCreateFormList={_inventoryReceiveCreateFormListHook?.inventoryReceiveCreateFormList}
                            inventoryStocks={_inventoryStocksHook?.inventoryStocks}
                            onChangeUnit={_inventoryReceiveCreateFormListHook?.onChangeUnit}
                            onChangeMemo={_inventoryReceiveCreateFormListHook?.onChangeMemo}
                            onChangePurchaseCost={_inventoryReceiveCreateFormListHook?.onChangePurchaseCost}
                            onDelete={_inventoryReceiveCreateFormListHook?.onDelete}
                            onOpenBulkChangeUnitModal={() => toggleBulkChangeUnitModalOpen(true)}
                            onOpenBulkChangeMemoModal={() => toggleBulkChangeMemoModalOpen(true)}
                            onOpenBulkChangePurchaseCostModal={() => toggleBulkChangePurchaseCostModalOpen(true)}
                        />
                    </ContentContainer>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            onClick={() => onClose()}
                            style={{
                                flex: 4,
                                background: 'var(--defaultModalCloseColor)',
                                color: 'white'
                            }}
                        >
                            취소
                        </CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            style={{
                                flex: 6,
                                background: 'var(--mainColor)',
                                color: 'white'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>

            {bulkChangeUnitModalOpen &&
                <MdBulkChangeUnit
                    open={bulkChangeUnitModalOpen}
                    title={'입고수량 일괄 등록'}
                    onClose={() => toggleBulkChangeUnitModalOpen(false)}
                    onConfirm={(value) => _inventoryReceiveCreateFormListHook.onBulkChangeUnit(value)}
                />
            }

            {bulkChangePurchaseCostModalOpen &&
                <MdBulkChangePurchaseCost
                    open={bulkChangePurchaseCostModalOpen}
                    title={'매입단가 일괄 등록'}
                    onClose={() => toggleBulkChangePurchaseCostModalOpen(false)}
                    onConfirm={(value) => _inventoryReceiveCreateFormListHook.onBulkChangePurchaseCost(value)}
                />
            }

            {bulkChangeMemoModalOpen &&
                <MdBulkChangeMemo
                    open={bulkChangeMemoModalOpen}
                    title={'메모 일괄 등록'}
                    onClose={() => toggleBulkChangeMemoModalOpen(false)}
                    onConfirm={(value) => _inventoryReceiveCreateFormListHook.onBulkChangeMemo(value)}
                />
            }
        </>
    );
}

function Table({
    inventoryReceiveCreateFormList,
    inventoryStocks,
    onChangeUnit,
    onChangeMemo,
    onChangePurchaseCost,
    onDelete,
    onOpenBulkChangeUnitModal,
    onOpenBulkChangeMemoModal,
    onOpenBulkChangePurchaseCostModal
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <thead>
                        <tr>
                            <th width={50}>
                                취소
                            </th>
                            {TABLE_HEADER?.map(r => {
                                if (['receiveUnit', 'memo', 'purchaseCost'].includes(r.name)) {
                                    return (
                                        <th
                                            key={r.name}
                                            className="fixed-header"
                                            scope="col"
                                            width={r.defaultWidth}
                                            style={{
                                                zIndex: '10'
                                            }}
                                        >
                                            <div className='mgl-flex mgl-flex-justifyContent-center'>
                                                {r.headerName}
                                                <CustomBlockButton
                                                    type='button'
                                                    className='control-button-item'
                                                    onClick={() => {
                                                        switch (r.name) {
                                                            case 'receiveUnit': onOpenBulkChangeUnitModal(); break;
                                                            case 'memo': onOpenBulkChangeMemoModal(); break;
                                                            case 'purchaseCost': onOpenBulkChangePurchaseCostModal(); break;
                                                            default: break;
                                                        }
                                                    }}
                                                >
                                                    <div className='icon-figure'>
                                                        <CustomImage
                                                            src={'/images/icon/edit_note_808080.svg'}
                                                        />
                                                    </div>
                                                </CustomBlockButton>
                                            </div>
                                        </th>
                                    );
                                }

                                if (r.resizable) {
                                    return (
                                        <ResizableTh
                                            key={r.name}
                                            className="fixed-header"
                                            scope="col"
                                            width={r.defaultWidth}
                                            style={{
                                                zIndex: '10'
                                            }}
                                        >
                                            {r.headerName}
                                        </ResizableTh>
                                    );
                                }

                                return (
                                    <th
                                        key={r.name}
                                        className="fixed-header"
                                        scope="col"
                                        width={r.defaultWidth}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        {r.headerName}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryReceiveCreateFormList?.map((inventoryReceiveCreateForm, index) => {
                            const inventoryStock = inventoryStocks?.find(r => r.productOptionId === inventoryReceiveCreateForm?.productOptionId);
                            const stockUnit = inventoryStock ? inventoryStock?.stockUnit : 0;

                            return (
                                <tr key={index}>
                                    <td>
                                        <CustomBlockButton
                                            type='button'
                                            style={{ width: 24, height: 24, marginLeft: 'auto', marginRight: 'auto', border: 'none', background: 'none' }}
                                            onClick={() => onDelete(inventoryReceiveCreateForm?.id)}
                                        >
                                            <CustomImage
                                                src='/images/icon/delete_default_e56767.svg'
                                            />
                                        </CustomBlockButton>
                                    </td>
                                    <td>
                                        <div>{inventoryReceiveCreateForm?.productCategoryName} / {inventoryReceiveCreateForm?.productSubCategoryName}</div>
                                        <div>{inventoryReceiveCreateForm?.productName}</div>
                                    </td>
                                    <td>
                                        <div>
                                            {inventoryReceiveCreateForm?.productOptionName}
                                        </div>
                                    </td>
                                    <td style={{ background: 'var(--mainColorOpacity100)', fontWeight: '700' }}>
                                        <div>
                                            {stockUnit}
                                        </div>
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='수량'
                                            value={inventoryReceiveCreateForm?.unit}
                                            onChange={(e) => onChangeUnit(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='매입단가'
                                            value={inventoryReceiveCreateForm?.purchaseCost ? numberWithCommas(inventoryReceiveCreateForm?.purchaseCost) : ''}
                                            onChange={(e) => onChangePurchaseCost(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='메모'
                                            value={inventoryReceiveCreateForm?.memo}
                                            maxLength={150}
                                            onChange={(e) => onChangeMemo(e, index)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper >
    );
}

const TABLE_HEADER = [
    {
        resizable: true,
        name: 'productInfo',
        headerName: '상품정보',
        defaultWidth: 200
    },
    {
        resizable: true,
        name: 'optionName',
        headerName: '옵션명',
        defaultWidth: 200
    },
    {
        resizable: false,
        name: 'stockUnit',
        headerName: '재고수량',
        defaultWidth: 80
    },
    {
        resizable: false,
        name: 'receiveUnit',
        headerName: '입고수량',
        defaultWidth: 100
    },
    {
        resizable: false,
        name: 'purchaseCost',
        headerName: '매입단가',
        defaultWidth: 100
    },
    {
        resizable: true,
        name: 'memo',
        headerName: '메모',
        defaultWidth: 300
    },
]