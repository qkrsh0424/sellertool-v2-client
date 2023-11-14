import React, { useEffect, useRef } from "react";
import CustomImage from "../../../../../../../../../../components/image/CustomImage";
import FieldCircleLoading from "../../../../../../../../../../components/loading/field-loading/v1/FieldCircleLoading";
import ResizableTh from "../../../../../../../../../../components/table/th/v1/ResizableTh";
import { CustomDateUtils } from "../../../../../../../../../../utils/CustomDateUtils";
import { CustomNumberUtils } from "../../../../../../../../../../utils/CustomNumberUtils";
import { CustomURIEncoderUtils } from "../../../../../../../../../../utils/CustomURIEncoderUtils";
import { St, StTable } from "./FdItemList.styled";

export function FdItemList({
    productOptionPage,
    inventoryStocks,
    selectedItemList,
    page,
    size,
    onSelectItem
}) {
    const scrollRef = useRef();

    const productOptionList = productOptionPage?.content;

    useEffect(() => {
        if (!scrollRef) {
            return;
        }
        scrollRef.current.querySelector('.table-box').scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [page, size])

    return (
        <>
            <St.Container>
                <StTable.Container>
                    <TableField
                        productOptionList={productOptionList}
                        inventoryStocks={inventoryStocks}
                        selectedItemList={selectedItemList}

                        onSelectItem={onSelectItem}
                        ref={scrollRef}
                    />
                </StTable.Container>
            </St.Container>
        </>
    );
}

const TableField = React.forwardRef(function MyTableView({
    productOptionList,
    inventoryStocks,
    selectedItemList,
    onSelectItem,
},
    ref
) {
    const isTableLoading = !productOptionList;

    return (
        <StTable.TableWrapper
            ref={ref}
        >
            <div style={{ position: 'relative' }}>
                {isTableLoading &&
                    <FieldCircleLoading boxStyle={{ borderRadius: '15px' }} />
                }
                <StTable.TableBox className='table-box'>
                    <table
                        cellSpacing={0}
                    >
                        <thead>
                            <tr>
                                {TABLE_HEADER?.map(r => {
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
                                    } else {
                                        return (
                                            <th
                                                key={r.name}
                                                className="fixed-header"
                                                scope="col"
                                                style={{
                                                    width: r.defaultWidth,
                                                    zIndex: '10'
                                                }}
                                            >
                                                {r.headerName}
                                            </th>
                                        );
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {productOptionList?.map((productOption) => {
                                const remainedQuantity = inventoryStocks?.find(r => r.productOptionId === productOption?.id)?.stockUnit;
                                const isSelected = selectedItemList?.find(r => r?.id === productOption?.id);
                                return (
                                    <tr
                                        key={productOption.id}
                                        onClick={() => onSelectItem(productOption)}
                                        className={`${isSelected ? 'tr-selected' : ''}`}
                                    >
                                        <td>
                                            <div className='content-box'>
                                                <div className='thumbnail-figure'>
                                                    <CustomImage
                                                        src={productOption?.product?.thumbnailUri}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <button
                                                    type='button'
                                                    className='button-box'
                                                >
                                                    <div>{productOption?.productCategory?.name} / {productOption?.productSubCategory?.name}</div>
                                                    <div><span style={{ color: 'var(--mainColor)' }}>{productOption?.product?.name}</span> [{productOption?.product?.productTag || '태그 미지정'}]</div>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ fontWeight: '600' }}>{productOption?.name}</div>
                                                {productOption?.packageYn === 'y' && <div style={{ color: 'var(--defaultGreenColor)' }}>패키지 상품</div>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{productOption?.optionTag}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}>{remainedQuantity}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{productOption?.code}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{productOption?.status}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{productOption?.releaseLocation}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{productOption?.memo}</div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </StTable.TableBox>
            </div>
        </StTable.TableWrapper >
    );
});

const TABLE_HEADER = [
    {
        resizable: false,
        name: 'thumbnailUri',
        headerName: '상품 이미지',
        defaultWidth: 80
    },
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
        resizable: true,
        name: 'optionTag',
        headerName: '옵션태그',
        defaultWidth: 200
    },
    {
        resizable: true,
        name: 'stockUnit',
        headerName: '재고수량',
        defaultWidth: 80
    },
    {
        resizable: true,
        name: 'optionCode',
        headerName: '옵션코드',
        defaultWidth: 200
    },
    {
        resizable: true,
        name: 'status',
        headerName: '상태',
        defaultWidth: 200
    },
    {
        resizable: true,
        name: 'releaseLocation',
        headerName: '출고지',
        defaultWidth: 200
    },
    {
        resizable: true,
        name: 'memo',
        headerName: '메모',
        defaultWidth: 200
    },
]

const SORT_TYPES = [
    {
        sortType: 'REMAINED_ASSETS$DESC',
        name: '재고자산 내림차순'
    },
    {
        sortType: 'REMAINED_ASSETS$ASC',
        name: '재고자산 오름차순'
    },
    {
        sortType: 'ESTIMATE_SALES$DESC',
        name: '예상 매출액 내림차순'
    },
    {
        sortType: 'ESTIMATE_SALES$ASC',
        name: '예상 매출액 오름차순'
    },
    {
        sortType: 'TOTAL_REMAINED_QUANTITY$DESC',
        name: '재고수량 내림차순'
    },
    {
        sortType: 'TOTAL_REMAINED_QUANTITY$ASC',
        name: '재고수량 오름차순'
    },
    {
        sortType: 'PRODUCT_CID$DESC',
        name: '상품등록 최신순'
    },
    {
        sortType: 'PRODUCT_CID$ASC',
        name: '상품등록 오래된순'
    },
    {
        sortType: 'PRODUCT_NAME$DESC',
        name: '상품명 내림차순'
    },
    {
        sortType: 'PRODUCT_NAME$ASC',
        name: '상품명 오름차순'
    },
]