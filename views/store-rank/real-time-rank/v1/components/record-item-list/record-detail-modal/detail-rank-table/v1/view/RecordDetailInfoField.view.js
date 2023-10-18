import { CustomBoxImage } from "../../../../../../modules";
import { Wrapper } from "../styles/RecordDetailInfo.styled";

export default function RecordDetailInfoFieldView({
    selectedRecordDetail,
    record
}) {
    return (
        <Wrapper>
            <div className='image-box'>
                <CustomBoxImage
                    className='image-el'
                    src={selectedRecordDetail?.thumbnail_url}
                />
            </div>
            <div>
                <span style={{ color: 'var(--mainColor)' }}>{record.mall_name}</span>
                <span> | </span>
                <span>{record.keyword}</span>
            </div>
        </Wrapper>
    )
}