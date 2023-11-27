import { useState } from "react";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdBulkInput.styled";
import CustomInput from "../../../../../../../../components/input/default/v1/CustomInput";
import { CustomNumberUtils } from "../../../../../../../../utils/CustomNumberUtils";
import CustomImage from "../../../../../../../../components/image/CustomImage";

const NAME_UNIT = 'unit';
const NAME_MEMO = 'memo';

const customNumberUtils = CustomNumberUtils();

export function FdBulkInput({
    onChangeUnitBulk,
    onChangeMemoBulk
}) {
    const [fieldOpen, setFieldOpen] = useState(false);
    const [currentName, setCurrentName] = useState(NAME_UNIT);
    const [value, setValue] = useState('');

    const toggleFieldOpen = (bool) => {
        setFieldOpen(bool);
    }

    const handleChangeCurrentName = (name) => {
        setCurrentName(name);
        setValue('');
    }

    const handleChangeUnit = (reqValue) => {
        reqValue = reqValue.replaceAll(',', '');
        reqValue = customNumberUtils.getRemovedPrefixZero(reqValue);

        if (reqValue.match(/^[0-9]{0,6}$/)) {
            setValue(reqValue);
        }
    }

    const handleChangeMemo = (reqValue) => {
        if (reqValue && reqValue?.length > 150) {
            return;
        }

        setValue(reqValue);
    }

    const handleSubmitConfirm = (e) => {
        e.preventDefault();

        switch (currentName) {
            case NAME_UNIT:
                onChangeUnitBulk(value);
                break;
            case NAME_MEMO:
                onChangeMemoBulk(value);
                break;
        }

        setValue('');
    }
    return (
        <>
            <St.Container>
                <div className='head-wrapper' onClick={() => toggleFieldOpen(!fieldOpen)}>
                    <div className='title'>일괄입력</div>
                    <CustomBlockButton
                        className='icon-button'
                    >
                        {fieldOpen ?
                            <CustomImage
                                src='/images/icon/arrowDropUp_default_000000.svg'
                            />
                            :

                            <CustomImage
                                src='/images/icon/arrowDropDown_default_000000.svg'
                            />
                        }
                    </CustomBlockButton>
                </div>
                {fieldOpen &&
                    <>

                        <div className='type-selector-wrapper'>
                            <CustomBlockButton
                                type='button'
                                className={`${currentName === NAME_UNIT ? 'button-active' : ''}`}
                                onClick={() => handleChangeCurrentName(NAME_UNIT)}
                            >
                                출고수량
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`${currentName === NAME_MEMO ? 'button-active' : ''}`}
                                onClick={() => handleChangeCurrentName(NAME_MEMO)}
                            >
                                메모
                            </CustomBlockButton>
                        </div>
                        <form className='value-wrapper' onSubmit={(e) => handleSubmitConfirm(e)}>
                            {currentName === NAME_UNIT &&
                                <CustomInput
                                    type='text'
                                    placeholder='출고수량을 입력해 주세요.'
                                    value={customNumberUtils.numberWithCommas2(value) || ''}
                                    onChange={(e) => handleChangeUnit(e.target.value)}
                                />
                            }
                            {currentName === NAME_MEMO &&
                                <CustomInput
                                    type='text'
                                    placeholder='메모를 입력해 주세요.'
                                    value={value || ''}
                                    onChange={(e) => handleChangeMemo(e.target.value)}
                                />
                            }
                            <CustomBlockButton
                                type='submit'
                                className={`${currentName === NAME_MEMO ? 'button-active' : ''}`}
                            >
                                확인
                            </CustomBlockButton>
                        </form>
                    </>
                }
            </St.Container>
        </>
    );
}