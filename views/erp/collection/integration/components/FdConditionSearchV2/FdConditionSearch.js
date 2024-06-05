import { useRouter } from "next/router";
import { CircularProgress, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/ko';

import { CustomDatePeriodButtonGroup } from "../../../../../../components/buttons/date-period/v1/CustomDatePeriodButtonGroup";
import CustomSelect from "../../../../../../components/select/default/v1/CustomSelect";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";

import useMatchedCodeFormHook from "./hooks/useMatchedCodeFormHook";
import usePeriodSearchConditionFormHook from "./hooks/usePeriodSearchConditionFormHook";
import useStockReflectYnFormHook from "./hooks/useStockReflectYnFormHook";

import { ConditionContainer, ConditionWrapper, Container, FlexGroup, PeriodWrapper, RadioContainer, SearchFieldWrapper, SubmitButtonContainer, Wrapper } from "./FdConditionSearch.styled";

import { CLASSIFICATIONS, DELIVERY_INFO_TYPES, MANAGEMENT_MEMO_TYPES, MANAGEMENT_PRODUCT_TYPES, MATCHED_CODE_TYPES, ORDER_INFO_TYPES, PERIOD_TYPES, RECEIVER_INFO_TYPES, STOCK_REFLECT_YN_TYPES } from "../../References";

import { CustomDateUtils } from "../../../../../../utils/CustomDateUtils";
import { useEffect, useRef, useState } from "react";
import { CustomURIEncoderUtils } from "../../../../../../utils/CustomURIEncoderUtils";
import CustomImage from "../../../../../../components/image/CustomImage";
import { useErpItemValueHook } from "../../contexts/ErpItemProvider";

const customDateUtils = CustomDateUtils();
/**
 * 
 * @param {*} param0 
 * @param {*} param0.exposurePeriodTypes - ['', 'createdAt', 'channelOrderDate', 'salesAt', 'releaseAt', 'holdAt']
 */
export function FdConditionSearch({
    exposurePeriodTypes,
    viewStockReflectField,
}) {
    const router = useRouter();
    const searchFilter = router?.query?.searchFilter;

    const erpItemValueHook = useErpItemValueHook();

    const searchQueryRef = useRef();
    const [searchCondition, setSearchCondition] = useState('RECEIVER');
    const [searchQuery, setSearchQuery] = useState('');

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
        matchedCode,
        onChangeMatchedCode
    } = useMatchedCodeFormHook();

    const {
        stockReflectYn,
        onChangeStockReflectYn
    } = useStockReflectYnFormHook();

    const handleChangeSearchCondition = (e) => {
        let value = e.target.value;

        if (!value) {
            setSearchCondition('');
        }

        setSearchCondition(value);
        setSearchQuery('');
    }

    const handleChangeSearchQuery = (e) => {
        let value = e.target.value;

        setSearchQuery(value);
    }

    const handleDeleteSearchFilter = (searchCondition) => {
        let newSearchFilterList = searchFilterList?.filter(r => r.searchCondition !== searchCondition);

        router.replace({
            pathname: router?.pathname,
            query: {
                ...router?.query,
                page: 1,
                searchFilter: CustomURIEncoderUtils().encodeJSONList(newSearchFilterList)

            }
        }, undefined, { scroll: false })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let params = {
            ...router.query
        }

        // 조회 기간 설정
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

        // 조회 조건 설정
        let newSearchFilterList = [...searchFilterList];
        if (searchCondition && searchQuery) {
            let targetSearchFilter = newSearchFilterList?.find(r => r.searchCondition === searchCondition);

            if (targetSearchFilter) {
                targetSearchFilter.searchQuery = searchQuery;
            } else {
                newSearchFilterList = [
                    ...newSearchFilterList,
                    {
                        searchCondition: searchCondition,
                        searchQuery: searchQuery
                    }
                ]
            }

            if (!newSearchFilterList || newSearchFilterList?.length <= 0) {
                delete params?.searchFilter;
            } else {
                params.searchFilter = CustomURIEncoderUtils().encodeJSONList(newSearchFilterList);
            }
        }


        // 옵션코드 설정
        let currMatchedCode = MATCHED_CODE_TYPES?.find(r => r.value === matchedCode)?.value;
        if (currMatchedCode) {
            params.matchedCode = currMatchedCode;
        } else {
            delete params.matchedCode;
        }

        // 재고반영 여부 설정
        const currStockReflectYn = STOCK_REFLECT_YN_TYPES?.find(r => r.value === stockReflectYn)?.value;
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
        }, undefined, { scroll: false });
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

        setSearchQuery('');
        setSearchCondition('');
        router.replace({
            pathname: router?.pathname,
            query: {
                ...query
            }
        }, undefined, { scroll: false })
    }

    useEffect(() => {
        setSearchCondition('RECEIVER');
        setSearchQuery('')
        searchQueryRef.current.focus();
    }, [router?.query?.classificationType]);

    const searchFilterList = searchFilter ? CustomURIEncoderUtils().decodeJSONList(searchFilter) : [];

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
                        <SearchFieldWrapper>
                            <div className='flexBox gap-20 mobileDynamic'>
                                <div style={{ flex: 1 }}>
                                    <div className='flexBox gap-20'>
                                        <section className='conditionSelectBox' style={{ flex: 1 }}>
                                            <CustomSelect value={searchCondition || ''} onChange={(e) => handleChangeSearchCondition(e)}>
                                                <option value={''}>선택</option>
                                                <optgroup label='- 관리상품정보'>
                                                    {M_SEARCH_CONDITIONS?.map(r => {
                                                        return (
                                                            <option key={r.fieldName} value={r.fieldName}>{r.name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                                <optgroup label='- 수취인정보'>
                                                    {RECEIVER_SEARCH_CONDITIONS?.map(r => {
                                                        return (
                                                            <option key={r.fieldName} value={r.fieldName}>{r.name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                                <optgroup label='- 배송정보'>
                                                    {DELIVERY_SEARCH_CONDITIONS?.map(r => {
                                                        return (
                                                            <option key={r.fieldName} value={r.fieldName}>{r.name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                                <optgroup label='- 주문정보'>
                                                    {ORDER_SEARCH_CONDITIONS?.map(r => {
                                                        return (
                                                            <option key={r.fieldName} value={r.fieldName}>{r.name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                                <optgroup label='- 관리메모'>
                                                    {MEMO_SEARCH_CONDITIONS?.map(r => {
                                                        return (
                                                            <option key={r.fieldName} value={r.fieldName}>{r.name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                            </CustomSelect>
                                        </section>
                                        <section className='queryInputBox' style={{ flex: 1 }}>
                                            <textarea
                                                ref={searchQueryRef}
                                                placeholder="줄바꿈&#10;Window: Ctrl + Enter&#10;Mac: Command + Enter"
                                                value={searchQuery || ''}
                                                onChange={(e) => handleChangeSearchQuery(e)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && (e.metaKey || e.shiftKey)) {
                                                        e.preventDefault();
                                                        setSearchQuery(prev => prev + '\n');
                                                        return;
                                                    } else if (e.key === "Enter" && !(e.metaKey || e.shiftKey)) {
                                                        e.preventDefault();
                                                        handleSubmit(e);
                                                    }
                                                }}
                                                disabled={!searchCondition || erpItemValueHook?.isLoading}
                                            ></textarea>
                                        </section>
                                    </div>
                                    <div className='addButtonBox'>
                                        {erpItemValueHook?.isLoading ?
                                            <CustomBlockButton
                                                type='button'
                                                onClick={(e) => handleSubmit(e)}
                                                disabled={!searchCondition || !searchQuery}
                                            >
                                                <CircularProgress size={20} />
                                            </CustomBlockButton>
                                            :
                                            <CustomBlockButton
                                                type='button'
                                                onClick={(e) => handleSubmit(e)}
                                                disabled={!searchCondition || !searchQuery}
                                            >
                                                추가
                                            </CustomBlockButton>
                                        }
                                    </div>
                                </div>
                                <div className='searchListWrapper'>
                                    <div className='title'>검색집합</div>
                                    <div className='aggregationListWrapper'>
                                        {searchFilterList?.map(searchFilter => {
                                            const name = getNameForSearchFilter(searchFilter);
                                            return (
                                                <div key={searchFilter?.searchCondition} className='aggregationBox'>
                                                    <div className='header'>
                                                        <div className='conditionName'>{name}</div>
                                                        {erpItemValueHook?.isLoading ?
                                                            <CustomBlockButton
                                                                type='button'
                                                                className='deleteButton'
                                                                onClick={() => handleDeleteSearchFilter(searchFilter?.searchCondition)}
                                                            >
                                                                <CircularProgress size={10} />
                                                            </CustomBlockButton>
                                                            :
                                                            <CustomBlockButton
                                                                type='button'
                                                                className='deleteButton'
                                                                onClick={() => handleDeleteSearchFilter(searchFilter?.searchCondition)}
                                                            >
                                                                <CustomImage src='/images/icon/close_default_e56767.svg' />
                                                            </CustomBlockButton>
                                                        }
                                                    </div>
                                                    <div className='queryText'>{searchFilter?.searchQuery}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </SearchFieldWrapper>
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
                            {erpItemValueHook?.isLoading ?
                                <>
                                    <CustomBlockButton
                                        type='button'
                                        className='button-item'
                                        style={{
                                            background: 'var(--defaultModalCloseColor)'
                                        }}
                                    >
                                        <CircularProgress size={20} />
                                    </CustomBlockButton>
                                    <CustomBlockButton
                                        type='button'
                                        className='button-item'
                                    >
                                        <CircularProgress size={20} />
                                    </CustomBlockButton>
                                </>
                                :
                                <>
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
                                </>
                            }
                        </SubmitButtonContainer>
                    </form>
                </Wrapper>
            </Container>
        </>
    );
}

function getNameForSearchFilter(searchFilter) {
    let name = M_SEARCH_CONDITIONS?.find(r => r.fieldName === searchFilter?.searchCondition)?.name;

    if (!name) {
        name = ORDER_SEARCH_CONDITIONS?.find(r => r.fieldName === searchFilter?.searchCondition)?.name;
    }

    if (!name) {
        name = RECEIVER_SEARCH_CONDITIONS?.find(r => r.fieldName === searchFilter?.searchCondition)?.name;
    }

    if (!name) {
        name = DELIVERY_SEARCH_CONDITIONS?.find(r => r.fieldName === searchFilter?.searchCondition)?.name;
    }

    if (!name) {
        name = MEMO_SEARCH_CONDITIONS?.find(r => r.fieldName === searchFilter?.searchCondition)?.name;
    }

    return name;
}

const M_SEARCH_CONDITIONS = [
    {
        fieldName: 'M_PRODUCT_CODE',
        name: '[M] 상품코드',
    },
    {
        fieldName: 'M_PRODUCT_NAME',
        name: '[M] 상품명',
    },
    {
        fieldName: 'M_PRODUCT_TAG',
        name: '[M] 상품태그',
    },
    {
        fieldName: 'M_PRODUCT_OPTION_CODE',
        name: '[M] 옵션코드',
    },
    {
        fieldName: 'M_PRODUCT_OPTION_NAME',
        name: '[M] 옵션명',
    },
    {
        fieldName: 'M_PRODUCT_OPTION_TAG',
        name: '[M] 옵션태그',
    },
]

const ORDER_SEARCH_CONDITIONS = [
    {
        fieldName: 'PROD_NAME',
        name: '상품명',
    },
    {
        fieldName: 'OPTION_NAME',
        name: '옵션정보',
    },
    {
        fieldName: 'SALES_CHANNEL',
        name: '판매채널',
    },
    {
        fieldName: 'ORDER_NUMBER_1',
        name: '주문번호1',
    },
    {
        fieldName: 'ORDER_NUMBER_2',
        name: '주문번호2',
    },
]

const RECEIVER_SEARCH_CONDITIONS = [
    {
        fieldName: 'RECEIVER',
        name: '수취인명',
    },
    {
        fieldName: 'RECEIVER_CONTACT_1',
        name: '수취인 전화번호1',
    },
    {
        fieldName: 'RECEIVER_CONTACT_2',
        name: '수취인 전화번호2',
    },
]

const DELIVERY_SEARCH_CONDITIONS = [
    {
        fieldName: 'DESTINATION',
        name: '주소',
    },
    {
        fieldName: 'DESTINATION_DETAIL',
        name: '주소상세',
    },
    {
        fieldName: 'WAYBILL_NUMBER',
        name: '운송장번호',
    },
    {
        fieldName: 'RELEASE_LOCATION',
        name: '출고지',
    },
];

const MEMO_SEARCH_CONDITIONS = [
    {
        fieldName: 'MANAGEMENT_MEMO_1',
        name: '관리메모1',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_2',
        name: '관리메모2',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_3',
        name: '관리메모3',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_4',
        name: '관리메모4',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_5',
        name: '관리메모5',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_6',
        name: '관리메모6',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_7',
        name: '관리메모7',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_8',
        name: '관리메모8',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_9',
        name: '관리메모9',
    },
    {
        fieldName: 'MANAGEMENT_MEMO_10',
        name: '관리메모10',
    },
];