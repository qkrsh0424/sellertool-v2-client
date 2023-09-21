import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomInput from "../../../../../components/input/default/v1/CustomInput";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";
import { St } from "./FdMarginRecordList.styled";
import { MdCreateMarginRecord } from "./MdCreateMarginRecord";
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { CalculateUtils } from "../../utils/CalculateUtils";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";

const customDateUtils = CustomDateUtils();
const calculateUtils = CalculateUtils();
const customNumberUtils = CustomNumberUtils();

export function FdMarginRecordList({
    marginRecordList,
    selectedMarginRecord,
    mrBaseExchangeRateList,
    mrPurchaseModuleList,
    selectResultMber,
    selectResultMberValue,
    searchQuery,

    onReqFetchMarginRecordList,
    onChangeSearchQueryFromEvent,
    onSelectMarginRecord,
    onReqCreateMarginRecord
}) {
    const [createMarginRecordModalOpen, setCreateMarginRecordModalOpen] = useState(false);

    const toggleCreateMarginRecordModalOpen = (bool) => {
        setCreateMarginRecordModalOpen(bool);
    }

    return (
        <>
            <St.Container>
                <St.SearchFieldWrapper>
                    <CustomBlockButton
                        type='button'
                        className='addBtn'
                        onClick={() => toggleCreateMarginRecordModalOpen(true)}
                    >
                        상품추가
                    </CustomBlockButton>
                    <div className='control-box'>
                        <form onSubmit={(e) => onReqFetchMarginRecordList(e)}>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    className='input-item'
                                    placeholder='상품명 or 태그'
                                    onChange={(e) => onChangeSearchQueryFromEvent(e)}
                                    value={searchQuery || ''}
                                />
                                <CustomBlockButton
                                    type='submit'
                                    className='button-item'
                                >조회</CustomBlockButton>
                            </div>
                        </form>
                    </div>
                </St.SearchFieldWrapper>
                <St.TableWrapper>
                    <St.TableBox>
                        <table
                            cellSpacing={0}
                        >
                            <thead>
                                <tr>
                                    <ResizableTh
                                        className="fixed-header fixed-col-left-th"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={160}
                                        style={{
                                            zIndex: '11'
                                        }}
                                    >
                                        <div className='text-box'>
                                            <div className='text'>상품명</div>
                                            <div className='lineBreaker'></div>
                                            <div className='text'>태그</div>
                                        </div>
                                    </ResizableTh>
                                    <ResizableTh
                                        className="fixed-header"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={160}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        <div className='text-box'>
                                            <div className='text'>매출합계 ({selectResultMber?.name})</div>
                                            <div className='lineBreaker'></div>
                                            <div className='text'>매입합계 ({selectResultMber?.name})</div>
                                        </div>
                                    </ResizableTh>
                                    <ResizableTh
                                        className="fixed-header"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={70}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        <div>마진율(%)</div>
                                    </ResizableTh>
                                    <ResizableTh
                                        className="fixed-header"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={160}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        <div>생성일</div>
                                    </ResizableTh>
                                    <ResizableTh
                                        className="fixed-header"
                                        scope="col"
                                        // width={r.defaultWidth}
                                        width={160}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        <div>마지막 수정일</div>
                                    </ResizableTh>
                                </tr>
                            </thead>
                            <tbody>
                                {marginRecordList?.map(marginRecord => {
                                    let resultForm = null;

                                    if (marginRecord?.mrPurchaseModuleYn === 'y') {
                                        let mrPurchaseModule = mrPurchaseModuleList?.find(r => r.id === marginRecord?.mrPurchaseModuleId);
                                        resultForm = calculateUtils.getMarginResultForm({
                                            marginRecordForm: marginRecord,
                                            mrBaseExchangeRateList: mrBaseExchangeRateList,
                                            mrPurchaseModuleForm: mrPurchaseModule
                                        })
                                    } else {
                                        resultForm = calculateUtils.getMarginResultForm({
                                            marginRecordForm: marginRecord,
                                            mrBaseExchangeRateList: mrBaseExchangeRateList,
                                        })
                                    }

                                    let totalExpensePriceWithBaseExchangeRate = customNumberUtils.roundToDigit(resultForm?.totalExpenseKRW / selectResultMberValue, 2);
                                    let totalIncomePriceWithBaseExchangeRate = customNumberUtils.roundToDigit(resultForm?.totalIncomeKRW / selectResultMberValue, 2);

                                    return (
                                        <tr
                                            key={marginRecord?.id}
                                            onClick={() => onSelectMarginRecord(marginRecord)}
                                            style={{
                                                background: selectedMarginRecord?.id === marginRecord?.id ? 'var(--mainColorOpacity100)' : ''
                                            }}
                                        >
                                            <td
                                                className='fixed-col-left'
                                                style={{
                                                    background: selectedMarginRecord?.id === marginRecord?.id ? 'var(--mainColorOpacity200)' : ''
                                                }}
                                            >
                                                <div className='text-box'>
                                                    <div className='text'>{marginRecord?.name}</div>
                                                    <div className='lineBreaker'></div>
                                                    <div className='text text-tag'>
                                                        {marginRecord?.tag || <span style={{ color: '#b0b0b0', fontWeight: '400' }}>태그 미지정</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='text-box'>
                                                    <div className='text'>{customNumberUtils.numberWithCommas2(totalIncomePriceWithBaseExchangeRate) || '0'}</div>
                                                    <div className='lineBreaker'></div>
                                                    <div className='text'>{customNumberUtils.numberWithCommas2(totalExpensePriceWithBaseExchangeRate) || '0'}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='text-box'>
                                                    <div className='text'>{resultForm?.marginRate}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='text-box'>
                                                    <div className='text'>{customDateUtils.dateToYYYYMMDDhhmmss(marginRecord?.createdAt)}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='text-box'>
                                                    <div className='text'>{marginRecord?.updatedAt ? customDateUtils.dateToYYYYMMDDhhmmss(marginRecord?.updatedAt) : ''}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </St.TableBox>
                </St.TableWrapper>
            </St.Container>

            {createMarginRecordModalOpen &&
                <MdCreateMarginRecord
                    open={createMarginRecordModalOpen}
                    onClose={() => toggleCreateMarginRecordModalOpen(false)}
                    onConfirm={onReqCreateMarginRecord}
                />
            }
        </>
    );
}