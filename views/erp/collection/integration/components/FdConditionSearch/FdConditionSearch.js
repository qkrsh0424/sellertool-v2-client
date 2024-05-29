import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/ko';

import { CustomDatePeriodButtonGroup } from "../../../../../../components/buttons/date-period/v1/CustomDatePeriodButtonGroup";
import CustomSelect from "../../../../../../components/select/default/v1/CustomSelect";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";

import useDiSearchConditionFormHook from "./hooks/useDiSearchConditionFormHook";
import useMatchedCodeFormHook from "./hooks/useMatchedCodeFormHook";
import useMpSearchConditionFormHook from "./hooks/useMpSearchConditionFormHook";
import useOiSearchConditionFormHook from "./hooks/useOiSearchConditionFormHook";
import usePeriodSearchConditionFormHook from "./hooks/usePeriodSearchConditionFormHook";
import useRiSearchConditionFormHook from "./hooks/useRiSearchConditionFormHook";
import useMmSearchConditionFormHook from "./hooks/useMmSearchConditionFormHook";
import useStockReflectYnFormHook from "./hooks/useStockReflectYnFormHook";

import { ConditionContainer, ConditionWrapper, Container, FlexGroup, PeriodWrapper, RadioContainer, SubmitButtonContainer, Wrapper } from "./FdConditionSearch.styled";

import { CLASSIFICATIONS, DELIVERY_INFO_TYPES, MANAGEMENT_MEMO_TYPES, MANAGEMENT_PRODUCT_TYPES, MATCHED_CODE_TYPES, ORDER_INFO_TYPES, PERIOD_TYPES, RECEIVER_INFO_TYPES, STOCK_REFLECT_YN_TYPES } from "../../References";

import { CustomDateUtils } from "../../../../../../utils/CustomDateUtils";
import { useEffect, useRef } from "react";

const customDateUtils = CustomDateUtils();
/**
 * 
 * @param {*} param0 
 * @param {*} param0.exposurePeriodTypes - ['', 'createdAt', 'channelOrderDate', 'salesAt', 'releaseAt', 'holdAt']
 */
export default function FdConditionSearch({
    exposurePeriodTypes,
    viewStockReflectField,
}) {
    const router = useRouter();
    const riSearchQueryRef = useRef();

    const {
        periodSearchYn,
        periodSearchCondition,
        startDateTime,
        endDateTime,
        onChangePeriodType,
        onChangeStartDateTime,
        onChangeEndDateTime,
        onChangePeriod
    } = usePeriodSearchConditionFormHook();

    const {
        mpSearchYn,
        mpSearchCondition,
        mpSearchQuery,
        onChangeMpSearchCondition,
        onChangeMpSearchQuery
    } = useMpSearchConditionFormHook();

    const {
        oiSearchYn,
        oiSearchCondition,
        oiSearchQuery,
        onChangeOiSearchCondition,
        onChangeOiSearchQuery
    } = useOiSearchConditionFormHook();

    const {
        riSearchYn,
        riSearchCondition,
        riSearchQuery,
        onChangeRiSearchCondition,
        onChangeRiSearchQuery
    } = useRiSearchConditionFormHook();

    const {
        diSearchYn,
        diSearchCondition,
        diSearchQuery,
        onChangeDiSearchCondition,
        onChangeDiSearchQuery
    } = useDiSearchConditionFormHook();

    const {
        mmSearchYn,
        mmSearchCondition,
        mmSearchQuery,
        onChangeMmSearchCondition,
        onChangeMmSearchQuery
    } = useMmSearchConditionFormHook();

    const {
        matchedCode,
        onChangeMatchedCode
    } = useMatchedCodeFormHook();

    const {
        stockReflectYn,
        onChangeStockReflectYn
    } = useStockReflectYnFormHook();

    const handleSubmit = (e) => {
        e.preventDefault();

        let params = {
            ...router.query
        }

        if (periodSearchYn === 'y') {
            if (startDateTime > endDateTime) {
                alert('종료일은 시작일 이후로 지정해 주세요.');
                return;
            }

            params.periodSearchCondition = periodSearchCondition;
            params.startDateTime = customDateUtils.dateToYYYYMMDD(startDateTime);
            params.endDateTime = customDateUtils.dateToYYYYMMDD(endDateTime);
        } else {
            delete params.periodSearchCondition;
            delete params.startDateTime;
            delete params.endDateTime;
        }

        if (mpSearchYn === 'y') {
            params.mpSearchCondition = mpSearchCondition;
            params.mpSearchQuery = mpSearchQuery;
        } else {
            delete params.mpSearchCondition;
            delete params.mpSearchQuery;
        }

        if (oiSearchYn === 'y') {
            params.oiSearchCondition = oiSearchCondition;
            params.oiSearchQuery = oiSearchQuery;
        } else {
            delete params.oiSearchCondition;
            delete params.oiSearchQuery;
        }

        if (riSearchYn === 'y') {
            params.riSearchCondition = riSearchCondition;
            params.riSearchQuery = riSearchQuery;
        } else {
            delete params.riSearchCondition;
            delete params.riSearchQuery;
        }

        if (diSearchYn === 'y') {
            params.diSearchCondition = diSearchCondition;
            params.diSearchQuery = diSearchQuery;
        } else {
            delete params.diSearchCondition;
            delete params.diSearchQuery;
        }

        if (mmSearchYn === 'y') {
            params.mmSearchCondition = mmSearchCondition;
            params.mmSearchQuery = mmSearchQuery;
        } else {
            delete params.mmSearchCondition;
            delete params.mmSearchQuery;
        }

        let currMatchedCode = MATCHED_CODE_TYPES?.find(r => r.value === matchedCode)?.value;
        const currStockReflectYn = STOCK_REFLECT_YN_TYPES?.find(r => r.value === stockReflectYn)?.value;

        if (currMatchedCode) {
            params.matchedCode = currMatchedCode;
        } else {
            delete params.matchedCode;
        }

        if (currStockReflectYn) {
            params.stockReflectYn = currStockReflectYn;
        } else {
            delete params.stockReflectYn
        }

        router.replace({
            pathname: router?.pathname,
            query: {
                ...params,
                page: 1,

            }
        }, undefined, { scroll: false })
    }

    const handleSubmitClear = () => {
        const currClassification = CLASSIFICATIONS?.find(r => r.classificationType === router?.query?.classificationType) || CLASSIFICATIONS[0];

        let query = {
            periodSearchCondition: currClassification?.periodSearchCondition,
            classificationType: currClassification?.classificationType,
            startDateTime: customDateUtils.dateToYYYYMMDD(new Date()),
            endDateTime: customDateUtils.dateToYYYYMMDD(new Date()),
            sortTypes: router?.query?.sortTypes,
        }

        router.replace({
            pathname: router?.pathname,
            query: {
                ...query
            }
        }, undefined, { scroll: false })
    }

    useEffect(() => {
        console.log(riSearchQueryRef?.current);
        riSearchQueryRef?.current?.focus();
    }, [router?.query?.classificationType]);
    return (
        <>
            <Container>
                <Wrapper>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <ConditionContainer>
                            <div className='label'>조회기간</div>
                            <PeriodWrapper>
                                <CustomSelect
                                    className='select-item'
                                    value={periodSearchCondition || ''}
                                    onChange={(e) => onChangePeriodType(e)}
                                >
                                    {exposurePeriodTypes &&
                                        PERIOD_TYPES?.filter(r => exposurePeriodTypes?.includes(r.value))?.map(r => {
                                            return (
                                                <option
                                                    key={r.value}
                                                    value={r.value}
                                                >
                                                    {r.name}
                                                </option>
                                            );
                                        })
                                    }
                                </CustomSelect>
                                <div className='date-box'>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale={'ko-KR'}
                                    >
                                        <MobileDatePicker
                                            label="시작일"
                                            inputFormat="YYYY.MM.DD"
                                            mask={'____.__.__'}
                                            toolbarFormat="YY.MM.DD dd"
                                            showToolbar={false}
                                            disableFuture={true}
                                            value={dayjs(startDateTime || new Date())}
                                            onChange={(value) => onChangeStartDateTime(value)}
                                            closeOnSelect={true}
                                            disabled={!periodSearchCondition}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className='date-picker'
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale={'ko-KR'}
                                    >
                                        <MobileDatePicker
                                            label="종료일"
                                            inputFormat="YYYY.MM.DD"
                                            mask={'____.__.__'}
                                            toolbarFormat="YY.MM.DD dd"
                                            showToolbar={false}
                                            disableFuture={true}
                                            closeOnSelect={true}
                                            value={dayjs(endDateTime || new Date())}
                                            onChange={(value) => onChangeEndDateTime(value)}
                                            disabled={!periodSearchCondition}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className='date-picker'
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </PeriodWrapper>
                            <CustomDatePeriodButtonGroup style={{ marginTop: '15px' }}>
                                <CustomDatePeriodButtonGroup.TodayButton
                                    callback={(result) => onChangePeriod(result)}
                                />
                                <CustomDatePeriodButtonGroup.YesterdayButton
                                    callback={(result) => onChangePeriod(result)}
                                />
                                <CustomDatePeriodButtonGroup.Days7Button
                                    callback={(result) => onChangePeriod(result)}
                                />
                                <CustomDatePeriodButtonGroup.Days30Button
                                    callback={(result) => onChangePeriod(result)}
                                />
                                <CustomDatePeriodButtonGroup.Days90Button
                                    callback={(result) => onChangePeriod(result)}
                                />
                                <CustomDatePeriodButtonGroup.ThisMonthButton
                                    callback={(result) => onChangePeriod(result)}
                                />
                                <CustomDatePeriodButtonGroup.LastMonthButton
                                    callback={(result) => onChangePeriod(result)}
                                />
                            </CustomDatePeriodButtonGroup>
                        </ConditionContainer>
                        <FlexGroup>
                            <ConditionContainer>
                                <div className='label'>관리상품정보</div>
                                <ConditionWrapper>
                                    <CustomSelect
                                        className='select-item'
                                        value={mpSearchCondition || ''}
                                        onChange={(e) => onChangeMpSearchCondition(e)}
                                    >
                                        {MANAGEMENT_PRODUCT_TYPES?.map(r => {
                                            return (
                                                <option
                                                    key={r.value}
                                                    value={r.value}
                                                >
                                                    {r.name}
                                                </option>
                                            );
                                        })}
                                    </CustomSelect>
                                    <CustomInput
                                        type='text'
                                        className='input-item'
                                        value={mpSearchQuery || ''}
                                        onChange={(e) => onChangeMpSearchQuery(e)}
                                        disabled={!mpSearchCondition}
                                    ></CustomInput>
                                </ConditionWrapper>
                            </ConditionContainer>
                            <ConditionContainer>
                                <div className='label'>주문정보</div>
                                <ConditionWrapper>
                                    <CustomSelect
                                        className='select-item'
                                        value={oiSearchCondition || ''}
                                        onChange={(e) => onChangeOiSearchCondition(e)}
                                    >
                                        {ORDER_INFO_TYPES?.map(r => {
                                            return (
                                                <option
                                                    key={r.value}
                                                    value={r.value}
                                                >
                                                    {r.name}
                                                </option>
                                            );
                                        })}
                                    </CustomSelect>
                                    <CustomInput
                                        type='text'
                                        className='input-item'
                                        value={oiSearchQuery || ''}
                                        onChange={(e) => onChangeOiSearchQuery(e)}
                                        disabled={!oiSearchCondition}
                                    ></CustomInput>
                                </ConditionWrapper>
                            </ConditionContainer>
                        </FlexGroup>
                        <FlexGroup>
                            <ConditionContainer>
                                <div className='label'>수취인정보</div>
                                <ConditionWrapper>
                                    <CustomSelect
                                        className='select-item'
                                        value={riSearchCondition || ''}
                                        onChange={(e) => onChangeRiSearchCondition(e)}
                                    >
                                        {RECEIVER_INFO_TYPES?.map(r => {
                                            return (
                                                <option
                                                    key={r.value}
                                                    value={r.value}
                                                >
                                                    {r.name}
                                                </option>
                                            );
                                        })}
                                    </CustomSelect>
                                    <CustomInput
                                        ref={riSearchQueryRef}
                                        type='text'
                                        className='input-item'
                                        value={riSearchQuery || ''}
                                        onChange={(e) => onChangeRiSearchQuery(e)}
                                        // disabled={!riSearchCondition}
                                    ></CustomInput>
                                </ConditionWrapper>
                            </ConditionContainer>
                            <ConditionContainer>
                                <div className='label'>배송정보</div>
                                <ConditionWrapper>
                                    <CustomSelect
                                        className='select-item'
                                        value={diSearchCondition || ''}
                                        onChange={(e) => onChangeDiSearchCondition(e)}
                                    >
                                        {DELIVERY_INFO_TYPES?.map(r => {
                                            return (
                                                <option
                                                    key={r.value}
                                                    value={r.value}
                                                >
                                                    {r.name}
                                                </option>
                                            );
                                        })}
                                    </CustomSelect>
                                    <CustomInput
                                        type='text'
                                        className='input-item'
                                        value={diSearchQuery || ''}
                                        onChange={(e) => onChangeDiSearchQuery(e)}
                                        disabled={!diSearchCondition}
                                    ></CustomInput>
                                </ConditionWrapper>
                            </ConditionContainer>
                        </FlexGroup>
                        <FlexGroup>
                            <ConditionContainer>
                                <div className='label'>관리메모</div>
                                <ConditionWrapper>
                                    <CustomSelect
                                        className='select-item'
                                        value={mmSearchCondition || ''}
                                        onChange={(e) => onChangeMmSearchCondition(e)}
                                    >
                                        {MANAGEMENT_MEMO_TYPES?.map(r => {
                                            return (
                                                <option
                                                    key={r.value}
                                                    value={r.value}
                                                >
                                                    {r.name}
                                                </option>
                                            );
                                        })}
                                    </CustomSelect>
                                    <CustomInput
                                        type='text'
                                        className='input-item'
                                        value={mmSearchQuery || ''}
                                        onChange={(e) => onChangeMmSearchQuery(e)}
                                        disabled={!mmSearchCondition}
                                    ></CustomInput>
                                </ConditionWrapper>
                            </ConditionContainer>
                        </FlexGroup>
                        <RadioContainer>
                            <div className='title'><span className='highlight'>{MATCHED_CODE_TYPES?.find(r => r.value === (matchedCode))?.name || '[M] 출고옵션코드'}</span>를 기준으로 매칭된 관리상품정보를 가져옵니다.</div>
                            <FlexGroup style={{ marginTop: '10px' }}>
                                {MATCHED_CODE_TYPES?.map(r => {
                                    return (
                                        <label className='wrapper' key={r.value}>
                                            <input
                                                type='radio'
                                                className='radio-item'
                                                value={r.value}
                                                onChange={(e) => onChangeMatchedCode(e)}
                                                checked={r.value === matchedCode}
                                            ></input>
                                            <span className='label'>
                                                {r.name}
                                            </span>
                                        </label>
                                    );
                                })}
                            </FlexGroup>
                        </RadioContainer>
                        {viewStockReflectField &&
                            <RadioContainer>
                                <div className='title'>재고반영 여부</div>
                                <FlexGroup style={{ marginTop: '10px' }}>
                                    {STOCK_REFLECT_YN_TYPES?.map(r => {
                                        return (
                                            <label className='wrapper' key={r.value}>
                                                <input
                                                    type='radio'
                                                    className='radio-item'
                                                    value={r.value}
                                                    onChange={(e) => onChangeStockReflectYn(e)}
                                                    checked={r.value === stockReflectYn}
                                                ></input>
                                                <span className='label'>
                                                    {r.name}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </FlexGroup>
                            </RadioContainer>
                        }
                        <SubmitButtonContainer>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                style={{
                                    background: 'var(--defaultModalCloseColor)'
                                }}
                                onClick={() => handleSubmitClear()}
                            >
                                초기화
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='submit'
                                className='button-item'
                            >
                                조회
                            </CustomBlockButton>
                        </SubmitButtonContainer>
                    </form>
                </Wrapper>
            </Container>
        </>
    );
}