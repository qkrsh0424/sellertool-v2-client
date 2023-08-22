import { useEffect, useState } from "react";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdEditItem.styled";
import CustomInput from "../../../../input/default/v1/CustomInput";
import { v4 as uuidv4 } from 'uuid';
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import CustomSelect from "../../../../select/default/v1/CustomSelect";
import { customToast, defaultOptions } from "../../../../toast/custom-react-toastify/v1";

const VALUE_TYPES = [
    'STATIC',
    'DYNAMIC'
]

const customNumberUtils = CustomNumberUtils();

const returnNumberValueElseThrow = (number, errorMessage) => {
    if (!number) {
        return 0;
    }

    if (number < 0 || number > 100000) { // 0.9e11
        throw new Error(errorMessage);
    }

    return number;
}

export function FdEditItem({
    mrBaseExchangeRateList,
    editTargetItem,
    onClose = () => { },
    onConfirm = () => { }
}) {
    const [formValues, setFormValues] = useState(null);
    const [isPositiveNumberOfExtraValue, setIsPositiveNumberOfExtraValue] = useState(true);

    useEffect(() => {
        if (!editTargetItem) {
            return;
        }

        if (editTargetItem?.extraValue < 0) {
            setIsPositiveNumberOfExtraValue(false);
        } else {
            setIsPositiveNumberOfExtraValue(true);
        }

        setFormValues({
            id: editTargetItem?.id,
            name: editTargetItem?.name,
            valueType: editTargetItem?.valueType,
            staticValue: editTargetItem?.staticValue,
            dynamicValueRelatedId: editTargetItem?.dynamicValueRelatedId,
            extraValue: editTargetItem?.extraValue < 0 ? editTargetItem?.extraValue * -1 : editTargetItem?.extraValue
        });

    }, [editTargetItem])
    const handleSelectValueType = (type) => {
        setFormValues({
            ...formValues,
            valueType: type
        });
    }

    const handleChangeName = (e) => {
        let value = e.target.value;

        setFormValues({
            ...formValues,
            name: value
        })
    }

    const handleChangeStaticValue = (e) => {
        let value = e.target.value;

        if (!value) {
            setFormValues({
                ...formValues,
                staticValue: ''
            })
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnNumberValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            setFormValues({
                ...formValues,
                staticValue: value || ''
            })
        }
    }

    const handleChangeDynamicValueRelatedId = (e) => {
        let value = e.target.value;
        if (!value) {
            setFormValues({
                ...formValues,
                dynamicValueRelatedId: ''
            });
            return;
        }

        setFormValues({
            ...formValues,
            dynamicValueRelatedId: value
        })
    }

    const handleChangeIsPositiveNumberOfExtraValue = (bool) => {
        setIsPositiveNumberOfExtraValue(bool);
    }

    const handleChangeExtraValue = (e) => {
        let value = e.target.value;

        if (!value) {
            setFormValues({
                ...formValues,
                extraValue: ''
            })
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnNumberValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            setFormValues({
                ...formValues,
                extraValue: value || ''
            })
        }
    }

    const handleSubmitConfirm = async () => {
        let name = formValues?.name;
        let valueType = formValues?.valueType;
        let staticValue = formValues?.staticValue;
        let dynamicValueRelatedId = formValues?.dynamicValueRelatedId;
        let extraValue = formValues?.extraValue;

        if (!VALUE_TYPES?.includes(valueType)) {
            customToast.warn('잘못된 접근방식 입니다. 새로고침 후 다시 시도해 주세요.', {
                ...defaultOptions
            })
            return;
        }
        if (name?.length <= 0 || name?.length > 15) {
            customToast.warn('기준환율 명칭은 0-15자 이내로 입력해 주세요.', {
                ...defaultOptions
            })
            return;
        }

        switch (valueType) {
            // 고정값 타입일 경우 변동값 데이터를 모두 초기화
            case 'STATIC':
                if (staticValue <= 0 || staticValue > 100000) {
                    customToast.warn('기준환율 값은 1-100,000 이내로 입력해 주세요.', {
                        ...defaultOptions
                    })
                    return;
                }
                dynamicValueRelatedId = null;
                extraValue = 0;
                break;
            // 변동값 타입일 경우 고정값 데이터를 모두 초기화
            case 'DYNAMIC':
                let selectedMrBaseExchangeRate = mrBaseExchangeRateList?.find(r => r.id === dynamicValueRelatedId);
                if (!selectedMrBaseExchangeRate) {
                    customToast.warn('적용할 기준환율을 선택해 주세요.', {
                        ...defaultOptions
                    })
                    return;
                }

                if (!selectedMrBaseExchangeRate?.basicFlag) {
                    customToast.warn('적용할 기준환율을 올바르게 선택해 주세요.', {
                        ...defaultOptions
                    })
                    return;
                }

                if (extraValue < 0 || extraValue > 100000) {
                    customToast.warn('추가 적용 값은 -100,000~100,000 이내로 입력해 주세요.', {
                        ...defaultOptions
                    })
                    return;
                }

                extraValue = isPositiveNumberOfExtraValue ? extraValue : extraValue * -1;
                staticValue = 0;
                break;
            default: return;
        }

        const body = {
            id: formValues?.id,
            name: name?.trim(),
            valueType: valueType,
            staticValue: customNumberUtils.parseNumberToFloat({ value: staticValue, defaultValue: 0 }) || 0,
            dynamicValueRelatedId: dynamicValueRelatedId,
            extraValue: customNumberUtils.parseNumberToFloat({ value: extraValue, defaultValue: 0 }) || 0
        }

        await onConfirm(body);
    }
    return (
        <>
            <St.Container>
                <St.NameWrapper>
                    <div className='input-box'>
                        <label>
                            기준환율 명칭 ({formValues?.name?.length} / 15)
                        </label>
                        <CustomInput
                            type='text'
                            maxLength={15}
                            placeholder='15자 이내로 입력'
                            value={formValues?.name || ''}
                            onChange={(e) => handleChangeName(e)}
                        />
                    </div>
                </St.NameWrapper>
                <St.ValueTypeSelector>
                    {VALUE_TYPES?.map(typeName => {
                        return (
                            <div key={typeName} className={`tabItem ${formValues?.valueType === typeName ? 'tabItem-active' : ''}`} onClick={() => handleSelectValueType(typeName)}>
                                {typeName === 'STATIC' && '고정값'}
                                {typeName === 'DYNAMIC' && '변동값'}
                            </div>
                        );
                    })}
                </St.ValueTypeSelector>
                {formValues?.valueType === 'STATIC' &&
                    <St.StaticFormWrapper>
                        <div className="input-box">
                            <label>기준환율 값</label>
                            <CustomInput
                                type='text'
                                placeholder='0'
                                value={customNumberUtils.numberWithCommas2(formValues?.staticValue || '')}
                                onChange={(e) => handleChangeStaticValue(e)}
                            />
                        </div>
                    </St.StaticFormWrapper>
                }
                {formValues?.valueType === 'DYNAMIC' &&
                    <St.DynamicFormWrapper>
                        <div className="input-box">
                            <label>적용할 기준환율 선택</label>
                            <CustomSelect value={formValues?.dynamicValueRelatedId || ''} onChange={(e) => handleChangeDynamicValueRelatedId(e)}>
                                <option value={''}>선택</option>
                                {mrBaseExchangeRateList?.filter(r => r.basicFlag)?.map(mrBaseExchangeRate => {
                                    return (
                                        <option
                                            key={mrBaseExchangeRate?.id}
                                            value={mrBaseExchangeRate?.id}
                                        >
                                            {mrBaseExchangeRate?.name} / {customNumberUtils.numberWithCommas2(mrBaseExchangeRate?.staticValue || '')}
                                        </option>
                                    );
                                })}
                            </CustomSelect>
                        </div>
                        <div className="input-box">
                            <label>추가 적용 값(+/-)</label>
                            <div className='extraValue-input-field'>
                                <CustomBlockButton
                                    type='button'
                                    className={`signBtn ${isPositiveNumberOfExtraValue ? 'positiveNumber' : 'nagativeNumber'}`}
                                    onClick={() => handleChangeIsPositiveNumberOfExtraValue(!isPositiveNumberOfExtraValue)}
                                >
                                    {isPositiveNumberOfExtraValue ? '+' : '-'}
                                </CustomBlockButton>
                                <CustomInput
                                    type='text'
                                    placeholder='0'
                                    onKeyDown={(e) => {
                                        if (e.key === '+') {
                                            handleChangeIsPositiveNumberOfExtraValue(true);
                                            return;
                                        }

                                        if (e.key === '-') {
                                            handleChangeIsPositiveNumberOfExtraValue(false);
                                            return;
                                        }
                                    }
                                    }
                                    value={customNumberUtils.numberWithCommas2(formValues?.extraValue) || ''}
                                    onChange={(e) => handleChangeExtraValue(e)}
                                />
                            </div>
                        </div>
                    </St.DynamicFormWrapper>
                }
                <St.FooterWrapper>
                    <div className='button-group'>
                        <CustomBlockButton
                            type='button'
                            className='buttonItem cancelBtn'
                            onClick={() => onClose()}
                        >
                            취소
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='buttonItem confirmBtn'
                            onClick={() => handleSubmitConfirm()}
                        >
                            수정
                        </CustomBlockButton>
                    </div>
                </St.FooterWrapper>
            </St.Container>
        </>
    );
}