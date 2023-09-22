import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import userRedux from './userRedux';
import workspaceRedux from './workspaceRedux';
import mrBaseExchangeRateRedux from './mrBaseExchangeRateRedux';
import mrPurchaseModuleRedux from './mrPurchaseModuleRedux';

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        userRedux: userRedux,
        workspaceRedux: workspaceRedux,
        mrBaseExchangeRateRedux: mrBaseExchangeRateRedux,
        mrPurchaseModuleRedux: mrPurchaseModuleRedux
    })(state, action);
}

export default rootReducer;