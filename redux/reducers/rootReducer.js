import { combineReducers } from 'redux';
import userState from './userState';
import { HYDRATE } from 'next-redux-wrapper';
import workspaceState from './workspaceState';

const rootReducer = (state, action) => {
    if(action.type === HYDRATE){
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        userState:userState,
        workspaceState: workspaceState
    })(state, action);
}

export default rootReducer;