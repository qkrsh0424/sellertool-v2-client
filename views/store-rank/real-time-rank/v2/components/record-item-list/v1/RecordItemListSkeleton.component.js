import { Container, ContentGroup, RecordInfo, RecordInfoSkeletonBox, RecordItemBox, Wrapper } from "./styles/RecordItemList.styled";
import SkeletonEl from "../../../modules/skeleton/v1/SkeletonEl";

const EMPTY_ARRAY = [1, 2, 3, 4, 5];

export function RecordItemListSkeletonComponent() {
    return (
        <>
            <Container>
            <div className='list-title'>
                    <span>검색 내역 </span>
                    <span>( - 개)</span>
                </div>
                <Wrapper>
                    {EMPTY_ARRAY.map(r => {
                        return (
                            <RecordInfoSkeletonBox key={'record-info-idx' + r} >
                                <RecordInfo>
                                    <div className='content-box'>
                                        <div><SkeletonEl variant="rounded" width={170} height={170} /></div>
                                        <div style={{ padding: '0 20px' }}>
                                            <ContentGroup>
                                                <div><SkeletonEl variant="rounded" width={60} height={20} /></div>
                                            </ContentGroup>
                                            <ContentGroup>
                                                <div><SkeletonEl variant="rounded" width={60} height={20} /></div>
                                            </ContentGroup>
                                            <ContentGroup>
                                                <div><SkeletonEl variant="rounded" width={60} height={20} /></div>
                                            </ContentGroup>
                                        </div>
                                    </div>
                                </RecordInfo>
                            </RecordInfoSkeletonBox>      
                        )
                    })}
                </Wrapper>
            </Container>
        </>
    )
}