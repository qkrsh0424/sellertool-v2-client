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
            <div className='info-group'>
                <div>
                    {recordDetail.advertising_yn === 'y' &&
                        <div className='sub-info-box'  style={{ minWidth: '40px'}} >
                            광고
                        </div>
                    }
                    {recordDetail.price_comparision_yn === 'y' &&
                        <div className='sub-info-box'  style={{ minWidth: '56px'}} >
                            가격비교
                        </div>
                    }
                </div>
                <div>
                    <span style={{ color: '#3d3d3d' }}>{recordDetail.product_title}</span>
                </div>
            </div>
        </Wrapper>
    )
}