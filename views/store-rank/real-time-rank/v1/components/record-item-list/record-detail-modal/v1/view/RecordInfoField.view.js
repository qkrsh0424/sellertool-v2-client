import { CustomBoxImage } from "../../../../../modules";
import { dateToHHmm, dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import { LabelGroup, Wrapper } from "../styles/RecordInfo.styled";

export default function RecordInfoFieldView({
    record,
    lastSearchedRecordInfo
}) {
    return (
        record &&
        <Wrapper>
            <div className="image-box">
                <CustomBoxImage
                    src={lastSearchedRecordInfo?.thumbnail_url}
                />
            </div>
            <div>
                <LabelGroup>
                    <span className='content-value' style={{ color: 'var(--mainColor)' }}>{record.mall_name}</span>
                    <span> | </span>
                    <span className='content-value'>{record.keyword}</span>
                </LabelGroup>
                <LabelGroup style={{ color: '#808080' }}>
                    <span>최근조회 </span>
                    <span>
                        {lastSearchedRecordInfo ?
                            <>
                                <span>{dateToYYYYMMDD(lastSearchedRecordInfo.created_at)} </span>
                                <span>{dateToHHmm(lastSearchedRecordInfo.created_at)}</span>
                            </>
                            :
                            '-'
                        }
                    </span>
                </LabelGroup>
            </div>
        </Wrapper>
    )
}