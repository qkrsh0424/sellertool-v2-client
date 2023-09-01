import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { ContentContainer, TableBox, TableWrapper } from "./MdInventoryRelease.styled";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import CustomImage from "../../../../../../../components/image/CustomImage";
import CustomInput from "../../../../../../../components/input/default/v1/CustomInput";
import { useApiHook, useInventoryStocksHook } from "../../../hooks";
import { useInventoryReleaseCreateFormListHook } from "../../../hooks/useInventoryReleaseCreateFormListHook";
import { useState } from "react";
import { useEffect } from "react";
import { MdBulkChangeUnit } from "./MdBulkChangeUnit";
import { MdBulkChangeMemo } from "./MdBulkChangeMemo";

export function MdInventoryRelease({
    open,
    onClose,
    selectedProductOptions,
    onReqBulkCreateInventoryReleases
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const _apiHook = useApiHook();
    const _inventoryReleaseCreateFormListHook = useInventoryReleaseCreateFormListHook();
    const _inventoryStocksHook = useInventoryStocksHook();

    const [bulkChangeUnitModalOpen, setBulkChangeUnitModalOpen] = useState(false);
    const [bulkChangeMemoModalOpen, setBulkChangeMemoModalOpen] = useState(false);

    useEffect(() => {
        if (!wsId || !selectedProductOptions) {
            return;
        }

        async function initInventoryReleaseCreateForm() {
            const newForm = selectedProductOptions?.map(selectedProductOption => {
                return _inventoryReleaseCreateFormListHook?.generate(selectedProductOption);
            });
            _inventoryReleaseCreateFormListHook?.onSetInventoryReleaseCreateFormList(newForm);
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
            initInventoryReleaseCreateForm();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        try {
            _inventoryReleaseCreateFormListHook.checkUnitFormatValid();
            _inventoryReleaseCreateFormListHook.checkMemoFormatValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        await onReqBulkCreateInventoryReleases(_inventoryReleaseCreateFormListHook.inventoryReleaseCreateFormList, () => {
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
                <CustomDialog.Title>출고등록</CustomDialog.Title>
                <form onSubmit={(e) => { e.stopPropagation(); handleSubmit(e) }}>
                    <ContentContainer>
                        <Table
                            inventoryReleaseCreateFormList={_inventoryReleaseCreateFormListHook?.inventoryReleaseCreateFormList}
                            inventoryStocks={_inventoryStocksHook?.inventoryStocks}
                            onChangeUnit={_inventoryReleaseCreateFormListHook?.onChangeUnit}
                            onChangeMemo={_inventoryReleaseCreateFormListHook?.onChangeMemo}
                            onDelete={_inventoryReleaseCreateFormListHook?.onDelete}
                            onOpenBulkChangeUnitModal={() => toggleBulkChangeUnitModalOpen(true)}
                            onOpenBulkChangeMemoModal={() => toggleBulkChangeMemoModalOpen(true)}
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
                    title={'출고수량 일괄 등록'}
                    onClose={() => toggleBulkChangeUnitModalOpen(false)}
                    onConfirm={(value) => _inventoryReleaseCreateFormListHook.onBulkChangeUnit(value)}
                />
            }

            {bulkChangeMemoModalOpen &&
                <MdBulkChangeMemo
                    open={bulkChangeMemoModalOpen}
                    title={'메모 일괄 등록'}
                    onClose={() => toggleBulkChangeMemoModalOpen(false)}
                    onConfirm={(value) => _inventoryReleaseCreateFormListHook.onBulkChangeMemo(value)}
                />
            }
        </>
    );
}

function Table({
    inventoryReleaseCreateFormList,
    inventoryStocks,
    onChangeUnit,
    onChangeMemo,
    onDelete,
    onOpenBulkChangeUnitModal,
    onOpenBulkChangeMemoModal
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
                                if (['unit', 'memo'].includes(r.name)) {
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
                                                            case 'unit': onOpenBulkChangeUnitModal(); break;
                                                            case 'memo': onOpenBulkChangeMemoModal(); break;
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
                        {inventoryReleaseCreateFormList?.map((inventoryReleaseCreateForm, index) => {
                            const inventoryStock = inventoryStocks?.find(r => r.productOptionId === inventoryReleaseCreateForm?.productOptionId);
                            const stockUnit = inventoryStock ? inventoryStock?.stockUnit : 0;

                            return (
                                <tr key={index}>
                                    <td>
                                        <CustomBlockButton
                                            type='button'
                                            style={{ width: 24, height: 24, marginLeft: 'auto', marginRight: 'auto', border: 'none', background: 'none' }}
                                            onClick={() => onDelete(inventoryReleaseCreateForm?.id)}
                                        >
                                            <CustomImage
                                                src='/images/icon/delete_default_e56767.svg'
                                            />
                                        </CustomBlockButton>
                                    </td>
                                    <td>
                                        <div>{inventoryReleaseCreateForm?.productCategoryName} / {inventoryReleaseCreateForm?.productSubCategoryName}</div>
                                        <div>{inventoryReleaseCreateForm?.productName}</div>
                                    </td>
                                    <td>
                                        <div>
                                            {inventoryReleaseCreateForm?.productOptionName}
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
                                            value={inventoryReleaseCreateForm?.unit}
                                            onChange={(e) => onChangeUnit(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='메모'
                                            value={inventoryReleaseCreateForm?.memo}
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
        name: 'unit',
        headerName: '출고수량',
        defaultWidth: 100
    },
    {
        resizable: true,
        name: 'memo',
        headerName: '메모',
        defaultWidth: 300
    },
]