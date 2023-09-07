import { useEffect, useState } from "react";
import { Container, ContentGroup, ContentValue, ControlBox, RecordInfo, RecordItemBox, StatusBox, Wrapper } from "./styles/RecordItemList.styled";
import { RecordDetailModalComponent } from "../../record-detail-modal/v1";
import { CustomBoxImage } from "../../../modules";
import HighlightedText from "../../../../../../modules/text/HighlightedText";
import ConfirmModalComponentV2 from "../../../../../../modules/modal/ConfirmModalComponentV2";
import { dateToHHmm, dateToYYYYMMDD } from "../../../utils/dateFormatUtils";
import { CustomProgressBar } from "../../../modules/progress/progress-bar/v1";
import { SearchInfoFieldView } from "./views/SearchInfoField.view";

export function RecordItemListComponent({
    keyword,
    mallName,
    recordList,
    rankSearchInfo,
    currentPendingRecordIds,
    onSetCurrentPendingRecordIds,
    onDeleteRankRecord,
    onSearchSubscriptionPlanSearchInfo
}) {
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [detailSearchModalOpen, setDetailSearchModalOpen] = useState(false);
    const [recordDeleteModalOpen, setRecordDeleteModalOpen] = useState(false);
    
    useEffect(() => {
        if(!recordList) {
            return;
        }

        if(!selectedRecord) {
            return;
        }

        handleUpdateSelectedRecord();
    }, [recordList, selectedRecord])

    const handleUpdateSelectedRecord = () => {
        let data = recordList?.find(r => r.id === selectedRecord.id)
        setSelectedRecord(data);
    }

    const handleOpenDetailSearchModal = (item) => {
        setSelectedRecord(item);
        setDetailSearchModalOpen(true)
    }

    const handleCloseDetailSearchModal = () => {
        setDetailSearchModalOpen(false);
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
        onDeleteRankRecord(selectedRecord?.id, () => handleCloseRecordDeleteModal())
    }

    return (
        <>
            <Container>
                <SearchInfoFieldView
                    recordList={recordList}
                    rankSearchInfo={rankSearchInfo}
                />
                
                <Wrapper>
                    {recordList?.map((item, index) => {
                        let isKeywordAccent = keyword && (item.keyword).includes(keyword);
                        let isMallNameAccent = mallName && (item.mall_name).includes(mallName);
                        let currentRecordInfo = item.infos?.find(info => item.current_nrank_record_info_id === info.id);
                        let isPending = currentPendingRecordIds?.includes(item.id);

                        return (
                            <RecordItemBox key={'record-info-idx' + index} >
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
                                <RecordInfo
                                    onClick={() => handleOpenDetailSearchModal(item)}
                                    isSameRecord={isKeywordAccent && isMallNameAccent}
                                >
                                    <div className='content-box'>
                                        <div>
                                            <CustomBoxImage
                                                className='thumbnail-img-box'
                                                src={currentRecordInfo?.thumbnail_url}
                                                size='170px'
                                                mobileSize='100px'
                                            />
                                        </div>
                                        <div style={{ padding: '0 20px' }}>
                                            <ContentGroup>
                                                <div style={{ minWidth: '60px' }}>키워드</div>
                                                <div>|</div>
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
                                                <div style={{ minWidth: '60px' }}>스토어명</div>
                                                <div>|</div>
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
                                                <div style={{ minWidth: '60px' }}>최근 조회</div>
                                                <div>|</div>
                                                <ContentValue>
                                                    {currentRecordInfo ?
                                                        <div style={{ color: '#444', display: 'inline' }}>
                                                            <span>{dateToYYYYMMDD(currentRecordInfo.created_at)} </span>
                                                            <span>({dateToHHmm(currentRecordInfo.created_at)})</span>
                                                        </div>
                                                        :
                                                        '-'
                                                    }
                                                </ContentValue>
                                            </ContentGroup>
                                        </div>
                                        {currentRecordInfo &&
                                            <div className='sub-info-box'>
                                                <div className='item-el'>
                                                    <span>일반 </span>
                                                    <span style={{ fontWeight: '700', color: '#4d4d4d' }}>{currentRecordInfo.rank_detail_unit ?? 0}</span>
                                                </div>
                                                <div className='item-el'>
                                                    <span>광고 </span>
                                                    <span style={{ fontWeight: '700', color: '#4d4d4d' }}>{currentRecordInfo.ad_rank_detail_unit ?? 0}</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <StatusBox>
                                        {isPending && <CustomProgressBar type='linear' customcolor={'#9ac7e0'} />}
                                    </StatusBox>
                                </RecordInfo>
                            </RecordItemBox>
                        )
                    })}
                </Wrapper>

                {/* record detail (랭킹 조회 내역) 모달창 */}
                {detailSearchModalOpen &&
                    <RecordDetailModalComponent
                        open={detailSearchModalOpen}
                        record={selectedRecord}
                        currentPendingRecordIds={currentPendingRecordIds}
                        rankSearchInfo={rankSearchInfo}
                        onClose={handleCloseDetailSearchModal}
                        onSetCurrentPendingRecordIds={onSetCurrentPendingRecordIds}
                        onSearchSubscriptionPlanSearchInfo={onSearchSubscriptionPlanSearchInfo}
                    />
                }

                {/* 검색 내역 제거 확인 모달창 */}
                {recordDeleteModalOpen &&
                    <ConfirmModalComponentV2
                        open={recordDeleteModalOpen}
                        onClose={handleCloseRecordDeleteModal}
                        message={
                            (
                                <>
                                    <div>검색 내역을 삭제하면 <span style={{ color: 'var(--defaultRedColor)' }}>하위 데이터(랭킹 조회 내역)도 모두 삭제됩니다.</span></div>
                                    <div>정말로 해당 검색 내역을 삭제하시겠습니까?</div>
                                </>
                            )
                        }
                        confirmBtnStyle={{
                            background: 'var(--defaultRedColor)',
                            width: '40%'
                        }}
                        onConfirm={() => handleDeleteRankRecord(selectedRecord.id)}
                    />
                }
            </Container>
        </>
    )
}