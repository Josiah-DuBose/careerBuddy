import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    alerts: [],
};

const types = {
    ADD_ALERT: 'ADD_ALERT',
    DISMISS_ALERT: 'DISMISS_ALERT',
};

export const actions = {
    addAlert: (value) => ({ type: types.ADD_ALERT, value }),
    dismissAlert: (value) => ({ type: types.DISMISS_ALERT, value }),
};

export const getAlerts = state => state?.user?.alerts;

export const reducer = ((state = initialState, action = {}) => {
    switch (action.type) {
        case types.ADD_ALERT:
            const { message, status } = action?.value;

            const newAlert = {
                message,
                status,
                show: true,
                timestamp: new Date().getTime(),
                id: uuidv4(),
            };

            return {
                ...state,
                alerts: [...state.alerts, newAlert],
            };
        case types.DISMISS_ALERT:
            const currentAlerts = state?.alerts;
            _.set(_.find(currentAlerts, alert => alert.id === action?.value), 'show', false);
        default:
            return state;
    }
});

export default reducer;
