import { CustomBoxImage } from "../../../../../modules";
import { dateToHHmm, dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import { LabelGroup, Wrapper } from "../styles/RecordInfo.styled";

export default function RecordInfoFieldView({
    record,
    recordInfo
}) {
    return (
        record &&
        <Wrapper>
            <div className="image-box">
                <CustomBoxImage
                    src={recordInfo?.thumbnail_url}
                />
            </div>
            <div style={{ overflow: 'hidden' }}>
                <LabelGroup>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <span className='content-value' style={{ color: 'var(--mainColor)' }}>{record.mall_name}</span>
                        <span> | </span>
                        <span className='content-value'>{record.keyword}</span>
                    </div>
                </LabelGroup>
                <LabelGroup style={{ color: '#808080' }}>
                    <span>최근조회 </span>
                    <span>
                        {recordInfo ?
                            <>
                                <span>{dateToYYYYMMDD(recordInfo.created_at)} </span>
                                <span>{dateToHHmm(recordInfo.created_at)}</span>
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