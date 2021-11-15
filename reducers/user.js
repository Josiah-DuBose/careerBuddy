export const initialState = {
    profile: null,
    userLoading: false,
};

const types = {
    UPDATE_USER: 'UPDATE_USER',
    USER_LOADING: 'USER_LOADING',
};

export const actions = {
    updateUser: (value) => ({ type: types.UPDATE_USER, value }),
    userLoading: (value) => ({ type: types.USER_LOADING, value }),
};

export const getUser = state => state?.user?.profile;
export const getUserLoading = state => state?.user?.userLoading;

export const reducer = ((state = initialState, action = {}) => {
    switch (action.type) {
        case types.UPDATE_USER:
            return {
                ...state,
                profile: action?.value,
            };
        case types.USER_LOADING:
            return {
                ...state,
                userLoading: action?.value,
            };
        default:
            return state;
    }
});

export default reducer;
