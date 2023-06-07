import PagenationComponentV2 from "../../../modules/pagenation/PagenationComponentV2";
import FloatingControlBarComponent from "./FloatingControlBar.component";
import useInventoryStocksHook from "./hooks/useInventoryStocksHook";
import useProductOptionsHook from "./hooks/useProductOptionsHook";
import { Container, ControlFieldContainer, PagenationContainer } from "./style/ItemList.styled";
import SortControlFieldView from "./view/SortControlField.view";
import TableFieldView from "./view/TableField.view";
import { useEffect, useState } from "react";
import ProductInventoryModalComponent from "./modal/product-inventory/ProductInventoryModal.component";
import useSelectedProductOptionsAndInventoryHook from "./hooks/useSelectedProductOptionsAndInventoryHook";
import SearchRankBoxComponent from "./SearchRankBox.component";
import { getStartDate } from "../../../../utils/dateFormatUtils";
import BadStockSettingFieldView from "./view/BadStockSettingField.view";
import { useRouter } from "next/router";
import { CustomDialog } from "../../../../components/dialog/v1/CustomDialog";

const currDateTime = new Date();
const YEAR = currDateTime.getFullYear();
const MONTH = currDateTime.getMonth();
const DATE = currDateTime.getDate();
const DEFAULT_START_DATE = getStartDate(new Date(YEAR, MONTH, DATE - 6))

export default function ItemListComponnet() {
    const router = useRouter();
    const [selectedProductOptionsInventorySum, setSelectedProductOptionsInventorySum] = useState(null);
    const [productInventoryModalOpen, setProductInventoryModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [badStockEndDateSelectorOpen, setBadStockEndDateSelectorOpen] = useState(false);
    const [badStockEndDate, setBadStockEndDate] = useState(DEFAULT_START_DATE);

    const {
        isLoading: isTableLoading,
        productOptionPage
    } = useProductOptionsHook();

    const {
        inventoryStocks,
        reqFetchInventoryStocks
    } = useInventoryStocksHook({
        productOptions: productOptionPage?.content
    });

    const {
        selectedProductOptionsAndInventory,
        onSelectProductOptionAndUpdateInventory,
        onSelectAllProductOptionsAndUpdateInventory,
        onSelectClearAllProductOptionsAndUpdateInventoryInPage,
        onSelectClearAllProductOptionsAndUpdateInventory
    } = useSelectedProductOptionsAndInventoryHook();

    useEffect(() => {
        if (!selectedProductOptionsAndInventory?.length > 0) {
            setSelectedProductOptionsInventorySum(null);
            return;
        }
        handleInitSelectedProductOptionsInventorySum();
    }, [selectedProductOptionsAndInventory])

    const handleSelectSort = (e) => {
        let value = e.target.value;

        router.replace({
            pathname: router.pathname,
            query: {
                sort: value,
                page: 1
            }
        });
    }

    const handleInitSelectedProductOptionsInventorySum = () => {
        let data = {
            stockUnitSum: 0,
            propertyPriceSum: 0,
            estimatedSalesPrice: 0
        };

        selectedProductOptionsAndInventory.forEach(option => {
            let optionStockUnit = option.inventory.stockUnit;
            if (!option.inventory || optionStockUnit <= 0) {
                return;
            }

            data = {
                stockUnitSum: data.stockUnitSum + optionStockUnit,
                propertyPriceSum: data.propertyPriceSum + (optionStockUnit * option.totalPurchasePrice),
                estimatedSalesPrice: data.estimatedSalesPrice + (optionStockUnit * option.salesPrice)
            }
        })

        setSelectedProductOptionsInventorySum(data);
    }

    const handleOpenProductInventoryModal = (e, product) => {
        e.stopPropagation();

        setSelectedProduct(product);
        setProductInventoryModalOpen(true);
    }

    const handleCloseProductInventoryModal = () => {
        setProductInventoryModalOpen(false);
    }

    const handleOpenBadStockEndDateSelector = () => {
        setBadStockEndDateSelectorOpen(true);
    }

    const handleCloseBadStockEndDateSelector = () => {
        setBadStockEndDateSelectorOpen(false);
    }

    const handleActionUpdateBadStockEndDate = (value) => {
        setBadStockEndDate(value);
        handleCloseBadStockEndDateSelector();
    }

    return (
        <>
            <Container>
                <ControlFieldContainer>
                    <SearchRankBoxComponent
                        badStockEndDate={badStockEndDate}
                    />
                    <div className='box-group'>
                        <BadStockSettingFieldView
                            badStockEndDateSelectorOpen={badStockEndDateSelectorOpen}
                            badStockEndDate={badStockEndDate}
                            handleOpenBadStockEndDateSelector={handleOpenBadStockEndDateSelector}
                            handleCloseBadStockEndDateSelector={handleCloseBadStockEndDateSelector}
                            handleActionUpdateBadStockEndDate={handleActionUpdateBadStockEndDate}
                        />
                        <SortControlFieldView handleSelectSort={handleSelectSort} />
                    </div>
                </ControlFieldContainer>
                <TableFieldView
                    productOptions={productOptionPage?.content}
                    inventoryStocks={inventoryStocks}
                    badStockEndDate={badStockEndDate}
                    selectedProductOptionsAndInventory={selectedProductOptionsAndInventory}
                    isTableLoading={isTableLoading}
                    onActionSelectProductOption={onSelectProductOptionAndUpdateInventory}
                    onActionSelectAllProductOptions={onSelectAllProductOptionsAndUpdateInventory}
                    onActionSelectClearAllProductOptionsInPage={onSelectClearAllProductOptionsAndUpdateInventoryInPage}
                    onActionOpenProductInventoryModal={handleOpenProductInventoryModal}
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
                    autoScrollTop={true}
                    popperDisablePortal={true}
                />
            </PagenationContainer>

            {selectedProductOptionsAndInventory?.length > 0 &&
                <FloatingControlBarComponent
                    selectedProductOptionsAndInventory={selectedProductOptionsAndInventory}
                    selectedProductOptionsInventorySum={selectedProductOptionsInventorySum}
                    onSelectClearAllProductOptions={onSelectClearAllProductOptionsAndUpdateInventory}
                    onReqFetchInventoryStocks={reqFetchInventoryStocks}
                />
            }

            {productInventoryModalOpen &&
                <CustomDialog
                    maxWidth="md"
                    open={productInventoryModalOpen}
                    onClose={() => handleCloseProductInventoryModal()}
                >
                    <CustomDialog.CloseButton onClose={() => handleCloseProductInventoryModal()} />
                    <CustomDialog.Title>상품 재고 현황</CustomDialog.Title>
                    <ProductInventoryModalComponent
                        selectedProduct={selectedProduct}
                        badStockEndDate={badStockEndDate}
                    />
                </CustomDialog>
            }
        </>
    )
}

