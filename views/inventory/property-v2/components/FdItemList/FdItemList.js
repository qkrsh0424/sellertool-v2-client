import React, { useEffect, useRef, useState } from "react";
import CustomImage from "../../../../../components/image/CustomImage";
import FieldCircleLoading from "../../../../../components/loading/field-loading/v1/FieldCircleLoading";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";
import { St, StHeadControl, StPagenation, StTable } from "./FdItemList.styled";
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import moment from "moment";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { ClickableWrapper } from "../../../../../components/clickable-wrapper/v1";
import { CustomDateSelectButtonGroup } from "../../../../../components/buttons/date-select/v1/CustomDateSelectButtonGroup";
import { useRouter } from "next/router";
import PagenationComponentV2 from "../../../../../components/pagenation/PagenationComponentV2";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";

const customDateUtils = CustomDateUtils();
const customNumberUtils = CustomNumberUtils();
const customURIEncoderUtils = CustomURIEncoderUtils();

const currDateTime = new Date();
const YEAR = currDateTime.getFullYear();
const MONTH = currDateTime.getMonth();
const DATE = currDateTime.getDate();
const DEFAULT_START_DATE = customDateUtils.getStartDate(new Date(YEAR, MONTH, DATE - 6))

export function FdItemList({
    inventoryAssetPage
}) {
    const router = useRouter();
    const inventoryAssetList = inventoryAssetPage?.content;

    const scrollRef = useRef();

    const [badStockEndDate, setBadStockEndDate] = useState(DEFAULT_START_DATE);
    const [badStockEndDatePopperOpen, setBadStockEndDatePopperOpen] = useState(false);

    useEffect(() => {
        if (!scrollRef) {
            return;
        }
        scrollRef?.current?.querySelector('.table-box').scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [
        router?.query?.page,
    ])

    const toggleBadStockEndDatePopperOpen = (bool) => {
        setBadStockEndDatePopperOpen(bool);
    }

    const handleChangeBadStockEndDate = (value) => {
        setBadStockEndDate(value);
        toggleBadStockEndDatePopperOpen(false);
    }
    
    const handleClickProductInfo = (e, targetInventoryAsset) => {
        e.preventDefault();
        e.stopPropagation();

        const searchFilter = [
            {
                searchCondition: 'PRODUCT_CODE',
                searchQuery: targetInventoryAsset.product?.code
            }
        ]

        router.push({
            pathname: router?.pathname,
            query: {
                ...router?.query,
                searchFilter: customURIEncoderUtils.encodeJSONList(searchFilter),
                page: 1,
            }
        }, undefined, { scroll: false })
    }

    return (
        <>
            <St.Container>
                <StHeadControl.Container>
                    <StHeadControl.BadStockEndDateWrapper>
                        <CustomBlockButton
                            type='button'
                            className='button-item'
                            onClick={() => toggleBadStockEndDatePopperOpen(true)}
                        >
                            미출고 기간 설정
                        </CustomBlockButton>
                        <ClickableWrapper
                            isActive={badStockEndDatePopperOpen}
                            onClickOutside={() => toggleBadStockEndDatePopperOpen(false)}
                        >
                            {badStockEndDatePopperOpen &&
                                <div className='selector-box'>
                                    <CustomDateSelectButtonGroup.Days7Button
                                        selectedDate={badStockEndDate}
                                        callback={handleChangeBadStockEndDate}
                                    />
                                    <CustomDateSelectButtonGroup.Days30Button
                                        selectedDate={badStockEndDate}
                                        callback={handleChangeBadStockEndDate}
                                    />
                                    <CustomDateSelectButtonGroup.Days60Button
                                        selectedDate={badStockEndDate}
                                        callback={handleChangeBadStockEndDate}
                                    />
                                    <CustomDateSelectButtonGroup.Days90Button
                                        selectedDate={badStockEndDate}
                                        callback={handleChangeBadStockEndDate}
                                    />
                                </div>
                            }
                        </ClickableWrapper>
                    </StHeadControl.BadStockEndDateWrapper>
                </StHeadControl.Container>
                <StTable.Container>
                    <TableField
                        inventoryAssetList={inventoryAssetList}
                        badStockEndDate={badStockEndDate}
                        handleClickProductInfo={handleClickProductInfo}
                        ref={scrollRef}
                    />
                </StTable.Container>
            </St.Container>
            <StPagenation.Container>
                <PagenationComponentV2
                    align={'center'}
                    pageIndex={inventoryAssetPage?.number}
                    totalPages={inventoryAssetPage?.totalPages}
                    isFirst={inventoryAssetPage?.first}
                    isLast={inventoryAssetPage?.last}
                    totalElements={inventoryAssetPage?.totalElements}
                    sizeElements={[50, 100]}
                    autoScrollTop={false}
                    popperDisablePortal={true}
                    viewTotal={true}
                />
            </StPagenation.Container>
        </>
    );
}

const TableField = React.forwardRef(function MyTableView({
    inventoryAssetList,
    badStockEndDate,
    handleClickProductInfo
}, ref) {
    const isTableLoading = !inventoryAssetList;

    return (
        <StTable.TableWrapper ref={ref}>
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
                            {inventoryAssetList?.map((inventoryAsset) => {

                                const isBadStock = !inventoryAsset?.lastReleaseDateTime || moment(inventoryAsset?.lastReleaseDateTime).isBefore(badStockEndDate);

                                return (
                                    <tr
                                        key={inventoryAsset.id}
                                        className={`${isBadStock ? 'bad-stock-tr' : ''}`}
                                    >
                                        <td>
                                            <div className='content-box'>
                                                <div className='thumbnail-figure'>
                                                    <CustomImage
                                                        src={inventoryAsset?.product?.thumbnailUri}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <button
                                                    type='button'
                                                    className='button-box'
                                                    onClick={(e) => handleClickProductInfo(e, inventoryAsset)}
                                                >
                                                    <div>{inventoryAsset?.productCategory?.name} / {inventoryAsset?.productSubCategory?.name}</div>
                                                    <div><span style={{ color: 'var(--mainColor)' }}>{inventoryAsset?.product?.name}</span> [{inventoryAsset?.product?.productTag || '태그 미지정'}]</div>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ fontWeight: '600' }}>{inventoryAsset?.productOption?.name}</div>
                                                {inventoryAsset?.productOption?.packageYn === 'y' && <div style={{ color: 'var(--defaultGreenColor)' }}>패키지 상품</div>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{inventoryAsset?.productOption?.optionTag}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}>{inventoryAsset?.totalRemainedQuantity}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}> {inventoryAsset?.remainedAssets > 0 ? customNumberUtils.toPriceUnitFormat(inventoryAsset?.remainedAssets) : 0}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}>{inventoryAsset?.estimatedSales > 0 ? customNumberUtils.toPriceUnitFormat(inventoryAsset?.estimatedSales) : 0}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{inventoryAsset?.productOption?.code}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{inventoryAsset?.productOption?.status}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{inventoryAsset?.productOption?.releaseLocation}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{inventoryAsset?.productOption?.memo}</div>
                                            </div>
                                        </td>
                                        <td className={isBadStock ? 'bad-stock-td' : ''}>
                                            <div className='content-box'>
                                                <div>{inventoryAsset?.lastReleaseDateTime ? customDateUtils.dateToYYYYMMDD(inventoryAsset?.lastReleaseDateTime) : "-"}</div>
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
        name: 'propertyPrice',
        headerName: '재고자산',
        defaultWidth: 100
    },
    {
        resizable: true,
        name: 'estimatedSalesPrice',
        headerName: '예상 매출액',
        defaultWidth: 100
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
    {
        resizable: true,
        name: 'lastReleasedAt',
        headerName: '마지막 출고일',
        defaultWidth: 100
    }
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