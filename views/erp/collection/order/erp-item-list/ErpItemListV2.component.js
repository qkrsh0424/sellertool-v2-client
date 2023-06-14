import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import { numberWithCommas } from "../../../../../utils/numberFormatUtils";
import CustomImage from "../../../../modules/image/CustomImage";
import FieldLoadingV2 from "../../../../modules/loading/FieldLoadingV2";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ItemsForSameReceiverModalComponent from "./modal/ItemsForSameReceiverModal.component";
import { PinButtonBox, TableFieldWrapper, ViewHeaderSelectNotice } from "./styles/ErpItemListV2.styled";
import { CustomSearchOptionCodesModal, useSearchOptionCodesModalControl } from "../../../../../components/search-option-codes/v2";
import { CustomVirtualTable } from "../../../../../components/table/virtual-table/v1";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";
import { TextDragableDancer } from "../../../../../components/tapdancer/v1";

export default function ErpItemListComponent({
    erpCollectionHeader,
    erpItemPage,
    selectedErpItems,
    inventoryStocks,
    erpItemSameReceiverHints,

    onSelectErpItem,
    onSelectAllErpItems,
    onSelectClearAllErpItemsInPage,
    erpItemPagePending,
    onSubmitChangeOptionCode,
    onSubmitChangeReleaseOptionCode,
}) {
    const router = useRouter();
    const virtuosoScrollRef = useRef();
    const editOptionCodeModalControl = useSearchOptionCodesModalControl();
    const editReleaseOptionCodeModalControl = useSearchOptionCodesModalControl();

    const [targetErpItem, setTargetErpItem] = useState(null);
    const [statusPin, setStatusPin] = useState(false);

    const [itemsForSameReceiverModalOpen, setItemsFormSameReceiverModalOpen] = useState(false);
    const [targetSameReceiverHint, setTargetSameReceiverHint] = useState(null);

    useEffect(() => {
        if (virtuosoScrollRef?.current) {
            virtuosoScrollRef.current.scrollTo({ top: 0 });
        }
    }, [router?.query]);

    const handleOpenEditOptionCodeModal = (e, erpItem) => {
        e.stopPropagation();
        setTargetErpItem(_.cloneDeep(erpItem));
        editOptionCodeModalControl.toggleOpen(true);
    }

    const handleCloseEditOptionCodeModal = () => {
        editOptionCodeModalControl.toggleOpen(false);
        setTargetErpItem(null);
    }

    const handleOpenEditReleaseOptionCodeModal = (e, erpItem) => {
        e.stopPropagation();
        setTargetErpItem(_.cloneDeep(erpItem));
        editReleaseOptionCodeModalControl.toggleOpen(true);

    }

    const handleCloseEditReleaseOptionCodeModal = () => {
        editReleaseOptionCodeModalControl.toggleOpen(false);
        setTargetErpItem(null);
    }

    const handleSubmitEditOptionCode = (selectedOptionCode) => {
        let body = {
            id: targetErpItem?.id,
            optionCode: selectedOptionCode
        }

        onSubmitChangeOptionCode(body, () => {
            handleCloseEditOptionCodeModal();
        })
    }

    const handleSubmitEditReleaseOptionCode = (selectedOptionCode) => {
        let body = {
            id: targetErpItem?.id,
            releaseOptionCode: selectedOptionCode
        }

        onSubmitChangeReleaseOptionCode(body, () => {
            handleCloseEditReleaseOptionCodeModal();
        })
    }

    const handleOpenItemsForSameReceiverModal = (e, sameReceiverHint) => {
        e.stopPropagation()

        setTargetSameReceiverHint(sameReceiverHint);
        setItemsFormSameReceiverModalOpen(true);
    }

    const handleCloseItemsForSameReceiverModal = () => {
        setItemsFormSameReceiverModalOpen(false);
        setTargetSameReceiverHint(null);
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

    return (
        <>
            <PinButtonBox>
                <CustomBlockButton
                    type='button'
                    onClick={() => handleToggleStatusPin(!statusPin)}
                    className='button-item'
                >
                    <div style={statusPin ? { color: 'var(--mainColor)' } : {}}>상태창</div>
                    <span style={{ width: 17, height: 17, display: 'inline-block', margin: 0, padding: 0, border: 'none' }}>
                        {statusPin ? <CustomImage src={`/images/icon/pushPin_default_344b98.svg`} /> : <CustomImage src={`/images/icon/pushPin_default_a0a0a0.svg`} />}
                    </span>

                </CustomBlockButton>
            </PinButtonBox>
            <TableFieldWrapper>
                <div style={{ position: 'relative' }}>
                    {erpItemPagePending &&
                        <FieldLoadingV2
                            boxStyle={{
                                borderRadius: '15px'
                            }}
                        />
                    }

                    <div className='table-box'>
                        <CustomVirtualTable
                            ref={virtuosoScrollRef}
                            height={500}
                            data={erpItemPage?.content}
                            THeadRow={
                                () => (
                                    <TableHeaderRow
                                        header={erpCollectionHeader}
                                        erpItems={erpItemPage?.content}
                                        selectedErpItems={selectedErpItems}
                                        onSelectClearAllErpItemsInPage={onSelectClearAllErpItemsInPage}
                                        onSelectAllErpItems={onSelectAllErpItems}
                                        statusPin={statusPin}
                                        matchedCode={router?.query?.matchedCode}
                                    />
                                )
                            }
                            TBodyRow={
                                (virtuosoData) => (
                                    <TableBodyRow
                                        virtuosoData={virtuosoData}

                                        selectedErpItems={selectedErpItems}
                                        header={erpCollectionHeader}
                                        onSelectErpItem={onSelectErpItem}
                                        inventoryStocks={inventoryStocks}
                                        statusPin={statusPin}
                                        erpItemSameReceiverHints={erpItemSameReceiverHints}
                                        handleOpenEditOptionCodeModal={handleOpenEditOptionCodeModal}
                                        handleOpenEditReleaseOptionCodeModal={handleOpenEditReleaseOptionCodeModal}
                                        handleOpenItemsForSameReceiverModal={handleOpenItemsForSameReceiverModal}

                                    />
                                )
                            }
                        />
                    </div>
                </div>
            </TableFieldWrapper>

            {
                editOptionCodeModalControl.open &&
                <CustomSearchOptionCodesModal
                    open={editOptionCodeModalControl.open}
                    onClose={handleCloseEditOptionCodeModal}
                    onSelect={(result) => handleSubmitEditOptionCode(result)}
                />
            }

            {
                editReleaseOptionCodeModalControl.open &&
                <CustomSearchOptionCodesModal
                    open={editReleaseOptionCodeModalControl.open}
                    onClose={handleCloseEditReleaseOptionCodeModal}
                    onSelect={(result) => handleSubmitEditReleaseOptionCode(result)}
                />
            }

            {
                itemsForSameReceiverModalOpen &&
                <CommonModalComponent
                    open={itemsForSameReceiverModalOpen}
                    onClose={handleCloseItemsForSameReceiverModal}
                    maxWidth={'xl'}
                >
                    <ItemsForSameReceiverModalComponent
                        targetSameReceiverHint={targetSameReceiverHint}
                        erpCollectionHeader={erpCollectionHeader}
                        selectedErpItems={selectedErpItems}
                        onSelectErpItem={onSelectErpItem}
                        onClose={handleCloseItemsForSameReceiverModal}
                    />
                </CommonModalComponent>
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
    selectedErpItems,
    onSelectClearAllErpItemsInPage,
    onSelectAllErpItems,
    statusPin,
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
            <th
                className="fixed-header"
                width={50}
            >
                {erpItems?.every(r => selectedErpItems?.some(r2 => r2.id === r.id)) ?
                    <input
                        type='checkbox'
                        onChange={() => onSelectClearAllErpItemsInPage(erpItems)}
                        checked={true}
                        style={{ cursor: 'pointer' }}
                    ></input>
                    :
                    <input
                        type='checkbox'
                        onChange={() => onSelectAllErpItems(erpItems)}
                        checked={false}
                        style={{ cursor: 'pointer' }}
                    ></input>
                }
            </th>
            {header?.erpCollectionHeaderDetails?.map((r, index) => {
                return (
                    <ResizableTh
                        key={index}
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
                            zIndex: '11',
                            padding: 0,
                            fontSize: '10px',
                            borderLeft: '1px dashed #c0c0c0'
                        }}
                    >
                        패키지
                    </th>
                </>
            }
        </tr>
    )
}

function TableBodyRow({
    virtuosoData,
    selectedErpItems,
    header,
    inventoryStocks,
    onSelectErpItem,
    statusPin,
    erpItemSameReceiverHints,
    handleOpenEditOptionCodeModal,
    handleOpenEditReleaseOptionCodeModal,
    handleOpenItemsForSameReceiverModal,
}) {
    const item = virtuosoData?.item;
    const isSelected = selectedErpItems?.find(r => r.id === item?.id);
    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === item?.productOptionId);
    let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;
    let isPackaged = item?.packageYn === 'y' ? true : false;

    return (
        <TextDragableDancer
            type='tr'
            {...virtuosoData}
            className={`${isSelected ? 'tr-active' : ''} ${(isOutOfStock && !isPackaged) ? 'tr-highlight' : ''}`}
            style={{
                position: 'relative',
                background: !item?.productOptionId ? 'var(--defaultYellowColorOpacity30)' : ''
            }}
            onTapInRange={(e) => { e.stopPropagation(); onSelectErpItem(item); }}
        >
            <td>{virtuosoData['data-index'] + 1}</td>
            <td>
                <input
                    type='checkbox'
                    checked={isSelected || false}
                    onChange={() => onSelectErpItem(item)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: 'pointer' }}
                ></input>
            </td>
            {header?.erpCollectionHeaderDetails?.map(r2 => {
                let matchedFieldName = r2.matchedFieldName;

                return (
                    <Td
                        key={`col-${matchedFieldName}`}
                        erpItem={item}
                        matchedFieldName={matchedFieldName}
                        isOutOfStock={isOutOfStock}
                        isPackaged={isPackaged}
                        inventoryStock={inventoryStock}
                        erpItemSameReceiverHints={erpItemSameReceiverHints}

                        onActionOpenEditOptionCodeModal={handleOpenEditOptionCodeModal}
                        onActionOpenEditReleaseOptionCodeModal={handleOpenEditReleaseOptionCodeModal}
                        onActionOpenItemsForSameReceiverModal={handleOpenItemsForSameReceiverModal}
                    />
                );
            })}
            {statusPin &&
                <>
                    <td
                        className={`fixed-col-right`}
                        style={{
                            zIndex: '0',
                            background: '#fff',
                            padding: 0,
                            borderLeft: '1px dashed #c0c0c0'
                        }}
                    >
                        {isPackaged &&
                            <div
                                style={{
                                    width: 20,
                                    margin: '0 auto'
                                }}
                            >
                                <CustomImage
                                    src='/images/icon/check_default_5fcf80.svg'
                                />
                            </div>
                        }
                    </td>
                </>
            }
        </TextDragableDancer>
    )
}

function Td({
    erpItem,
    matchedFieldName,
    isOutOfStock,
    isPackaged,
    inventoryStock,
    erpItemSameReceiverHints,
    onActionOpenEditOptionCodeModal,
    onActionOpenEditReleaseOptionCodeModal,
    onActionOpenItemsForSameReceiverModal
}) {
    switch (matchedFieldName) {
        case 'createdAt': case 'salesAt': case 'releaseAt': case 'holdAt': case 'channelOrderDate':
            return (
                <td>{erpItem[matchedFieldName] ? dateToYYYYMMDDhhmmss(erpItem[matchedFieldName]) : ""}</td>
            );
        case 'price': case 'deliveryCharge':
            return (
                <td>{erpItem[matchedFieldName] ? numberWithCommas(erpItem[matchedFieldName]) : "0"}</td>
            );
        case 'optionCode':
            return (
                <TextDragableDancer type='td' className='td-highlight' onTapInRange={(e) => onActionOpenEditOptionCodeModal(e, erpItem)}>{erpItem[matchedFieldName]}</TextDragableDancer>
            )
        case 'releaseOptionCode':
            return (
                <TextDragableDancer type='td' className='td-highlight' onTapInRange={(e) => onActionOpenEditReleaseOptionCodeModal(e, erpItem)}>{erpItem[matchedFieldName]}</TextDragableDancer>
            )
        case 'optionStockUnit':
            if (isPackaged) {
                return (
                    <td style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity500)' : '', color: 'var(--defaultGreenColor)' }}>패키지상품</td>
                );
            } else {
                return (
                    <td style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity500)' : '' }}>{inventoryStock ? inventoryStock.stockUnit : '옵션코드 미지정'}</td>
                );
            }

        case 'receiver':
            let sameReceiverHint = `${erpItem?.receiver}${erpItem?.receiverContact1}${erpItem?.destination}${erpItem?.destinationDetail}`;
            let hasSameReceiver = erpItemSameReceiverHints?.find(hint => hint.sameReceiverHint === sameReceiverHint)?.count > 1 ? true : false;
            return (
                <td
                    className={`${matchedFieldName}`}
                    style={{
                        color: hasSameReceiver ? 'var(--defaultRedColor)' : ''
                    }}
                >
                    {erpItem[matchedFieldName]}
                    {hasSameReceiver &&
                        <button
                            type='button'
                            className='view-sameReceiver-button-item'
                            onClick={(e) => onActionOpenItemsForSameReceiverModal(e, sameReceiverHint)}
                        >
                            보기
                        </button>
                    }
                </td>
            );
        default:
            return (
                <td>
                    {erpItem[matchedFieldName]}
                </td>
            )
    }

}