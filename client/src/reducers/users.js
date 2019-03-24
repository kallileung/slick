import {
    USER_ENTERS,
    USER_LEAVES,
    GETALL_REQUEST,
    GETALL_SUCCESS,
    GETALL_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE
} from '../actions/actionTypes.js';
import filter from 'lodash/filter';

export const usersReducer = (state = [], { type, payload }) => {
    switch (type) {
        case USER_ENTERS:
            return [ ...state, payload ];
        case USER_LEAVES:
            return filter( state, user => user.id !== payload.id );
        // todo verify the following switch cases are implemented correctly, may have errors due to conflicting code
        case GETALL_REQUEST:
            return {
                loading: true
            };
        case GETALL_SUCCESS:
            return {
                items: payload.users
            };
        case GETALL_FAILURE:
            return {
                error: payload.error
            };
        case DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map( user =>
                    user.id === payload.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter( user => user.id !== payload.id )
            };
        case DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map( user => {
                    if (user.id === payload.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: payload.error };
                    }

                    return user;
                } )
            };
        default:
            return state
    }
};

export const currentUserIdReducer = (state = 1, { type, payload }) => {
    switch (type) {
        case USER_ENTERS: {
            return payload.id;
        }
        default:
            return state;
    }
};

export function users(state = {}, action) {
    switch (action.type) {
        case GETALL_REQUEST:
            return {
                loading: true
            };
        case GETALL_SUCCESS:
            return {
                items: action.users
            };
        case GETALL_FAILURE:
            return {
                error: action.error
            };
        case DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map( user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter( user => user.id !== action.id )
            };
        case DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map( user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                } )
            };
        default:
            return state
    }
}
