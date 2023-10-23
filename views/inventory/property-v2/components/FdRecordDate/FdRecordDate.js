import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../components/image/CustomImage";
import CustomSelect from "../../../../../components/select/default/v1/CustomSelect";
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { St } from "./FdRecordDate.styled";

const customDateUtils = CustomDateUtils();

const returnDates = (startDateTime, endDateTime) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const dates = [];

    while (startDate <= endDate) {
        dates.push(customDateUtils.dateToYYYYMMDD(new Date(startDate), '-'));
        startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
}

export function FdRecordDate({
    recordDate,
    yesterdayLocalDateTime,
    last30dayLocalDateTime,
    onChangeRecordDate,
    onReqSynchronizeInventoryAssets
}) {
    const dateList = returnDates(last30dayLocalDateTime, yesterdayLocalDateTime).reverse();

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <div className='content-wrapper'>
                        <div className='label'>날짜설정</div>
                        <CustomSelect
                            className='select-item'
                            value={recordDate || ''}
                            onChange={(e) => onChangeRecordDate(e.target.value)}
                        >
                            {dateList?.map(r => {
                                return (
                                    <option key={r} value={r}>{r}</option>
                                );
                            })}
                        </CustomSelect>
                    </div>
                    <div className='content-wrapper'>
                        <CustomBlockButton
                            type='button'
                            className='update-btn'
                            onClick={() => onReqSynchronizeInventoryAssets()}
                        >
                            <div className='flex-row'>
                                <div className='icon-item'><CustomImage src='/images/icon/sync_default_808080.svg' /></div>
                                데이터 동기화
                            </div>
                        </CustomBlockButton>
                    </div>
                </St.Wrapper>
            </St.Container>
        </>
    );
}