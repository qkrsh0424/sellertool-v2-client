import { useEffect, useState } from "react";
import { Container, ContentGroup, ContentValue, ControlBox, RecordInfo, RecordItemBox, Wrapper } from "./styles/RecordItemList.styled";
import { RecordDetailModalComponent } from "../../record-detail-modal/v1";
import { useSelector } from "react-redux";
import { CustomBoxImage } from "../../../modules";
import HighlightedText from "../../../../../../modules/text/HighlightedText";
import ConfirmModalComponentV2 from "../../../../../../modules/modal/ConfirmModalComponentV2";
import { dateToStrHHmm, dateToStrYYYYMMDD } from "../../../utils/dateFormatUtils";

export function RecordItemListComponent({
    keyword,
    mallName,
    recordList,
    reqDeleteNRankRecord,
    reqSearchNRankRecordList
}) {
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [detailSearchModalOpen, setDetailSearchModalOpen] = useState(false);
    const [recordDeleteModalOpen, setRecordDeleteModalOpen] = useState(false);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

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
        })
    }

    const onActionOpenSearchedRecordDetail = async () => {
        await reqSearchNRankRecordList();
    }

    return (
        <>
            <Container>
                <div className='list-title'>검색 내역</div>
                <Wrapper>
                    {recordList?.map((item, index) => {
                        let isKeywordAccent = keyword && (item.keyword).includes(keyword);
                        let isMallNameAccent = mallName && (item.mall_name).includes(mallName);
                        let currentRecordInfo = item.infos.find(r => item.current_nrank_record_info_id === r.id);

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
                                                src={currentRecordInfo?.thumbnail_url}
                                                size='150px'
                                            />
                                        </div>
                                        <div style={{ padding: '0 20px', flex: 1 }}>
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
                                                <ContentValue>
                                                    {currentRecordInfo ?
                                                        <div style={{ color: '#444', fontSize: '16px' }}>
                                                            <span >{dateToStrYYYYMMDD(currentRecordInfo.created_at)} </span>
                                                            <span>({dateToStrHHmm(currentRecordInfo.created_at)})</span>
                                                        </div>
                                                        :
                                                        '-'
                                                    }
                                                </ContentValue>
                                            </ContentGroup>
                                        </div>
                                    </div>
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
                        onClose={handleCloseDetailSearchModal}
                        onActionOpenSearchedRecordDetail={onActionOpenSearchedRecordDetail}
                        reqSearchNRankRecordList={reqSearchNRankRecordList}
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