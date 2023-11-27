import { useState } from "react";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../../components/image/CustomImage";
import { St } from "./FdDateTimeSelector.styled";
import CustomDateTimeSelector from "../../../../../../../../components/date-time-selector/v1/CustomDateTimeSelector";
import { CustomDateUtils } from "../../../../../../../../utils/CustomDateUtils";

const customDateUtils = CustomDateUtils();

export function FdDateTimeSelector({
    stockReflectDateTime,
    onChangeStockReflectDateTime
}) {
    const [fieldOpen, setFieldOpen] = useState(false);
    const [dateTimeSelectorModalOpen, setDateTimeSelectorModalOpen] = useState(false);

    const toggleFieldOpen = (bool) => {
        setFieldOpen(bool);
    }

    const toggleDateTimeSelectorModalOpen = (bool) => {
        setDateTimeSelectorModalOpen(bool);
    }

    const handleChangeStockReflectDateTime = (value) => {
        if (!value) {
            onChangeStockReflectDateTime(null);
        } else {
            onChangeStockReflectDateTime(new Date(value));
        }
        toggleDateTimeSelectorModalOpen(false);
    }

    return (
        <>
            <St.Container>
                <div className='head-wrapper' onClick={() => toggleFieldOpen(!fieldOpen)}>
                    <div className='title'>재고반영시간</div>
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
                    <div className='selector-wrapper'>
                        <CustomBlockButton
                            onClick={() => toggleDateTimeSelectorModalOpen(true)}
                        >
                            {stockReflectDateTime ? customDateUtils.dateToYYYYMMDDhhmmss(new Date(stockReflectDateTime)) : '현재시간'}
                        </CustomBlockButton>
                        <CustomBlockButton
                            className='init-button'
                            onClick={() => onChangeStockReflectDateTime(null)}
                        >
                            초기화
                        </CustomBlockButton>
                    </div>
                }
            </St.Container>

            {dateTimeSelectorModalOpen &&
                <CustomDateTimeSelector
                    open={dateTimeSelectorModalOpen}
                    onClose={() => toggleDateTimeSelectorModalOpen(false)}
                    onConfirm={(value) => handleChangeStockReflectDateTime(value)}
                    initialDateTime={stockReflectDateTime}
                    label='날짜선택'
                />
            }
        </>
    );
}