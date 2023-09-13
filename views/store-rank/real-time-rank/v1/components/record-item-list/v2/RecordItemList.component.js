import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { Container, Wrapper } from "./styles/RecordItemList.styled";
import { RecordDetailModalComponent } from "../record-detail-modal/v1";
import { CustomBoxImage } from "../../../modules";
import HighlightedText from "../../../../../../modules/text/HighlightedText";
import ConfirmModalComponentV2 from "../../../../../../modules/modal/ConfirmModalComponentV2";
import { dateToHHmm, dateToYYYYMMDD } from "../../../utils/dateFormatUtils";
import { CustomProgressBar } from "../../../modules/progress/progress-bar/v1";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import { CustomVirtualTable } from "../../../../../../../components/table/virtual-table/v1";
import FieldLoadingV2 from "../../../../../../modules/loading/FieldLoadingV2";

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
    const [createRecordInfoId, setCreateRecordInfoId] = useState(null);

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

    const handleOpenDetailSearchModal = (e, item) => {
        e.stopPropagation();

        let infoId = uuidv4();
        setCreateRecordInfoId(infoId);
        setSelectedRecord(item);
        setDetailSearchModalOpen(true)
    }

    const handleCloseDetailSearchModal = () => {
        setCreateRecordInfoId(null);
        setDetailSearchModalOpen(false);
    }

    const handleOpenRecordDeleteModal = (e, item) => {
        e.stopPropagation();

        setSelectedRecord(item)
        setRecordDeleteModalOpen(true);
    }

    const handleCloseRecordDeleteModal = () => {
        setRecordDeleteModalOpen(false);
    }

    const handleDeleteRankRecord = async () => {
        onDeleteRankRecord(selectedRecord?.id, () => handleCloseRecordDeleteModal())
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <div style={{ position: 'relative' }}>
                        {!recordList &&
                            <FieldLoadingV2
                                oxStyle={{
                                    borderRadius: '15px'
                                }}
                            />
                        }
                        <div className="table-box">
                            <CustomVirtualTable
                                height={800}
                                data={recordList}
                                THeadRow={
                                    () => (
                                        <TableHeaderRow />
                                    )
                                }
                                TBodyRow={
                                    (virtuosoData) => (
                                        <TableBodyRow
                                            virtuosoData={virtuosoData}

                                            keyword={keyword}
                                            mallName={mallName}
                                            currentPendingRecordIds={currentPendingRecordIds}
                                            handleOpenDetailSearchModal={handleOpenDetailSearchModal}
                                            handleOpenRecordDeleteModal={handleOpenRecordDeleteModal}
                                        />
                                    )
                                }
                            />
                        </div>
                    </div>
                </Wrapper>

                {/* record detail (랭킹 조회 내역) 모달창 */}
                {detailSearchModalOpen &&
                    <RecordDetailModalComponent
                        open={detailSearchModalOpen}
                        record={selectedRecord}
                        createRecordInfoId={createRecordInfoId}
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

function TableHeaderRow() {
    return (
        <tr>
            <th width={100} className="fixed-header"></th>
            <ResizableTh width={180} className="fixed-header">상품</ResizableTh>
            <ResizableTh width={180} className="fixed-header">스토어</ResizableTh>
            <th width={150} className="fixed-header">카테고리</th>
            <th width={120} className="fixed-header">최근 조회</th>
            <th width={100} className="fixed-header">일반 상품</th>
            <th width={100} className="fixed-header">광고 상품</th>
            <th width={80} className="fixed-header">상태</th>
            <th width={80} className="fixed-header">삭제</th>
        </tr>
    )
}

function TableBodyRow({
    virtuosoData,
    keyword,
    mallName,
    currentPendingRecordIds,
    handleOpenDetailSearchModal,
    handleOpenRecordDeleteModal
}) {
    let item = virtuosoData?.item;
    let isKeywordAccent = keyword && (item.keyword).includes(keyword);
    let isMallNameAccent = mallName && (item.mall_name).includes(mallName);
    let currentRecordInfo = item.infos?.find(info => item.current_nrank_record_info_id === info.id);
    let isPending = currentPendingRecordIds?.includes(item.id);

    return (
        <tr onClick={(e) => handleOpenDetailSearchModal(e, item)} {...virtuosoData}>
            <td>
                <div className='thumbnail'>
                    <CustomBoxImage
                        src={currentRecordInfo?.thumbnail_url}
                    />
                </div>
            </td>
            <td style={{ textAlign: 'left' }} className='main-info'>
                {isKeywordAccent ?
                    <HighlightedText
                        text={item.keyword}
                        query={keyword}
                        highlightColor={'#ffcd92'}
                    />
                    :
                    <span>{item.keyword}</span>
                }
            </td>
            <td className='main-info'>
                {isMallNameAccent ?
                    <HighlightedText
                        text={item.mall_name}
                        query={mallName}
                        highlightColor={'#ffcd92'}
                    />
                    :
                    <span>{item.mall_name}</span>
                }
            </td>
            <td>-</td>
            <td>
                {currentRecordInfo ?
                    <div style={{ color: '#444', display: 'inline' }}>
                        <div>{dateToYYYYMMDD(currentRecordInfo.created_at)}</div>
                        <div> {dateToHHmm(currentRecordInfo.created_at)}</div>
                    </div>
                    :
                    '-'
                }
            </td>
            <td>
                {currentRecordInfo ?
                    <div>{currentRecordInfo.rank_detail_unit ?? 0}</div>
                    :
                    '-'
                }
            </td>
            <td>
                {currentRecordInfo ?
                    <div>{currentRecordInfo.ad_rank_detail_unit ?? 0}</div>
                    :
                    '-'
                }
            </td>
            <td>{isPending && <CustomProgressBar customcolor={'#9ac7e0'} size='30px'/>}</td>
            <td>
                <div className='delete-box'>
                    <button
                        type='button'
                        className='button-item'
                        onClick={(e) => handleOpenRecordDeleteModal(e, item)}
                    >
                        <CustomBoxImage
                            src='/images/icon/delete_default_e56767.svg'
                            size='23px'
                        />
                    </button>
                </div>
            </td>
        </tr>
    )
}