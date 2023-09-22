import SkeletonEl from "../../../../../modules/skeleton/v1/SkeletonEl";
import { DetailInfoWrapper, InfoGroupBox, MainInfoWrapper, Wrapper } from "../styles/RankDetail.styled";

const EMPTY_ARRAY = [1, 2];

export default function RankDetailSkeletonFieldView() {
    return (
        <Wrapper>
            {EMPTY_ARRAY?.map((r) => {
                return (
                    <DetailInfoWrapper key={'record_detail_skeleton_idx' + r}>
                        <MainInfoWrapper>
                            <div style={{ padding: '0 10px', minWidth: '110px', maxWidth: '110px' }}>
                                <SkeletonEl variant="rounded" width={90} height={90} />
                            </div>
                            <div style={{ margin: '7px 0' }}>
                                <div className='info-field'>
                                    <InfoGroupBox>
                                        <div><SkeletonEl variant="rounded" width={300} height={23} /></div>
                                    </InfoGroupBox>
                                </div>
                                <div className='info-field'>
                                    <InfoGroupBox>
                                        <div><SkeletonEl variant="rounded" width={80} height={20} /></div>
                                    </InfoGroupBox>
                                </div>
                            </div>
                        </MainInfoWrapper>
                    </DetailInfoWrapper>
                )
            })}
        </Wrapper>
    )
}