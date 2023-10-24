import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { Container, Wrapper } from "./styles/RecordItemList.styled";
// import { RecordDetailModalComponent } from "../record-detail-modal/v1";
import { RecordDetailModalComponent } from "../record-detail-modal/v2";
import { CategorySelectorModalComponent } from '../category-selector-modal/v1';
import { CustomBoxImage } from "../../../modules";
import HighlightedText from "../../../../../../modules/text/HighlightedText";
import ConfirmModalComponentV2 from "../../../../../../modules/modal/ConfirmModalComponentV2";
import { dateToHHmm } from "../../../utils/dateFormatUtils";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import { CustomVirtualTable } from "../../../../../../../components/table/virtual-table/v1";
import FieldLoadingV2 from "../../../../../../modules/loading/FieldLoadingV2";
import { useApiHook } from './hooks/useApiHook';
import { useSelector } from 'react-redux';
import { customToast, defaultOptions } from '../../../../../../../components/toast/custom-react-toastify/v1';
import { customBackdropController } from '../../../../../../../components/backdrop/default/v1';
import { dateToYYMMDD } from '../../../../../../../utils/dateFormatUtils';

const customBackdropControl = customBackdropController();

const RECORD_STATUS = {
    NONE: "NONE",
    PENDING: "PENDING",
    COMPLETE: "COMPLETE",
    FAIL: "FAIL"
}

export function RecordItemListComponent({
    keyword,
    mallName,
    recordList,
    rankSearchInfo,
    currentPendingRecordIds,
    categories,
    onSetCurrentPendingRecordIds,
    onDeleteRankRecord,
    onSearchSubscriptionPlanSearchInfo,
    onSearchNRankRecordSlice,
    onSearchNRankRecordCountOfSlice
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqChangeNRankRecordCategory } = useApiHook();

    const [selectedRecord, setSelectedRecord] = useState(null);
    const [detailSearchModalOpen, setDetailSearchModalOpen] = useState(false);
    const [recordDeleteModalOpen, setRecordDeleteModalOpen] = useState(false);
    const [categorySelectorModalOpen, setCategorySelectorModalOpen] = useState(false);

    // 랭킹 조회 요청 시 client에서 생성한 record info id를 참고해 record info 를 생성한다
    const [createRecordInfoId, setCreateRecordInfoId] = useState(null);

    useEffect(() => {
        if(!recordList) {
            return;
        }

        if(!selectedRecord) {
            return;
        }

        handleUpdateSelectedRecord();
    }, [recordList])

    const handleUpdateNRankRecordCategoryId = async () => {
        customBackdropControl.showBackdrop();
        await onReqChangeNRankRecordCategory({
            headers: { wsId: wsId },
            params: { id: selectedRecord.id },
            body: { nrank_record_category_id: selectedRecord.nrank_record_category_id }
        }, {
            success: () => {
                onSearchNRankRecordSlice();
                onSearchNRankRecordCountOfSlice();
                handleCloseCategorySelectorModal();

                let message = '완료되었습니다.'
                customToast.success(message, {
                    ...defaultOptions,
                    toastId: message
                })
            }
        })
        customBackdropControl.hideBackdrop();
    }

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

    const handleOpenCategorySelectorModal = async (e, record) => {
        e.stopPropagation();

        setSelectedRecord({...record})
        setCategorySelectorModalOpen(true);
    }

    const handleCloseCategorySelectorModal = () => {
        setCategorySelectorModalOpen(false);
    }

    const handleChangeSelectedRecordCategory = (e) => {
        let id = e.target.value;
        setSelectedRecord({
            ...selectedRecord,
            nrank_record_category_id: id
        })
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
                                            categories={categories}
                                            currentPendingRecordIds={currentPendingRecordIds}
                                            onOpenDetailSearchModal={handleOpenDetailSearchModal}
                                            onOpenRecordDeleteModal={handleOpenRecordDeleteModal}
                                            onOpenCategorySelectorModal={handleOpenCategorySelectorModal}
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

                {/* 랭킹 조회 내역의 카테고리 설정 모달창 */}
                {categorySelectorModalOpen && 
                    <CategorySelectorModalComponent
                        open={categorySelectorModalOpen}
                        categories={categories}
                        selectedRecord={selectedRecord}
                        onClose={handleCloseCategorySelectorModal}
                        onUpdateNRankRecordCategoryId={handleUpdateNRankRecordCategoryId}
                        onChangeSelectedRecordCategory={handleChangeSelectedRecordCategory}
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
            <ResizableTh width={180} className="fixed-header">키워드</ResizableTh>
            <ResizableTh width={180} className="fixed-header">스토어명</ResizableTh>
            <ResizableTh width={120} className="fixed-header">카테고리</ResizableTh>
            <th width={120} className="fixed-header">최근 조회</th>
            <th width={80} className="fixed-header">일반 상품</th>
            <th width={80} className="fixed-header">광고 상품</th>
            <th width={80} className="fixed-header">상태</th>
            <th width={80} className="fixed-header">등록일</th>
            <th width={80} className="fixed-header">삭제</th>
        </tr>
    )
}

function TableBodyRow({
    virtuosoData,
    keyword,
    mallName,
    categories,
    currentPendingRecordIds,
    onOpenDetailSearchModal,
    onOpenRecordDeleteModal,
    onOpenCategorySelectorModal
}) {
    let item = virtuosoData?.item;
    let isKeywordAccent = keyword && (item.keyword).includes(keyword);
    let isMallNameAccent = mallName && (item.mall_name).includes(mallName);
    let currentRecordInfo = item.nrank_record_info;
    let isPending = currentPendingRecordIds?.includes(item.id);
    let category = categories?.find(r => r.id === item.nrank_record_category_id);

    return (
        <tr onClick={(e) => onOpenDetailSearchModal(e, item)} {...virtuosoData}>
            <td>
                <div className='thumbnail'>
                    {(isPending || (item.status === RECORD_STATUS.PENDING)) &&
                        <FieldLoadingV2
                            oxStyle={{
                                borderRadius: '15px'
                            }}
                        />
                    }

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
            <td>
                <button
                    className='button-el'
                    onClick={(e) => onOpenCategorySelectorModal(e, item)}
                >
                    {category?.name || '-'}
                </button>
            </td>
            <td>
                {currentRecordInfo ?
                    <div style={{ color: '#444', display: 'inline' }}>
                        <div>{dateToYYMMDD(currentRecordInfo.created_at)}</div>
                        <div> {dateToHHmm(currentRecordInfo.created_at)}</div>
                    </div>
                    :
                    '-'
                }
            </td>
            <td>
                {currentRecordInfo ?
                    <div>{currentRecordInfo.rank_detail_unit ?? 0}개</div>
                    :
                    '-'
                }
            </td>
            <td>
                {currentRecordInfo ?
                    <div>{currentRecordInfo.ad_rank_detail_unit ?? 0}개</div>
                    :
                    '-'
                }
            </td>
            <td style={{ fontWeight: '700' }}>
                {(isPending || item.status === RECORD_STATUS.PENDING) ?
                    <span style={{ color: 'var(--defaultBlueColor)' }}>조회중..</span>
                    :
                    <>
                        {item.status === RECORD_STATUS.FAIL &&
                            <span style={{ color: 'var(--defaultRedColor)' }}>실패</span>
                        }
                        {item.status === RECORD_STATUS.COMPLETE &&
                            <span style={{ color: 'var(--defaultGreenColor)' }}>완료</span>
                        }
                        {item.status === RECORD_STATUS.NONE &&
                            <span style={{ color: '#a0a0a0' }}>미검색</span>
                        }
                    </>
                }
            </td>
            <td>
                <div style={{ color: '#444', display: 'inline' }}>
                    <div>{dateToYYMMDD(item.created_at)}</div>
                </div>
            </td>
            <td>
                <div className='delete-box'>
                    <button
                        type='button'
                        className='control-btn'
                        onClick={(e) => onOpenRecordDeleteModal(e, item)}
                    >
                        <CustomBoxImage
                            src='/images/icon/delete_default_e56767.svg'
                            size='20px'
                        />
                    </button>
                </div>
            </td>
        </tr>
    )
}