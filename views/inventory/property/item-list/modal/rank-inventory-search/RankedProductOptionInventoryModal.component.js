import { useRef } from "react";
import { Container, PagenationContainer } from "../../style/RankedProductOptionInventoryModal.styled";
import useProductOptionInventoryByRankHook from "./hooks/useProductOptionInventoryByRankHook";
import useProductOptionsHook from "./hooks/useProductOptionsHook";
import SortControlFieldView from "./view/SortControlField.view";
import TableFieldView from "./view/TableField.view";
import PagenationComponentStateV2 from "../../../../../modules/pagenation/PagenationStateComponentV2";
import { useSelector } from "react-redux";

export default function RankedProductOptionInventoryModalComponent(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    const modalRef = useRef();

    const {
        productOptionTotalSize
    } = useProductOptionsHook();

    const {
        isLoading: isTableLoading,
        searchCondition,
        rankedProductOptions,
        onChangeSearchCondition,
        reqFetchRankedProductOptions
    } = useProductOptionInventoryByRankHook();

    const onChangeSortType = (e) => {
        let target = e.target.value;
        let selectedData = SORTED_BY.find(r => r.sort === target);

        let data = {
            ...searchCondition,
            assetType: selectedData.assetType,
            orderType: selectedData.orderType,
        }

        onChangeSearchCondition(data);
    }

    const handlePaging = (pageIndex) => {
        let params = {
            page: pageIndex,
            size: rankedProductOptions?.size,
            assetType: searchCondition?.assetType,
            orderType: searchCondition?.orderType
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        reqFetchRankedProductOptions(params, headers);
        modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSizing = (size) => {
        let params = {
            page: rankedProductOptions?.number,
            size: size,
            assetType: searchCondition?.assetType,
            orderType: searchCondition?.orderType
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        reqFetchRankedProductOptions(params, headers);
    }

    return (
        <>
            <Container>
                <SortControlFieldView
                    searchCondition={searchCondition}
                    onChangeSortType={onChangeSortType}
                />
                <TableFieldView
                    modalRef={modalRef}
                    rankedProductOptions={rankedProductOptions?.content}
                    badStockEndDate={props.badStockEndDate}
                    pageIndex={rankedProductOptions?.number}
                    pageSize={rankedProductOptions?.size}
                    isTableLoading={isTableLoading}
                />

                <PagenationContainer>
                    <PagenationComponentStateV2
                        align={'center'}
                        pageIndex={rankedProductOptions?.number}
                        totalPages={Math.ceil(productOptionTotalSize / rankedProductOptions?.size)}
                        isFirst={rankedProductOptions?.first}
                        isLast={rankedProductOptions?.last}
                        totalElements={productOptionTotalSize}
                        sizeElements={[20, 50, 100]}
                        size={rankedProductOptions?.size}
                        onChangePage={handlePaging}
                        onChangeSize={handleSizing}
                        isLoading={isTableLoading}
                    />
                </PagenationContainer>
            </Container>
        </>
    )
}

const SORTED_BY = [
    {
        sort: 'PROPERTY_PRICE.DESC',
        assetType: 'PROPERTY_PRICE',
        orderType: 'DESC',
        name: '재고자산 내림차순'
    },
    {
        sort: 'PROPERTY_PRICE.ASC',
        assetType: 'PROPERTY_PRICE',
        orderType: 'ASC',
        name: '재고자산 오름차순'
    },
    {
        sort: 'STOCK_UNIT.DESC',
        assetType: 'STOCK_UNIT',
        orderType: 'DESC',
        name: '재고수량 내림차순'
    },
    {
        sort: 'STOCK_UNIT.ASC',
        assetType: 'STOCK_UNIT',
        orderType: 'ASC',
        name: '재고수량 오름차순'
    },
    {
        sort: 'ESTIMATE_SALES_PRICE.DESC',
        assetType: 'ESTIMATE_SALES_PRICE',
        orderType: 'DESC',
        name: '예상 매출액 내림차순'
    },
    {
        sort: 'ESTIMATE_SALES_PRICE.ASC',
        assetType: 'ESTIMATE_SALES_PRICE',
        orderType: 'ASC',
        name: '예상 매출액 오름차순'
    }
]
