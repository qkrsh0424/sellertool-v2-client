import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { numberFormatUtils } from "../../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import InfiniteScrollObserver from "../../../../../modules/observer/InfiniteScrollObserver";
import ReverseScrollObserver from "../../../../../modules/observer/ReverseScrollObserver";
import ResizableTh from "../../../../../modules/table/ResizableTh";
import useInventoryStocksHook from "../hooks/useInventoryStocksHook";
import { Container, TableBox, TableWrapper, TipFieldWrapper } from "../styles/ViewSelectedModal.styled";

const TABLE_DATA_VIEW_SIZE = 40;
const TABLE_DATA_INC_DEC_SIZE = 20;

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

    const [prevViewSize, setPrevViewSize] = useState(0);
    const [viewSize, setViewSize] = useState(TABLE_DATA_VIEW_SIZE);

    useEffect(() => {
        if (viewSize > TABLE_DATA_VIEW_SIZE) {
            setPrevViewSize(viewSize - TABLE_DATA_VIEW_SIZE);
        } else {
            setPrevViewSize(0);
        }
    }, [viewSize]);

    const handleFetchMoreItemsView = () => {
        let newViewSize = viewSize + TABLE_DATA_INC_DEC_SIZE;

        setViewSize(newViewSize);
    }

    const handleFetchPrevItemsView = () => {
        if (viewSize > TABLE_DATA_VIEW_SIZE) {
            setViewSize(viewSize - TABLE_DATA_INC_DEC_SIZE);
        }
    }

    const handleFetchInitPrevItemsView = () => {
        if (prevViewSize !== 0) {
            setViewSize(TABLE_DATA_VIEW_SIZE);
        }
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
                <TipField
                    matchedCode={router?.query?.matchedCode || 'releaseOption'}
                />
                <TableWrapper>
                    <TableBox>
                        <table
                            cellSpacing={0}
                        >
                            <thead>
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
                                    {erpCollectionHeader?.erpCollectionHeaderDetails?.map?.((r, index) => {
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
                            </thead>
                            <tbody>
                                {prevViewSize !== 0 &&
                                    <ReverseScrollObserver
                                        elementTagType={'tr'}
                                        totalSize={selectedErpItems?.length || 0}
                                        startOffset={prevViewSize || 0}
                                        endOffset={viewSize || 0}
                                        dataViewSize={TABLE_DATA_VIEW_SIZE}
                                        threshold={0}
                                        fetchData={() => handleFetchInitPrevItemsView()}
                                        loadingElementTag={
                                            <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                로딩중...
                                            </td>
                                        }
                                        endElementTag={
                                            <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                마지막 데이터 입니다.
                                            </td>
                                        }
                                    />
                                }
                                {selectedErpItems?.slice(0, viewSize)?.map((erpItem, index) => {
                                    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === erpItem.productOptionId);
                                    let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;

                                    if (index < prevViewSize) {
                                        return (
                                            <tr key={erpItem.id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                            </tr>
                                        )
                                    }

                                    if (index === prevViewSize && viewSize > TABLE_DATA_VIEW_SIZE) {
                                        return (
                                            <ReverseScrollObserver
                                                key={erpItem.id}
                                                elementTagType={'tr'}
                                                totalSize={selectedErpItems?.length || 0}
                                                startOffset={prevViewSize || 0}
                                                endOffset={viewSize || 0}
                                                dataViewSize={TABLE_DATA_VIEW_SIZE}
                                                threshold={0}
                                                fetchData={() => handleFetchPrevItemsView()}
                                                loadingElementTag={
                                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                        로딩중...
                                                    </td>
                                                }
                                                endElementTag={
                                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                        마지막 데이터 입니다.
                                                    </td>
                                                }
                                            />
                                        );
                                    }

                                    return (
                                        <tr
                                            key={erpItem.id}
                                            style={{
                                                position: 'relative',
                                                background: !erpItem.productOptionId ? 'var(--defaultYellowColorOpacity30)' : isOutOfStock ? 'var(--defaultRedColorOpacity30)' : ''
                                            }}
                                        >
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <SingleBlockButton
                                                    type='button'
                                                    className='delete-button-item'
                                                    onClick={() => onActionClearSelectedItem(erpItem.id)}
                                                >
                                                    <div className='icon-figure'>
                                                        <CustomImage
                                                            src={'/images/icon/delete_default_e56767.svg'}
                                                        />
                                                    </div>
                                                </SingleBlockButton>
                                            </td>
                                            {erpCollectionHeader?.erpCollectionHeaderDetails.map((header) => {
                                                let matchedFieldName = header.matchedFieldName;

                                                if (matchedFieldName === 'unit' || matchedFieldName === 'price' || matchedFieldName === 'deliveryCharge') {
                                                    return (
                                                        <td key={matchedFieldName}>
                                                            <div className='div-item'>{numberFormatUtils.numberWithCommas(erpItem[matchedFieldName])}</div>
                                                        </td>

                                                    );
                                                } else if (matchedFieldName === 'optionStockUnit') {
                                                    return (
                                                        <td key={`col-${matchedFieldName}`} style={{ background: isOutOfStock ? 'var(--defaultRedColorOpacity30)' : '' }}>{inventoryStock ? inventoryStock.stockUnit : '옵션코드 미지정'}</td>
                                                    )
                                                } else {
                                                    return (
                                                        <td key={matchedFieldName}>
                                                            <div className='div-item'>{erpItem[matchedFieldName]}</div>
                                                        </td>
                                                    );
                                                }

                                            })}
                                        </tr>
                                    );
                                })}
                                <InfiniteScrollObserver
                                    elementTagType={'tr'}
                                    totalSize={selectedErpItems?.length || 0}
                                    startOffset={0}
                                    endOffset={viewSize}
                                    fetchData={handleFetchMoreItemsView}
                                    loadingElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            로딩중...
                                        </td>
                                    }
                                    endElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            마지막 데이터 입니다.
                                        </td>
                                    }
                                />
                            </tbody>
                        </table>
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
