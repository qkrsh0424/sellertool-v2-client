import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
import { LabelGroup, Wrapper } from "../styles/RecordInfo.styled";

export default function RankInfoFieldView({
    record
}) {
    return (
        record && 
        <Wrapper>
            <LabelGroup>
                <div>키워드 : </div>
                <div>{record.keyword}</div>
            </LabelGroup>
            <LabelGroup>
                <div>스토어명 : </div>
                <div>{record.mallName}</div>
            </LabelGroup>
            <LabelGroup>
                <div>조회일 : </div>
                <div>{dateToYYYYMMDDhhmmss(record.createdAt)}</div>
            </LabelGroup>
        </Wrapper>
    )
}