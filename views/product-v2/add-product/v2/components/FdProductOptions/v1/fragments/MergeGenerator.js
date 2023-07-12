import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "/components/image/CustomImage";
import { Container } from "./MergeGenerator.styled";
import { useState } from "react";

export function MergeGenerator({
    onSubmitCreate
}) {
    const [seperator, setSeperator] = useState('');
    const [mergeOptionValues, setMergeOptionValues] = useState([
        {
            value: ''
        }
    ]);

    const handleChangeSeperator = (e) => {
        const value = e.target.value;

        setSeperator(value);
    }

    const handleChangeMergeOptionValue = (e, index) => {
        let value = e.target.value;

        setMergeOptionValues(mergeOptionValues.map((r, rIndex) => {
            if (rIndex === index) {
                return {
                    ...r,
                    value: value
                }
            } else {
                return {
                    ...r
                }
            }
        }))
    }

    const handlePushMergeOptionValue = () => {
        if (mergeOptionValues.length >= 3) {
            return;
        }

        setMergeOptionValues([
            ...mergeOptionValues,
            {
                value: ''
            }
        ])
    }

    const handleDeleteMergeOptionValue = (index) => {
        if (mergeOptionValues.length <= 1) {
            return;
        }

        let newData = mergeOptionValues.filter((r, rIndex) => rIndex !== index);
        setMergeOptionValues(newData);
    }

    const handleSubmitCreateMergeOptions = (e) => {
        e.preventDefault();
        let generatorSize = mergeOptionValues.length;
        let values1 = mergeOptionValues[0]?.value.split(',').map(r => r.trim());
        let values2 = mergeOptionValues[1]?.value.split(',').map(r => r.trim());
        let values3 = mergeOptionValues[2]?.value.split(',').map(r => r.trim());
        let valueMultiply = (values1?.length || 1) * (values2?.length || 1) * (values3?.length || 1);

        if (valueMultiply > 500) {
            alert('조합형 옵션개수가 500개가 초과 됩니다. 옵션개수를 500개 이하로 조합해주세요.');
            return;
        }

        let optionNames = [];

        switch (generatorSize) {
            case 1:
                if (!mergeOptionValues[0]?.value) {
                    return;
                }

                values1.forEach(value1 => {
                    optionNames.push(value1)
                })
                break;
            case 2:
                if (!mergeOptionValues[1]?.value) {
                    return;
                }

                values1.forEach(value1 => {
                    values2.forEach(value2 => {
                        optionNames.push(value1 + seperator + value2)
                    })
                })
                break;
            case 3:
                if (!mergeOptionValues[1]?.value || !mergeOptionValues[2]?.value) {
                    return;
                }
                values1.forEach(value1 => {
                    values2.forEach(value2 => {
                        values3.forEach(value3 => {
                            optionNames.push(value1 + seperator + value2 + seperator + value3)
                        })
                    })
                })
                break;
            default: return;
        }


        try {
            optionNames.forEach(r => {
                if (r.length > 50) {
                    throw new Error('50자가 넘는 조합 옵션명이 있습니다. 옵션명은 최대 50자 까지만 가능합니다.')
                }
            })
        } catch (err) {
            alert(err.message);
            return;
        }

        onSubmitCreate(optionNames);
    }
    return (
        <Container>
            <form onSubmit={(e) => handleSubmitCreateMergeOptions(e)}>
                <div style={{fontSize:'13px', color: '#444'}}>옵션명 조합 생성</div>
                <div className='input-group mgl-flex'>
                    <div className='input-box'>
                        <input
                            type='text'
                            className='input-item'
                            placeholder="조합 생성 구분자 ( , - _ )"
                            value={seperator || ''}
                            onChange={(e) => handleChangeSeperator(e)}
                        ></input>
                    </div>
                    <div className='flex-block'></div>
                    <div>
                        {mergeOptionValues?.map((r, index) => {

                            return (
                                <div key={index} className='input-box mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                    <input
                                        type='text'
                                        className='input-item'
                                        placeholder={'옵션값 예시: 빨강,노랑 ( , 로 구분)'}
                                        value={r.value}
                                        onChange={(e) => handleChangeMergeOptionValue(e, index)}
                                    ></input>
                                    <div className='icon-button-group mgl-flex mgl-flex-justifyContent-flexEnd'>
                                        {index !== 0 &&
                                            <CustomBlockButton
                                                type='button'
                                                className='icon-button-item'
                                                style={{
                                                    background: '#ffffff'
                                                }}
                                                onClick={() => handleDeleteMergeOptionValue(index)}
                                            >
                                                <div className='icon-figure'>
                                                    <CustomImage
                                                        src='/images/icon/close_default_959eae.svg'
                                                    />
                                                </div>
                                            </CustomBlockButton>
                                        }
                                        {index === mergeOptionValues.length - 1 && index < 2 &&
                                            <CustomBlockButton
                                                type='button'
                                                className='icon-button-item'
                                                style={{
                                                    background: '#697185'
                                                }}
                                                onClick={() => handlePushMergeOptionValue()}
                                            >
                                                <div className='icon-figure'>
                                                    <CustomImage
                                                        src='/images/icon/add_default_ffffff.svg'
                                                    />
                                                </div>
                                            </CustomBlockButton>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                        <div className='flex-block'></div>
                        <CustomBlockButton
                            type='submit'
                            className='generator-button-item'
                            disabled={
                                (mergeOptionValues.length === 1 && !mergeOptionValues[0].value) ||
                                (mergeOptionValues.length === 2 && (!mergeOptionValues[0].value || !mergeOptionValues[1].value)) ||
                                (mergeOptionValues.length === 3 && (!mergeOptionValues[0].value || !mergeOptionValues[1].value || !mergeOptionValues[2].value))
                            }
                        >
                            <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-center'>
                                <span
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '10px'
                                    }}
                                >
                                    <CustomImage
                                        src='/images/icon/arrow_downward_ffffff.svg'
                                    />
                                </span>
                                적용
                            </div>
                        </CustomBlockButton>
                    </div>
                </div>
            </form>
        </Container>
    );

}