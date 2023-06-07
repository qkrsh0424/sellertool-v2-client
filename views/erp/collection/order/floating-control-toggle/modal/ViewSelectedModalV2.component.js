import { useRouter } from "next/router";
import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
import { numberFormatUtils } from "../../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import ResizableTh from "../../../../../modules/table/ResizableTh";
import useInventoryStocksHook from "../hooks/useInventoryStocksHook";
import { Container, TableBox, TableWrapper, TipFieldWrapper } from "../styles/ViewSelectedModalV2.styled";
import React from "react";
import CustomTableVirtuoso from "../../../../../../components/virtualization/virtuoso/table/v1/CustomTableVirtuoso";

export default function ViewSelectedModalComponent({
    erpCollectionHeader,
    selectedErpItems,
    onClose,
    onActionClearSelectedItem
}) {
    const router = useRouter();
    const {
        inventoryStocks
    } = useInventoryStocksHook(selectedErpItems);

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
                <TipField
                    matchedCode={router?.query?.matchedCode || 'releaseOption'}
                />
                <TableWrapper>
                    <TableBox>
                        <CustomTableVirtuoso
                            className={'table-box'}
                            height={300}
                            rows={selectedErpItems}
                            columns={erpCollectionHeader}
                            totalCount={selectedErpItems?.length}
                            headerField={<TableHeaderRow />}
                            bodyField={
                                <TableBodyRow
                                    inventoryStocks={inventoryStocks}
                                    onActionClearSelectedItem={onActionClearSelectedItem}
                                />
                            }
                        />
                    </TableBox>
                </TableWrapper>
            </Container>
        </>
    );
}

function TipField({ matchedCode }) {
    return (
        <TipFieldWrapper>
            <div>
                ※ 상품 매칭 항목 : <span className='highlight'>{matchedCode === 'optionCode' ? '[M] 옵션코드' : '[M] 출고옵션코드'}</span>
            </div>
        </TipFieldWrapper>
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
                    <td key={`col-${matchedFieldName}`} style={{ color: 'var(--defaultGreenColor)' }}>패키지상품</td>
                )
            } else {
                return (
                    <td key={`col-${matchedFieldName}`} style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity30)' : '' }}>{inventoryStock ? inventoryStock.stockUnit : '옵션코드 미지정'}</td>
                )
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
    rowIndex,
    rowData,
    rowConfig,
    header,
    inventoryStocks,
    onActionClearSelectedItem
}) {
    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === rowData.productOptionId);
    let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;
    let isPackaged = rowData.packageYn === 'y' ? true : false;

    return (
        <tr 
            {...rowConfig}
            style={{
                position: 'relative',
                background: !rowData.productOptionId ? 'var(--defaultYellowColorOpacity30)' : (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity30)' : ''
            }}
        >
            <td>
                {rowIndex + 1}
            </td>
            <td>
                <SingleBlockButton
                    type='button'
                    className='delete-button-item'
                    onClick={() => onActionClearSelectedItem(rowData.id)}
                >
                    <div className='icon-figure'>
                        <CustomImage
                            src={'/images/icon/delete_default_e56767.svg'}
                        />
                    </div>
                </SingleBlockButton>
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
                        erpItem={rowData}
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