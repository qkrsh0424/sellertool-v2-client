import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import usePopoverHook from "../../../../hooks/popover/usePopoverHook";
import { BasicSnackbarHookComponent, useBasicSnackbarHook } from "../../../../hooks/snackbar/useBasicSnackbarHook";
import { numberFormatUtils } from "../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CustomImage from "../../../modules/image/CustomImage";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../modules/modal/ConfirmModalComponentV2";
import MouseOverPopover from "../../../modules/popover/MouseOverPopover";
import ResizableTh from "../../../modules/table/ResizableTh";
import useProductOptionsHook from "../hooks/useProductOptionsHook";
import ProductOptionPackageModalComponent from "./modal/ProductOptionPackageModal.component";
import { Container, ContentWrapper, OptionsWrapper, ProductDetailWrapper, ProductWrapper, TableBox, TableWrapper, ThumbnailWrapper } from "./styles/ProductCard.styled";

export default function ProductCardComponent({
    product,
    onChangeStockManagement,
    onSubmitDeleteProduct
}) {
    const router = useRouter();
    const [optionsFieldOpen, setOptionsFieldOpen] = useState(false);
    const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [optionPackageModalOpen, setOptionPackageModalOpen] = useState(false);
    const [selectedOptionId, setSelectedOptionId] = useState(null);

    const {
        popoverAnchorEl,
        popoverMessage,
        onActionOpenPopover,
        onActionClosePopover
    } = usePopoverHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        onActionOpen: onActionSnackbarOpen,
        onActionClose: onActionSnackbarClose
    } = useBasicSnackbarHook();

    const {
        productOptions,
        reqFetchProductOptions
    } = useProductOptionsHook({
        product: product
    });

    useEffect(() => {
        if (!router?.query?.optionsFoldable) {
            handleCloseOptionsField();
            return;
        }

        if (router?.query?.optionsFoldable === 'unfold') {
            handleOpenOptionsField();
        } else {
            handleCloseOptionsField();
        }
    }, [router?.query?.optionsFoldable])

    const handleOpenOptionsField = useCallback(() => {
        reqFetchProductOptions();
        setOptionsFieldOpen(true);
    }, [])

    const handleCloseOptionsField = useCallback(() => {
        setOptionsFieldOpen(false);
    }, []);

    const handleCopyText = useCallback(async (text) => {
        let url = text;
        await navigator.clipboard.writeText(url);
        onActionSnackbarOpen('클립보드에 복사되었습니다.');
    }, []);

    const handleRouteToEdit = useCallback(() => {
        router.push({
            pathname: `/product/edit-product`,
            query: {
                ...router?.query,
                productId: product?.id
            }
        })
    }, []);

    const handleOpenDeleteProductModal = useCallback((productId) => {
        setSelectedProductId(productId);
        setDeleteProductModalOpen(true);
    }, []);

    const handleCloseDeleteProductModal = useCallback(() => {
        setDeleteProductModalOpen(false);
        setSelectedProductId(null);
    }, []);

    const handleOpenOptionPackageModal = useCallback((optionId) => {
        setSelectedOptionId(optionId);
        setOptionPackageModalOpen(true);
    }, []);

    const handleCloseOptionPackageModal = useCallback(() => {
        setOptionPackageModalOpen(false);
        setSelectedOptionId(null);
    }, []);

    // Submit handler
    const handleSubmitDeleteProduct = useCallback(() => {
        if (!selectedProductId) {
            return;
        }

        onSubmitDeleteProduct({
            productId: selectedProductId,
            successCallback: () => {
                handleCloseDeleteProductModal();
            }
        });

    }, [selectedProductId]);

    return (
        <>
            <Container>
                <ProductWrapper className='mgl-flex'>
                    <ThumbnailWrapper>
                        <CustomImage
                            src={product?.thumbnailUri ? product?.thumbnailUri : '/images/normal/image.png'}
                        />
                    </ThumbnailWrapper>
                    <div
                        className='mgl-flex mgl-flex-alignItems-center'
                        style={{ flex: 1 }}
                    >
                        <ContentWrapper>
                            <div className='name'>
                                {product?.name}
                            </div>
                            <div className='code'>
                                코드: {product?.code}
                            </div>
                            <div className='product-tag'>
                                태그: {product?.productTag}
                            </div>
                            <div className='category'>
                                {product?.productCategory?.name} / {product?.productSubCategory?.name}
                            </div>
                        </ContentWrapper>
                        {optionsFieldOpen ?
                            <SingleBlockButton
                                type='button'
                                className='dropdown-button-item'
                                onClick={() => handleCloseOptionsField()}
                            >
                                <div>
                                    <CustomImage
                                        src={'/images/icon/arrowDropUp_default_808080.svg'}
                                    />
                                </div>
                            </SingleBlockButton>
                            :
                            <SingleBlockButton
                                type='button'
                                className='dropdown-button-item'
                                onClick={() => handleOpenOptionsField()}
                            >
                                <div>
                                    <CustomImage
                                        src={'/images/icon/arrowDropDown_default_808080.svg'}
                                    />
                                </div>
                            </SingleBlockButton>
                        }
                    </div>
                </ProductWrapper>

                {optionsFieldOpen &&
                    <>
                        <ProductDetailWrapper>
                            <div className='event-button-group mgl-flex mgl-flex-justifyContent-flexEnd'>
                                <SingleBlockButton
                                    type='button'
                                    className='event-button-item'
                                    style={{
                                        border: '1px solid var(--mainColor)',
                                        color: '#fff',
                                        background: 'var(--mainColor)'
                                    }}
                                    onClick={() => handleRouteToEdit()}
                                >
                                    수정
                                </SingleBlockButton>
                                <SingleBlockButton
                                    type='button'
                                    className='event-button-item'
                                    onClick={() => handleOpenDeleteProductModal(product?.id)}
                                >
                                    삭제
                                </SingleBlockButton>
                            </div>
                            <div>
                                {product?.stockManagementYn === 'y' ?
                                    <span
                                        className='inventory-on'
                                        onClick={() => onChangeStockManagement(product?.id)}
                                    >
                                        재고관리ON
                                    </span>
                                    :
                                    <span
                                        className='inventory-off'
                                        onClick={() => onChangeStockManagement(product?.id)}
                                    >
                                        재고관리OFF
                                    </span>
                                }
                                <span
                                    className='tag'
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => onActionOpenPopover(e, `${product?.memo}`)}
                                    onMouseLeave={() => onActionClosePopover()}
                                    onClick={() => handleCopyText(product?.memo)}
                                >
                                    메모
                                </span>
                                {product?.purchaseUri &&
                                    <span
                                        className='tag'
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => onActionOpenPopover(e, `${product?.purchaseUri}`)}
                                        onMouseLeave={() => onActionClosePopover()}
                                        onClick={() => handleCopyText(product?.purchaseUri)}
                                    >
                                        구매 URL
                                    </span>
                                }
                            </div>
                        </ProductDetailWrapper>
                        <OptionsWrapper>
                            <Table
                                productOptions={productOptions}
                                onActionOpenPopover={onActionOpenPopover}
                                onActionClosePopover={onActionClosePopover}
                                onActionOpenOptionPackageModal={handleOpenOptionPackageModal}
                            />
                        </OptionsWrapper>
                    </>
                }
            </Container>

            {deleteProductModalOpen &&
                (
                    <ConfirmModalComponentV2
                        open={deleteProductModalOpen}
                        onClose={handleCloseDeleteProductModal}
                        confirmBtnStyle={{
                            background: 'var(--defaultRedColor)',
                        }}
                        message={
                            <>
                                <div>
                                    상품을 삭제하면 <span style={{ color: 'var(--defaultRedColor)' }}>하위 데이터(옵션 데이터 등)도 모두 삭제됩니다.</span>
                                </div>
                                <div>
                                    정말로 해당 상품을 삭제하시겠습니까?
                                </div>
                            </>
                        }
                        onConfirm={handleSubmitDeleteProduct}
                    />
                )
            }

            {optionPackageModalOpen &&
                (
                    <CommonModalComponent
                        open={optionPackageModalOpen}
                        onClose={handleCloseOptionPackageModal}
                        maxWidth={'sm'}
                    >
                        <ProductOptionPackageModalComponent
                            selectedOptionId={selectedOptionId}

                            onReqFetchProductOptions={reqFetchProductOptions}
                            onClose={handleCloseOptionPackageModal}
                        />
                    </CommonModalComponent>
                )
            }

            {/* Popover */}
            {Boolean(popoverAnchorEl) &&
                <MouseOverPopover
                    open={Boolean(popoverAnchorEl)}
                    anchorEl={popoverAnchorEl}
                    message={popoverMessage}

                    onClose={onActionClosePopover}
                />
            }

            {snackbarOpen &&
                <BasicSnackbarHookComponent
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionSnackbarClose}
                    severity={'success'}
                    vertical={'top'}
                    horizontal={'center'}
                    duration={2000}
                />
            }
        </>
    );
}


function Table({
    productOptions,
    onActionOpenPopover,
    onActionClosePopover,
    onActionOpenOptionPackageModal
}) {

    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <thead>
                        <tr>
                            {OPTION_HEADER?.map((r, index) => {
                                return (
                                    <ResizableTh
                                        key={index}
                                        className="fixed-header"
                                        scope="col"
                                        width={160}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        {r.headerName}
                                    </ResizableTh>
                                )
                            })}
                            <th
                                className="fixed-header"
                                width={60}
                            >
                                패키지
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productOptions?.map((option) => {
                            return (
                                <tr
                                    key={option.id}
                                >
                                    {OPTION_HEADER.map((header) => {
                                        if (header.name === 'salesPrice' || header.name === 'totalPurchasePrice') {
                                            return (
                                                <td key={header.name}>
                                                    <div className='info-item'>
                                                        {numberFormatUtils.numberWithCommas(option[header.name])}
                                                    </div>
                                                </td>

                                            );
                                        }
                                        if (header.name === 'memo') {
                                            return (
                                                <td key={header.name}>
                                                    <div
                                                        className='info-item'
                                                        onMouseEnter={(e) => onActionOpenPopover(e, `${option[header.name]}`)}
                                                        onMouseLeave={() => onActionClosePopover()}
                                                    >
                                                        {option[header.name]}
                                                    </div>
                                                </td>
                                            );
                                        }

                                        return (
                                            <td key={header.name}>
                                                <div className='info-item'>
                                                    {option[header.name]}
                                                </div>
                                            </td>
                                        );
                                    })}
                                    <td>
                                        <SingleBlockButton
                                            type='button'
                                            className='icon-button-item'
                                            style={{
                                                borderColor: option?.packageYn === 'y' ? 'var(--defaultGreenColor)' : '',
                                                backgroundColor: option?.packageYn === 'y' ? 'var(--defaultGreenColor)' : '',
                                            }}
                                            onClick={() => onActionOpenOptionPackageModal(option.id)}
                                        >
                                            <div className='icon-figure'>
                                                {option?.packageYn === 'y' ?
                                                    <CustomImage
                                                        src={'/images/icon/edit_note_ffffff.svg'}
                                                    />
                                                    :
                                                    <CustomImage
                                                        src={'/images/icon/edit_note_808080.svg'}
                                                    />
                                                }

                                            </div>
                                        </SingleBlockButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper>
    );
}
const OPTION_HEADER = [
    {
        name: 'code',
        headerName: '옵션코드',
        required: true
    },
    {
        name: 'name',
        headerName: '옵션명',
        required: true
    },
    {
        name: 'optionTag',
        headerName: '옵션 태그',
        required: false
    },
    {
        name: 'salesPrice',
        headerName: '판매가격',
        required: false
    },
    {
        name: 'totalPurchasePrice',
        headerName: '총 구매가격',
        required: false
    },
    {
        name: 'releaseLocation',
        headerName: '출고지',
        required: false
    },
    {
        name: 'status',
        headerName: '상태',
        required: false
    },
    {
        name: 'memo',
        headerName: '메모',
        required: false
    }
]