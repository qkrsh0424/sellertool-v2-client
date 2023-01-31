import { Container } from "./SearchOperator.styled";
import { useEffect, useReducer } from "react";
import DateSelectorFieldView from './DateSelectorField.view';
import DetailSearchFieldView from "./DetailSearchField.view";
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import ButtonFieldView from "./ButtonField.view";
import { dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import { useRouter } from "next/router";

const defaultHeaderDetails = getDefaultHeaderDetails();

const SearchOperatorComponent = (props) => {
    const router = useRouter();

    const [startDate, dispatchStartDate] = useReducer(startDateReducer, initialStartDate);
    const [endDate, dispatchEndDate] = useReducer(endDateReducer, initialEndDate);
    const [searchColumnName, dispatchSearchColumnName] = useReducer(searchColumnNameReducer, initialSearchColumnName);
    const [searchQuery, dispatchSearchQuery] = useReducer(searchQueryReducer, initialSearchQuery);

    useEffect(() => {
        let startDate = router.query.startDate;
        let endDate = router.query.endDate;

        if (startDate) {
            dispatchStartDate({
                type: 'SET_DATA',
                payload: new Date(startDate)
            })
        }

        if (endDate) {
            dispatchEndDate({
                type: 'SET_DATA',
                payload: new Date(endDate)
            })
        }
    }, [router.query.startDate, router.query.endDate])

    useEffect(() => {
        let searchColumnName = router.query.searchColumnName;
        let searchQuery = router.query.searchQuery;

        if (searchColumnName) {
            dispatchSearchColumnName({
                type: 'SET_DATA',
                payload: searchColumnName
            })
        }

        if (searchQuery) {
            dispatchSearchQuery({
                type: 'SET_DATA',
                payload: searchQuery
            })
        }
    }, [router.query.searchColumnName, router.query.searchQuery])

    const onChangeStartDateValue = (value) => {
        dispatchStartDate({
            type: 'SET_DATA',
            payload: value
        })
    }
    const onChangeEndDateValue = (value) => {
        dispatchEndDate({
            type: 'SET_DATA',
            payload: value
        })
    }

    const onChangeSearchColumnNameValue = (e) => {
        dispatchSearchColumnName({
            type: 'SET_DATA',
            payload: e.target.value
        });
        dispatchSearchQuery({
            type: 'CLEAR'
        })
    }

    const onChangeSearchQueryValue = (e) => {
        dispatchSearchQuery({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const onActionRouteToSearch = (e) => {
        e.preventDefault();

        if (startDate && !endDate) {
            alert('종료일 날짜를 선택해 주세요.')
            return;
        }

        if (!startDate && endDate) {
            alert('시작일 날짜를 선택해 주세요.')
            return;
        }

        if ((endDate - startDate < 0)) {
            alert('조회기간을 정확히 선택해 주세요.')
            return;
        }

        if (startDate && endDate) {
            router.query.startDate = dateToYYYYMMDD(startDate);
            router.query.endDate = dateToYYYYMMDD(endDate);
            router.query.periodType = 'registration'
        }

        if (searchColumnName) {
            router.query.searchColumnName = searchColumnName;
        } else {
            delete router.query.searchColumnName;
            delete router.query.searchQuery;
        }

        if (searchColumnName && searchQuery) {
            router.query.searchQuery = searchQuery;
        }

        delete router.query.page;

        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query
            }
        });
    }

    const onActionClearRoute = () => {
        dispatchStartDate({
            type: 'CLEAR'
        })
        dispatchEndDate({
            type: 'CLEAR'
        })
        dispatchSearchColumnName({
            type: 'CLEAR'
        })
        dispatchSearchQuery({
            type: 'CLEAR'
        })

        router.replace({
            pathname: router.pathname
        });
    }

    return (
        <>
            <Container>
                <DateSelectorFieldView
                    startDate={startDate}
                    endDate={endDate}

                    onChangeStartDateValue={onChangeStartDateValue}
                    onChangeEndDateValue={onChangeEndDateValue}
                ></DateSelectorFieldView>
                <form onSubmit={(e) => onActionRouteToSearch(e)}>
                    <DetailSearchFieldView
                        viewHeader={props.viewHeader}
                        defaultHeaderDetails={defaultHeaderDetails}
                        searchColumnName={searchColumnName}
                        searchQuery={searchQuery}

                        onChangeSearchColumnNameValue={onChangeSearchColumnNameValue}
                        onChangeSearchQueryValue={onChangeSearchQueryValue}
                    ></DetailSearchFieldView>
                    <ButtonFieldView
                        onActionRouteToSearch={onActionRouteToSearch}
                        onActionClearRoute={onActionClearRoute}
                    ></ButtonFieldView>
                </form>
            </Container>
        </>
    );
}
export default SearchOperatorComponent;

const initialStartDate = null;
const initialEndDate = null;
const initialSearchColumnName = null;
const initialSearchQuery = '';

const startDateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return new Date();
    }
}

const endDateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return new Date();
    }
}

const searchColumnNameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const searchQueryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return '';
        default: return '';
    }
}