import { useState } from "react";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import CustomInput from "../../../../../../../../components/input/default/v1/CustomInput";
import * as St from "./MdAddItem.styled";
import CustomSelect from "../../../../../../../../components/select/default/v1/CustomSelect";
import { v4 as uuidv4 } from 'uuid';
import { ListUtils } from "../../../../../../utils/ListUtils";

const LOCATION_TYPE = {
    START: 'START',
    END: 'END',
    MANUALLY: 'MANUALLY'
}

const listUtils = ListUtils();

export function MdAddItem({
    open,
    excelTranslatorDownloadHeaderList,
    onSetExcelTranslatorDownloadHeaderList,
    onClose
}) {
    const [inputValue, setInputValue] = useState('');
    const [locationType, setLocationType] = useState(LOCATION_TYPE.END);
    const [selectedManuallyHeaderId, setSelectedManuallyHeaderId] = useState(null);

    const handleChangeInputValueFromEvent = (e) => {
        let value = e.target.value;

        setInputValue(value);
    }

    const handleChangeLocationType = (locationType) => {
        setLocationType(locationType);
    }

    const handleChangeSelectedManuallyHeaderIdFromEvent = (e) => {
        let value = e.target.value;
        setSelectedManuallyHeaderId(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let newExcelTranslatorDownloadHeaderList = excelTranslatorDownloadHeaderList ? [...excelTranslatorDownloadHeaderList] : [];

        // 필드 이름 글자 수 체크
        if (inputValue?.length <= 0 || inputValue?.length > 20) {
            alert('필드 이름은 1-20자로 입력해 주세요.');
            return;
        }

        // 필드 이름 중복 체크
        if (newExcelTranslatorDownloadHeaderList?.some(r => r.headerName === inputValue)) {
            alert('중복된 필드 이름은 허용되지 않습니다.');
            return;
        }

        // locationType 체크
        if (!locationType || (locationType !== LOCATION_TYPE.START && locationType !== LOCATION_TYPE.END && locationType !== LOCATION_TYPE.MANUALLY)) {
            alert('추가 위치를 올바르게 선택해 주세요.');
            return;
        }

        // locationType에 따른 새로운 필드 삽입 위치 결정
        const startIndex = 0;
        const lastIndex = newExcelTranslatorDownloadHeaderList?.length - 1;
        let indexAt = startIndex;

        switch (locationType) {
            case LOCATION_TYPE.START:
                indexAt = startIndex;
                break;
            case LOCATION_TYPE.END:
                indexAt = lastIndex + 1;
                break;

            default:
                if (!selectedManuallyHeaderId) {
                    alert('필드를 추가할 위치를 선택해 주세요.');
                    return;
                }

                // 1. 선택된 헤더의 인덱스를 찾는다.
                // 2. 인덱스의 값이 리스트의 마지막이 아니라면 인덱스를 +1 해준다. (마지막 인덱스를 제외한 나머지는 선택된 인덱스의 뒤에 위치하고, 마지막 인덱스의 경우 앞에 위치해야됨.)
                indexAt = newExcelTranslatorDownloadHeaderList.findIndex(r => r.id === selectedManuallyHeaderId);
                if (indexAt !== lastIndex) {
                    indexAt += 1;
                }
                break;
        }

        const newItem = {
            id: uuidv4(),
            headerName: inputValue,
            cellType: 'Object',
            valueType: 'FIXED',
            fixedValue: '',
            separator: '-',
            mappingValues: null,
            orderNumber: 0
        }
        const newList = listUtils.pushAt(newItem, indexAt, newExcelTranslatorDownloadHeaderList).map((r, index) => { return { ...r, orderNumber: index } });

        onSetExcelTranslatorDownloadHeaderList(newList);
        onClose();
    }

    return (
        <>
            <CustomDialog open={open} onClose={() => onClose()} maxWidth="sm">
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>변환될 엑셀 필드를 추가 합니다.</CustomDialog.Title>
                <St.Container>
                    <St.FormWrapper onSubmit={(e) => handleSubmit(e)}>
                        <div className='content__box'>
                            <label>필드 이름</label>
                            <CustomInput
                                placeholder='0-20자 이내로 입력해 주세요.'
                                value={inputValue || ''}
                                onChange={(e) => handleChangeInputValueFromEvent(e)}
                                maxLength={20}
                                autoFocus
                            />
                        </div>
                        <div className='content__box'>
                            <label>추가 위치</label>
                            <div className='locationTypeButtonGroup__box'>
                                <CustomBlockButton
                                    type='button'
                                    style={locationType === LOCATION_TYPE.START ? { color: '#fff', background: 'var(--mainColor)' } : {}}
                                    onClick={() => handleChangeLocationType(LOCATION_TYPE.START)}
                                >
                                    처음
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='button'
                                    style={locationType === LOCATION_TYPE.END ? { color: '#fff', background: 'var(--mainColor)' } : {}}
                                    onClick={() => handleChangeLocationType(LOCATION_TYPE.END)}
                                >
                                    마지막
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='button'
                                    style={locationType === LOCATION_TYPE.MANUALLY ? { color: '#fff', background: 'var(--mainColor)' } : {}}
                                    onClick={() => handleChangeLocationType(LOCATION_TYPE.MANUALLY)}
                                    disabled={excelTranslatorDownloadHeaderList?.length <= 0}
                                >
                                    직접설정
                                </CustomBlockButton>
                            </div>
                            {locationType === LOCATION_TYPE.MANUALLY &&
                                <div className='manually__box'>
                                    <CustomSelect
                                        value={selectedManuallyHeaderId || ''}
                                        onChange={(e) => handleChangeSelectedManuallyHeaderIdFromEvent(e)}
                                    >
                                        <option value={''}>선택</option>
                                        {excelTranslatorDownloadHeaderList?.map((r, index) => {
                                            if (excelTranslatorDownloadHeaderList?.length - 1 === index) {
                                                return (<option key={r.id} value={r.id}>{r.headerName} 앞</option>);
                                            }
                                            return (<option key={r.id} value={r.id}>{r.headerName} 뒤</option>);
                                        })}
                                    </CustomSelect>
                                    (으)로 필드를 추가합니다.
                                </div>
                            }
                        </div>
                        <div className='buttonGroup__box'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => onClose()}
                            >
                                취소
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='submit'
                                style={{ background: 'var(--mainColor)', color: '#fff' }}
                            >
                                확인
                            </CustomBlockButton>
                        </div>
                    </St.FormWrapper>
                </St.Container>
            </CustomDialog>
        </>
    );
}