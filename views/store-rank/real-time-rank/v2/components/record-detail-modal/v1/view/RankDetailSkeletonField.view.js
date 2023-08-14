import SkeletonEl from "../../../../modules/skeleton/v1/SkeletonEl";
import { DetailInfoWrapper, InfoGroupBox, Wrapper } from "../styles/RankDetail.styled";

const EMPTY_ARRAY = [1, 2];

export default function RankDetailSkeletonFieldView() {
    return (
        <Wrapper>
            {EMPTY_ARRAY?.map((r) => {
                return (
                    <DetailInfoWrapper key={'record_detail_skeleton_idx' + r}>
                        <div style={{ paddingRight: '10px' }}>
                            <SkeletonEl variant="rounded" width={160} height={160}/>
                        </div>
                        <div style={{ margin : '7px 0' }}>
                            <div className='info-field'>
                                <InfoGroupBox style={{ marginBottom: '5px' }}>
                                    <div><SkeletonEl variant="rounded" width={300} height={25} /></div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div><SkeletonEl variant="rounded" width={180} height={20} /></div>
                                </InfoGroupBox>
                            </div>
                            <div className='info-field'>
                                <InfoGroupBox style={{ marginBottom: '5px' }}>
                                    <div><SkeletonEl variant="rounded" width={80} height={20} /></div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div><SkeletonEl variant="rounded" width={120} height={20} /></div>
                                </InfoGroupBox>
                            </div>
                            <div className='rank-field'>
                                <InfoGroupBox>
                                    <div><SkeletonEl variant="rounded" width={120} height={20} /></div>
                                </InfoGroupBox>
                            </div>
                        </div>
                    </DetailInfoWrapper>
                )
            })}
        </Wrapper>
    )
}