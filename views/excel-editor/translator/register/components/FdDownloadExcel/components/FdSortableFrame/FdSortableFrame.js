import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import * as St from './FdSortableFrame.styled';
import CustomImage from '../../../../../../../../components/image/CustomImage';
import CustomBlockButton from '../../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { useEffect, useRef, useState } from 'react';
import { ListUtils } from '../../../../../../utils/ListUtils';
import { SeperatorUtils } from '../../../../../../utils/SeperatorUtils';

const listUtils = ListUtils();
const seperatorUtils = SeperatorUtils();

const VALUE_TYPE = {
    FIXED: 'FIXED',
    MAPPING: 'MAPPING'
}

export function FdSortableFrame({
    isMobile,
    excelTranslatorDownloadHeaderList,
    onSetExcelTranslatorDownloadHeaderList,
    selectedItemId,
    onChangeSelectedItemId,
    onDelete
}) {
    const contentLayoutRef = useRef();
    const [itemListWrapperScrollWidth, setItemListWrapperScrollWidth] = useState(0); // 래퍼의 총 너비
    const [itemListWrapperOffsetWidth, setItemListWrapperOffsetWidth] = useState(0); // 래퍼의 뷰 사이즈
    const [itemListWrapperScrollLeft, setItemListWrapperScrollLeft] = useState(0); // 스크롤의 좌측 값

    const [detailViewIdList, setDetailViewIdList] = useState([]);

    // 렌더링이 완료되면 래퍼의 총 너비와 뷰 사이즈를 세팅해준다.
    useEffect(() => {
        if (!contentLayoutRef?.current || !excelTranslatorDownloadHeaderList) {
            return;
        }

        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemContent__itemList');
        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;

        setItemListWrapperScrollWidth(scrollWidth);
        setItemListWrapperOffsetWidth(offsetWidth);
    }, [contentLayoutRef?.current, excelTranslatorDownloadHeaderList]);

    // 스크롤 이벤트가 발생하면 스크롤 설정값을 초기화 한다. debounce를 통해 중복 스크롤의 횟수를 제한한다.
    const eventScrolling = _.debounce((e) => {
        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemContent__itemList');

        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;
        const scrollLeft = itemListWrapper?.scrollLeft

        setItemListWrapperScrollWidth(scrollWidth);
        setItemListWrapperScrollLeft(scrollLeft);
        setItemListWrapperOffsetWidth(offsetWidth);
    }, 100)

    const handleScrollToRight = () => {
        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemContent__itemList');

        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;
        const newScrollLeft = itemListWrapper?.scrollLeft + offsetWidth;

        itemListWrapper.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        setItemListWrapperScrollWidth(scrollWidth);
    }

    const handleScrollToLeft = () => {
        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemContent__itemList');

        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;
        const newScrollLeft = itemListWrapper?.scrollLeft - offsetWidth;

        itemListWrapper.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        setItemListWrapperScrollWidth(scrollWidth);
    }

    const handleDetailViewOpen = (id) => {
        let newDetailViewIdList = [...detailViewIdList];
        const isExisted = detailViewIdList?.find(r => r === id);

        if (isExisted) {
            newDetailViewIdList = newDetailViewIdList.filter(r => r !== id);
        } else {
            newDetailViewIdList.push(id);
        }
        setDetailViewIdList(newDetailViewIdList);
    }

    const handleDetailViewOpenAll = () => {
        setDetailViewIdList(excelTranslatorDownloadHeaderList?.map(r => r.id));
    }

    const handleDetailViewCloseAll = () => {
        setDetailViewIdList([]);
    }

    const handleDragEnd = (e) => {
        const source = e.source;
        const destination = e.destination;

        if (!destination) {
            return;
        }
        let newList = listUtils.reorder(excelTranslatorDownloadHeaderList, source.index, destination.index)
            .map((r, index) => { return { ...r, orderNumber: index } });

        onSetExcelTranslatorDownloadHeaderList(newList);
    }

    return (
        <>
            <St.ContentLayout ref={contentLayoutRef}>
                {(!excelTranslatorDownloadHeaderList || excelTranslatorDownloadHeaderList?.length <= 0) &&
                    <div className='emptyContent'>
                        <div className='emptyContent__wrapper'>
                            <div>추가 버튼을 통해 변환될 엑셀 양식의 필드를 구성해 보세요.</div>
                            <div style={{ marginTop: '10px' }}>단축키 <span style={{ color: '#999', fontWeight: '700' }}>(Shift)</span> + <span style={{ color: '#999', fontWeight: '700' }}>(+)</span> 를 눌리면 필드 추가 창이 열립니다.</div>
                        </div>
                    </div>
                }
                {excelTranslatorDownloadHeaderList && excelTranslatorDownloadHeaderList?.length > 0 &&
                    <div className='itemContent'>
                        <DragDropContext
                            onDragEnd={handleDragEnd}
                        >
                            <Droppable
                                droppableId={'sortDroppableId'}
                                direction="horizontal"
                                isCombineEnabled
                            >
                                {(droppableProvided) => (
                                    <div
                                        ref={droppableProvided.innerRef}
                                        {...droppableProvided.droppableProps}
                                        className='itemContent__itemList'
                                        onScroll={(e) => eventScrolling(e)}
                                    >
                                        {excelTranslatorDownloadHeaderList?.map((item, index) => {
                                            const mappingValueList = item.mappingValues ? JSON.parse(item.mappingValues) : [];
                                            const isDetailView = detailViewIdList?.includes(item?.id);

                                            return (
                                                <Draggable key={item.id} draggableId={`FdDownloadExcel-${item.id}`} index={index}>
                                                    {(draggableProvided) => (
                                                        <div
                                                            className={`itemContent__itemList__item ${selectedItemId === item?.id ? 'itemContent__itemList__item-isSelected' : ''}`}
                                                            ref={draggableProvided.innerRef}
                                                            {...draggableProvided.draggableProps}
                                                            onClick={() => onChangeSelectedItemId(item?.id)}
                                                        >
                                                            <div className='itemContent__itemList__item__columnText'>{index + 1} 열</div>
                                                            <div className='itemContent__itemList__item__contentWrapper'>
                                                                <div className='itemContent__itemList__item__contentWrapper__iconBox' {...draggableProvided.dragHandleProps} onClick={(e) => e.stopPropagation()}>
                                                                    <CustomImage src='/images/icon/drag_indicator_000000.svg' />
                                                                </div>
                                                                <div className='itemContent__itemList__item__contentWrapper__columnName'>{item?.headerName}</div>
                                                                <div className='itemContent__itemList__item__contentWrapper__iconBox' onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>
                                                                    <CustomImage src='/images/icon/delete_default_e56767.svg' />
                                                                </div>
                                                            </div>
                                                            <CustomBlockButton
                                                                type='button'
                                                                className='itemContent__itemList__item__dropdownButton'
                                                                onClick={(e) => { e.stopPropagation(); handleDetailViewOpen(item.id) }}
                                                            >
                                                                {isDetailView ?
                                                                    <CustomImage src='/images/icon/arrowDropUp_default_808080.svg' />
                                                                    :
                                                                    <CustomImage src='/images/icon/arrowDropDown_default_808080.svg' />
                                                                }
                                                            </CustomBlockButton>
                                                            {isDetailView &&
                                                                <div className='itemContent__itemList__item__detailWrapper'>
                                                                    <div className='itemContent__itemList__item__detailWrapper__valueTypeBox'>
                                                                        {item.valueType === VALUE_TYPE.FIXED &&
                                                                            <div className='itemContent__itemList__item__detailWrapper__valueTypeBox__fixedText' value-type="FIXED">고정값 사용</div>
                                                                        }

                                                                        {item.valueType === VALUE_TYPE.MAPPING &&
                                                                            <div className='itemContent__itemList__item__detailWrapper__valueTypeBox__mappingText' value-type="MAPPING">매핑값 사용</div>
                                                                        }
                                                                    </div>
                                                                    {item.valueType === VALUE_TYPE.FIXED &&
                                                                        <div className='itemContent__itemList__item__detailWrapper__fixedValueBox'>
                                                                            <label>고정값</label>
                                                                            <div className='itemContent__itemList__item__detailWrapper__fixedValueBox__valueText'>{item?.fixedValue ? item?.fixedValue : <span style={{ color: '#777' }}>빈 값</span>}</div>
                                                                        </div>
                                                                    }
                                                                    {item.valueType === VALUE_TYPE.MAPPING &&
                                                                        <div className='itemContent__itemList__item__detailWrapper__mappingValueWrapper'>
                                                                            <div className='itemContent__itemList__item__detailWrapper__mappingValueWrapper__seperatorBox'>
                                                                                <label>매핑값 구분자</label>
                                                                                <div className='itemContent__itemList__item__detailWrapper__mappingValueWrapper__seperatorBox__valueText'>{seperatorUtils.getValueString(item?.seperator)}</div>
                                                                            </div>
                                                                            <div className='itemContent__itemList__item__detailWrapper__mappingValueWrapper__contentBox'>
                                                                                <label>매핑값</label>
                                                                                <div className='itemContent__itemList__item__detailWrapper__mappingValueWrapper__contentBox__mappingValueListBox'>
                                                                                    {mappingValueList?.map(r => {
                                                                                        return (
                                                                                            <div key={r} className='itemContent__itemList__item__detailWrapper__mappingValueWrapper__contentBox__mappingValueListBox__mappingValueText'>{r}</div>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                            {draggableProvided.placeholder}
                                                        </div>
                                                    )
                                                    }
                                                </Draggable>
                                            )
                                        })}
                                        {droppableProvided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                }
                {
                    !isMobile &&
                    <>
                        {itemListWrapperScrollLeft > 0 &&
                            <div className='arrowLeft' onClick={() => handleScrollToLeft()}>
                                <button
                                    type='button'
                                    className='arrowLeft__iconButton'
                                >
                                    <CustomImage
                                        src='/images/icon/arrowLeft_chevron_ffffff.svg'
                                    />
                                </button>
                            </div>
                        }
                        {itemListWrapperScrollLeft + itemListWrapperOffsetWidth < itemListWrapperScrollWidth &&
                            <div className='arrowRight' onClick={() => handleScrollToRight()}>
                                <button
                                    type='button'
                                    className='arrowRight__iconButton'
                                >
                                    <CustomImage
                                        src='/images/icon/arrowRight_chevron_ffffff.svg'
                                    />
                                </button>
                            </div>
                        }
                    </>
                }
            </St.ContentLayout>
            <St.BottomLayout>
                {excelTranslatorDownloadHeaderList && excelTranslatorDownloadHeaderList?.length > 0 &&
                    <div className='detailViewButtonGroup'>
                        <CustomBlockButton
                            type='button'
                            onClick={() => handleDetailViewOpenAll()}
                        >
                            전체 펼치기
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            onClick={() => handleDetailViewCloseAll()}
                        >
                            전체 접기
                        </CustomBlockButton>
                    </div>
                }
            </St.BottomLayout>
        </>
    );
};