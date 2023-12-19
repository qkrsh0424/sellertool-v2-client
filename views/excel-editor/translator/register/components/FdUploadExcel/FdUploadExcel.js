import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import * as St from './FdUploadExcel.styled';
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import CustomImage from "../../../../../../components/image/CustomImage";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import { useMediaQuery } from "@mui/material";
import { ListUtils } from "../../../../utils/ListUtils";
import { MdAddItem } from "./modals/MdAddItem/MdAddItem";

const listUtils = ListUtils();

// scrollWidth : 스크롤 박스의 총 너비 (보이지 않는 요소의 너비 포함)
// offsetWidth : 박스의 보이는 부분의 너비
// scrollLeft : 스크롤 박스의 가장 왼쪽 위치
export function FdUploadExcel({
    excelTranslatorUploadHeaderList,
    onSetExcelTranslatorUploadHeaderList
}) {
    const contentLayoutRef = useRef();
    const [itemListWrapperScrollWidth, setItemListWrapperScrollWidth] = useState(0);
    const [itemListWrapperOffsetWidth, setItemListWrapperOffsetWidth] = useState(0);
    const [itemListWrapperScrollLeft, setItemListWrapperScrollLeft] = useState(0);
    const isMobile = useMediaQuery(`(max-width: 992px)`);
    const [selectedItemId, setSelectedItemId] = useState(null);

    /**
     * {
     *  type,
     *  targetIndex,
     * }
     */
    const [modalInfo, setModalInfo] = useState(null);

    useEffect(() => {
        if (!contentLayoutRef?.current || !excelTranslatorUploadHeaderList) {
            return;
        }

        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemList__wrapper');
        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;

        setItemListWrapperScrollWidth(scrollWidth);
        setItemListWrapperOffsetWidth(offsetWidth);
    }, [contentLayoutRef?.current, excelTranslatorUploadHeaderList]);

    const eventScrolling = _.debounce((e) => {
        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemList__wrapper');

        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;
        const scrollLeft = itemListWrapper?.scrollLeft

        setItemListWrapperScrollWidth(scrollWidth);
        setItemListWrapperScrollLeft(scrollLeft);
        setItemListWrapperOffsetWidth(offsetWidth);
    }, 100)

    const handleScrollToRight = () => {
        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemList__wrapper');

        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;
        const newScrollLeft = itemListWrapper?.scrollLeft + offsetWidth;

        itemListWrapper.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        setItemListWrapperScrollWidth(scrollWidth);
    }

    const handleScrollToLeft = () => {
        const itemListWrapper = contentLayoutRef?.current?.querySelector('.itemList__wrapper');

        const scrollWidth = itemListWrapper?.scrollWidth;
        const offsetWidth = itemListWrapper?.offsetWidth;
        const newScrollLeft = itemListWrapper?.scrollLeft - offsetWidth;

        itemListWrapper.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        setItemListWrapperScrollWidth(scrollWidth);
    }

    const handleDragEnd = (e) => {
        const source = e.source;
        const destination = e.destination;

        if (!destination) {
            return;
        }
        let newList = listUtils.reorder(excelTranslatorUploadHeaderList, source.index, destination.index)
            .map((r, index) => { return { ...r, orderNumber: index } });

        onSetExcelTranslatorUploadHeaderList(newList);
    }

    const toggleModalOpen = (modalInfoValue) => {
        if (!modalInfoValue) {
            setModalInfo(null);
            return;
        }

        setModalInfo(modalInfoValue);
    }

    const handleChangeSelectedItemId = (reqItemId) => {
        let newSelectedItemId = null;

        if (!selectedItemId) {
            newSelectedItemId = reqItemId;
        } else if (selectedItemId === reqItemId) {
            newSelectedItemId = null;
        } else {
            newSelectedItemId = reqItemId;
        }
        setSelectedItemId(newSelectedItemId);
    }

    const handleDelete = (reqItemId) => {
        let newExcelTranslatorUploadHeaderList = [...excelTranslatorUploadHeaderList].filter(r => r.id !== reqItemId);
        onSetExcelTranslatorUploadHeaderList(newExcelTranslatorUploadHeaderList);

        if (reqItemId === selectedItemId) {
            handleChangeSelectedItemId(null);
        }
    }

    const handleChangeExcelTranslatorUploadHeaderList = (values) => {
        onSetExcelTranslatorUploadHeaderList(values);
        handleChangeSelectedItemId(null);
    }

    const addModalOpen = modalInfo?.type === 'ADD';

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.ButtonGroupLayout>
                        <div className='group__wrapper'>
                            <CustomBlockButton
                                type='button'
                                className='add__button'
                                onClick={() => toggleModalOpen({ type: 'ADD', targetIndex: 0 })}
                            >
                                추가
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                onClick={() => toggleModalOpen({ type: 'ADD', targetIndex: 0 })}
                            >
                                엑셀 업로드
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                onClick={() => toggleModalOpen({ type: 'ADD', targetIndex: 0 })}
                            >
                                양식 불러오기
                            </CustomBlockButton>
                        </div>
                    </St.ButtonGroupLayout>
                    <St.ContentLayout ref={contentLayoutRef}>
                        {(!excelTranslatorUploadHeaderList || excelTranslatorUploadHeaderList?.length <= 0) &&
                            <div className='emptyContent__layout'>
                                <div className='wrapper'>
                                    추가 버튼을 통해 변환할 엑셀 양식의 필드를 추가해 주세요.
                                </div>
                            </div>
                        }
                        {excelTranslatorUploadHeaderList && excelTranslatorUploadHeaderList?.length > 0 &&
                            <DragDropContext
                                onDragEnd={handleDragEnd}
                            >
                                <Droppable
                                    droppableId={'sortDroppableId'}
                                    direction="horizontal"
                                >
                                    {(droppableProvided) => (
                                        <div
                                            ref={droppableProvided.innerRef}
                                            {...droppableProvided.droppableProps}
                                            className='itemList__wrapper'
                                            onScroll={(e) => eventScrolling(e)}
                                        >
                                            {excelTranslatorUploadHeaderList?.map((item, index) => (
                                                <Draggable key={item.id} draggableId={`FdUploadExcel-${item.id}`} index={index}>
                                                    {(draggableProvided) => (
                                                        <div
                                                            ref={draggableProvided.innerRef}
                                                            {...draggableProvided.draggableProps}
                                                            onClick={() => handleChangeSelectedItemId(item.id)}
                                                            className={`item__wrapper`}
                                                            is-selected={selectedItemId === item.id ? 'true' : 'false'}
                                                        >
                                                            <div className='columnText'>{index + 1} 열</div>
                                                            <div className='content__box'>
                                                                <div className='icon__box' {...draggableProvided.dragHandleProps} onClick={(e) => e.stopPropagation()}>
                                                                    <CustomImage src='/images/icon/drag_indicator_000000.svg' />
                                                                </div>
                                                                <div className='columnName'>{item?.headerName}</div>
                                                                <div className='icon__box' onClick={(e) => { e.stopPropagation(); handleDelete(item?.id); }}>
                                                                    <CustomImage src='/images/icon/delete_default_e56767.svg' />
                                                                </div>
                                                            </div>
                                                            {draggableProvided.placeholder}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {droppableProvided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        }
                        {!isMobile &&
                            <>
                                {itemListWrapperScrollLeft > 0 &&
                                    <div className='arrowLeft-button-box' onClick={() => handleScrollToLeft()}>
                                        <button
                                            type='button'
                                            className='icon-button'
                                        >
                                            <CustomImage
                                                src='/images/icon/arrowLeft_chevron_ffffff.svg'
                                            />
                                        </button>
                                    </div>
                                }
                                {itemListWrapperScrollLeft + itemListWrapperOffsetWidth < itemListWrapperScrollWidth &&
                                    <div className='arrowRight-button-box' onClick={() => handleScrollToRight()}>
                                        <button
                                            type='button'
                                            className='icon-button'
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
                    {selectedItemId &&
                        <EditHeaderInformation
                            excelTranslatorUploadHeaderList={excelTranslatorUploadHeaderList}
                            selectedItemId={selectedItemId}
                            onClose={() => handleChangeSelectedItemId(null)}
                            onSetExcelTranslatorUploadHeaderList={handleChangeExcelTranslatorUploadHeaderList}
                        />
                    }
                </St.Wrapper>
            </St.Container>

            <St.TipsLayout>
                <div className='wrapper'>
                    <div className='title'>Tips.</div>
                    <div className='itemList'>
                        <div><span className='addSpan'>추가</span> 버튼을 클릭해서 필드를 추가해 보세요.</div>
                        <div>필드를 클릭해서 세부 내용을 수정해 보세요.</div>
                        <div className='drag'>아이콘으로 필드를 드래그해서 순서를 조정해 보세요.</div>
                        <div className='delete'>아이콘을 클릭해서 필드를 삭제해 보세요.</div>
                    </div>
                </div>
            </St.TipsLayout>

            {addModalOpen &&
                <MdAddItem
                    open={addModalOpen}
                    excelTranslatorUploadHeaderList={excelTranslatorUploadHeaderList}
                    onSetExcelTranslatorUploadHeaderList={onSetExcelTranslatorUploadHeaderList}
                    onClose={() => toggleModalOpen(null)}
                />
            }
        </>
    );
}

function EditHeaderInformation({
    excelTranslatorUploadHeaderList,
    selectedItemId,
    onClose,
    onSetExcelTranslatorUploadHeaderList
}) {
    const [headerName, setHeaderName] = useState('');

    useEffect(() => {
        if (!selectedItemId) {
            return;
        }

        initializeHeaderName();
    }, [selectedItemId])

    const initializeHeaderName = () => {
        const currentExcelTranslatorUploadHeaderList = [...excelTranslatorUploadHeaderList];
        const excelTranslatorUploadHeader = currentExcelTranslatorUploadHeaderList?.find(r => r.id === selectedItemId);
        setHeaderName(excelTranslatorUploadHeader?.headerName);
    }

    const handleChangeValueFromEvent = (e) => {
        const value = e.target.value;
        setHeaderName(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentExcelTranslatorUploadHeaderList = [...excelTranslatorUploadHeaderList];

        onSetExcelTranslatorUploadHeaderList(
            currentExcelTranslatorUploadHeaderList?.map(r => {
                if (r.id === selectedItemId) {
                    return {
                        ...r,
                        headerName: headerName
                    }
                }
                return { ...r }
            })
        );
    }

    return (
        <St.EditHeaderInformationLayout>
            <div className='layout__wrapper'>
                <div className='title__wrapper'>
                    선택된 필드 수정
                </div>
                <form className='form__wrapper' onSubmit={(e) => handleSubmit(e)}>
                    <div className='buttonGroup__wrapper'>
                        <CustomBlockButton
                            type='button'
                            style={{
                                background: 'var(--grayButtonHoverColor)',
                                color: '#555'
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='submit'
                            style={{
                                background: 'var(--mainColor)',
                                color: '#fff'
                            }}
                        >
                            적용
                        </CustomBlockButton>
                    </div>
                    <div className='input__wrapper'>
                        <CustomInput
                            value={headerName || ''}
                            onChange={(e) => handleChangeValueFromEvent(e)}
                            placeholder='필드명을 1-20자로 입력하세요.'
                            autoFocus
                        />
                    </div>
                </form>
            </div>
        </St.EditHeaderInformationLayout>
    )
}