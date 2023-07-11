import { useState } from "react";
import { dateToYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { Container, LabelGroup, RecordItemBox, Wrapper } from "./styles/RecordItemList.styled";
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
                        let isMallNameAccent = mallName && (item.mallName).includes(mallName);

                        return (
                            <RecordItemBox
                                key={'record-info-idx' + index}
                                onClick={(e) => handleOpenDetailSearchModal(e, item)}
                            >
                                <LabelGroup>
                                    <span>키워드 : </span>
                                    {isKeywordAccent ? 
                                        <HighlightedText
                                            text={item.keyword}
                                            query={keyword}
                                            highlightColor={'#ffcd92'}
                                        />
                                        :
                                        <span>{item.keyword}</span>
                                    }
                                </LabelGroup>
                                <LabelGroup>
                                    <span>스토어명 : </span>
                                    {isMallNameAccent ? 
                                        <HighlightedText
                                            text={item.mallName}
                                            query={mallName}
                                            highlightColor={'#ffcd92'}
                                        />
                                        :
                                        <span>{item.mallName}</span>
                                    }
                                </LabelGroup>
                                <LabelGroup>
                                    <span>최근 검색일 : </span>
                                    <span>{item.lastSearchedAt ? dateToYYMMDDhhmmss(item.lastSearchedAt) : "-"}</span>
                                </LabelGroup>
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