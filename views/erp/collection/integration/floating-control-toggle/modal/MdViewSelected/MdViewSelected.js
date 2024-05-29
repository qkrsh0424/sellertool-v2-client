import * as St from './MdViewSelected.styled';
import { useRouter } from "next/router";
import { dateToYYYYMMDDhhmmss } from "../../../../../../../utils/dateFormatUtils";
import { numberFormatUtils } from "../../../../../../../utils/numberFormatUtils";
import React, { useCallback, useEffect, useState } from "react";
import { CustomVirtualTable } from "../../../../../../../components/table/virtual-table/v2/components/CustomVirtualTable";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../components/image/CustomImage";
import { CustomDialog } from '../../../../../../../components/dialog/v1/CustomDialog';
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from '../../../contexts/SelectedErpItemListProvider';
import { useApiHook } from '../../../hooks/useApiHook';
import { useSelector } from 'react-redux';
import { TableVirtuoso } from 'react-virtuoso';
import { StatusUtils } from '../../../utils/StatusUtils';

export default function MdViewSelected({
    open,
    onClose = () => { },
    erpCollectionHeader
}) {
    const router = useRouter();
    const matchedCode = router?.query?.matchedCode || null;
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();


    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [inventoryStocks, setInventoryStocks] = useState({
        isLoading: true,
        content: null
    });

    const [productOptionPackageInfoList, setProductOptionPackageInfoList] = useState({
        content: null,
        isLoading: true
    });

    const handleReqFetchInventoryStocks = async () => {
        if (!selectedErpItemListValueHook || selectedErpItemListValueHook?.length <= 0) {
            return;
        }

        if (inventoryStocks?.content) {
            return;
        }

        let productOptionIds = new Set();

        selectedErpItemListValueHook?.forEach(r => {
            if (r.productOptionId) {
                productOptionIds.add(r.productOptionId);
            }
        })

        const headers = {
            wsId: wsId
        }

        const body = {
            productOptionIds: [...productOptionIds]
        }

        const fetchResult = await apiHook.reqFetchInventoryStockList({ body, headers });

        if (fetchResult?.content) {
            setInventoryStocks({
                isLoading: false,
                content: fetchResult?.content
            });
        }
    }

    const handleReqFetchProductOptionPackageList = async () => {
        if (!selectedErpItemListValueHook || !wsId) {
            return;
        }

        if (productOptionPackageInfoList?.content) {
            return;
        }

        const productOptionIds = Array.from(new Set(selectedErpItemListValueHook?.filter(r => r.packageYn === 'y').map(r => r.productOptionId)));

        if (!productOptionIds || productOptionIds?.length <= 0) {
            return;
        }

        let body = {
            productOptionIds: productOptionIds
        }

        let headers = {
            wsId: wsId
        }

        const result = await apiHook.reqFetchProductOptionPackageList({ body, headers });

        if (result?.content) {
            setProductOptionPackageInfoList({
                isLoading: false,
                content: result?.content
            })
        }
    }

    const handleRemoveSelectedItem = (erpItemId) => {
        let newSelectedErpItemList = selectedErpItemListValueHook?.filter(r => r.id !== erpItemId);

        selectedErpItemListActionsHook.onSet(newSelectedErpItemList);
    }

    useEffect(() => {
        if (!selectedErpItemListValueHook || !wsId) {
            return;
        }

        handleReqFetchInventoryStocks();
        handleReqFetchProductOptionPackageList();
    }, [selectedErpItemListValueHook, wsId]);


    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth={'xl'}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <St.Container>
                    <TipField
                        matchedCode={router?.query?.matchedCode || 'releaseOption'}
                    />
                    <St.TableFieldWrapper>
                        <div className='table-box'>
                            <TableVirtuoso
                                data={selectedErpItemListValueHook}
                                maxLength={selectedErpItemListValueHook?.length}
                                fixedHeaderContent={() => (
                                    <TableHeaderRow
                                        headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                        matchedCode={matchedCode}
                                    />
                                )}
                                itemContent={(rowIndex, data) => (
                                    <TableBodyRow
                                        erpItem={data}
                                        rowIndex={rowIndex}

                                        header={erpCollectionHeader}
                                        inventoryStocks={inventoryStocks?.content}
                                        productOptionPackageInfoList={productOptionPackageInfoList?.content}

                                        onActionClearSelectedItem={handleRemoveSelectedItem}
                                    />
                                )}
                            />
                        </div>
                    </St.TableFieldWrapper>
                </St.Container>
            </CustomDialog>
        </>
    );
}

function TipField({ matchedCode }) {
    return (
        <St.TipFieldWrapper>
            <div>
                ※ 상품 매칭 항목 : <span className='highlight'>{matchedCode === 'optionCode' ? '[M] 옵션코드' : '[M] 출고옵션코드'}</span>
            </div>
        </St.TipFieldWrapper>
    );
}

const HIGHLIGHT_FIELDS = [
    'productCategoryName',
    'productSubCategoryName',
    'productName',
    'productTag',
    'productOptionName',
    'productOptionTag',
    'productOptionReleaseLocation',
    'optionStockUnit'
];

function TableHeaderRow({
    headers,
    matchedCode
}) {
    return (
        <tr>
            <th
                className="fixed-header fixed-col-left"
                scope="col"
                width={40}
                style={{
                    zIndex: '11',
                    fontSize: '9px'
                }}
            >
                선택해제
            </th>
            <th
                className="fixed-header fixed-col-left"
                scope="col"
                width={60}
                style={{ fontSize: '10px', left: '40px', zIndex: '11', borderRight: '1px dashed #e0e0e0' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '5px 0', borderBottom: '1px solid #e0e0e0' }}>상태</div>
                    <div style={{ padding: '5px 0', borderBottom: '1px solid #e0e0e0' }}>재고반영</div>
                    <div style={{ padding: '5px 0' }}>패키지</div>
                </div>
            </th>
            {headers?.map?.((header, index) => {
                return (
                    <ResizableTh
                        key={header.id}
                        className="fixed-header"
                        scope="col"
                        width={180}
                        style={{
                            zIndex: '10'
                        }}
                    >
                        <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                            {header?.customHeaderName}
                        </div>
                        {(HIGHLIGHT_FIELDS.includes(header.matchedFieldName) || header.matchedFieldName === (matchedCode || 'releaseOptionCode')) &&
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '5px', background: 'var(--mainColor)' }}></div>
                        }
                    </ResizableTh>
                )
            })}
        </tr>
    )
}

function TableBodyRow({
    erpItem,
    rowIndex,

    header,
    inventoryStocks,
    productOptionPackageInfoList,

    onActionClearSelectedItem
}) {
    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === erpItem?.productOptionId);
    let isPackaged = erpItem?.packageYn === 'y' ? true : false;
    let isOutOfStock = !isPackaged && inventoryStock && inventoryStock?.stockUnit <= 0;
    const currStatus = StatusUtils().getClassificationTypeForFlags({ salesYn: erpItem.salesYn, releaseYn: erpItem.releaseYn, holdYn: erpItem.holdYn });

    if (isPackaged) {
        let childOptionList = productOptionPackageInfoList?.filter(r => r.parentProductOptionId === erpItem?.productOptionId);
        for (let i = 0; i < childOptionList?.length; i++) {
            if ((childOptionList[i].unit * erpItem?.unit) > childOptionList[i]?.stockUnit) {
                isOutOfStock = true;
                break;
            }
        }
    }

    return (
        <>
            <td
                className='fixed-col-left'
            >
                <div className='iconButtonBox'>
                    <CustomBlockButton
                        type='button'
                        onClick={() => onActionClearSelectedItem(erpItem?.id)}
                    >
                        <CustomImage src='/images/icon/close_default_e56767.svg' />
                    </CustomBlockButton>
                </div>
            </td>
            <td
                className='fixed-col-left'
                style={{ padding: 0, left: '40px', borderRight: '1px dashed #e0e0e0' }}
            >
                <div>
                    <div style={{ padding: '5px', borderBottom: '1px solid #e0e0e0' }}>
                        {currStatus === 'NEW' ? <div className='statusBadge green'>신규</div> :
                            currStatus === 'CONFIRM' ? <div className='statusBadge orange'>확정</div> :
                                currStatus === 'COMPLETE' ? <div className='statusBadge blue'>출고</div> :
                                    currStatus === 'POSTPONE' ? <div className='statusBadge gray'>보류</div> :
                                        <div className='statusBadge red'>미확인</div>
                        }
                    </div>
                    <div style={{ padding: '5px', borderBottom: '1px solid #e0e0e0' }}>
                        <div className='iconBadgeBox'>
                            {erpItem?.stockReflectYn === 'y' &&
                                <CustomImage
                                    src='/images/icon/check_default_5fcf80.svg'
                                />
                            }
                        </div>
                    </div>
                    <div style={{ padding: '5px' }}>
                        <div className='iconBadgeBox'>
                            {isPackaged &&
                                <CustomImage
                                    src='/images/icon/check_default_5fcf80.svg'
                                />
                            }
                        </div>
                    </div>
                </div>
            </td>
            {header?.erpCollectionHeaderDetails.map((header) => {
                let matchedFieldName = header.matchedFieldName;

                return (
                    <Td
                        key={matchedFieldName}
                        erpItem={erpItem}
                        matchedFieldName={matchedFieldName}
                        inventoryStock={inventoryStock}
                        isOutOfStock={isOutOfStock}
                        isPackaged={isPackaged}
                    />
                );

            })}
        </>
    )
}

function Td({
    erpItem,
    matchedFieldName,
    inventoryStock,
    isOutOfStock,
    isPackaged,
}) {

    switch (matchedFieldName) {
        case 'unit': case 'price': case 'deliveryCharge':
            return (
                <td
                    key={matchedFieldName}
                    className={`${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                >
                    <div className='div-item'>{numberFormatUtils.numberWithCommas(erpItem[matchedFieldName])}</div>
                </td>
            );
        case 'createdAt': case 'salesAt': case 'releaseAt': case 'channelOrderDate':
            return (
                <td
                    key={`col-${matchedFieldName}`}
                    className={`${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                >
                    {erpItem[matchedFieldName] ? dateToYYYYMMDDhhmmss(erpItem[matchedFieldName]) : ""}
                </td>
            )
        case 'optionStockUnit':
            if (isPackaged) {
                return (
                    <td
                        key={`col-${matchedFieldName}`}
                        className={`${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                        style={{ background: (isOutOfStock) ? 'var(--defaultRedColorOpacity500)' : '', color: 'var(--defaultGreenColor)' }}
                    >
                        패키지상품
                    </td>
                );
            } else {
                return (
                    <td
                        key={`col-${matchedFieldName}`}
                        className={`${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                        style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity500)' : '' }}
                    >
                        {inventoryStock ? inventoryStock?.stockUnit : '옵션코드 미지정'}
                    </td>
                );
            }
        default:
            return (
                <td
                    key={matchedFieldName}
                    className={`${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                >
                    <div className='div-item'>{erpItem[matchedFieldName]}</div>
                </td>
            );
    }
}