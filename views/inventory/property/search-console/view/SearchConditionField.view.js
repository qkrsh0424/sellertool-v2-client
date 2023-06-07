import CustomInput from "../../../../../components/input/default/v1/CustomInput";
import CustomSelect from "../../../../../components/select/default/v1/CustomSelect";
import { Container } from "../style/SearchCondition.styled";


export default function SearchConditionFieldView({
    searchCondition,
    searchQuery,
    onChangeSearchCondition,
    onChangeSearchQuery
}) {
    return (
        <Container>
            <div className='label'>조회 조건</div>
            <div className='control-group'>
                <div className='control-box'>
                    <CustomSelect
                        className='select-item'
                        value={searchCondition || ''}
                        onChange={(e) => onChangeSearchCondition(e)}
                    >
                        <option value=''>선택</option>
                        {SEARCH_CONDITIONS?.map(r => {
                            return (
                                <option
                                    key={r.fieldName}
                                    value={r.fieldName}
                                >
                                    {r.name}
                                </option>
                            );
                        })}
                    </CustomSelect>
                </div>
                {searchCondition &&
                    <div className='control-box'>
                        <CustomInput
                            type='text'
                            className='input-item'
                            placeholder='검색어를 입력하세요.'
                            value={searchQuery || ''}
                            onChange={(e) => onChangeSearchQuery(e)}
                            autoFocus
                        ></CustomInput>
                    </div>
                }
            </div>
        </Container>
    )
}

const SEARCH_CONDITIONS = [
    {
        fieldName: 'PRODUCT_NAME',
        name: '상품명',
    },
    {
        fieldName: 'PRODUCT_CODE',
        name: '상품코드',
    },
    {
        fieldName: 'PRODUCT_TAG',
        name: '상품태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_NAME',
        name: '옵션명',
    },
    {
        fieldName: 'PRODUCT_OPTION_CODE',
        name: '옵션코드',
    },
    {
        fieldName: 'PRODUCT_OPTION_TAG',
        name: '옵션태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_STATUS',
        name: '옵션상태',
    },
    {
        fieldName: 'PRODUCT_OPTION_RELEASE_LOCATION',
        name: '출고지',
    }
]