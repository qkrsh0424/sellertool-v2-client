import { CustomBoxImage } from "../../../../../../modules";
import { Wrapper } from "../styles/RecordDetailInfo.styled";

export default function RecordDetailInfoFieldView({
    recordDetail
}) {
    return (
        <Wrapper>
            <div className='image-box'>
                <CustomBoxImage
                    className='image-el'
                    src={recordDetail?.thumbnail_url}
                />
            </div>
            <div>
                <span style={{ color: '#3d3d3d' }}>{recordDetail.product_title}</span>
            </div>
        </Wrapper>
    )
}