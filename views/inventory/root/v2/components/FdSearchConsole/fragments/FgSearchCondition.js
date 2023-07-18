import CustomInput from "../../../../../../../components/input/default/v1/CustomInput";
import CustomSelect from "../../../../../../../components/select/default/v1/CustomSelect";
import { Container } from "./FgSearchCondition.styled";

export function FgSearchCondition({
    SEARCH_CONDITIONS,
    searchCondition,
    searchQuery,
    onSetSearchCondition = (value) => { },
    onSetSearchQuery = (value) => { }
}) {
    const handleSelectSearchCondition = async (e) => {
        const value = e.target.value;

        onSetSearchCondition(value);
    }

    const handleChangeSearchQuery = async (e) => {
        const value = e.target.value;

        onSetSearchQuery(value);
    }

    return (
        <Container>
            <div className='label'>조회 조건</div>
            <div className='control-group'>
                <div className='control-box'>
                    <CustomSelect
                        className='select-item'
                        value={searchCondition || ''}
                        onChange={(e) => handleSelectSearchCondition(e)}
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
                            onChange={(e) => handleChangeSearchQuery(e)}
                        ></CustomInput>
                    </div>
                }
            </div>
        </Container>
    );
}