import { initialState } from './Store';
import Actions from './ReducerAction';

// Set the app state
/**
 * 
 * @param {string} key The reducer action
 * @param {object} state The store state
 * @param {object} action The store action
 * @returns The update store state
 */
export function set(key, state, action = null) {
    switch(key) {
        case Actions.user.set:
            return updateUser(action, state);
        case Actions.store.reset:
            return resetApp(state);
        case Actions.msgs.set:
            return setMessage(action, state);
        case Actions.msgs.unset:
            return removeReadMessages(action, state);
        case Actions.msgs.reset:
            return clearMessages()
        default:
            return state;
    }
}

// Add new alert messsage
export function setMessage(action, state){
    const {msg} = action.payload;
    const msgs = state.msgs.concat(msg);
    return {...state, msgs};
}

// Removes messages of a particular type that has been read
export function removeReadMessages(action, state){
    const {type} = action.payload;
    const msgs = state.msgs.filter((msg) => msg.type !== type);
    return {...state, msgs};
}

// Removes all messages
export function clearMessages(state){
    return {...state, msgs: []};
}

// Update user data
export function updateUser(action, state){
    const { user } = action.payload;
    // prevent null spread error
    let update = state?.user ? {...state.user, ...user} : user;
    return {...state, user: update};
}

// Reset the app state
export function resetApp(state){
    return {...state, ...initialState};
}

