import { dateToYYMMDD } from "../../../../../../../../../utils/dateFormatUtils";
import { CustomBoxImage } from "../../../../../modules";
import { CustomBlockButton } from "../../../../../modules/buttons/block-button/v1";
import CustomSelect from "../../../../../modules/select/CustomSelect";
import { dateToHHmm } from "../../../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/DetailControl.styled";

export default function DetailControlFieldView({
    isPending,
    record,
    currentRecordInfoIdx,
    selectedRecordInfo,
    onActionFoldAllOptions,
    onActionUnfoldAllOptions,
    onSetCurrentRecordInfoIdx,
    onChangeSelectedRecordInfo
}) {
    return (
        <Wrapper>
            <div className='button-box'>
                <button
                    className='button-el'
                    style={{ marginRight: '5px' }}
                    onClick={() => onActionFoldAllOptions()}
                >
                    전체 펼치기
                </button>
                <button
                    className='button-el'
                    onClick={() => onActionUnfoldAllOptions()}
                >
                    전체 접기
                </button>
            </div>

            <div className='detail-header'>
                <CustomBlockButton
                    type='button'
                    className='button-el'
                    onClick={() => onSetCurrentRecordInfoIdx(currentRecordInfoIdx - 1)}
                    disabled={isPending || currentRecordInfoIdx === 0}
                >
                    <CustomBoxImage
                        src='/images/icon/arrowLeft_chevron_808080.svg'
                        size='20px'
                    />
                </CustomBlockButton>

                <div className='date-selector-box'>
                    {selectedRecordInfo ? 
                        <>
                            <CustomSelect
                                className='select-item'
                                value={selectedRecordInfo.id}
                                onChange={(e) => onChangeSelectedRecordInfo(e)}
                                disabled={isPending}
                            >
                                {record?.infos.map(r => {
                                    return (
                                        <option key={r.id} value={r.id}>
                                            {`${dateToYYMMDD(r.created_at)} ${dateToHHmm(r.created_at)}`}
                                        </option>
                                    )
                                })}
                            </CustomSelect>
                        </>
                        :
                        <>
                            <span>-</span>
                        </>  
                    }
                </div>

                <CustomBlockButton
                    type='button'
                    className='button-el'
                    onClick={() => onSetCurrentRecordInfoIdx(currentRecordInfoIdx + 1)}
                    disabled={isPending || currentRecordInfoIdx === (record?.infos.length - 1)}
                >
                    <CustomBoxImage
                        src='/images/icon/arrowRight_chevron_808080.svg'
                        size='20px'
                    />
                </CustomBlockButton>
            </div>
        </Wrapper>
    )
}