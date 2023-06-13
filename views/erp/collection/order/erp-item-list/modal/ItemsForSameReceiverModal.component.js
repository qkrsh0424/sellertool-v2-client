import { useRouter } from "next/router";
import { useState } from "react";
import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
import { numberWithCommas } from "../../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import useInventoryStocksHook from "../../hooks/useInventoryStocksHook";
import useErpItemsFormSameReceiverHook from "../hooks/useErpItemsForSameReceiverHook";
import { Container, SubmitButtonContainer, TableFieldWrapper } from "../styles/ItemsForSameReceiverModal.styled";
import ResizableTh from "../../../../../../components/table/th/v1/ResizableTh";

function salesYnForTabType(tabType) {
    switch (tabType) {
        case 'order':
            return 'n';
        case 'sales':
            return 'y';
        case 'release':
            return 'y';
        case 'hold':
            return 'n';
        default: return 'n';
    }
}

function releaseYnForTabType(tabType) {
    switch (tabType) {
        case 'order':
            return 'n';
        case 'sales':
            return 'n';
        case 'release':
            return 'y';
        case 'hold':
            return 'n';
        default: return 'n';
    }
}

function holdYnForTabType(tabType) {
    switch (tabType) {
        case 'order':
            return 'n';
        case 'sales':
            return 'n';
        case 'release':
            return 'n';
        case 'hold':
            return 'y';
        default: return 'n';
    }
}

const INIT_TAB_TYPE = 'order';

export default function ItemsForSameReceiverModalComponent({
    targetSameReceiverHint,
    erpCollectionHeader,
    selectedErpItems,
    onSelectErpItem,
    onClose
}) {
    const router = useRouter();
    const {
        erpItems
    } = useErpItemsFormSameReceiverHook(targetSameReceiverHint);

    const {
        inventoryStocks
    } = useInventoryStocksHook(erpItems);

    const [tabType, setTabType] = useState(INIT_TAB_TYPE);

    const handleChangeTabType = (type) => {
        setTabType(type);
    }

    return (
        <>
            <Container>
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
                <div className='title-box'>
                    <div className='title'>동일 수취인의 주문 정보입니다.</div>
                </div>
                <TableField
                    erpItems={erpItems}
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItems}
                    onSelectErpItem={onSelectErpItem}
                    inventoryStocks={inventoryStocks}
                    matchedCode={router?.query?.matchedCode}

                    tabType={tabType}
                    onChangeTabType={handleChangeTabType}
                />
                <SubmitButtonContainer>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        style={{
                            background: 'var(--defaultModalCloseColor)'
                        }}
                        onClick={() => onClose()}
                    >
                        닫기
                    </SingleBlockButton>
                </SubmitButtonContainer>
            </Container>
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

function TableField({
    erpItems,
    erpCollectionHeader,
    selectedErpItems,
    onSelectErpItem,
    inventoryStocks,
    matchedCode,

    tabType,
    onChangeTabType,
}) {
    const salesYn = salesYnForTabType(tabType);
    const releaseYn = releaseYnForTabType(tabType);
    const holdYn = holdYnForTabType(tabType);

    return (
        <TableFieldWrapper>
            <div className='mgl-flex'>
                <div className={`title ${tabType === 'order' ? 'title-active' : ''}`} onClick={() => onChangeTabType('order')}>주문확인</div>
                <div className={`title ${tabType === 'sales' ? 'title-active' : ''}`} onClick={() => onChangeTabType('sales')}>주문확정</div>
                <div className={`title ${tabType === 'release' ? 'title-active' : ''}`} onClick={() => onChangeTabType('release')}>출고완료</div>
                <div className={`title ${tabType === 'hold' ? 'title-active' : ''}`} onClick={() => onChangeTabType('hold')}>보류데이터</div>
            </div>
            <div style={{ position: 'relative' }}>
                <div
                    className='table-box'
                >
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th
                                    className="fixed-header"
                                    width={40}
                                >
                                    No.
                                </th>
                                {tabType === INIT_TAB_TYPE &&
                                    <th
                                        className="fixed-header"
                                        width={50}
                                    >
                                        선택
                                    </th>
                                }
                                {erpCollectionHeader?.erpCollectionHeaderDetails?.map((r, index) => {
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
                            </tr>
                        </thead>
                        <tbody>
                            {erpItems?.filter(r => r.salesYn === salesYn && r.releaseYn === releaseYn && r.holdYn === holdYn)?.map((r1, rowIndex) => {
                                const isSelected = selectedErpItems?.find(r => r.id === r1.id);
                                let inventoryStock = inventoryStocks?.find(r => r.productOptionId === r1.productOptionId);
                                let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;

                                return (
                                    <tr
                                        key={r1.id}
                                        className={`${isSelected && 'tr-active'} ${isOutOfStock && 'tr-highlight'}`}
                                        onClick={(e) => { if (tabType === INIT_TAB_TYPE) { e.stopPropagation(); onSelectErpItem(r1); } }}
                                    >
                                        <td>{rowIndex + 1}</td>
                                        {tabType === INIT_TAB_TYPE &&
                                            <td>
                                                <input
                                                    type='checkbox'
                                                    checked={isSelected || false}
                                                    onChange={() => onSelectErpItem(r1)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    style={{ cursor: 'pointer' }}
                                                ></input>
                                            </td>
                                        }
                                        {erpCollectionHeader?.erpCollectionHeaderDetails?.map(r2 => {
                                            let matchedFieldName = r2.matchedFieldName;
                                            if (matchedFieldName === 'createdAt' || matchedFieldName === 'salesAt' || matchedFieldName === 'releaseAt' || matchedFieldName === 'channelOrderDate') {
                                                return (
                                                    <td key={`col-${matchedFieldName}`}>{r1[matchedFieldName] ? dateToYYYYMMDDhhmmss(r1[matchedFieldName]) : ""}</td>
                                                )
                                            }

                                            if (matchedFieldName === 'price' || matchedFieldName === 'deliveryCharge') {
                                                return (
                                                    <td key={`col-${matchedFieldName}`}>{r1[matchedFieldName] ? numberWithCommas(r1[matchedFieldName]) : "0"}</td>
                                                );
                                            }

                                            if (matchedFieldName === 'optionStockUnit') {
                                                return (
                                                    <td key={`col-${matchedFieldName}`} style={{ background: isOutOfStock ? 'var(--defaultRedColorOpacity500)' : '' }}>{inventoryStock ? inventoryStock.stockUnit : '옵션코드 미지정'}</td>
                                                )
                                            }

                                            return (
                                                <td
                                                    key={`col-${matchedFieldName}`}
                                                    className={``}
                                                >
                                                    {r1[matchedFieldName]}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </TableFieldWrapper>
    );
}