import { CustomDateSelectButtonGroup } from "../../../../../components/buttons/date-select/v1/CustomDateSelectButtonGroup";
import { ClickableWrapper } from "../../../../../components/clickable-wrapper/v1";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Wrapper } from "../style/BadStockSetting.styled";

export default function BadStockSettingFieldView({
    badStockEndDateSelectorOpen,
    badStockEndDate,
    handleOpenBadStockEndDateSelector,
    handleCloseBadStockEndDateSelector,
    handleActionUpdateBadStockEndDate
}) {
    return (
        <Wrapper>
            <SingleBlockButton
                type='button'
                className='button-item'
                onClick={() => handleOpenBadStockEndDateSelector()}
            >
                미출고 기간 설정
            </SingleBlockButton>
            <ClickableWrapper
                isActive={badStockEndDateSelectorOpen}
                onClickOutside={() => handleCloseBadStockEndDateSelector()}
            >
                {badStockEndDateSelectorOpen &&
                    <div className='selector-box'>
                        <CustomDateSelectButtonGroup.Days7Button
                            selectedDate={badStockEndDate}
                            callback={handleActionUpdateBadStockEndDate}
                        />
                        <CustomDateSelectButtonGroup.Days30Button
                            selectedDate={badStockEndDate}
                            callback={handleActionUpdateBadStockEndDate}
                        />
                        <CustomDateSelectButtonGroup.Days60Button
                            selectedDate={badStockEndDate}
                            callback={handleActionUpdateBadStockEndDate}
                        />
                        <CustomDateSelectButtonGroup.Days90Button
                            selectedDate={badStockEndDate}
                            callback={handleActionUpdateBadStockEndDate}
                        />
                    </div>
                }
            </ClickableWrapper>
        </Wrapper>
    )
}