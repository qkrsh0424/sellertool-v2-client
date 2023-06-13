import { useEffect, useState } from "react"
import { Container } from "../../style/ProductInventoryModal.styled";
import useInventoryStocksHook from "../../hooks/useInventoryStocksHook";
import ProductInventoryFieldView from "./view/ProductInventoryField.view";
import ProductOptionsInventoryFieldView from "./view/ProductOptionsInventoryField.view";
import useProductOptionsHook from "./hooks/useProductOptionsHook";

export default function ProductInventoryModalComponent(props) {
    const [productInventorySum, setProductInventorySum] = useState(null);

    const {
        isLoading: isTableLoading,
        productOptions
    } = useProductOptionsHook({ 
        selectedProduct: props.selectedProduct
    });

    const {
        inventoryStocks
    } = useInventoryStocksHook({
        productOptions
    })

    useEffect(() => {
        if(!inventoryStocks) {
            return;
        }

        handleInitInventorySum();
    }, [inventoryStocks]);

    const handleInitInventorySum = () => {
        let data = {
            stockUnitSum: 0,
            propertyPriceSum: 0,
            estimatedSalesPrice: 0
        };

        productOptions.forEach(option => {
            inventoryStocks.forEach(inventory => {
                if (option.id === inventory.productOptionId) {
                    if(inventory.stockUnit <= 0) {
                        return;
                    }

                    data = {
                        ...data,
                        stockUnitSum: data.stockUnitSum + inventory.stockUnit,
                        propertyPriceSum: data.propertyPriceSum + (inventory.stockUnit * option.totalPurchasePrice),
                        estimatedSalesPrice: data.estimatedSalesPrice + (inventory.stockUnit * option.salesPrice)
                    }
                }
            });
        })

        setProductInventorySum(data);
    }

    return (
        <>
            <Container>
                <ProductInventoryFieldView
                    product={props.selectedProduct}
                    productInventorySum={productInventorySum}
                />
                <ProductOptionsInventoryFieldView
                    productOptions={productOptions}
                    inventoryStocks={inventoryStocks}
                    badStockEndDate={props.badStockEndDate}
                    isTableLoading={isTableLoading}
                />
            </Container>
        </>
    )
}