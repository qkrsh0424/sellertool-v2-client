export default function userRedux(state = {
    isLoading: true,
    userInfo: null
}, action) {
    switch (action.type) {
        case 'USER_REDUX_SET_DATA':
            return action.payload;
        case 'USER_REDUX_CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'USER_REDUX_SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'USER_REDUX_SET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload
            }
        case 'USER_REDUX_CLEAR_USER_INFO':
            return {
                ...state,
                userInfo: null
            }
        default:
            return {
                ...state
            };
    }
}