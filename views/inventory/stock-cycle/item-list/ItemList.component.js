import { useRouter } from "next/router";
import CustomImage from "../../../modules/image/CustomImage";
import PagenationComponentV2 from "../../../modules/pagenation/PagenationComponentV2";
import CustomSelect from "../../../modules/select/CustomSelect";
import { Container, ControlFieldContainer, PagenationContainer, SortControlContainer, TableBox, TableWrapper } from "./styles/ItemList.styled";
import useInventoryStockCyclePageHook from "./hooks/useInventoryStockCyclePageHook";
import React, { useEffect, useRef, useState } from "react";
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";
import SafetyIndexVariableModalComponent from "./modal/SafetyIndexVariableModal.component";
import { getDiffDate } from "../../../../utils/dateFormatUtils";
import ResizableTh from "../../../../components/table/th/v1/ResizableTh";
import { InventoryStockListModalComponent } from "../../fragments/inventory-stock-list-modal/v1";

function returnRecommendPurchaseUnits(
    stockUnit,
    leadTime,
    averageReleaseUnitPerDay,
    safetyIndexVariableForOutOfStockPeriod,
    safetyIndexVariableForTotal,
) {
    const value = Math.ceil(((safetyIndexVariableForOutOfStockPeriod * averageReleaseUnitPerDay) - stockUnit + (leadTime * averageReleaseUnitPerDay)) * safetyIndexVariableForTotal);
    return value <= 0 ? 0 : value;
}

export default function ItemListComponent(props) {
    const router = useRouter();
    const days = router?.query?.days;
    const leadTime = router?.query?.leadTime;

    const scrollRef = useRef();

    const [safetyIndexVariableForOutOfStockPeriod, setSafetyIndexVariableForOutOfStockPeriod] = useState(30);
    const [safetyIndexVariableForTotal, setSafetyIndexVariableForTotal] = useState(1);
    const [safetyIndexVariableModalOpen, setSafetyIndexVariableModalOpen] = useState(false);
    const [stockRegisterStatusModalOpen, setStockRegisterStatusModalOpen] = useState(false);
    const [selectedInventoryStockCycle, setSelectedInventoryStockCycle] = useState(null);

    const {
        inventoryStockCyclePage
    } = useInventoryStockCyclePageHook();

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

    const handleSelectSort = (e) => {
        let value = e.target.value;

        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort: value,
                page: 1
            }
        }, undefined, { scroll: false })
    }

    const toggleSafetyIndexVariableModalOpen = (setOpen) => {
        setSafetyIndexVariableModalOpen(setOpen);
    }

    const handleSetSafetyIndexVariables = (forOutOfStockPeriod, forTotal) => {
        setSafetyIndexVariableForOutOfStockPeriod(forOutOfStockPeriod);
        setSafetyIndexVariableForTotal(forTotal);
        toggleSafetyIndexVariableModalOpen(false);
    }

    const handleOpenStockRegisterStatusModal = (e, productOption) => {
        e.stopPropagation();
        setStockRegisterStatusModalOpen(true);
        setSelectedInventoryStockCycle(productOption);
    }

    const handleCloseStockRegisterStatusModal = () => {
        setStockRegisterStatusModalOpen(false);
        setSelectedInventoryStockCycle(null);
    }

    if (!inventoryStockCyclePage) {
        return null;
    }

    return (
        <>
            <Container>
                <ControlFieldContainer>
                    <div></div>
                    <SortControlContainer>
                        <CustomSelect
                            className='select-item'
                            onChange={(e) => handleSelectSort(e)}
                            value={router?.query?.sort || SORTED_BY[0]}
                        >
                            {SORTED_BY?.map(r => {
                                return (
                                    <option key={r.sort} value={r.sort}>{r.name}</option>
                                )
                            })}
                        </CustomSelect>
                    </SortControlContainer>
                </ControlFieldContainer>
                <TableField
                    inventoryStockCycles={inventoryStockCyclePage?.content}
                    days={days}
                    leadTime={leadTime}
                    safetyIndexVariableForOutOfStockPeriod={safetyIndexVariableForOutOfStockPeriod}
                    safetyIndexVariableForTotal={safetyIndexVariableForTotal}
                    onOpenSafetyIndexVariableModal={() => toggleSafetyIndexVariableModalOpen(true)}
                    onActionOpenStockRegisterStatusModal={handleOpenStockRegisterStatusModal}
                    
                    ref={scrollRef}
                />

            </Container>
            <PagenationContainer>
                <PagenationComponentV2
                    align={'center'}
                    pageIndex={inventoryStockCyclePage?.number}
                    totalPages={inventoryStockCyclePage?.totalPages}
                    isFirst={inventoryStockCyclePage?.first}
                    isLast={inventoryStockCyclePage?.last}
                    totalElements={inventoryStockCyclePage?.totalElements}
                    sizeElements={[20, 50, 100]}
                    autoScrollTop={false}
                    popperDisablePortal={true}
                />
            </PagenationContainer>
            {safetyIndexVariableModalOpen &&
                <SafetyIndexVariableModalComponent
                    open={safetyIndexVariableModalOpen}
                    onClose={() => toggleSafetyIndexVariableModalOpen(false)}
                    onSubmit={(forOutOfStockPeriod, forTotal) => handleSetSafetyIndexVariables(forOutOfStockPeriod, forTotal)}
                    safetyIndexVariableForOutOfStockPeriod={safetyIndexVariableForOutOfStockPeriod}
                    safetyIndexVariableForTotal={safetyIndexVariableForTotal}
                />
            }
            {stockRegisterStatusModalOpen &&
                <InventoryStockListModalComponent
                    open={stockRegisterStatusModalOpen}
                    readOnly={true}
                    productOptionId={selectedInventoryStockCycle?.productOptionId}
                    productCategoryName={selectedInventoryStockCycle?.productCategoryName}
                    productSubCategoryName={selectedInventoryStockCycle?.productSubCategoryName}
                    productName={selectedInventoryStockCycle?.productName}
                    productOptionName={selectedInventoryStockCycle?.productOptionName}
                    productThumbnailUri={selectedInventoryStockCycle?.productThumbnailUri}
                    onClose={handleCloseStockRegisterStatusModal}
                />
            }
        </>
    );

}

const TableField = React.forwardRef(function MyTableView({
    inventoryStockCycles,
    days,
    leadTime,
    safetyIndexVariableForOutOfStockPeriod,
    safetyIndexVariableForTotal,
    onOpenSafetyIndexVariableModal,
    onActionOpenStockRegisterStatusModal
}, ref) {
    return (
        <TableWrapper ref={ref}>
            <TableBox className='table-box'>
                <table
                    cellSpacing={0}
                >
                    <thead>
                        <tr>
                            {TABLE_HEADER?.map(r => {
                                if (r.resizable) {
                                    if (r.name === 'recommendPurchaseUnit') {
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
                                                <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                                    <div>
                                                        {r.headerName}
                                                    </div>
                                                    <div>
                                                        <CustomBlockButton
                                                            type='button'
                                                            className='control-button-item'
                                                            onClick={() => onOpenSafetyIndexVariableModal()}
                                                        >
                                                            세팅값
                                                        </CustomBlockButton>
                                                    </div>
                                                </div>
                                            </ResizableTh>
                                        );
                                    }

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
                                            width={r.defaultWidth}
                                            style={{
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
                        {inventoryStockCycles?.map((inventoryStockCycle) => {
                            const isStockRisk = leadTime && inventoryStockCycle?.averageReleaseUnitPerDay > 0 && inventoryStockCycle?.stockCyclePerDay <= leadTime;
                            return (
                                <tr
                                    key={inventoryStockCycle?.productOptionId}
                                    className={`${(isStockRisk) ? 'tr-highlight' : ''}`}
                                >
                                    <td>
                                        <div className='content-box'>
                                            <div className='thumbnail-figure'>
                                                <CustomImage
                                                    src={inventoryStockCycle?.productThumbnailUri}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div>{inventoryStockCycle?.productCategoryName} / {inventoryStockCycle?.productSubCategoryName}</div>
                                            <div><span style={{ color: 'var(--mainColor)' }}>{inventoryStockCycle?.productName}</span> [{inventoryStockCycle?.productName || '태그 미지정'}]</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ fontWeight: '600' }}>{inventoryStockCycle?.productOptionName}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ fontWeight: '600' }}>{inventoryStockCycle?.productOptionCode}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            {isStockRisk &&
                                                <div style={{ color: 'var(--defaultRedColor)', fontWeight: '700' }}>재고 위험성 높음</div>
                                            }
                                            {(!inventoryStockCycle.firstReleaseDateTime || getDiffDate(inventoryStockCycle.firstReleaseDateTime, new Date()) < days) &&
                                                <div style={{ color: 'var(--defaultYellowColor)', fontWeight: '700' }}>분석기간내 샘플 데이터 부족</div>
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <CustomBlockButton
                                                type='button'
                                                className='stockRegisterStatusView-button-item'
                                                onClick={(e) => onActionOpenStockRegisterStatusModal(e, inventoryStockCycle)}
                                            >
                                                보기
                                            </CustomBlockButton>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: '#444', fontWeight: '500' }}>{inventoryStockCycle?.stockUnit}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: '#444', fontWeight: '500' }}>{inventoryStockCycle?.releaseUnitPerPeriod}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: '#444', fontWeight: '500' }}>{inventoryStockCycle?.averageReleaseUnitPerDay}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div style={{ color: 'var(--mainColor)', fontWeight: '700' }}>{inventoryStockCycle?.stockCyclePerDay} 일</div>
                                            <div style={{ color: '#444', fontWeight: '600' }}>{(inventoryStockCycle?.stockCyclePerDay / 7).toFixed(1)} 주</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            {leadTime &&
                                                <div style={{ color: 'var(--defaultGreenColor)', fontWeight: '700' }}>
                                                    {
                                                        returnRecommendPurchaseUnits(
                                                            inventoryStockCycle?.stockUnit,
                                                            leadTime,
                                                            inventoryStockCycle?.averageReleaseUnitPerDay,
                                                            safetyIndexVariableForOutOfStockPeriod,
                                                            safetyIndexVariableForTotal
                                                        )
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper >
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
        defaultWidth: 250
    },
    {
        resizable: true,
        name: 'productOptionName',
        headerName: '옵션명',
        defaultWidth: 250
    },
    {
        resizable: true,
        name: 'productOptionCode',
        headerName: '옵션코드',
        defaultWidth: 150
    },
    {
        resizable: true,
        name: 'warning',
        headerName: '경보',
        defaultWidth: 150
    },
    {
        resizable: false,
        name: 'stockRegisterStatus',
        headerName: '입/출고현황',
        defaultWidth: 80
    },
    {
        resizable: true,
        name: 'stockUnit',
        headerName: '재고수량 (개)',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'releaseUnitPerPeriod',
        headerName: '기간내 출고량 (개)',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'averageReleaseUnitPerDay',
        headerName: '일평균 출고량 (개)',
        defaultWidth: 120
    },
    {
        resizable: true,
        name: 'stockCyclePerDay',
        headerName: '출고가능 기간 (일별 / 주별)',
        defaultWidth: 150
    },
    {
        resizable: true,
        name: 'recommendPurchaseUnit',
        headerName: '추천 구매 수량',
        defaultWidth: 150
    },
]

const SORTED_BY = [
    {
        sort: 'product.name_asc',
        name: '상품명 오름차순'
    },
    {
        sort: 'product.name_desc',
        name: '상품명 내림차순'
    }
]