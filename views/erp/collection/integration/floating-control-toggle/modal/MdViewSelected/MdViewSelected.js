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

export default function MdViewSelected({
    open,
    onClose = () => { },
    erpCollectionHeader
}) {
    const router = useRouter();
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
        handleReqFetchInventoryStocks();
    }, [selectedErpItemListValueHook]);

    useEffect(() => {
        handleReqFetchProductOptionPackageList();
    }, [selectedErpItemListValueHook, wsId]);


    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth={'xl'}
            >
                <St.Container>
                    <div className='header-close-button-box'>
                        <button
                            type='button'
                            className='header-close-button-el'
                            onClick={() => onClose()}
                        >
                            <CustomImage
                                src='/images/icon/close_default_959eae.svg'
                            />
                        </button>
                    </div>
                    <TipField
                        matchedCode={router?.query?.matchedCode || 'releaseOption'}
                    />
                    <St.TableWrapper>
                        <St.TableBox>
                            <CustomVirtualTable
                                height={300}
                                data={selectedErpItemListValueHook}
                                THeadRow={
                                    () => (
                                        <TableHeaderRow header={erpCollectionHeader} />
                                    )
                                }
                                TBodyRow={
                                    (virtuosoData) => (
                                        <TableBodyRow
                                            virtuosoData={virtuosoData}

                                            header={erpCollectionHeader}
                                            inventoryStocks={inventoryStocks?.content}
                                            productOptionPackageInfoList={productOptionPackageInfoList?.content}

                                            onActionClearSelectedItem={handleRemoveSelectedItem}
                                        />
                                    )
                                }
                            />
                        </St.TableBox>
                    </St.TableWrapper>
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

function Td({
    erpItem,
    matchedFieldName,
    inventoryStock,
    isOutOfStock,
    isPackaged
}) {

    switch (matchedFieldName) {
        case 'unit': case 'price': case 'deliveryCharge':
            return (
                <td key={matchedFieldName}>
                    <div className='div-item'>{numberFormatUtils.numberWithCommas(erpItem[matchedFieldName])}</div>
                </td>
            );
        case 'createdAt': case 'salesAt': case 'releaseAt': case 'channelOrderDate':
            return (
                <td key={`col-${matchedFieldName}`}>{erpItem[matchedFieldName] ? dateToYYYYMMDDhhmmss(erpItem[matchedFieldName]) : ""}</td>
            )
        case 'optionStockUnit':
            if (isPackaged) {
                return (
                    <td key={`col-${matchedFieldName}`} style={{ background: (isOutOfStock) ? 'var(--defaultRedColorOpacity500)' : '', color: 'var(--defaultGreenColor)' }}>패키지상품</td>
                );
            } else {
                return (
                    <td key={`col-${matchedFieldName}`} style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity500)' : '' }}>{inventoryStock ? inventoryStock?.stockUnit : '옵션코드 미지정'}</td>
                );
            }
        default:
            return (
                <td key={matchedFieldName}>
                    <div className='div-item'>{erpItem[matchedFieldName]}</div>
                </td>
            );
    }
}

function TableHeaderRow({ header }) {
    return (
        <tr>
            <th
                className="fixed-header"
                scope="col"
                width={50}
                style={{
                    zIndex: '10'
                }}
            >
                No.
            </th>
            <th
                className="fixed-header"
                scope="col"
                width={50}
                style={{
                    zIndex: '10'
                }}
            >
                해제
            </th>
            <th
                className="fixed-header"
                scope="col"
                width={60}
                style={{
                    zIndex: '10'
                }}
            >
                패키지
            </th>
            {header?.erpCollectionHeaderDetails?.map?.((r, index) => {
                return (
                    <ResizableTh
                        key={index}
                        className="fixed-header"
                        scope="col"
                        width={180}
                        style={{
                            zIndex: '10'
                        }}
                    >
                        <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                            {r.required &&
                                <span className='required-tag'></span>
                            }
                            {r.customHeaderName}
                        </div>
                    </ResizableTh>
                )
            })}
        </tr>
    )
}

function TableBodyRow({
    virtuosoData,
    header,
    inventoryStocks,
    productOptionPackageInfoList,

    onActionClearSelectedItem
}) {
    const item = virtuosoData?.item;
    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === item?.productOptionId);
    let isPackaged = item?.packageYn === 'y' ? true : false;
    let isOutOfStock = !isPackaged && inventoryStock && inventoryStock?.stockUnit <= 0;

    if (isPackaged) {
        let childOptionList = productOptionPackageInfoList?.filter(r => r.parentProductOptionId === item?.productOptionId);
        for (let i = 0; i < childOptionList?.length; i++) {
            if ((childOptionList[i].unit * item?.unit) > childOptionList[i]?.stockUnit) {
                isOutOfStock = true;
                break;
            }
        }
    }

    return (
        <tr
            {...virtuosoData}
            style={{
                position: 'relative',
                background: !item?.productOptionId ? 'var(--defaultYellowColorOpacity30)' : (isOutOfStock) ? 'var(--defaultRedColorOpacity30)' : ''
            }}
        >
            <td>{virtuosoData['data-index'] + 1}</td>
            <td>
                <CustomBlockButton
                    type='button'
                    className='delete-button-item'
                    onClick={() => onActionClearSelectedItem(item?.id)}
                >
                    <div className='icon-figure'>
                        <CustomImage
                            src={'/images/icon/delete_default_e56767.svg'}
                        />
                    </div>
                </CustomBlockButton>
            </td>
            <td>
                <div
                    style={{
                        width: 20,
                        margin: '0 auto'
                    }}
                >
                    {isPackaged &&
                        <CustomImage
                            src='/images/icon/check_default_5fcf80.svg'
                        />
                    }
                </div>
            </td>
            {header?.erpCollectionHeaderDetails.map((header) => {
                let matchedFieldName = header.matchedFieldName;

                return (
                    <Td
                        key={matchedFieldName}
                        erpItem={item}
                        matchedFieldName={matchedFieldName}
                        inventoryStock={inventoryStock}
                        isOutOfStock={isOutOfStock}
                        isPackaged={isPackaged}
                    />
                );

            })}
        </tr>
    )
}