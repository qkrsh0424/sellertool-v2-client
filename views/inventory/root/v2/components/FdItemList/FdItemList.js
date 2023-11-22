import { useRouter } from "next/router";
import { useApiHook, useInventoryStocksHook, useProductOptionPageHook, useSelectedProductOptionsHook } from "../../hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, ControlFieldContainer, PagenationContainer, SortControlContainer, TableBox, TableWrapper } from "./FdItemList.styled";
import CustomSelect from "../../../../../../components/select/default/v1/CustomSelect";
import { FgRegisteredStockByDate } from "./fragments";
import ResizableTh from "../../../../../../components/table/th/v1/ResizableTh";
import CustomImage from "../../../../../../components/image/CustomImage";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import PagenationComponentV2 from "../../../../../../components/pagenation/PagenationComponentV2";
import { InventoryStockListModalComponent } from "../../../../fragments/inventory-stock-list-modal/v1";
import { FdFloatingControlBar } from "../FdFloatingControlBar";
import { customBackdropController } from "../../../../../../components/backdrop/default/v1";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";
import { FgStockReceiveController } from "./fragments/FgStockReceiveController/FgStockReceiveController";

const DEFAULT_SORT = 'product.cid_desc';
const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 50;

export function FdItemList() {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const _apiHook = useApiHook();
    const _productOptionPageHook = useProductOptionPageHook();
    const _inventoryStocksHook = useInventoryStocksHook();
    const {
        selectedProductOptions,
        onSelectProductOption,
        onSelectAllProductOptions,
        onSelectClearAllProductOptionsInPage,
        onSelectClearAllProductOptions
    } = useSelectedProductOptionsHook();

    const [targetProductOption, setTargetProductOption] = useState(null);
    const [stockRegisterStatusModalOpen, setStockRegisterStatusModalOpen] = useState(false);

    const customBackdropControl = customBackdropController();
    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function initialize() {
            let resultProductOptionPage = null;
            let resultInventoryStocks = null;

            const params = {
                searchCondition: router?.query?.searchCondition,
                searchQuery: router?.query?.searchQuery,
                productCategoryId: router?.query?.productCategoryId,
                productSubCategoryId: router?.query?.productSubCategoryId,
                sort: router?.query?.sort || DEFAULT_SORT,
                page: router?.query?.page || DEFAULT_PAGE,
                size: router?.query?.size || DEFAULT_SIZE,
            }
            await _apiHook.onReqFetchProductOptionPage({
                params: params, headers: { wsId: wsId }
            },
                (results, response) => {
                    resultProductOptionPage = results;
                }
            );

            if (resultProductOptionPage && resultProductOptionPage?.content) {
                let productOptionIds = resultProductOptionPage?.content?.map(r => r.id);
                await _apiHook.onReqFetchInventoryStocks({
                    body: { productOptionIds: productOptionIds },
                    headers: { wsId: wsId }
                },
                    (results, response) => {
                        resultInventoryStocks = results;
                    }
                )
            }

            _productOptionPageHook.onSetProductOptionPage(resultProductOptionPage);
            _inventoryStocksHook.onSetInventoryStocks(resultInventoryStocks);
        }

        initialize();
    }, [wsId, router?.query]);

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
        setTargetProductOption(productOption);
    }

    const handleCloseStockRegisterStatusModal = () => {
        setStockRegisterStatusModalOpen(false);
        setTargetProductOption(null);
    }

    const handleReqBulkCreateInventoryReceives = async (body, callbackFn) => {
        customBackdropControl.showBackdrop();
        await _apiHook.onReqBulkCreateInventoryReceives({
            body: { inventoryReceives: body?.inventoryReceives },
            headers: { wsId: wsId }
        },
            (results, response) => {
                callbackFn();
            }
        );

        let productOptionIds = _productOptionPageHook?.productOptionPage?.content?.map(r => r.id);
        await _apiHook.onReqFetchInventoryStocks({
            body: { productOptionIds: productOptionIds },
            headers: { wsId: wsId }
        },
            (results, response) => {
                _inventoryStocksHook.onSetInventoryStocks(results);
            }
        )
        customBackdropControl.hideBackdrop();
    }

    const handleReqBulkCreateInventoryReleases = async (body, callbackFn) => {
        customBackdropControl.showBackdrop();
        await _apiHook.onReqBulkCreateInventoryReleases({
            body: { inventoryReleases: body?.inventoryReleases },
            headers: { wsId: wsId }
        },
            (results, response) => {
                callbackFn();
            }
        );

        let productOptionIds = _productOptionPageHook?.productOptionPage?.content?.map(r => r.id);
        await _apiHook.onReqFetchInventoryStocks({
            body: { productOptionIds: productOptionIds },
            headers: { wsId: wsId }
        },
            (results, response) => {
                _inventoryStocksHook.onSetInventoryStocks(results);
            }
        )
        customBackdropControl.hideBackdrop();
    }

    const handleCopyToClipboardWithOptionCode = async (text) => {
        const successMessage = '클립보드에 복사되었습니다.';
        await navigator.clipboard.writeText(text);
        customToast.info(successMessage, {
            ...defaultOptions
        })
    };

    return (
        <>
            <Container>
                <ControlFieldContainer>
                    <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-gap-10'>
                        <FgRegisteredStockByDate />
                        <FgStockReceiveController />
                    </div>
                    <SortControlContainer>
                        <CustomSelect
                            className='select-item'
                            onChange={(e) => handleSelectSort(e)}
                            value={router?.query?.sort || 'product.cid_desc'}
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
                    productOptions={_productOptionPageHook?.productOptionPage?.content}
                    inventoryStocks={_inventoryStocksHook?.inventoryStocks}
                    selectedProductOptions={selectedProductOptions}
                    onActionSelectProductOption={onSelectProductOption}
                    onActionSelectAllProductOptions={onSelectAllProductOptions}
                    onActionSelectClearAllProductOptionsInPage={onSelectClearAllProductOptionsInPage}
                    onActionOpenStockRegisterStatusModal={handleOpenStockRegisterStatusModal}
                    onCopyToClipboardWithOptionCode={handleCopyToClipboardWithOptionCode}
                />
            </Container>
            <PagenationContainer>
                <PagenationComponentV2
                    align={'center'}
                    pageIndex={_productOptionPageHook?.productOptionPage?.number}
                    totalPages={_productOptionPageHook?.productOptionPage?.totalPages}
                    isFirst={_productOptionPageHook?.productOptionPage?.first}
                    isLast={_productOptionPageHook?.productOptionPage?.last}
                    totalElements={_productOptionPageHook?.productOptionPage?.totalElements}
                    sizeElements={[50, 100]}
                    autoScrollTop={false}
                    popperDisablePortal={true}
                />
            </PagenationContainer>

            {selectedProductOptions?.length > 0 &&
                <FdFloatingControlBar
                    selectedProductOptions={selectedProductOptions}
                    onSelectClearAllProductOptions={onSelectClearAllProductOptions}
                    onReqBulkCreateInventoryReceives={(inventoryReceiveCreateFormList, callbackFn) => handleReqBulkCreateInventoryReceives(inventoryReceiveCreateFormList, callbackFn)}
                    onReqBulkCreateInventoryReleases={(inventoryReleaseCreateFormList, callbackFn) => handleReqBulkCreateInventoryReleases(inventoryReleaseCreateFormList, callbackFn)}
                />
            }

            {stockRegisterStatusModalOpen &&
                <InventoryStockListModalComponent
                    open={stockRegisterStatusModalOpen}
                    readOnly={false}
                    productOptionId={targetProductOption?.id}
                    productCategoryName={targetProductOption?.productCategory?.name}
                    productSubCategoryName={targetProductOption?.productSubCategory?.name}
                    productName={targetProductOption?.product?.name}
                    productOptionName={targetProductOption?.name}
                    productThumbnailUri={targetProductOption?.product?.thumbnailUri}
                    onClose={handleCloseStockRegisterStatusModal}
                    onDeleteCompleted={async () => {
                        let productOptionIds = _productOptionPageHook?.productOptionPage?.content?.map(r => r.id);
                        await _apiHook.onReqFetchInventoryStocks({
                            body: { productOptionIds: productOptionIds },
                            headers: { wsId: wsId }
                        },
                            (results, response) => {
                                _inventoryStocksHook.onSetInventoryStocks(results);
                            }
                        )
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
    onActionOpenStockRegisterStatusModal,
    onCopyToClipboardWithOptionCode
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
                                            {option?.packageYn === 'y' && <div style={{ color: 'var(--defaultGreenColor)' }}>패키지 상품</div>}
                                            {option?.packageYn !== 'y' && <div style={{ color: 'var(--mainColor)' }}>{inventoryStocks?.find(r => r.productOptionId === option?.id)?.stockUnit}</div>}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <div className='optionCodeText' onClick={(e) => { e.stopPropagation(); onCopyToClipboardWithOptionCode(option?.code); }}>{option?.code}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='content-box'>
                                            <CustomBlockButton
                                                type='button'
                                                className='stockRegisterStatusView-button-item'
                                                onClick={(e) => onActionOpenStockRegisterStatusModal(e, option)}
                                            >
                                                보기
                                            </CustomBlockButton>
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