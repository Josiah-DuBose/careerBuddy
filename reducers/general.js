import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    alerts: [],
    routeNames: [
        'Dashboard',
    ],
    index: 0,
};

const types = {
    ADD_ALERT: 'ADD_ALERT',
    DISMISS_ALERT: 'DISMISS_ALERT'
};

export const actions = {
    addAlert: (value) => ({ type: types.ADD_ALERT, value }),
    dismissAlert: (value) => ({ type: types.DISMISS_ALERT, value }),
};

export const getAlerts = state => state?.general?.alerts;
export const getIndex = state => state?.general?.index;
export const getRouteNames = state => state?.general?.routeNames;

export const reducer = ((state = initialState, action = {}) => {
    switch (action.type) {
        case types.ADD_ALERT:
            const { message, status } = action?.value;

            const newAlert = {
                message,
                status,
                timestamp: new Date().getTime(),
                id: uuidv4(),
            };
            return {
                ...state,
                alerts: [...state.alerts, newAlert],
            };
        case types.DISMISS_ALERT:
            const updatedAlerts = _.filter(
                _.get(state, 'alerts'), alert => alert.id !== action?.value
            );
            return {
                ...state,
                alerts: updatedAlerts,
            };
        default:
            return state;
    }
});

export default reducer;
