import FieldCircleLoading from "../../../../../../../components/loading/field-loading/v1/FieldCircleLoading";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import { dateToYYYYMMDD } from "../../../../../../../utils/dateFormatUtils";
import { toPriceUnitFormat } from "../../../../../../../utils/numberFormatUtils";
import { compareDate } from "../../../../../../../utils/valueUtils";
import CustomImage from "../../../../../../modules/image/CustomImage";
import { TableBox, Wrapper } from "../style/Table.styled";

export default function TableFieldView({
    rankedProductOptions,
    badStockEndDate,
    pageIndex,
    pageSize,
    modalRef,
    isTableLoading
}) {
    return (
        <Wrapper>
            <div style={{ position: 'relative' }}>
                {isTableLoading &&
                    <FieldCircleLoading boxStyle={{ borderRadius: '15px' }} />
                }

                <TableBox ref={modalRef}>
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
                            {rankedProductOptions?.map((option, index) => {
                                let isBadStock = !compareDate(option?.lastReleasedAt, badStockEndDate);
                                let rank = (pageSize * pageIndex) + (index + 1);

                                return (
                                    <tr
                                        key={option.productOptionId}
                                        className={`${isBadStock ? 'bad-stock-tr' : ''}`}
                                    >
                                        <td>
                                            <div className='content-box'>
                                                {rank}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div className='thumbnail-figure'>
                                                    <CustomImage
                                                        src={option?.productThumbnailUri}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{option?.productCategoryName} / {option?.productSubCategoryName}</div>
                                                <div><span style={{ color: 'var(--mainColor)' }}>{option?.productName}</span></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div>{option.productOptionName}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}>{option.stockUnit}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}> {option.stockUnit > 0 ? toPriceUnitFormat(option?.propertyPrice) : 0}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='content-box'>
                                                <div style={{ color: 'var(--defaultRedColor)' }}>{option.stockUnit > 0 ? toPriceUnitFormat(option?.estimateSalesPrice) : 0}</div>
                                            </div>
                                        </td>
                                        <td className={isBadStock ? 'bad-stock-td' : ''}>
                                            <div className='content-box'>
                                                <div>{option?.lastReleasedAt ? dateToYYYYMMDD(option?.lastReleasedAt) : "-"}</div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </TableBox>
            </div>
        </Wrapper>
    )
}

const TABLE_HEADER = [
    {
        resizable: false,
        name: 'index',
        headerName: '순위',
        defaultWidth: 50
    },
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
        name: 'stockUnit',
        headerName: '재고수량',
        defaultWidth: 80,
    },
    {
        resizable: true,
        name: 'propertyPrice',
        headerName: '재고자산',
        defaultWidth: 100,
    },
    {
        resizable: true,
        name: 'estimatedSalesPrice',
        headerName: '예상 매출액',
        defaultWidth: 100,
    },
    {
        resizable: true,
        name: 'lastReleasedAt',
        headerName: '마지막 출고일',
        defaultWidth: 100
    }
]