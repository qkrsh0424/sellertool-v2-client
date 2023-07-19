import { CustomBoxImage } from "../../../../modules";
import { dateToStrHHmm, dateToStrYYYYMMDD } from "../../../../utils/dateFormatUtils";
import { LabelGroup, Wrapper } from "../styles/RecordInfo.styled";

export default function RecordInfoFieldView({
    record,
    currentRecordInfo
}) {
    return (
        record && 
        <Wrapper>
            <div style={{ marginRight: '20px' }}>
                <CustomBoxImage
                    src={currentRecordInfo?.thumbnail_url}
                    size='130px'
                />
            </div>
            <div>
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
                    <div className='content-value'>
                        {currentRecordInfo ?
                            <>
                                <span>{dateToStrYYYYMMDD(currentRecordInfo.created_at)} </span>
                                <span style={{ color: '#808080', fontSize: '16px' }}>({dateToStrHHmm(currentRecordInfo.created_at)})</span>
                            </>
                            :
                            '-'
                        }
                    </div>
                </LabelGroup>
            </div>
        </Wrapper>
    )
}