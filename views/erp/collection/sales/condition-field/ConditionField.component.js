import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import { useRouter } from "next/router";
import { CustomDatePeriodButtonGroup } from "../../../../../components/buttons/date-period/v1/CustomDatePeriodButtonGroup";
import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomInput from "../../../../modules/input/CustomInput";
import CustomSelect from "../../../../modules/select/CustomSelect";
import useDiSearchConditionFormHook from "./hooks/useDiSearchConditionFormHook";
import useMatchedCodeFormHook from "./hooks/useMatchedCodeFormHook";
import useMpSearchConditionFormHook from "./hooks/useMpSearchConditionFormHook";
import useOiSearchConditionFormHook from "./hooks/useOiSearchConditionFormHook";
import usePeriodSearchConditionFormHook from "./hooks/usePeriodSearchConditionFormHook";
import useRiSearchConditionFormHook from "./hooks/useRiSearchConditionFormHook";
import { ConditionContainer, ConditionWrapper, Container, FlexGroup, PeriodWrapper, RadioContainer, RadioWrapper, SubmitButtonContainer, Wrapper } from "./styles/ConditionField.styled";

export default function ConditionFieldComponent({

}) {
    const router = useRouter();

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
        matchedCode,
        onChangeMatchedCode
    } = useMatchedCodeFormHook();

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
            params.startDateTime = dateToYYYYMMDD(startDateTime);
            params.endDateTime = dateToYYYYMMDD(endDateTime);
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

        let currMatchedCode = MATCHED_CODE_TYPES?.find(r => r.value === matchedCode)?.value;

        if (currMatchedCode) {
            params.matchedCode = currMatchedCode;
        } else {
            delete params.matchedCode;
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
        router.replace({
            pathname: router?.pathname,
            query: {
                page: 1,
                size: 50,
                periodSearchCondition: 'salesAt',
                startDateTime: dateToYYYYMMDD(new Date()),
                endDateTime: dateToYYYYMMDD(new Date())
            }
        }, undefined, { scroll: false })
    }

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
                                    {PERIOD_TYPES?.map(r => {
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
                                        type='text'
                                        className='input-item'
                                        value={riSearchQuery || ''}
                                        onChange={(e) => onChangeRiSearchQuery(e)}
                                        disabled={!riSearchCondition}
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
                        <SubmitButtonContainer>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                style={{
                                    background: 'var(--defaultModalCloseColor)'
                                }}
                                onClick={() => handleSubmitClear()}
                            >
                                초기화
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='submit'
                                className='button-item'
                            >
                                조회
                            </SingleBlockButton>
                        </SubmitButtonContainer>
                    </form>
                </Wrapper>
            </Container>
        </>
    );
}

const PERIOD_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'createdAt',
        name: '주문수집일시'
    },
    {
        value: 'channelOrderDate',
        name: '채널주문일시'
    },
    {
        value: 'salesAt',
        name: '주문확정일시'
    }
]

const MANAGEMENT_PRODUCT_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'productName',
        name: '[M] 상품명'
    },
    {
        value: 'productTag',
        name: '[M] 상품태그'
    },
    {
        value: 'productOptionName',
        name: '[M] 옵션명'
    },
    {
        value: 'productOptionTag',
        name: '[M] 옵션태그'
    }
]

const ORDER_INFO_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'prodName',
        name: '상품명'
    },
    {
        value: 'optionName',
        name: '옵션명'
    },
    {
        value: 'salesChannel',
        name: '판매채널'
    },
]

const RECEIVER_INFO_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'receiver',
        name: '수취인명'
    },
    {
        value: 'receiverContact1',
        name: '수취인 전화번호1'
    },
    {
        value: 'receiverContact2',
        name: '수취인 전화번호2'
    },
]

const DELIVERY_INFO_TYPES = [
    {
        value: '',
        name: '전체'
    },
    {
        value: 'destination',
        name: '주소'
    },
    {
        value: 'destinationDetail',
        name: '주소상세'
    },
    {
        value: 'waybillNumber',
        name: '운송장번호'
    },
    {
        value: 'releaseLocation',
        name: '출고지'
    },
]

const MATCHED_CODE_TYPES = [
    {
        value: 'optionCode',
        name: '[M] 옵션코드'
    },
    {
        value: 'releaseOptionCode',
        name: '[M] 출고옵션코드'
    }
]