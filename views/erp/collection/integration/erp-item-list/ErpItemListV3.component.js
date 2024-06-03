import _ from "lodash";
import { useRouter } from "next/router";
import React, { memo, useEffect, useRef, useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import { numberWithCommas } from "../../../../../utils/numberFormatUtils";
import CustomImage from "../../../../modules/image/CustomImage";
import FieldLoadingV2 from "../../../../modules/loading/FieldLoadingV2";
import { PinButtonBox, TableFieldWrapper, ViewHeaderSelectNotice } from "./styles/ErpItemListV3.styled";
import { CustomSearchOptionCodesModal } from "../../../../../components/search-option-codes/v2";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";
import { Base64Utils } from "../../../../../utils/base64Utils";
import { ClipboardUtils } from "../../../../../utils/ClipboardUtils";
import { useViewOptionsValueHook } from "../contexts/ViewOptionsProvider";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../contexts/SelectedErpItemListProvider";
import { useErpItemActionsHook, useErpItemValueHook } from "../contexts/ErpItemProvider";
import { useApiHook } from "../hooks/useApiHook";
import { useSelector } from "react-redux";
import { StatusUtils } from "../utils/StatusUtils";
import { TableVirtuoso } from "react-virtuoso";
import { MdErpItemListForSameReceiver } from "./modal/MdErpItemListForSameReceiver/MdErpItemListForSameReceiver";
import { MdViewPackageList } from "./modal/MdViewPackageList/MdViewPackageList";

const base64Utils = Base64Utils();
const statusUtils = StatusUtils();

function getViewErpItemContent(erpItemList, viewOptions, productOptionPackageInfoList, inventoryStocks, erpItemSameReceiverHints) {
    return erpItemList?.filter(item => {
        let inventoryStock = inventoryStocks?.find(r => r.productOptionId === item?.productOptionId);
        let isPackaged = item?.packageYn === 'y' ? true : false;
        let isOutOfStock = !isPackaged && inventoryStock && inventoryStock?.stockUnit <= 0;
        const sameReceiverHint = base64Utils.encodeBase64(`${item?.receiver}${item?.receiverContact1}${item?.destination}${item?.destinationDetail}`);
        let hasSameReceiver = erpItemSameReceiverHints?.find(hint => hint.sameReceiverHint === sameReceiverHint)?.count > 1 ? true : false;
        let stockOptionTypeBool = true;
        let receiverOptionTypeBool = true;

        if (isPackaged) {
            let childOptionList = productOptionPackageInfoList?.filter(r => r.parentProductOptionId === item?.productOptionId);
            for (let i = 0; i < childOptionList?.length; i++) {
                if ((childOptionList[i].unit * item?.unit) > childOptionList[i]?.stockUnit) {
                    isOutOfStock = true;
                    break;
                }
            }
        }

        switch (viewOptions?.stockOptionType) {
            case 'EXIST':
                if (isOutOfStock) {
                    stockOptionTypeBool = false;
                }
                break;
            case 'NOT_EXIST':
                if (!isOutOfStock) {
                    stockOptionTypeBool = false
                }
                break;
        }

        switch (viewOptions?.receiverOptionType) {
            case 'SINGLE':
                if (hasSameReceiver) {
                    receiverOptionTypeBool = false;
                }
                break;
            case 'MULTI':
                if (!hasSameReceiver) {
                    receiverOptionTypeBool = false;
                }
                break;
        }

        if (!stockOptionTypeBool || !receiverOptionTypeBool) {
            return false;
        }

        return true;
    })
}

export default function ErpItemListComponent({
    erpCollectionHeader,
    inventoryStocks,
    erpItemSameReceiverHints,
    productOptionPackageInfoList,
}) {
    const router = useRouter();
    const virtuosoScrollRef = useRef();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    const apiHook = useApiHook();

    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemActionsHook = useSelectedErpItemListActionsHook();
    const viewOptions = useViewOptionsValueHook();

    const [editOptionCodeModalOpen, setEditOptionCodeModalOpen] = useState(false);
    const [editReleaseOptionCodeModalOpen, setEditReleaseOptionCodeModalOpen] = useState(false);
    const [viewPackageListModalOpen, setViewPackageListModalOpen] = useState(false);
    const [targetErpItem, setTargetErpItem] = useState(null);
    const [statusPin, setStatusPin] = useState(true);

    const [erpItemListForSameReceiverModalOpen, setErpItemListForSameReceiverModalOpen] = useState(false);
    const [targetSameReceiverHint, setTargetSameReceiverHint] = useState(null);

    useEffect(() => {
        if (virtuosoScrollRef?.current) {
            virtuosoScrollRef.current.scrollTo({ top: 0 });
        }
    }, [router?.query]);

    const toggleEditOptionCodeModalOpen = (erpItem) => {
        if (erpItem) {
            setTargetErpItem(_.cloneDeep(erpItem));
            setEditOptionCodeModalOpen(true);
        } else {
            setTargetErpItem(null);
            setEditOptionCodeModalOpen(false);
        }
    }

    const toggleEditReleaseOptionCodeModalOpen = (erpItem) => {
        if (erpItem) {
            if (erpItem.stockReflectYn === 'y') {
                alert('이미 재고에 반영된 데이터는 [M] 출고옵션코드를 변경할 수 없습니다.\n재고반영을 취소 후 변경해 주세요.');
                return;
            }
            setTargetErpItem(_.cloneDeep(erpItem));
            setEditReleaseOptionCodeModalOpen(true);
        } else {
            setTargetErpItem(null);
            setEditReleaseOptionCodeModalOpen(false);
        }
    }

    const toggleErpItemListForSameReceiverModalOpen = (sameReceiverHint) => {
        if (sameReceiverHint) {
            setErpItemListForSameReceiverModalOpen(true);
            setTargetSameReceiverHint(sameReceiverHint);
        } else {
            setErpItemListForSameReceiverModalOpen(false);
            setTargetSameReceiverHint(null);
        }
    }

    const toggleViewPackageListModalOpen = (erpItem) => {
        if (erpItem) {
            setTargetErpItem(erpItem);
            setViewPackageListModalOpen(true);
        } else {
            setTargetErpItem(null);
            setViewPackageListModalOpen(false);
        }
    }

    const handleSubmitEditOptionCode = async (selectedOptionCode) => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let body = {
            id: targetErpItem.id,
            optionCode: selectedOptionCode,
            matchedCode: router?.query?.matchedCode
        }

        const updateResult = await apiHook.reqChangeErpItem_OptionCode({ body, headers });

        if (updateResult) {
            const fetchResult = await apiHook.reqFetchErpItemListByIds({
                body: {
                    workspaceId: workspaceRedux?.workspaceInfo?.id,
                    ids: [targetErpItem.id],
                    matchedCode: router?.query?.matchedCode
                }, headers
            });

            if (fetchResult) {
                let resultContent = fetchResult?.content;
                let newErpItemContent = _.cloneDeep(erpItemValueHook?.content);
                let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

                newErpItemContent.content = newErpItemContent?.content?.map(erpItem => {
                    let resultErpItem = resultContent?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                newSelectedErpItemList = newSelectedErpItemList?.map(erpItem => {
                    let resultErpItem = resultContent?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                erpItemActionsHook.content.onSet(newErpItemContent);
                selectedErpItemActionsHook.onSet(newSelectedErpItemList);
            }
        }

        toggleEditOptionCodeModalOpen(null);
    }

    const handleSubmitEditReleaseOptionCode = async (selectedOptionCode) => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let body = {
            id: targetErpItem.id,
            releaseOptionCode: selectedOptionCode,
            matchedCode: router?.query?.matchedCode
        }

        const updateResult = await apiHook.reqChangeErpItem_ReleaseOptionCode({ body, headers });

        if (updateResult) {
            const fetchResult = await apiHook.reqFetchErpItemListByIds({
                body: {
                    workspaceId: workspaceRedux?.workspaceInfo?.id,
                    ids: [targetErpItem.id],
                    matchedCode: router?.query?.matchedCode
                }, headers
            });

            if (fetchResult) {
                let resultContent = fetchResult?.content;
                let newErpItemContent = _.cloneDeep(erpItemValueHook?.content);
                let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

                newErpItemContent.content = newErpItemContent?.content?.map(erpItem => {
                    let resultErpItem = resultContent?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                newSelectedErpItemList = newSelectedErpItemList?.map(erpItem => {
                    let resultErpItem = resultContent?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                erpItemActionsHook.content.onSet(newErpItemContent);
                selectedErpItemActionsHook.onSet(newSelectedErpItemList);
            }
        }

        toggleEditReleaseOptionCodeModalOpen(null);
    }

    const handleToggleStatusPin = (pin) => {
        setStatusPin(pin)
    }
    if (!erpCollectionHeader) {
        return (
            <ViewHeaderSelectNotice>
                <div className='wrapper'>
                    <div>우측 상단의 [뷰헤더 선택]을 통해서</div>
                    <div>뷰헤더를 먼저 선택해 주세요.</div>
                </div>
            </ViewHeaderSelectNotice>
        );
    }

    const erpItemContentWithViewOptions = getViewErpItemContent(erpItemValueHook?.content?.content, viewOptions, productOptionPackageInfoList, inventoryStocks, erpItemSameReceiverHints);

    return (
        <>
            <PinButtonBox>
                <CustomBlockButton
                    type='button'
                    onClick={() => handleToggleStatusPin(!statusPin)}
                    className='button-item'
                >
                    <div style={statusPin ? { color: 'var(--mainColor)', fontWeight: '700' } : {}}>상태창</div>
                    {statusPin &&
                        <span style={{ width: 17, height: 17, display: 'inline-block', margin: 0, padding: 0, border: 'none' }}>
                            <CustomImage src={`/images/icon/pushPin_default_344b98.svg`} />
                        </span>
                    }
                </CustomBlockButton>
            </PinButtonBox>
            <TableFieldWrapper>
                <div style={{ position: 'relative' }}>
                    {erpItemValueHook?.isLoading &&
                        <FieldLoadingV2
                            boxStyle={{
                                borderRadius: '15px'
                            }}
                        />
                    }

                    <div className='table-box'>
                        <TableVirtuoso
                            ref={virtuosoScrollRef}
                            data={erpItemContentWithViewOptions}
                            fixedHeaderContent={() => (
                                <TableHeaderRow
                                    header={erpCollectionHeader}
                                    erpItems={erpItemContentWithViewOptions}
                                    statusPin={statusPin}
                                    matchedCode={router?.query?.matchedCode}
                                />
                            )}
                            itemContent={(rowIndex, targetErpItem) => (
                                <TableBodyRow
                                    targetErpItem={targetErpItem}
                                    rowIndex={rowIndex}
                                    productOptionPackageInfoList={productOptionPackageInfoList}

                                    header={erpCollectionHeader}
                                    inventoryStocks={inventoryStocks}
                                    statusPin={statusPin}
                                    erpItemSameReceiverHints={erpItemSameReceiverHints}
                                    handleOpenEditOptionCodeModal={toggleEditOptionCodeModalOpen}
                                    handleOpenEditReleaseOptionCodeModal={toggleEditReleaseOptionCodeModalOpen}
                                    handleOpenItemsForSameReceiverModal={toggleErpItemListForSameReceiverModalOpen}

                                    toggleViewPackageListModalOpen={toggleViewPackageListModalOpen}
                                />
                            )}
                        />
                    </div>
                </div>
            </TableFieldWrapper>

            {editOptionCodeModalOpen &&
                <CustomSearchOptionCodesModal
                    open={editOptionCodeModalOpen}
                    onClose={() => toggleEditOptionCodeModalOpen(null)}
                    onSelect={(result) => handleSubmitEditOptionCode(result)}
                />
            }

            {editReleaseOptionCodeModalOpen &&
                <CustomSearchOptionCodesModal
                    open={editReleaseOptionCodeModalOpen}
                    onClose={() => toggleEditReleaseOptionCodeModalOpen(null)}
                    onSelect={(result) => handleSubmitEditReleaseOptionCode(result)}
                />
            }

            {erpItemListForSameReceiverModalOpen &&
                <MdErpItemListForSameReceiver
                    open={erpItemListForSameReceiverModalOpen}
                    toggleErpItemListForSameReceiverModalOpen={toggleErpItemListForSameReceiverModalOpen}
                    targetSameReceiverHint={targetSameReceiverHint}
                    erpCollectionHeader={erpCollectionHeader}
                />
            }

            {viewPackageListModalOpen &&
                <MdViewPackageList
                    open={viewPackageListModalOpen}
                    toggleViewPackageListModalOpen={toggleViewPackageListModalOpen}
                    targetErpItem={targetErpItem}
                />
            }
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
    header,
    erpItems,
    statusPin,
    matchedCode
}) {
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const handleSelectAllSelectedErpItemListInPage = (items) => {
        let originIds = selectedErpItemListValueHook?.map(r => r.id);
        let newItems = _.cloneDeep(selectedErpItemListValueHook);

        try {

            items?.forEach(erpItem => {
                if (originIds?.includes(erpItem.id)) {
                    return;
                }
                if (newItems?.length >= 5000) {
                    throw new Error('최대 선택 가능한 개수는 5000개 입니다.');
                }
                newItems.push(erpItem);
            });
        } catch (err) {
            alert(err.message);
            return;
        } finally {
            selectedErpItemListActionsHook.onSet(newItems);
        }
    }

    const handleClearAllSelectedErpItemListInPage = (items) => {
        selectedErpItemListActionsHook.onSet(
            selectedErpItemListValueHook?.filter(selected => !items?.some(item => item.id === selected.id))
        )
    }

    return (
        <tr>
            <th
                className="fixed-header"
                width={40}
            >
                No.
            </th>
            <th
                className="fixed-header"
                width={50}
            >
                {erpItems?.every(r => selectedErpItemListValueHook?.some(r2 => r2.id === r.id)) ?
                    <input
                        type='checkbox'
                        name={'checkbox'}
                        onChange={() => handleClearAllSelectedErpItemListInPage(erpItems)}
                        checked={true}
                        style={{ cursor: 'pointer' }}
                    ></input>
                    :
                    <input
                        type='checkbox'
                        name={'checkbox'}
                        onChange={() => handleSelectAllSelectedErpItemListInPage(erpItems)}
                        checked={false}
                        style={{ cursor: 'pointer' }}
                    ></input>
                }
            </th>
            {header?.erpCollectionHeaderDetails?.map((r, index) => {
                return (
                    <ResizableTh
                        key={r.id}
                        className="fixed-header"
                        scope="col"
                        width={200}
                    >
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                        >
                            <div>
                                {r.customHeaderName}
                            </div>
                        </div>
                        {(HIGHLIGHT_FIELDS.includes(r.matchedFieldName) || r.matchedFieldName === (matchedCode || 'releaseOptionCode')) &&
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: 'var(--mainColor)' }}></div>
                        }
                    </ResizableTh>
                )
            })}
            {statusPin &&
                <>
                    <th
                        className={`fixed-header fixed-col-right`}
                        width={45}
                        style={{
                            zIndex: '12',
                            right: 90,
                            borderLeft: '1px dashed #c0c0c0',
                            padding: 0,
                            fontSize: '10px'
                        }}
                    >
                        <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-center'>
                            재고반영
                        </div>
                    </th>
                    <th
                        className={`fixed-header fixed-col-right`}
                        width={45}
                        style={{
                            zIndex: '12',
                            right: 45,
                            padding: 0,
                            fontSize: '10px'
                        }}
                    >
                        패키지
                    </th>
                    <th
                        className={`fixed-header fixed-col-right`}
                        width={45}
                        style={{
                            zIndex: '12',
                            padding: 0,
                            fontSize: '10px'
                        }}
                    >
                        상태
                    </th>
                </>
            }
        </tr>
    )
}

function TableBodyRow({
    targetErpItem,
    rowIndex,
    productOptionPackageInfoList,
    header,
    inventoryStocks,
    statusPin,
    erpItemSameReceiverHints,
    handleOpenEditOptionCodeModal,
    handleOpenEditReleaseOptionCodeModal,
    handleOpenItemsForSameReceiverModal,
    toggleViewPackageListModalOpen
}) {
    const item = targetErpItem;

    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const isSelected = selectedErpItemListValueHook?.find(r => r.id === item?.id);
    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === item?.productOptionId);
    let isPackaged = item?.packageYn === 'y' ? true : false;
    let isOutOfStock = !isPackaged && inventoryStock && inventoryStock?.stockUnit < targetErpItem?.unit;
    let currStatus = statusUtils.getClassificationTypeForFlags({ salesYn: item?.salesYn, releaseYn: item?.releaseYn, holdYn: item?.holdYn });

    if (isPackaged) {
        let childOptionList = productOptionPackageInfoList?.filter(r => r.parentProductOptionId === item?.productOptionId);
        for (let i = 0; i < childOptionList?.length; i++) {
            if ((childOptionList[i].unit * item?.unit) > childOptionList[i]?.stockUnit) {
                isOutOfStock = true;
                break;
            }
        }
    }

    const handleSelectErpItem = () => {
        let data = selectedErpItemListValueHook?.find(r => r.id === item.id);

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

            selectedErpItemListActionsHook.onSet([...selectedErpItemListValueHook, item]);
        }
    }

    return (
        <>
            <td
                className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!item?.productOptionId ? 'noOptionCode' : ''}`}
                onClick={(e) => { e.stopPropagation(); handleSelectErpItem(item); }}
            >
                {rowIndex + 1}
            </td>
            <td
                className={`${isSelected ? 'active' : ''} ${(isOutOfStock) ? 'noStocks' : ''} ${!item?.productOptionId ? 'noOptionCode' : ''}`}
                onClick={(e) => { e.stopPropagation(); handleSelectErpItem(item); }}
            >
                <input
                    type='checkbox'
                    name='checkbox'
                    checked={isSelected || false}
                    onChange={() => handleSelectErpItem(item)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: 'pointer' }}
                ></input>
            </td>
            {header?.erpCollectionHeaderDetails?.map(r2 => {
                let matchedFieldName = r2.matchedFieldName;
                return (
                    <Td
                        key={`col-${matchedFieldName}`}
                        onClick={handleSelectErpItem}
                        erpItem={item}
                        matchedFieldName={matchedFieldName}
                        isSelected={isSelected}
                        isOutOfStock={isOutOfStock}
                        isPackaged={isPackaged}
                        inventoryStock={inventoryStock}
                        erpItemSameReceiverHints={erpItemSameReceiverHints}

                        onActionOpenEditOptionCodeModal={handleOpenEditOptionCodeModal}
                        onActionOpenEditReleaseOptionCodeModal={handleOpenEditReleaseOptionCodeModal}
                        onActionOpenItemsForSameReceiverModal={handleOpenItemsForSameReceiverModal}

                        toggleViewPackageListModalOpen={toggleViewPackageListModalOpen}
                    />
                );
            })}
            {statusPin &&
                <>
                    <td
                        className={`fixed-col-right`}
                        style={{
                            right: 90,
                            borderLeft: '1px dashed #c0c0c0',
                            padding: 0
                        }}
                    >
                        <div
                            style={{
                                width: 20,
                                margin: '0 auto'
                            }}
                        >
                            {item?.stockReflectYn === 'y' ?
                                <CustomImage
                                    src='/images/icon/check_default_5fcf80.svg'
                                />
                                :
                                <CustomImage
                                    src='/images/icon/close_default_e56767.svg'
                                />
                            }
                        </div>
                    </td>
                    <td
                        className={`fixed-col-right`}
                        style={{
                            right: 45,
                            padding: 0
                        }}
                    >
                        {isPackaged &&
                            <div
                                style={{
                                    width: 20,
                                    margin: '0 auto'
                                }}
                                className='td-clickable-text'
                                onClick={(e) => { e.stopPropagation(); toggleViewPackageListModalOpen(item); }}
                            >
                                <CustomImage
                                    src='/images/icon/check_default_5fcf80.svg'
                                />
                            </div>
                        }
                    </td>
                    <td
                        className={`fixed-col-right`}
                        style={{
                            padding: 0
                        }}
                    >

                        {currStatus === 'NEW' ? <div className='statusBadge green'>신규</div> :
                            currStatus === 'CONFIRM' ? <div className='statusBadge orange'>확정</div> :
                                currStatus === 'COMPLETE' ? <div className='statusBadge blue'>출고</div> :
                                    currStatus === 'POSTPONE' ? <div className='statusBadge gray'>보류</div> :
                                        <div className='statusBadge red'>미확인</div>
                        }
                    </td>
                </>
            }
        </>
    )
}

function Td({
    onClick,
    erpItem,
    matchedFieldName,
    isSelected,
    isOutOfStock,
    isPackaged,
    inventoryStock,
    erpItemSameReceiverHints,

    onActionOpenEditOptionCodeModal,
    onActionOpenEditReleaseOptionCodeModal,
    onActionOpenItemsForSameReceiverModal,

    toggleViewPackageListModalOpen
}) {
    let renderingType = 'default';

    switch (matchedFieldName) {
        case 'createdAt': case 'salesAt': case 'releaseAt': case 'holdAt': case 'channelOrderDate': renderingType = 'date'; break;
        case 'price': case 'deliveryCharge': renderingType = 'money'; break;
        case 'optionCode': renderingType = 'optionCode'; break;
        case 'releaseOptionCode': renderingType = 'releaseOptionCode'; break;
        case 'optionStockUnit': renderingType = 'optionStockUnit'; break;
        case 'receiver': renderingType = 'receiver'; break;
        default: renderingType = 'default'; break;
    }

    return RenderingTdComponent({
        onClick,
        erpItem,
        matchedFieldName,
        isSelected,
        isPackaged,
        isOutOfStock,
        inventoryStock,
        erpItemSameReceiverHints,
        onActionOpenEditOptionCodeModal,
        onActionOpenEditReleaseOptionCodeModal,
        onActionOpenItemsForSameReceiverModal,

        toggleViewPackageListModalOpen
    })[renderingType];
}

const RenderingTdComponent = (props) => ({
    date: <DateTd {...props} />,
    money: <MoneyTd {...props} />,
    optionCode: <OptionCodeTd {...props} />,
    releaseOptionCode: <ReleaseOptionCodeTd {...props} />,
    optionStockUnit: <OptionStockUnitTd {...props} />,
    receiver: <ReceiverTd {...props} />,
    default: <DefaultTd {...props} />,
});

function DateTd(props) {
    const erpItem = props?.erpItem;
    const matchedFieldName = props?.matchedFieldName;

    return (
        <td
            className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
            onClick={(e) => { props?.onClick(erpItem?.id) }}
        >
            <span
                className='td-copyable-text'
                onClick={(e) => {
                    e.stopPropagation();
                    ClipboardUtils.copyToClipboard(erpItem[matchedFieldName] ? dateToYYYYMMDDhhmmss(erpItem[matchedFieldName]) : "")
                }}
            >
                {erpItem[matchedFieldName] ? dateToYYYYMMDDhhmmss(erpItem[matchedFieldName]) : ""}
            </span>
        </td>
    );
}

function MoneyTd(props) {
    const erpItem = props?.erpItem;
    const matchedFieldName = props?.matchedFieldName;

    return (
        <td
            className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
            onClick={(e) => { props?.onClick(erpItem?.id) }}
        >
            <span
                className='td-copyable-text'
                onClick={(e) => {
                    e.stopPropagation();
                    ClipboardUtils.copyToClipboard(erpItem[matchedFieldName] ? numberWithCommas(erpItem[matchedFieldName]) : "0")
                }}
            >
                {erpItem[matchedFieldName] ? numberWithCommas(erpItem[matchedFieldName]) : "0"}
            </span>
        </td>
    );
}

function OptionCodeTd(props) {
    const erpItem = props?.erpItem;
    const matchedFieldName = props?.matchedFieldName;
    const onActionOpenEditOptionCodeModal = props?.onActionOpenEditOptionCodeModal;

    return (
        <td
            className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
            onClick={(e) => { props?.onClick(erpItem?.id) }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <div
                    style={{
                        background: 'var(--defaultBlueColor)',
                        borderRadius: '5px',
                        width: '5px',
                        height: '100%'
                    }}
                ></div>
                <div style={{ flex: 7 }}>
                    <span
                        className='td-copyable-text'
                        onClick={(e) => {
                            e.stopPropagation();
                            ClipboardUtils.copyToClipboard(erpItem[matchedFieldName])
                        }}
                        style={{
                            color: erpItem[matchedFieldName] ? '' : '#808080'
                        }}
                    >
                        {erpItem[matchedFieldName] || '[M] 옵션코드 미지정'}
                    </span>
                </div>
                <button
                    type='button'
                    className='td-control-button-item'
                    onClick={(e) => { e.stopPropagation(); onActionOpenEditOptionCodeModal(erpItem); }}
                >
                    <CustomImage
                        src={'/images/icon/search_default_ffffff.svg'}
                    />
                </button>
            </div>
        </td>
    );
}

function ReleaseOptionCodeTd(props) {
    const erpItem = props?.erpItem;
    const matchedFieldName = props?.matchedFieldName;
    const onActionOpenEditReleaseOptionCodeModal = props?.onActionOpenEditReleaseOptionCodeModal;

    return (
        <td
            className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
            onClick={(e) => { props?.onClick(erpItem?.id) }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <div
                    style={{
                        background: 'var(--defaultBlueColor)',
                        borderRadius: '5px',
                        width: '5px',
                        height: '100%'
                    }}
                ></div>
                <div style={{ flex: 1 }}>
                    <span
                        className='td-copyable-text'
                        onClick={(e) => {
                            e.stopPropagation();
                            ClipboardUtils.copyToClipboard(erpItem[matchedFieldName])
                        }}
                        style={{
                            color: erpItem[matchedFieldName] ? '' : '#808080'
                        }}
                    >
                        {erpItem[matchedFieldName] || '[M] 출고옵션코드 미지정'}
                    </span>
                </div>
                <button
                    type='button'
                    className='td-control-button-item'
                    onClick={(e) => { e.stopPropagation(); onActionOpenEditReleaseOptionCodeModal(erpItem) }}
                >
                    <CustomImage
                        src={'/images/icon/search_default_ffffff.svg'}
                        loading="eager"
                    />
                </button>
            </div>
        </td>
    );
}

function OptionStockUnitTd(props) {
    const erpItem = props?.erpItem;
    const isPackaged = props?.isPackaged;
    const isOutOfStock = props?.isOutOfStock;
    const inventoryStock = props?.inventoryStock;

    if (isPackaged) {
        return (
            <td
                className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                onClick={(e) => { props?.onClick(erpItem?.id) }}
                style={{ background: (isOutOfStock) ? 'var(--defaultRedColorOpacity500)' : '', color: 'var(--defaultGreenColor)' }}
            >
                <span
                    className='td-clickable-text'
                    onClick={(e) => { e.stopPropagation(); props.toggleViewPackageListModalOpen(erpItem); }}
                >
                    패키지상품
                </span>
            </td>
        );
    } else {
        return (
            <td
                className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
                onClick={(e) => { props?.onClick(erpItem?.id) }}
                style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity500)' : '' }}
            >
                {inventoryStock ? inventoryStock?.stockUnit : '옵션코드 미지정'}
            </td>
        );
    }

}

function ReceiverTd(props) {
    const erpItem = props?.erpItem;
    const matchedFieldName = props?.matchedFieldName;
    const erpItemSameReceiverHints = props?.erpItemSameReceiverHints;
    const onActionOpenItemsForSameReceiverModal = props?.onActionOpenItemsForSameReceiverModal;
    const sameReceiverHint = base64Utils.encodeBase64(`${erpItem?.receiver}${erpItem?.receiverContact1}${erpItem?.destination}${erpItem?.destinationDetail}`);
    const hasSameReceiver = erpItemSameReceiverHints?.find(hint => hint.sameReceiverHint === sameReceiverHint)?.count > 1 ? true : false;

    return (
        <td
            className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
            onClick={(e) => { props?.onClick(erpItem?.id) }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <div
                    style={{
                        background: hasSameReceiver ? 'var(--defaultPurpleColor)' : '',
                        borderRadius: '5px',
                        width: '5px',
                        height: '100%'
                    }}
                ></div>
                <div style={{ flex: 1 }}>
                    <span
                        className='td-copyable-text'
                        onClick={(e) => {
                            e.stopPropagation();
                            ClipboardUtils.copyToClipboard(erpItem[matchedFieldName])
                        }}
                    >
                        {erpItem[matchedFieldName]}
                    </span>
                </div>
                <div style={{ width: '30px' }}>
                    {hasSameReceiver &&
                        <button
                            type='button'
                            className='td-control-button-item'
                            onClick={hasSameReceiver ? (e) => { e.stopPropagation(); onActionOpenItemsForSameReceiverModal(sameReceiverHint); } : () => { }}
                        >
                            <CustomImage
                                src={'/images/icon/search_default_ffffff.svg'}
                            />
                        </button>
                    }
                </div>
            </div>
        </td>
    );
}

function DefaultTd(props) {
    const erpItem = props?.erpItem;
    const matchedFieldName = props?.matchedFieldName;

    return (
        <td
            className={`${props?.isSelected ? 'active' : ''} ${(props?.isOutOfStock) ? 'noStocks' : ''} ${!props?.erpItem?.productOptionId ? 'noOptionCode' : ''}`}
            onClick={(e) => { props?.onClick(erpItem?.id) }}
        >
            <span
                className='td-copyable-text'
                onClick={(e) => {
                    e.stopPropagation();
                    ClipboardUtils.copyToClipboard(erpItem[matchedFieldName])
                }}
            >
                {erpItem[matchedFieldName]}
            </span>
        </td>
    )
}