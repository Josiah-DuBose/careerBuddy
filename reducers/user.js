export const initialState = {
    profile: null,
};

const types = {
    UPDATE_USER: 'UPDATE_USER',
};

export const actions = {
    updateUser: (value) => ({ type: types.UPDATE_USER, value }),
};

export const getUser = state => state?.user?.profile;

export const reducer = ((state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_USER:
            console.log('user', action?.value);
            return {
                ...state,
                profile: action?.value,
            };
        default:
            return state;
    }
});

export default reducer;
