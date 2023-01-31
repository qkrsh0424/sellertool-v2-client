import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import valueUtils from "../../../../../../utils/valueUtils";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import CustomInput from "../../../../../modules/input/CustomInput";
import { Container, DownArrowIconBox, GridContainer, SelectedItemBox, SelectedItemListContainer } from "./SelectItemList.styled";
import { v4 as uuidv4 } from 'uuid';

export default function SelectItemListComponent({
    refErpCollectionHeaders,
    erpCollectionHeadersForm,
    onActionSelectErpCollectionHeader,
    onActionReorderForm,
    onChangeCustomHeaderName,
    onActionDeleteErpCollectionHeader,
    onActionSelectAll,
    onActionSelectClearAll
}) {
    return (
        <>
            <Container>
                <GridContainer>
                    {refErpCollectionHeaders?.every(r => erpCollectionHeadersForm.some(r2 => r2.refErpCollectionHeaderId === r.id)) ?
                        <div
                            className={`grid-item clear-all`}
                            onClick={() => onActionSelectClearAll()}
                        >
                            전체해제
                        </div>
                        :
                        <div
                            className={`grid-item select-all`}
                            onClick={() => onActionSelectAll()}
                        >
                            전체선택
                        </div>
                    }
                    {refErpCollectionHeaders?.map((r, index) => {
                        let isSelected = erpCollectionHeadersForm?.find(formHeader => formHeader.refErpCollectionHeaderId === r.id);

                        return (
                            <div
                                key={index}
                                className={`grid-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => onActionSelectErpCollectionHeader(r)}
                            >
                                {r.originHeaderName}
                            </div>
                        );
                    })}
                </GridContainer>
            </Container>
            <DownArrowIconBox>
                <CustomImage
                    src='/images/icon/arrowDropDown_default_808080.svg'
                />
            </DownArrowIconBox>
            <SelectedItemListContainer>
                {(!erpCollectionHeadersForm || valueUtils.isEmptyValues(erpCollectionHeadersForm)) ?
                    <div className='empty-box'>뷰헤더를 선택해 주세요.</div>
                    :
                    <DragDropContext onDragEnd={(result) => onActionReorderForm(result)}>
                        <Droppable droppableId={uuidv4()}>
                            {provided => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {erpCollectionHeadersForm?.map((r, index) => {
                                        return (
                                            <Draggable
                                                key={r.draggableId}
                                                draggableId={r.draggableId}
                                                index={index}
                                            >
                                                {(provided => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <SelectedItemBox>
                                                            <div
                                                                className='numbering-box'
                                                            >
                                                                <CustomImage
                                                                    src='/images/icon/arrowUpDown_default_808080.svg'
                                                                />
                                                            </div>
                                                            <div
                                                                className='numbering-box'
                                                            >
                                                                {index + 1}
                                                            </div>
                                                            <div
                                                                className='customHeaderName-box'
                                                            >
                                                                <div className='label'>헤더명지정</div>
                                                                <CustomInput
                                                                    type='text'
                                                                    className='customHeaderName'
                                                                    value={r.customHeaderName}
                                                                    onChange={(e) => onChangeCustomHeaderName(e, index)}
                                                                    maxLength={20}
                                                                    required
                                                                />
                                                            </div>
                                                            <div
                                                                className='originHeaderName-box'
                                                            >
                                                                <div className='label'>기준항목</div>
                                                                <div className='originHeaderName'>
                                                                    {r.originHeaderName}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className='delete-button-box'
                                                            >
                                                                <SingleBlockButton
                                                                    type='button'
                                                                    className='delete-button-item'
                                                                    onClick={() => onActionDeleteErpCollectionHeader(index)}
                                                                >
                                                                    <CustomImage
                                                                        src='/images/icon/delete_default_e56767.svg'
                                                                    />
                                                                </SingleBlockButton>
                                                            </div>
                                                        </SelectedItemBox>
                                                    </div>
                                                ))}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )
                            }
                        </Droppable>
                    </DragDropContext>
                }

            </SelectedItemListContainer>
        </>
    );
}