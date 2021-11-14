import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    alerts: [],
    currentRoute: 'login',
    routeNames: [
        'login',
        'create',
        'dashboard',
    ],
    drawerOpen: false,
};

const types = {
    ADD_ALERT: 'ADD_ALERT',
    DISMISS_ALERT: 'DISMISS_ALERT',
    TOGGLE_DRAWER: 'TOGGLE_DRAWER',
};

export const actions = {
    addAlert: (value) => ({ type: types.ADD_ALERT, value }),
    dismissAlert: (value) => ({ type: types.DISMISS_ALERT, value }),
    toggleDrawer: () => ({ type: types.TOGGLE_DRAWER }),
};

export const getAlerts = state => state?.general?.alerts;
export const getCurrentRoute = state => state?.general?.currentRoute;
export const getDrawerOpen = state => state?.general?.drawerOpen;

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
            console.log('ADD_ALERT', newAlert)
            return {
                ...state,
                alerts: [...state.alerts, newAlert],
            };
        case types.DISMISS_ALERT:
            console.log('DISMISS_ALERT', action.value)
            const updatedAlerts = _.filter(_.get(state, 'alerts'), alert => alert.id !== action?.value);
            return {
                ...state,
                alerts: updatedAlerts,
            };
        case types.TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: !state.drawerOpen,
            };
        default:
            return state;
    }
});

export default reducer;
