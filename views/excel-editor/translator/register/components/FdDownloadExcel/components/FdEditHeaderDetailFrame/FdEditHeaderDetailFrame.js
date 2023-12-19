import { useState } from 'react';
import { useExcelTranslatorReferenceHeaderListValueHook } from '../../../../contexts/ExcelTranslatorReferenceHeaderListProvider';
import * as St from './FdEditHeaderDetailFrame.styled';
import { useEffect } from 'react';
import CustomBlockButton from '../../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomInput from '../../../../../../../../components/input/default/v1/CustomInput';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CustomImage from '../../../../../../../../components/image/CustomImage';
import { MdSeperator } from './modals/MdSeperator/MdSeperator';
import { ListUtils } from '../../../../../../utils/ListUtils';
import { SeperatorUtils } from '../../../../../../utils/SeperatorUtils';
import { useRef } from 'react';
import { MdAdd } from './modals/MdAdd/MdAdd';

const listUtils = ListUtils();
const seperatorUtils = SeperatorUtils();

const VALUE_TYPE = {
    FIXED: 'FIXED',
    MAPPING: 'MAPPING'
}

export function FdEditHeaderDetailFrame({
    excelTranslatorDownloadHeaderList,
    selectedItemId,
    onSetExcelTranslatorDownloadHeaderList,
    onClose,
}) {
    const excelTranslatorReferenceHeaderListValueHook = useExcelTranslatorReferenceHeaderListValueHook();
    const [selectedItem, setSelectedItem] = useState(null);
    const [seperatorModalOpen, setSeperatorModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        if (!selectedItemId) {
            return;
        }

        initializeSelectedItem();
    }, [selectedItemId]);

    const initializeSelectedItem = () => {
        const currentExcelTranslatorDownloadHeaderList = [...excelTranslatorDownloadHeaderList];
        const excelTranslatorDownloadHeader = currentExcelTranslatorDownloadHeaderList?.find(r => r.id === selectedItemId);
        setSelectedItem(excelTranslatorDownloadHeader);
    }

    const toggleSeperatorModalOpen = (bool) => {
        setSeperatorModalOpen(bool);
    }

    const toggleAddModalOpen = (bool) => {
        setAddModalOpen(bool);
    }

    const handleChangeHeaderNameFromEvent = (e) => {
        const value = e.target.value;
        setSelectedItem(prev => {
            return {
                ...prev,
                headerName: value
            }
        })
    }

    const handleChangeValueType = (valueType) => {
        setSelectedItem(prev => {
            return {
                ...prev,
                valueType: valueType
            }
        })
    }

    const handleChangeFixedValueFromEvent = (e) => {
        const value = e.target.value;
        setSelectedItem(prev => {
            return {
                ...prev,
                fixedValue: value
            }
        })
    }

    const handleMappingValueDragEnd = (e) => {
        const source = e.source;
        const destination = e.destination;

        if (!source || !destination) {
            return;
        }

        const sourceDroppableId = source?.droppableId;
        const destinationDroppableId = destination.droppableId;
        const sourceDroppableIndex = source?.index;
        const destinationDroppableIndex = destination?.index;

        const mappingValueList = selectedItem?.mappingValues ? JSON.parse(selectedItem?.mappingValues) : [];

        if (sourceDroppableId === destinationDroppableId) {
            let newMappingValueList = listUtils.reorder(mappingValueList, sourceDroppableIndex, destinationDroppableIndex);
            setSelectedItem(prev => {
                return { ...prev, mappingValues: JSON.stringify(newMappingValueList) };
            });
            return;
        }

        const draggableId = e.draggableId;
        const referenceHeaderDraggableId = draggableId.split('$')[1];

        const excelTranslatorReferenceHeader = excelTranslatorReferenceHeaderListValueHook?.find((r, index) => r.id === referenceHeaderDraggableId);
        const excelTranslatorReferenceHeaderName = excelTranslatorReferenceHeader?.headerName;
        if (mappingValueList.includes(excelTranslatorReferenceHeaderName)) {
            alert('매핑값을 중복으로 설정 할 수 없습니다.');
            return;
        }

        const newMappingValueList = listUtils.pushAt(excelTranslatorReferenceHeaderName, destinationDroppableIndex, mappingValueList);

        setSelectedItem(prev => {
            return { ...prev, mappingValues: JSON.stringify(newMappingValueList) };
        });
    }

    const handleChangeSeperator = (seperator) => {
        setSelectedItem(prev => {
            return { ...prev, seperator: seperator };
        })
    }

    const handleAddMappingValue = (mappingValue) => {
        let newMappingValueList = selectedItem?.mappingValues ? JSON.parse(selectedItem?.mappingValues) : [];
        newMappingValueList.push(mappingValue);

        setSelectedItem(prev => {
            return { ...prev, mappingValues: JSON.stringify(newMappingValueList) };
        });
    }

    const handleDeleteMappingValue = (value) => {
        const mappingValueList = selectedItem?.mappingValues ? JSON.parse(selectedItem?.mappingValues) : [];

        const newMappingValueList = mappingValueList.filter(r => r !== value);
        setSelectedItem(prev => {
            return { ...prev, mappingValues: JSON.stringify(newMappingValueList) };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onSetExcelTranslatorDownloadHeaderList(
            excelTranslatorDownloadHeaderList?.map(r => {
                if (r.id === selectedItem?.id) {
                    return {
                        ...selectedItem
                    }
                }
                return { ...r }
            })
        );
    }

    const valueType = selectedItem?.valueType;
    const mappingValueList = selectedItem?.mappingValues ? JSON.parse(selectedItem?.mappingValues) : [];

    return (
        <>
            <St.ContentLayout>
                <div className='title'>
                    선택된 필드 구성
                </div>
                <form className='contentForm' onSubmit={(e) => handleSubmit(e)}>
                    <div className='contentForm__submitButtonGroup'>
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
                    <div className='contentForm__headerName'>
                        <CustomInput
                            value={selectedItem?.headerName || ''}
                            onChange={(e) => handleChangeHeaderNameFromEvent(e)}
                            placeholder='헤더명을 1-20자로 입력하세요.'
                            autoFocus
                        />
                    </div>
                    <div className='contentForm__valueTypeSelector'>
                        <CustomBlockButton
                            type='button'
                            className={`${valueType === VALUE_TYPE.FIXED ? 'contentForm__valueTypeSelector__button-isActive' : ''}`}
                            onClick={() => handleChangeValueType(VALUE_TYPE.FIXED)}
                        >
                            고정값
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className={`${valueType === VALUE_TYPE.MAPPING ? 'contentForm__valueTypeSelector__button-isActive' : ''}`}
                            onClick={() => handleChangeValueType(VALUE_TYPE.MAPPING)}
                        >
                            매핑값
                        </CustomBlockButton>
                    </div>
                    {valueType === VALUE_TYPE.FIXED &&
                        <div className='contentForm__fixedValue'>
                            <CustomInput
                                type='text'
                                value={selectedItem?.fixedValue ?? ''}
                                onChange={(e) => handleChangeFixedValueFromEvent(e)}
                                placeholder={'고정값을 입력해 주세요.'}
                            />
                        </div>
                    }
                    {valueType === VALUE_TYPE.MAPPING &&
                        <DragDropContext onDragEnd={handleMappingValueDragEnd}>
                            <div className='contentForm__mappingValueLayout'>
                                <div className='contentForm__mappingValueLayout__seperatorWrapper'>
                                    <label>매핑값 구분자</label>
                                    <div className='contentForm__mappingValueLayout__seperatorWrapper__description'>매핑값들을 연결해줄 구분자를 선택해주세요.</div>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => toggleSeperatorModalOpen(true)}
                                    >
                                        {seperatorUtils.getValueString(selectedItem?.seperator)}
                                    </CustomBlockButton>
                                </div>
                                <div className='contentForm__mappingValueLayout__mappingValueListContainer'>
                                    <label>매핑값</label>
                                    <div className='contentForm__mappingValueLayout__mappingValueListContainer__description'>매핑값은 최대 5개 까지 등록 가능합니다.</div>
                                    <CustomBlockButton
                                        type='button'
                                        className='contentForm__mappingValueLayout__mappingValueListContainer__addButton'
                                        onClick={() => toggleAddModalOpen(true)}
                                    >
                                        추가
                                    </CustomBlockButton>
                                    <Droppable
                                        droppableId={`mappingDroppableId`}
                                        isCombineEnabled
                                    >
                                        {(droppableProvided) => (
                                            <div
                                                ref={droppableProvided.innerRef}
                                                {...droppableProvided.droppableProps}
                                                className='contentForm__mappingValueLayout__mappingValueListContainer__valueListWrapper'
                                            >
                                                {mappingValueList?.map((mappingValue, mappingValueIndex) => {
                                                    return (
                                                        <Draggable key={mappingValue} draggableId={`mappingValue$${mappingValue}`} index={mappingValueIndex}>
                                                            {(draggableProvided) => (
                                                                <div
                                                                    ref={draggableProvided.innerRef}
                                                                    {...draggableProvided.draggableProps}
                                                                    className={`contentForm__mappingValueLayout__mappingValueListContainer__valueListWrapper__valueBox`}
                                                                >
                                                                    <div className='contentForm__mappingValueLayout__mappingValueListContainer__valueListWrapper__valueBox__contentBox'>
                                                                        <div
                                                                            className='contentForm__mappingValueLayout__mappingValueListContainer__valueListWrapper__valueBox__contentBox__iconFigure'
                                                                            {...draggableProvided.dragHandleProps}
                                                                        >
                                                                            <CustomImage
                                                                                src='/images/icon/drag_indicator_000000.svg'
                                                                            />
                                                                        </div>
                                                                        <div className='contentForm__mappingValueLayout__mappingValueListContainer__valueListWrapper__valueBox__contentBox__columnName'>{mappingValue}</div>
                                                                        <div
                                                                            className='contentForm__mappingValueLayout__mappingValueListContainer__valueListWrapper__valueBox__contentBox__iconFigure-clickable'
                                                                            onClick={(e) => { e.stopPropagation(); handleDeleteMappingValue(mappingValue); }}
                                                                        >
                                                                            <CustomImage
                                                                                src='/images/icon/delete_default_e56767.svg'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                                {(!mappingValueList || mappingValueList?.length <= 0) &&
                                                    <div
                                                        className='contentForm__mappingValueLayout__mappingValueListContainer__valueListWrapper__emptyBox'
                                                    >
                                                        추가 버튼을 통해 매핑값을 등록하거나 이곳에 참고 엑셀 필드를 끌어다 놓으세요.
                                                    </div>
                                                }
                                                {droppableProvided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                                <ReferenceHeaderListFrame
                                    excelTranslatorReferenceHeaderListValueHook={excelTranslatorReferenceHeaderListValueHook}
                                    mappingValueList={mappingValueList}
                                />
                            </div>
                        </DragDropContext>
                    }
                </form>
            </St.ContentLayout>
            {seperatorModalOpen &&
                <MdSeperator
                    open={seperatorModalOpen}
                    onClose={() => toggleSeperatorModalOpen(false)}
                    currentSeperator={selectedItem?.seperator}
                    onChangeSeperator={handleChangeSeperator}
                />
            }

            {addModalOpen &&
                <MdAdd
                    open={addModalOpen}
                    onClose={() => toggleAddModalOpen(false)}
                    currentMappingValueList={mappingValueList}
                    onSubmit={(mappingValue) => handleAddMappingValue(mappingValue)}
                />
            }
        </>
    );
}

function ReferenceHeaderListFrame({
    excelTranslatorReferenceHeaderListValueHook,
    mappingValueList
}) {
    const contentLayoutRef = useRef();

    const [bucketList, setBucketList] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBucketId, setSelectedBucketId] = useState(null);

    useEffect(() => {
        if (!excelTranslatorReferenceHeaderListValueHook) {
            return;
        }

        let newBucketList = [];
        let bucketIdSet = new Set();
        excelTranslatorReferenceHeaderListValueHook.forEach(r => {
            if (!bucketIdSet.has(r.excelTranslatorReferenceHeaderBucketId)) {
                bucketIdSet.add(r.excelTranslatorReferenceHeaderBucketId)
                newBucketList.push({
                    id: r.excelTranslatorReferenceHeaderBucketId,
                    name: r.bucketName,
                    bucketType: r.bucketType
                })
            }
        })

        const defaultSelectedBucket = newBucketList.filter(r => r.bucketType === 'DEFAULT')[0];

        setBucketList([...newBucketList]);
        setSelectedBucketId(defaultSelectedBucket?.id);
    }, [excelTranslatorReferenceHeaderListValueHook]);

    const handleChangeSearchQueryFromEvent = (e) => {
        const value = e.target.value;

        setSearchQuery(value);
    }

    const handleChangeSelectedBucketId = (bucketId) => {
        setSelectedBucketId(bucketId);
    }

    return (
        <>
            <St.ReferenceHeaderListLayout ref={contentLayoutRef}>
                <label>참고 엑셀 필드</label>
                <div className='description'>아래의 필드를 드래그 해서 매핑값을 설정해 주세요.</div>
                <div className='container'>
                    <div className='container__contentWrapper'>
                        <CustomInput
                            placeholder='검색어를 입력해 주세요.'
                            value={searchQuery ?? ''}
                            onChange={(e) => handleChangeSearchQueryFromEvent(e)}
                        />
                        <Droppable
                            droppableId={'referenceHeaderDroppableId'}
                            direction="horizontal"
                            isCombineEnabled
                            isDropDisabled
                        >
                            {(droppableProvided) => (
                                <div
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                    className='container__contentWrapper__itemListWrapper'
                                >
                                    {excelTranslatorReferenceHeaderListValueHook?.filter(r => r.excelTranslatorReferenceHeaderBucketId === selectedBucketId && r.headerName?.includes(searchQuery))?.map((item, index) => {
                                        const disabledDraggable = mappingValueList?.includes(item?.headerName);
                                        return (
                                            <Draggable key={item.id} draggableId={`referenceHeaderDraggableId$${item.id}`} index={index} isDragDisabled={disabledDraggable}>
                                                {(draggableProvided) => (
                                                    <div
                                                        className={`container__contentWrapper__itemListWrapper__itemWrapper ${disabledDraggable ? 'container__contentWrapper__itemListWrapper__itemWrapper-disabled' : ''}`}
                                                        ref={draggableProvided.innerRef}
                                                        {...draggableProvided.draggableProps}
                                                    >
                                                        <div className='container__contentWrapper__itemListWrapper__itemWrapper__itemBox'>
                                                            <div
                                                                className='container__contentWrapper__itemListWrapper__itemWrapper__itemBox__iconFigure'
                                                                {...draggableProvided.dragHandleProps}
                                                            >
                                                                <CustomImage src='/images/icon/drag_indicator_000000.svg' />
                                                            </div>
                                                            <div className='container__contentWrapper__itemListWrapper__itemWrapper__itemBox__columnName'>{item?.headerName}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {droppableProvided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className='container__bucketListWrapper'>
                        <div className='container__bucketListWrapper__headTitle'>보관함</div>
                        <div className='container__bucketListWrapper__itemListWrapper'>
                            {bucketList?.map(bucket => {
                                return (
                                    <div key={bucket.id} className={`container__bucketListWrapper__itemListWrapper__item ${bucket?.id === selectedBucketId && 'container__bucketListWrapper__itemListWrapper__item-isActive'}`} onClick={() => handleChangeSelectedBucketId(bucket?.id)}>{bucket?.name}</div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </St.ReferenceHeaderListLayout>
        </>
    );
}