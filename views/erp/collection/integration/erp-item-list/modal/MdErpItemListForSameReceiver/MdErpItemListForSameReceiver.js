import { useEffect, useState } from 'react';
import { CustomDialog } from '../../../../../../../components/dialog/v1/CustomDialog';
import { useApiHook } from '../../../hooks/useApiHook';
import * as St from './MdErpItemListForSameReceiver.styled';
import { useRouter } from 'next/router';
import { useSellertoolDatasValueHook } from '../../../../../../../contexts/SellertoolDatasGlobalProvider';
import { TableVirtuoso } from 'react-virtuoso';
import ResizableTh from '../../../../../../../components/table/th/v1/ResizableTh';
import { StatusUtils } from '../../../utils/StatusUtils';
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from '../../../contexts/SelectedErpItemListProvider';
import { CustomDateUtils } from '../../../../../../../utils/CustomDateUtils';
import { CustomNumberUtils } from '../../../../../../../utils/CustomNumberUtils';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import FieldLoadingV2 from '../../../../../../modules/loading/FieldLoadingV2';

export function MdErpItemListForSameReceiver({
    open,
    toggleErpItemListForSameReceiverModalOpen,
    targetSameReceiverHint,
    erpCollectionHeader,
}) {
    const router = useRouter();
    const classificationType = router?.query?.classificationType || null;
    const matchedCode = router?.query?.matchedCode || 'releaseOptionCode';
    const sellertoolDatasValueHook = useSellertoolDatasValueHook();
    const wsId = sellertoolDatasValueHook?.wsId;

    const apiHook = useApiHook();

    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [erpItemList, setErpItemList] = useState(null);
    const [erpItemListPending, setErpItemListPending] = useState(true);
    const [inventoryStocksList, setInventoryStockList] = useState(null);
    const [productOptionPackageInfoList, setProductOptionPackageInfoList] = useState(null);
    const [tabType, setTabType] = useState(classificationType);
    const [periodType, setPeriodType] = useState('ALL'); // [ALL, TODAY, 30DAYS, 90DAYS, 365DAYS]

    const handleCloseModal = () => {
        toggleErpItemListForSameReceiverModalOpen(false);
    }

    const handleChangeTabType = (newTabType) => {
        setTabType(newTabType);
    }

    const handleSelectErpItem = (erpItem) => {
        let data = selectedErpItemListValueHook?.find(r => r.id === erpItem.id);

        if (data) {
            selectedErpItemListActionsHook.onSet(selectedErpItemListValueHook?.filter(r => r.id !== data.id));
        } else {
            try {
                if (selectedErpItemListValueHook?.length >= 5000) {
                    throw new Error('최대 선택 가능한 개수는 5000개 입니다.');
                }
            } catch (err) {
                alert(err.message);
                return;
            }

            selectedErpItemListActionsHook.onSet([...selectedErpItemListValueHook, erpItem]);
        }
    }

    const handleChangePeriodType = (newPeriodType) => {
        setPeriodType(newPeriodType);
        let startDateTime = null;
        let endDateTime = null;

        switch (newPeriodType) {
            case 'ALL':
                startDateTime = null;
                endDateTime = null;
                break;
            case 'TODAY':
                endDateTime = new Date();
                startDateTime = CustomDateUtils().getStartDate(endDateTime);
                break;
            case '30DAYS':
                endDateTime = new Date();
                startDateTime = CustomDateUtils().getStartDate(CustomDateUtils().setPlusDate(endDateTime, 0, 0, -30));
                break;
            case '90DAYS':
                endDateTime = new Date();
                startDateTime = CustomDateUtils().getStartDate(CustomDateUtils().setPlusDate(endDateTime, 0, 0, -90));
                break;
            case '365DAYS':
                endDateTime = new Date();
                startDateTime = CustomDateUtils().getStartDate(CustomDateUtils().setPlusDate(endDateTime, 0, 0, -365));
                break;
        }
        handleReqFetchErpItemList({
            wsId: wsId,
            sameReceiverHint: targetSameReceiverHint,
            matchedCode: matchedCode,
            startDateTime: startDateTime,
            endDateTime: endDateTime
        })
    }

    const handleReqFetchErpItemList = async ({
        wsId,
        sameReceiverHint,
        matchedCode,
        startDateTime,
        endDateTime,
    }) => {
        setErpItemListPending(true);
        let headers = {
            wsId: wsId
        }

        let body = {
            sameReceiverHint: sameReceiverHint,
            matchedCode: matchedCode,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
        }

        const fetchResult = await apiHook.reqFetchErpItemListForSameReceiverHint({ body: body, headers: headers });

        if (fetchResult?.content) {
            setErpItemList(fetchResult?.content);
        }
        setErpItemListPending(false);
    }

    const handleReqFetchInventoryStockList = async () => {
        let productOptionIds = new Set();

        erpItemList?.forEach(r => {
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

        const fetchResult = await apiHook.reqFetchInventoryStockList({ body: body, headers: headers });

        if (fetchResult?.content) {
            setInventoryStockList(fetchResult?.content);
        }
    }

    const handleReqFetchProductOptionPackageInfoList = async () => {
        const productOptionIds = Array.from(new Set(erpItemList?.filter(r => r.packageYn === 'y').map(r => r.productOptionId)));

        if (!productOptionIds || productOptionIds?.length <= 0) {
            return;
        }

        let body = {
            productOptionIds: productOptionIds
        }

        let headers = {
            wsId: wsId
        }

        const fetchResult = await apiHook.reqFetchProductOptionPackageList({ body, headers });

        if (fetchResult?.content) {
            setProductOptionPackageInfoList(fetchResult?.content)
        }
    }

    useEffect(() => {
        if (!wsId || !targetSameReceiverHint || !matchedCode) {
            return;
        }

        handleReqFetchErpItemList({
            wsId: wsId,
            sameReceiverHint: targetSameReceiverHint,
            matchedCode: matchedCode,
            startDateTime: null,
            endDateTime: null
        });
    }, [wsId, targetSameReceiverHint, matchedCode]);

    useEffect(() => {
        if (!erpItemList) {
            return;
        }

        handleReqFetchInventoryStockList();
        handleReqFetchProductOptionPackageInfoList();
    }, [erpItemList]);

    const targetErpItemList = erpItemList?.filter(r => {
        if (tabType === 'ALL') {
            return true;
        }

        return StatusUtils().getClassificationTypeForFlags({ salesYn: r.salesYn, releaseYn: r.releaseYn, holdYn: r.holdYn }) === tabType
    });

    return (
        <>
            <CustomDialog open={open} onClose={() => handleCloseModal()} maxWidth='xl'>
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <CustomDialog.Title>동일 수취인의 주문 정보 입니다.</CustomDialog.Title>
                <St.BodyContainer>
                    <St.PeriodFieldWrapper>
                        <div className='title'><span style={{ fontWeight: 700 }}>[M] 주문수집일시</span> 기준 기간 내 동일 수취인 정보를 가져옵니다.</div>
                        <div className='buttonGroup'>
                            <CustomBlockButton
                                type='button'
                                className={`${periodType === 'ALL' ? 'active' : ''}`}
                                onClick={() => handleChangePeriodType('ALL')}
                            >
                                전체
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`${periodType === 'TODAY' ? 'active' : ''}`}
                                onClick={() => handleChangePeriodType('TODAY')}
                            >
                                오늘
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`${periodType === '30DAYS' ? 'active' : ''}`}
                                onClick={() => handleChangePeriodType('30DAYS')}
                            >
                                30일
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`${periodType === '90DAYS' ? 'active' : ''}`}
                                onClick={() => handleChangePeriodType('90DAYS')}
                            >
                                90일
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`${periodType === '365DAYS' ? 'active' : ''}`}
                                onClick={() => handleChangePeriodType('365DAYS')}
                            >
                                365일
                            </CustomBlockButton>
                        </div>
                    </St.PeriodFieldWrapper>
                    <St.TableFieldWrapper>
                        <div className='tabTypeBox'>
                            <div className={`tabTypeBox__tabType ${tabType === 'ALL' ? 'active' : ''}`} onClick={() => handleChangeTabType('ALL')}>전체</div>
                            <div className={`tabTypeBox__tabType ${tabType === 'NEW' ? 'active' : ''}`} onClick={() => handleChangeTabType('NEW')}>신규주문</div>
                            <div className={`tabTypeBox__tabType ${tabType === 'CONFIRM' ? 'active' : ''}`} onClick={() => handleChangeTabType('CONFIRM')}>주문확정</div>
                            <div className={`tabTypeBox__tabType ${tabType === 'COMPLETE' ? 'active' : ''}`} onClick={() => handleChangeTabType('COMPLETE')}>출고완료</div>
                            <div className={`tabTypeBox__tabType ${tabType === 'POSTPONE' ? 'active' : ''}`} onClick={() => handleChangeTabType('POSTPONE')}>보류데이터</div>
                        </div>
                        <div className='table-box'>
                            {erpItemListPending &&
                                <FieldLoadingV2
                                    boxStyle={{
                                        borderRadius: '15px'
                                    }}
                                />
                            }
                            <TableVirtuoso
                                data={targetErpItemList}
                                fixedHeaderContent={() => (
                                    <TableHeaderRow
                                        headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                        tabType={tabType}
                                        classificationType={classificationType}
                                        matchedCode={matchedCode}
                                    />
                                )}
                                itemContent={(rowIndex, data) => (
                                    <TableBodyRow
                                        erpItem={data}
                                        rowIndex={rowIndex}

                                        headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                        inventoryStocksList={inventoryStocksList}
                                        productOptionPackageInfoList={productOptionPackageInfoList}
                                        tabType={tabType}
                                        classificationType={classificationType}
                                        selectedErpItemListValueHook={selectedErpItemListValueHook}

                                        handleSelectErpItem={handleSelectErpItem}
                                    />
                                )}
                            />
                        </div>
                    </St.TableFieldWrapper>
                </St.BodyContainer>
            </CustomDialog>
        </>
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
    tabType,
    classificationType,
    matchedCode
}) {
    return (
        <tr>
            <th
                className="fixed-header"
                width={40}
            >
                No.
            </th>
            {tabType === classificationType &&
                <th
                    className="fixed-header"
                    width={50}
                >
                    선택
                </th>
            }
            <th
                className="fixed-header"
                width={50}
            >
                상태
            </th>
            {headers?.map(header => {
                return (
                    <ResizableTh
                        key={header.id}
                        className="fixed-header"
                        scope="col"
                        width={200}
                    >
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                        >
                            <div>
                                {header.customHeaderName}
                            </div>
                        </div>
                        {(HIGHLIGHT_FIELDS.includes(header.matchedFieldName) || header.matchedFieldName === (matchedCode || 'releaseOptionCode')) &&
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: 'var(--mainColor)' }}></div>
                        }
                    </ResizableTh>
                );
            })}
        </tr>
    );
}

function TableBodyRow({
    erpItem,
    rowIndex,

    headers,
    inventoryStocksList,
    productOptionPackageInfoList,
    tabType,
    classificationType,
    selectedErpItemListValueHook,

    handleSelectErpItem
}) {
    const isSelected = selectedErpItemListValueHook?.find(r => r.id === erpItem.id);
    let inventoryStock = inventoryStocksList?.find(r => r.productOptionId === erpItem?.productOptionId);
    let isPackaged = erpItem?.packageYn === 'y' ? true : false;
    let isOutOfStock = !isPackaged && inventoryStock && inventoryStock?.stockUnit <= 0;
    const currStatus = StatusUtils().getClassificationTypeForFlags({ salesYn: erpItem.salesYn, releaseYn: erpItem.releaseYn, holdYn: erpItem.holdYn });
    const canSelect = tabType === classificationType;

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
                className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
            >
                {rowIndex + 1}
            </td>
            {canSelect &&
                <td
                    className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                    onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
                >
                    <input
                        type='checkbox'
                        checked={isSelected || false}
                        onChange={() => handleSelectErpItem(erpItem)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: 'pointer' }}
                    ></input>
                </td>
            }
            <td
                className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
            >
                {currStatus === 'NEW' ? <div className='statusBadge green'>신규</div> :
                    currStatus === 'CONFIRM' ? <div className='statusBadge orange'>확정</div> :
                        currStatus === 'COMPLETE' ? <div className='statusBadge blue'>출고</div> :
                            currStatus === 'POSTPONE' ? <div className='statusBadge gray'>보류</div> :
                                <div className='statusBadge red'>미확인</div>
                }
            </td>
            {headers?.map(header => {
                if (['createdAt', 'salesAt', 'releaseAt', 'holdAt', 'channelOrderDate'].includes(header.matchedFieldName)) {
                    return (
                        <td
                            key={header.id}
                            className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                            onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
                        >
                            {erpItem[header.matchedFieldName] ? CustomDateUtils().dateToYYYYMMDDhhmmss(erpItem[header.matchedFieldName]) : ''}
                        </td>
                    )
                }

                if (['price', 'deliveryCharge'].includes(header.matchedFieldName)) {
                    return (
                        <td
                            key={header.id}
                            className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                            onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
                        >
                            {erpItem[header.matchedFieldName] ? CustomNumberUtils().numberWithCommas2(erpItem[header.matchedFieldName]) : ''}
                        </td>
                    )
                }

                if (['optionStockUnit'].includes(header.matchedFieldName)) {
                    if (isPackaged) {
                        return (
                            <td
                                key={header.id}
                                className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                                style={{ background: (isOutOfStock) ? 'var(--defaultRedColorOpacity500)' : '', color: 'var(--defaultGreenColor)' }}
                                onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
                            >
                                패키지 상품
                            </td>
                        )
                    } else {
                        return (
                            <td
                                key={header.id}
                                className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                                style={{ background: isOutOfStock ? 'var(--defaultRedColorOpacity500)' : '' }}
                                onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
                            >
                                {inventoryStock ? inventoryStock?.stockUnit : '옵션코드 미지정'}
                            </td>
                        )
                    }

                }

                return (
                    <td
                        key={header.id}
                        className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                        onClick={canSelect ? () => handleSelectErpItem(erpItem) : () => { }}
                    >
                        {erpItem[header.matchedFieldName]}
                    </td>
                );
            })}
        </>
    );
}