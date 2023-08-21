import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../image/CustomImage";
import { St } from "./FdMrBaseExchangeRateList.styled";
import { returnMberValue } from "./utils/returnMberValue";

const customNumberUtils = CustomNumberUtils();

export function FdMrBaseExchangeRateList({
    mrBaseExchangeRateList,
    onSelect
}) {
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <div className='noticeBox'>
                        <St.AutoUpdateBadge /> <div className='text'>표시는 매일 새로운 환율이 적용됩니다.</div>
                    </div>
                    {mrBaseExchangeRateList?.map(mrBaseExchangeRate => {
                        if (mrBaseExchangeRate?.basicFlag) {
                            return (
                                <St.ItemBox
                                    key={mrBaseExchangeRate?.id}
                                    style={{ background: '#f6f6f6' }}
                                    onClick={() => onSelect(mrBaseExchangeRate)}
                                >
                                    <div className='info-box'>
                                        <div className='nameBox'>
                                            <St.AutoUpdateBadge />
                                            <div className='name'>
                                                {mrBaseExchangeRate?.name}
                                            </div>
                                        </div>
                                        <div className='baseExchangeRateValue'>기준환율 : {customNumberUtils.numberWithCommas2(mrBaseExchangeRate?.staticValue)}</div>
                                    </div>
                                    <div className='defaultTag'>Default</div>
                                </St.ItemBox>
                            );
                        }
                        return (
                            <St.ItemBox
                                key={mrBaseExchangeRate?.id}
                                onClick={() => onSelect(mrBaseExchangeRate)}
                            >
                                <div className='info-box'>
                                    <div className='nameBox'>
                                        {mrBaseExchangeRate?.valueType === 'DYNAMIC' && <St.AutoUpdateBadge />}
                                        <div className='name'>
                                            {mrBaseExchangeRate?.name}
                                        </div>
                                    </div>
                                    <div className='baseExchangeRateValue'>
                                        기준환율 : {customNumberUtils.numberWithCommas2(returnMberValue(mrBaseExchangeRate, mrBaseExchangeRateList))}
                                    </div>
                                </div>
                                <CustomBlockButton
                                    type='button'
                                    className='editBtn'
                                >
                                    <CustomImage
                                        src='/images/icon/edit_default_808080.svg'
                                    />
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='button'
                                    className='removeBtn'
                                >
                                    <CustomImage
                                        src='/images/icon/delete_default_e56767.svg'
                                    />
                                </CustomBlockButton>
                            </St.ItemBox>
                        );
                    })}
                </St.Wrapper>
            </St.Container>
        </>
    );
}