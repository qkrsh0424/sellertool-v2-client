
import { dateToYYYYMMDDhhmmss } from "../../../../../../../../utils/dateFormatUtils";
import { LabelGroup, Wrapper } from "../styles/RecordInfo.styled";

export default function RecordInfoFieldView({
    record
}) {
    return (
        record && 
        <Wrapper>
            <LabelGroup>
                <div>키워드 : </div>
                <div className='content-value'>{record.keyword}</div>
            </LabelGroup>
            <LabelGroup>
                <div>스토어명 : </div>
                <div className='content-value'>{record.mall_name}</div>
            </LabelGroup>
            <LabelGroup>
                <div>최근 검색일시 : </div>
                <div className='content-value'>{record.last_searched_at ? dateToYYYYMMDDhhmmss(record.last_searched_at) : '-'}</div>
            </LabelGroup>
        </Wrapper>
    )
}