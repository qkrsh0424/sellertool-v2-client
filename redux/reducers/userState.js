const userState = (state = {
    isLoading: true,
    info: null
}, action) => {
    switch (action.type) {
        case 'USERSTATE_SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'USERSTATE_SET_INFO':
            return {
                ...state,
                info: action.payload
            }
        default:
            return { ...state }
    }
};

export default userState;