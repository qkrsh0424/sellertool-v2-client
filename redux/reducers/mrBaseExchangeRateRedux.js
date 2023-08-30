export default function mrBaseExchangeRateRedux(state = {
    mrBaseExchangeRateList: null
}, action) {
    switch (action.type) {
        case 'MR_BASE_EXCHANGE_RATE_SET_DATA':
            return action.payload;
        case 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        case 'MR_BASE_EXCHANGE_RATE_CLEAR':
            return {
                ...state,
                mrBaseExchangeRateList: null,
            }
        default:
            return { ...state }
    }
};