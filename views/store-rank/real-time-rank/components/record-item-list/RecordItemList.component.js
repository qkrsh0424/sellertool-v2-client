import { useRouter } from "next/router";
import { dateToYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { Container, LabelGroup, RecordItemBox, Wrapper } from "./styles/RecordItemList.styled";

export function RecordItemListComponent() {
    const router = useRouter()

    const {
        recordList
    } = useNRankRecordListHook();

    const routeToRecordDetailPage = (e, item) => {
        e.stopPropagation();

        router.push({
            pathname: '/store-rank/real-time-rank',
            query: {
                recordId: item.id
            }
        })
    }

    return (
        <>
            <Container>
                <div className='list-title'>검색 내역</div>
                <Wrapper>
                    {recordList?.map((item, index) => {
                        return (
                            <RecordItemBox
                                key={'record-info-idx' + index}
                                onClick={(e) => routeToRecordDetailPage(e, item)}
                            >
                                <LabelGroup>
                                    <span>키워드 : </span>
                                    <span>{item.keyword}</span>
                                </LabelGroup>
                                <LabelGroup>
                                    <span>스토어명 : </span>
                                    <span>{item.mallName}</span>
                                </LabelGroup>
                                <LabelGroup>
                                    <span>조회일 : </span>
                                    <span>{dateToYYMMDDhhmmss(item.createdAt)}</span>
                                </LabelGroup>
                            </RecordItemBox>
                        )
                    })}
                </Wrapper>
            </Container>
        </>
    )
}