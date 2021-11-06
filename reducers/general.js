export const initialState = {
    alerts: [],
};

const types = {
    UPDATE_ALERT: 'UPDATE_ALERT',

};

export const actions = {
    updateAlert: (value) => ({ type: types.UPDATE_ALERT, value }),
};

export const getAlerts = state => state?.user?.alerts;

export const reducer = ((state = initialState, action = {}) => {
    switch (action.type) {
        case types.UPDATE_ALERT:
            return {
                ...state,
                alerts: action?.value,
            };
        default:
            return state;
    }
});

export default reducer;
