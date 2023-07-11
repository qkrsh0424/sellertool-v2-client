import { useState } from "react";
import { dateToYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { Container, ContentGroup, ContentValue, RecordItemBox, Wrapper } from "./styles/RecordItemList.styled";
import { RecordDetailModalComponent } from "../record-detail-modal";
import HighlightedText from "../../../../../components/text/highlight/HighlightedText";

export function RecordItemListComponent({
    keyword,
    mallName
}) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailSearchModalOpen, setDetailSearchModalOpen] = useState(false);

    const {
        recordList
    } = useNRankRecordListHook();

    const handleOpenDetailSearchModal = (e, item) => {
        e.stopPropagation();

        setSelectedItem(item)
        setDetailSearchModalOpen(true)
    }

    const handleCloseDetailSearchModal = () => {
        setDetailSearchModalOpen(false)
    }

    return (
        <>
            <Container>
                <div className='list-title'>검색 내역</div>
                <Wrapper>
                    {recordList?.map((item, index) => {
                        let isKeywordAccent = keyword && (item.keyword).includes(keyword);
                        let isMallNameAccent = mallName && (item.mall_name).includes(mallName);

                        return (
                            <RecordItemBox
                                key={'record-info-idx' + index}
                                onClick={(e) => handleOpenDetailSearchModal(e, item)}
                            >
                                <ContentGroup>
                                    <span>키워드 : </span>
                                    <ContentValue>
                                        {isKeywordAccent ?
                                            <HighlightedText
                                                text={item.keyword}
                                                query={keyword}
                                                highlightColor={'#ffcd92'}
                                            />
                                            :
                                            <span>{item.keyword}</span>
                                        }
                                    </ContentValue>
                                </ContentGroup>
                                <ContentGroup>
                                    <span>스토어명 : </span>
                                    <ContentValue>
                                        {isMallNameAccent ?
                                            <HighlightedText
                                                text={item.mall_name}
                                                query={mallName}
                                                highlightColor={'#ffcd92'}
                                            />
                                            :
                                            <span>{item.mall_name}</span>
                                        }
                                    </ContentValue>
                                </ContentGroup>
                                <ContentGroup>
                                    <span>최근 검색일시 : </span>
                                    <ContentValue>
                                        <span>{item.last_searched_at ? dateToYYMMDDhhmmss(item.last_searched_at) : "-"}</span>
                                    </ContentValue>
                                </ContentGroup>
                            </RecordItemBox>
                        )
                    })}
                </Wrapper>

                {detailSearchModalOpen && 
                    <RecordDetailModalComponent
                        record={selectedItem}
                        onClose={handleCloseDetailSearchModal}
                    />
                }
            </Container>
        </>
    )
}