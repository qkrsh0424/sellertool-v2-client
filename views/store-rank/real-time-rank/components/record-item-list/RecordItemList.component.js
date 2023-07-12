import { useState } from "react";
import { dateToYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import { Container, ContentGroup, ContentValue, ControlBox, RecordItemBox, Wrapper } from "./styles/RecordItemList.styled";
import { RecordDetailModalComponent } from "../record-detail-modal";
import HighlightedText from "../../../../../components/text/highlight/HighlightedText";
import { useRouter } from "next/router";
import { CustomBoxImage } from "../../modules";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import { useSelector } from "react-redux";

export function RecordItemListComponent({
    keyword,
    mallName,
    recordList,
    reqDeleteNRankRecord,
    reqSearchNRankRecordList
}) {
    const router = useRouter();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [detailSearchModalOpen, setDetailSearchModalOpen] = useState(false);
    const [recordDeleteModalOpen, setRecordDeleteModalOpen] = useState(false);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const handleOpenDetailSearchModal = (id) => {
        router.query.recordId = id;

        router.replace({
            query: {
                ...router.query
            }
        })
        setDetailSearchModalOpen(true)
    }

    const handleCloseDetailSearchModal = () => {
        setDetailSearchModalOpen(false)
    }

    const handleOpenctionDeleteRecord = (e, item) => {
        e.stopPropagation();

        setSelectedRecord(item)
        setRecordDeleteModalOpen(true);
    }

    const handleCloseRecordDeleteModal = () => {
        setRecordDeleteModalOpen(false)
    }

    const handleDeleteRankRecord = async () => {
        let params = {
            id: selectedRecord?.id
        }
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await reqDeleteNRankRecord(params, headers, () => {
            handleCloseRecordDeleteModal();
            setSelectedRecord(null);
        })
    }

    const onActionOpenSearchedRecordDetail = async () => {
        handleCloseDetailSearchModal();
        await reqSearchNRankRecordList();
        
        let itemId = router.query?.recordId;
        handleOpenDetailSearchModal(itemId);
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
                                onClick={() => handleOpenDetailSearchModal(item.id)}
                            >
                                <ControlBox>
                                    <div className='delete-box'>
                                        <button
                                            type='button'
                                            className='button-item'
                                            onClick={(e) => handleOpenctionDeleteRecord(e, item)}
                                        >
                                            <CustomBoxImage
                                                src='/images/icon/delete_default_e56767.svg'
                                                size='23px'
                                            />
                                        </button>
                                    </div>
                                </ControlBox>
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
                        open={detailSearchModalOpen}
                        onClose={handleCloseDetailSearchModal}
                        onActionOpenSearchedRecordDetail={onActionOpenSearchedRecordDetail}
                    />
                }

                {recordDeleteModalOpen &&
                    <ConfirmModalComponentV2
                        open={recordDeleteModalOpen}
                        onClose={handleCloseRecordDeleteModal}
                        message={
                            (
                                <>
                                    <div>검색 내역을 삭제하면 <span style={{ color: 'var(--defaultRedColor)' }}>하위 데이터(랭킹 조회 결과)도 모두 삭제됩니다.</span></div>
                                    <div>정말로 해당 검색 내역을 삭제하시겠습니까?</div>
                                </>
                            )
                        }
                        confirmBtnStyle={{
                            background: 'var(--defaultRedColor)',
                            width: '40%'
                        }}
                        onConfirm={() => handleDeleteRankRecord(selectedRecord.id)}
                    >


                    </ConfirmModalComponentV2>
                }
            </Container>
        </>
    )
}