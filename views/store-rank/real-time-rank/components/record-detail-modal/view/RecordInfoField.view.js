import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
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
                <div className='content-value'>{record.mallName}</div>
            </LabelGroup>
            <LabelGroup>
                <div>최근 검색일 : </div>
                <div className='content-value'>{record.lastSearchedAt ? dateToYYYYMMDDhhmmss(record.lastSearchedAt) : '-'}</div>
            </LabelGroup>
        </Wrapper>
    )
}