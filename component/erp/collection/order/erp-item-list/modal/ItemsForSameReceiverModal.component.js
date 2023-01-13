import { useRouter } from "next/router";
import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
import { numberWithCommas } from "../../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import ResizableTh from "../../../../../modules/table/ResizableTh";
import useInventoryStocksHook from "../../hooks/useInventoryStocksHook";
import useErpItemsFormSameReceiverHook from "../hooks/useErpItemsForSameReceiverHook";
import { Container, SubmitButtonContainer, TableFieldWrapper } from "../styles/ItemsForSameReceiverModal.styled";

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
                <TableFieldWrapper>
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
                                        <th
                                            className="fixed-header"
                                            width={50}
                                        >
                                            선택
                                        </th>
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
                                                    {(HIGHLIGHT_FIELDS.includes(r.matchedFieldName) || r.matchedFieldName === (router?.query?.matchedCode || 'releaseOptionCode')) &&
                                                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: 'var(--mainColor)' }}></div>
                                                    }
                                                </ResizableTh>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {erpItems?.map((r1, rowIndex) => {
                                        const isSelected = selectedErpItems?.find(r => r.id === r1.id);
                                        let inventoryStock = inventoryStocks?.find(r => r.productOptionId === r1.productOptionId);
                                        let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;

                                        return (
                                            <tr
                                                key={r1.id}
                                                className={`${isSelected && 'tr-active'} ${isOutOfStock && 'tr-highlight'}`}
                                                onClick={(e) => { e.stopPropagation(); onSelectErpItem(r1); }}
                                            >
                                                <td>{rowIndex + 1}</td>
                                                <td>
                                                    <input
                                                        type='checkbox'
                                                        checked={isSelected || false}
                                                        onChange={() => onSelectErpItem(r1)}
                                                        onClick={(e) => e.stopPropagation()}
                                                        style={{ cursor: 'pointer' }}
                                                    ></input>
                                                </td>
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