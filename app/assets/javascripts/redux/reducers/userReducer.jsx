import {GET_USER_DATA, GET_USERS, GET_USERS_WITH_CLASS, GET_USERCLASSES} from './../types';

/**
 * Contains reducer for {@link redux/actions/user}.
 * @module redux/reducers/user
 */

const userReducer = (state = {
    userdata: null,
    users: [],
    userclasses: [],
}, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                userdata: action.payload
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case GET_USERS_WITH_CLASS:
            return {
                ...state,
                users: action.payload
            };
        case GET_USERCLASSES:
            return {
                ...state,
                userclasses: action.payload
            };
        default:
            return state
    }
};

export default userReducer;