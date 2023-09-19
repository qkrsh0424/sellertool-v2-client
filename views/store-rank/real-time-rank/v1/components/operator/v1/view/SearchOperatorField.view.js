import SingleBlockButton from "../../../../../../../modules/button/SingleBlockButton";
import CustomInput from "../../../../../../../modules/input/CustomInput";
import CustomSelect from "../../../../modules/select/CustomSelect";
import { ConditionContainer, ConditionWrapper, FlexGroup, SubmitButtonContainer, Wrapper } from "../styles/SearchOperator.styled";

export default function SearchOperatorFieldView({
    categories,
    searchCondition,
    searchQuery,
    searchCategoryId,
    searchStatus,
    sortColumn,
    onChangeSearchCondition,
    onChangeSearchQuery,
    onChangeSearchCategory,
    onChangeSearchStatus,
    onChangeSortColumn,
    handleSubmitClear,
    handleSubmit
}) {
    return (
        <Wrapper>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FlexGroup>
                    <ConditionContainer>
                        <div className='label'>검색</div>
                        <ConditionWrapper>
                            <CustomSelect
                                className='select-item'
                                value={searchCondition || ''}
                                onChange={(e) => onChangeSearchCondition(e)}
                            >
                                {SEARCH_COLUMN_TYPES?.map(r => {
                                    return (
                                        <option
                                            key={r.value}
                                            value={r.value}
                                        >
                                            {r.name}
                                        </option>
                                    );
                                })}
                            </CustomSelect>
                            <CustomInput
                                type='text'
                                className='input-item'
                                value={searchQuery || ''}
                                onChange={(e) => onChangeSearchQuery(e)}
                                disabled={!searchCondition}
                            ></CustomInput>
                        </ConditionWrapper>
                    </ConditionContainer>
                </FlexGroup>
                <FlexGroup>
                    <FlexGroup>
                        <ConditionContainer>
                            <div className='label'>카테고리</div>
                            <ConditionWrapper>
                                <CustomSelect
                                    className='select-item'
                                    value={searchCategoryId || ''}
                                    onChange={(e) => onChangeSearchCategory(e)}
                                >
                                    <option value=''>전체</option>
                                    {categories?.map(r => {
                                        return (
                                            <option
                                                key={r.id}
                                                value={r.id}
                                            >
                                                {r.name}
                                            </option>
                                        );
                                    })}
                                </CustomSelect>
                            </ConditionWrapper>
                        </ConditionContainer>
                    </FlexGroup>
                    <FlexGroup>
                        <ConditionContainer>
                            <div className='label'>상태</div>
                            <ConditionWrapper>
                                <CustomSelect
                                    className='select-item'
                                    value={searchStatus || ''}
                                    onChange={(e) => onChangeSearchStatus(e)}
                                >
                                    {SEARCH_STATUS_TYPES?.map(r => {
                                        return (
                                            <option
                                                key={r.value}
                                                value={r.value}
                                            >
                                                {r.name}
                                            </option>
                                        );
                                    })}
                                </CustomSelect>
                            </ConditionWrapper>
                        </ConditionContainer>
                    </FlexGroup>
                </FlexGroup>
                <FlexGroup>
                    <ConditionContainer>
                        <div className='label'>정렬</div>
                        <ConditionWrapper>
                            <CustomSelect
                                className='select-item'
                                value={sortColumn || 'created_at'}
                                onChange={(e) => onChangeSortColumn(e)}
                            >
                                {SORT_COLUMN_TYPES?.map(r => {
                                    return (
                                        <option
                                            key={r.value}
                                            value={r.value}
                                        >
                                            {r.name}
                                        </option>
                                    );
                                })}
                            </CustomSelect>
                        </ConditionWrapper>
                    </ConditionContainer>
                </FlexGroup>

                <SubmitButtonContainer>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        style={{
                            background: 'var(--defaultModalCloseColor)'
                        }}
                        onClick={() => handleSubmitClear()}
                    >
                        초기화
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='submit'
                        className='button-item'
                    >
                        조회
                    </SingleBlockButton>
                </SubmitButtonContainer>
            </form>
        </Wrapper>
    )
}

const SEARCH_COLUMN_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'keyword',
        name: '키워드'
    },
    {
        value: 'mall_name',
        name: '스토어명'
    }
]

const SEARCH_STATUS_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'NONE',
        name: '미검색'
    },
    {
        value: 'COMPLETE',
        name: '완료'
    },
    {
        value: 'FAIL',
        name: '실패'
    },
    {
        value: 'PENDING',
        name: '조회중'
    }
]

const SORT_COLUMN_TYPES = [
    {
        value: 'created_at',
        name: '최근등록순'
    },
    {
        value: 'status_updated_at',
        name: '최근조회순'
    }
]