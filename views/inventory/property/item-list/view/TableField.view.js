// import CustomBoxImage from "../../../../../components/image/box-image/CustomBoxImage";
import FieldCircleLoading from "../../../../../components/loading/field-loading/v1/FieldCircleLoading";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";
import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import { toPriceUnitFormat } from "../../../../../utils/numberFormatUtils";
import { compareDate } from "../../../../../utils/valueUtils";
import CustomImage from "../../../../modules/image/CustomImage";
import { TableBox, TableWrapper } from "../style/Table.styled";

export default function TableFieldView({
    productOptions,
    inventoryStocks,
    badStockEndDate,
    selectedProductOptionsAndInventory,
    isTableLoading,
    onActionSelectProductOption,
    onActionSelectAllProductOptions,
    onActionSelectClearAllProductOptionsInPage,
    onActionOpenProductInventoryModal
}) {
    return (
        <TableWrapper>
            <div style={{ position: 'relative' }}>
                {isTableLoading &&
                    <FieldCircleLoading boxStyle={{ borderRadius: '15px' }} />
                }
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
                                    {productOptions?.every(r => selectedProductOptionsAndInventory.some(r2 => r2.id === r.id)) ?
                                        <input
                                            type='checkbox'
                                            onChange={() => onActionSelectClearAllProductOptionsInPage(productOptions)}
                                            checked={true}
                                        ></input>
                                        :
                                        <input
                                            type='checkbox'
                                            onChange={() => onActionSelectAllProductOptions(productOptions, inventoryStocks)}
                                            checked={false}
                                        ></input>
                                    }
                                </th>
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
                            {productOptions?.map((option) => {
                                const isSelected = selectedProductOptionsAndInventory?.find(r => r.id === option.id);
                                const inventoryStock = inventoryStocks?.find(r => r.productOptionId === option?.id);
                                const stockUnit = inventoryStock?.stockUnit;
                                const isBadStock = !compareDate(inventoryStock?.lastReleasedAt, badStockEndDate);

                                return (
                                    <tr
                                        key={option.id}
                                        className={`${isSelected ? 'tr-selected' : ''} ${isBadStock ? 'bad-stock-tr' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); onActionSelectProductOption(option, inventoryStock); }}
                                    >
                                        <td>
                                            <input
                                                type='checkbox'
                                                onChange={() => onActionSelectProductOption(option, inventoryStock)}
                                                onClick={(e) => e.stopPropagation()}
                                                checked={isSelected ?? false}
                                            ></input>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div className='thumbnail-figure'>
                                                    <CustomImage
                                                        src={option?.product?.thumbnailUri}
                                                    />
                                                    {/* <CustomBoxImage
                                                        src={option?.product?.thumbnailUri}
                                                    /> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <button
                                                    type='button'
                                                    className='button-box'
                                                    onClick={(e) => onActionOpenProductInventoryModal(e, option?.product)}
                                                >
                                                    <div>{option?.productCategory?.name} / {option?.productSubCategory?.name}</div>
                                                    <div><span style={{ color: 'var(--mainColor)' }}>{option?.product?.name}</span> [{option?.product?.productTag || '태그 미지정'}]</div>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ fontWeight: '600' }}>{option?.name}</div>
                                                {option?.packageYn === 'y' && <div style={{ color: 'var(--defaultGreenColor)' }}>패키지 상품</div>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{option?.optionTag}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}>{stockUnit}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}> {stockUnit > 0 ? toPriceUnitFormat(stockUnit * option?.totalPurchasePrice) : 0}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}>{stockUnit > 0 ? toPriceUnitFormat(stockUnit * option?.salesPrice) : 0}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{option?.code}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{option?.status}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{option?.releaseLocation}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{option?.memo}</div>
                                            </div>
                                        </td>
                                        <td className={isBadStock ? 'bad-stock-td' : ''}>
                                            <div className='content-box'>
                                                <div>{inventoryStock?.lastReleasedAt ? dateToYYYYMMDD(inventoryStock?.lastReleasedAt) : "-"}</div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </TableBox>
            </div>
        </TableWrapper >
    );
}

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