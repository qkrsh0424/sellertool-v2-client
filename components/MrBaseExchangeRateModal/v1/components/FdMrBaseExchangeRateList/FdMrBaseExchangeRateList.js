import { useState } from "react";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../image/CustomImage";
import { St } from "./FdMrBaseExchangeRateList.styled";
import { returnMberValue } from "./utils/returnMberValue";

const customNumberUtils = CustomNumberUtils();

export function FdMrBaseExchangeRateList({
    mrBaseExchangeRateList,
    onSetEditTargetItem,
    onSelect,
    onDelete
}) {
    const [deleteTargetItem, setDeleteTargetItem] = useState(null);

    const handleSetDeleteTargetItem = (targetItem) => {
        setDeleteTargetItem(targetItem);
    }

    const handleSubmitDelete = async () => {
        await onDelete(deleteTargetItem);
        handleSetDeleteTargetItem(null);
    }

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

                        if (deleteTargetItem && deleteTargetItem?.id === mrBaseExchangeRate?.id) {
                            return (
                                <St.DeleteItemBox
                                    key={mrBaseExchangeRate?.id}
                                >
                                    <div className='item'>
                                        <div className='description'>
                                            기준환율을 삭제하면 적용된 모든 데이터가 영향을 받습니다.
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className='description'>
                                            정말로 삭제하시겠습니까?
                                        </div>
                                    </div>
                                    <div className='item flex-row-item'>
                                        <CustomBlockButton
                                            className='buttonEl'
                                            style={{ color: '#666' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSetDeleteTargetItem(null);
                                            }}
                                        >
                                            취소
                                        </CustomBlockButton>
                                        <CustomBlockButton
                                            className='buttonEl'
                                            style={{ color: 'var(--defaultRedColor)' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSubmitDelete();
                                            }}
                                        >
                                            삭제
                                        </CustomBlockButton>
                                    </div>
                                </St.DeleteItemBox>
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetDeleteTargetItem(null);
                                        onSetEditTargetItem(mrBaseExchangeRate);
                                    }}
                                >
                                    <CustomImage
                                        src='/images/icon/edit_default_808080.svg'
                                    />
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='button'
                                    className='removeBtn'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetDeleteTargetItem(mrBaseExchangeRate);
                                    }}
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