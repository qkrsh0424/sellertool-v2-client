import { useRouter } from "next/router";
import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CustomImage from "../../../modules/image/CustomImage";
import PagenationComponentV2 from "../../../modules/pagenation/PagenationComponentV2";
import CustomSelect from "../../../modules/select/CustomSelect";
import FloatingControlBarComponent from "./FloatingControlBar.component";
import useInventoryStocksHook from "./hooks/useInventoryStocksHook";
import useProductOptionsHook from "./hooks/useProductOptionPageHook";
import useSelectedProductOptions from "./hooks/useSelectedProductOptionsHook";
import RegisteredStockByDateComponent from "./RegisteredStockByDate.component";
import { Container, ControlFieldContainer, PagenationContainer, SortControlContainer, TableBox, TableWrapper } from "./styles/ItemList.styled";
import ResizableTh from "../../../../components/table/th/v1/ResizableTh";
import { InventoryStockListModalComponent } from "../../fragments/inventory-stock-list-modal/v1";

export default function ItemListComponent(props) {
    const router = useRouter();

    const {
        productOptionPage
    } = useProductOptionsHook();

    const {
        selectedProductOptions,
        onSelectProductOption,
        onSelectAllProductOptions,
        onSelectClearAllProductOptionsInPage,
        onSelectClearAllProductOptions
    } = useSelectedProductOptions({
        productOptions: productOptionPage?.content
    });

    const {
        inventoryStocks,
        reqFetchInventoryStocks
    } = useInventoryStocksHook({
        productOptions: productOptionPage?.content
    });

    const [selectedProductOption, setSelectedProductOption] = useState(null);
    const [stockRegisterStatusModalOpen, setStockRegisterStatusModalOpen] = useState(false);

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

    const handleOpenStockRegisterStatusModal = (e, productOption) => {
        e.stopPropagation();
        setStockRegisterStatusModalOpen(true);
        setSelectedProductOption(productOption);
    }

    const handleCloseStockRegisterStatusModal = () => {
        setStockRegisterStatusModalOpen(false);
        setSelectedProductOption(null);
    }

    return (
        <>
            <Container>
                <ControlFieldContainer>
                    <RegisteredStockByDateComponent />
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
                <Table
                    productOptions={productOptionPage?.content}
                    inventoryStocks={inventoryStocks}
                    selectedProductOptions={selectedProductOptions}
                    onActionSelectProductOption={onSelectProductOption}
                    onActionSelectAllProductOptions={onSelectAllProductOptions}
                    onActionSelectClearAllProductOptionsInPage={onSelectClearAllProductOptionsInPage}
                    onActionOpenStockRegisterStatusModal={handleOpenStockRegisterStatusModal}
                />

            </Container>
            <PagenationContainer>
                <PagenationComponentV2
                    align={'center'}
                    pageIndex={productOptionPage?.number}
                    totalPages={productOptionPage?.totalPages}
                    isFirst={productOptionPage?.first}
                    isLast={productOptionPage?.last}
                    totalElements={productOptionPage?.totalElements}
                    sizeElements={[50, 100]}
                    autoScrollTop={false}
                    popperDisablePortal={true}
                />
            </PagenationContainer>

            {selectedProductOptions?.length > 0 &&
                <FloatingControlBarComponent
                    selectedProductOptions={selectedProductOptions}
                    onSelectClearAllProductOptions={onSelectClearAllProductOptions}
                    onActionSelectProductOption={onSelectProductOption}
                    onReqFetchInventoryStocks={reqFetchInventoryStocks}
                />
            }

            {stockRegisterStatusModalOpen &&
                <InventoryStockListModalComponent
                    open={stockRegisterStatusModalOpen}
                    readOnly={false}
                    productOptionId={selectedProductOption?.id}
                    productCategoryName={selectedProductOption?.productCategory?.name}
                    productSubCategoryName={selectedProductOption?.productSubCategory?.name}
                    productName={selectedProductOption?.product?.name}
                    productOptionName={selectedProductOption?.name}
                    productThumbnailUri={selectedProductOption?.product?.thumbnailUri}
                    onClose={handleCloseStockRegisterStatusModal}
                    onDeleteCompleted={() => {
                        reqFetchInventoryStocks()
                    }}
                />
            }
        </>
    );

}

function Table({
    productOptions,
    inventoryStocks,
    selectedProductOptions,
    onActionSelectProductOption,
    onActionSelectAllProductOptions,
    onActionSelectClearAllProductOptionsInPage,
    onActionOpenStockRegisterStatusModal
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
                                {productOptions?.every(r => selectedProductOptions.some(r2 => r2.id === r.id)) ?
                                    <input
                                        type='checkbox'
                                        onChange={() => onActionSelectClearAllProductOptionsInPage(productOptions)}
                                        checked={true}
                                    ></input>
                                    :
                                    <input
                                        type='checkbox'
                                        onChange={() => onActionSelectAllProductOptions(productOptions)}
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
                        {productOptions?.map((option) => {
                            const isSelected = selectedProductOptions?.find(r => r.id === option.id);

                            return (
                                <tr
                                    key={option.id}
                                    className={`${isSelected ? 'tr-selected' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); onActionSelectProductOption(option); }}
                                >
                                    <td>
                                        <input
                                            type='checkbox'
                                            onChange={() => onActionSelectProductOption(option)}
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
                                            <div style={{ color: 'var(--mainColor)' }}>{inventoryStocks?.find(r => r.productOptionId === option?.id)?.stockUnit}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div>{option?.code}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <SingleBlockButton
                                                type='button'
                                                className='stockRegisterStatusView-button-item'
                                                onClick={(e) => onActionOpenStockRegisterStatusModal(e, option)}
                                            >
                                                보기
                                            </SingleBlockButton>
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
        resizable: false,
        name: 'stockRegisterStatus',
        headerName: '입/출고현황',
        defaultWidth: 80
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

const SORTED_BY = [
    {
        sort: 'product.cid_asc',
        name: '상품등록 오래된순'
    },
    {
        sort: 'product.cid_desc',
        name: '상품등록 최신순'
    },
    {
        sort: 'product.name_asc',
        name: '상품명 오름차순'
    },
    {
        sort: 'product.name_desc',
        name: '상품명 내림차순'
    }
]