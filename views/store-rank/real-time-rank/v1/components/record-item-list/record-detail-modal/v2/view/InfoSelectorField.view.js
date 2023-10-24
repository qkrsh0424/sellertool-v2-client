import { dateToYYMMDD } from "../../../../../../../../../utils/dateFormatUtils"
import { CustomBoxImage } from "../../../../../modules"
import { CustomBlockButton } from "../../../../../modules/buttons/block-button/v1"
import CustomSelect from "../../../../../modules/select/CustomSelect"
import { dateToHHmm } from "../../../../../utils/dateFormatUtils"
import { Wrapper } from "../styles/InfoSelector.styled"

export default function InfoSelectorFieldView({
    isPending,
    recordInfos,
    currentRecordInfoIdx,
    selectedRecordInfo,
    onSetCurrentRecordInfoIdx,
    onChangeSelectedRecordInfo
}) {
    return (
        <Wrapper>
            <CustomBlockButton
                type='button'
                className='button-el'
                onClick={() => onSetCurrentRecordInfoIdx(currentRecordInfoIdx - 1)}
                disabled={isPending || !currentRecordInfoIdx}
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
                            {recordInfos?.map(r => {
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
                disabled={isPending || (currentRecordInfoIdx !== 0 && !currentRecordInfoIdx) || currentRecordInfoIdx === (recordInfos?.length - 1)}
            >
                <CustomBoxImage
                    src='/images/icon/arrowRight_chevron_808080.svg'
                    size='20px'
                />
            </CustomBlockButton>
        </Wrapper>
    )
}