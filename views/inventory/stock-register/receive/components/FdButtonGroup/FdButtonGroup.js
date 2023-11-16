import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdButtonGroup.styled";
import { MdProductOptionList } from "./modals/MdProductOptionList/MdProductOptionList";
import { useRouter } from "next/router";
import { SearchAggregationProvider } from "../../contexts/SearchAggregationProvider";

export function FdButtonGroup({
    stockReceiveItemList,
    onConcatStockReceiveItems
}) {
    const router = useRouter();
    const poListMd = router?.query?.poListMd;

    const toggleProductOptionListModalOpen = (bool) => {
        let query = { ...router.query };

        if (bool) {
            router.push({
                pathname: router?.pathname,
                query: {
                    ...query,
                    poListMd: true
                }
            })
        } else {
            router.back();
        }

    }

    const productOptionListModalOpen = poListMd === 'true' ? true : false;

    return (
        <>
            <St.Container>
                <div className='wrapper'>
                    <CustomBlockButton
                        type='button'
                        onClick={() => toggleProductOptionListModalOpen(true)}
                    >
                        입고제품추가
                    </CustomBlockButton>
                    <CustomBlockButton>
                        엑셀일괄추가
                    </CustomBlockButton>
                </div>
            </St.Container>

            <SearchAggregationProvider>
                <MdProductOptionList
                    open={productOptionListModalOpen}
                    onClose={() => toggleProductOptionListModalOpen(false)}

                    stockReceiveItemList={stockReceiveItemList}
                    onConcatStockReceiveItems={(stockReceiveItems) => onConcatStockReceiveItems(stockReceiveItems)}
                />
            </SearchAggregationProvider>
        </>
    );
}