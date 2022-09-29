import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import userRedux from './userRedux';
import workspaceRedux from './workspaceRedux';

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        userRedux: userRedux,
        workspaceRedux: workspaceRedux
    })(state, action);
}

export default rootReducer;