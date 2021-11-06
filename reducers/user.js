export const initialState = {
    profile: null,
    userLoading: false,
    login: true,
};

const types = {
    UPDATE_USER: 'UPDATE_USER',
    USER_LOADING: 'USER_LOADING',
    SET_LOGIN_MODE: 'SET_LOGIN_MODE'
};

export const actions = {
    updateUser: (value) => ({ type: types.UPDATE_USER, value }),
    userLoading: (value) => ({ type: types.USER_LOADING, value }),
    setLoginMode: (value) => ({ type: types.SET_LOGIN_MODE, value }),
};

export const getUser = state => state?.user?.profile;
export const getUserLoading = state => state?.user?.userLoading;
export const getLoginMode = state => state?.user?.login;

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
        case types.SET_LOGIN_MODE:
            return {
                ...state,
                login: action?.value,
            };
        default:
            return state;
    }
});

export default reducer;
