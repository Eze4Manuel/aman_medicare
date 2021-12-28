import { dispatcher } from './context/Store';
import Actions from './context/ReducerAction';
import Request from '../assets/utils/http-request';
import { CheckCircledIcon, CrossCircledIcon } from '@modulz/radix-icons';
import config from '../assets/utils/config';

const Helpers = {};

// get header config
Helpers.getHeaderConfig = (token) => {
    return {headers: {'Authorization': `Bearer ${token}`}}
};

// get header config
Helpers.getHeaderAccessControl = () => {
    return {headers: {'Access-Control-Allow-Origin': '*'}}
};


// Add use to the store state
Helpers.loadUserInStore = (user) => {
    dispatcher({type: Actions.user.set, payload: { user }});
};

// Get user from local storage
Helpers.GetUserFromStorage = () => {
    const key = config.key.user;
    const json = localStorage.getItem(key);
    // userData
    try {
        if (json && json !== null) {
            return JSON.parse(json);
        }
    } catch (e) {
        return null;
    }
};

// Add user to local storage
Helpers.SetUserInStorage = (user, set) => {
    set(user);
};

// Remove user data from local storage
Helpers.RemoveUserFromStorage = (set) => {
    set(null)
};

// Add use to the store state
Helpers.logout = (set) => {
    dispatcher({type: Actions.store.reset});
    set(null)
};

/**
 * authenticate user
 */
Helpers.signin = async (data) => {
    return await (await Request.post(config.api.login, data)).data.data;
}

/**
 * clear session if token has expired 
 */
Helpers.sessionHasExpired = (set, msg, setError) => {
    if (msg?.toUpperCase() === 'UNAUTHENTICATED') {
        Helpers.logout(set);
    } else {
        if (typeof setError === 'function') {
            setError(msg);
        }
    }
}

// Get error message from Http request
Helpers.GetHttpRequestErrorMsg = (e) => {
    return e?.response?.data?.err[0] 
        || e?.response?.data?.msg 
        || e?.message;
}

// Handles http request error message
Helpers.errorHandler = (set, e, notifications) => {
    const msg = Helpers.GetHttpRequestErrorMsg(e);
    if (msg?.toUpperCase() === "UNAUTHENTICATED") {
        Helpers.logout(set)
        return;
    }
    if (notifications) {
        Helpers.alert({notifications, icon: 'error', message: msg, color: 'red'})
    }
}

/**
 * icon - success | error
 * color - green | red
 * message - message
 */
Helpers.alert = ({notifications, icon, color, message }) => {
    notifications.showNotification({
        title: 'Notification',
        icon: icon === 'success' ? <CheckCircledIcon /> : <CrossCircledIcon />,
        color: color || 'green',
        message,
    });
}



export default Helpers;