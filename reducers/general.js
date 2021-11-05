export const initialState = {
    alerts: [],
    login: true,
};

const types = {
    UPDATE_ALERT: 'UPDATE_ALERT',
    SET_LOGIN_MODE: 'SET_LOGIN_MODE'
};

export const actions = {
    updateAlert: (value) => ({ type: types.UPDATE_ALERT, value }),
    setLoginMode: (value) => ({ type: types.SET_LOGIN_MODE, value }),
};

export const getAlerts = state => state?.user?.alerts;
export const getLoginMode = state => state?.user?.login;

export const reducer = ((state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_ALERT:
            return {
                ...state,
                alerts: action?.value,
            };
        case SET_LOGIN_MODE:
            return {
                ...state,
                alerts: action?.value,
            };
        default:
            return state;
    }
});

export default reducer;
