import { useRouter } from "next/router";
import CustomSelect from "../../../../../components/select/default/v1/CustomSelect";
import { Wrapper } from "../style/SortControl.styled"

export default function SortControlFieldView({
    handleSelectSort
}) {
    const router = useRouter();

    return (
        <Wrapper>
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
        </Wrapper>
    )
}

const SORTED_BY = [
    {
        sort: 'product.createdAt_asc',
        name: '상품등록 오래된순'
    },
    {
        sort: 'product.createdAt_desc',
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