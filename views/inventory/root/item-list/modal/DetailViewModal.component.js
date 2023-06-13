import Image from "next/image";
import CustomImage from "../../../../modules/image/CustomImage";
import { Container, TableBox, TableWrapper } from "../styles/DetailViewModal.styled";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";

export default function DetailViewModalComponent({
    selectedProductOptions,
    onClose
}) {
    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div>hello</div>
                <Table
                    selectedProductOptions={selectedProductOptions}
                />
            </Container>
        </>
    );
}

function Table({
    selectedProductOptions
}) {
    return (
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
                                해제
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
                        {selectedProductOptions?.map((option) => {
                            return (
                                <tr key={option.id}>
                                    <td>
                                        hello
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div className='thumbnail-figure'>
                                                <CustomImage
                                                    src={option?.product?.thumbnailUri}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div>{option?.productCategory?.name} / {option?.productSubCategory?.name}</div>
                                            <div><span style={{ color: 'var(--mainColor)' }}>{option?.product?.name}</span> [{option?.product?.productTag || '태그 미지정'}]</div>
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
                                            <div style={{ color: 'var(--mainColor)' }}>{option?.stockUnit}</div>
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
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