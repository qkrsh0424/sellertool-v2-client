import CustomSelect from "../../../../../../../components/select/default/v1/CustomSelect";
import { Wrapper } from "../style/SortControl.styled";

export default function SortControlFieldView ({
    searchCondition,
    onChangeSortType
}) {
    return(
        <Wrapper>
            <CustomSelect
                className='select-item'
                onChange={(e) => onChangeSortType(e)}
                value={(`${searchCondition?.assetType}.${searchCondition?.orderType}`) || SORTED_BY[0]}
            >
                {SORTED_BY?.map(r => {
                    return (
                        <option key={r.assetType + r.orderType} value={r.sort}>{r.name}</option>
                    )
                })}
            </CustomSelect>
        </Wrapper>
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