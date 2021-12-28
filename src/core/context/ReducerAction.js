const ReducerAction = {};

ReducerAction.store = {};
ReducerAction.store.reset = 'reset_app_state';

// for alert
ReducerAction.msgs = {};
ReducerAction.msgs.set = 'set_message';
ReducerAction.msgs.unset = 'unset_message';
ReducerAction.msgs.reset = 'reset_messages';

// for auth
ReducerAction.auth = {};
ReducerAction.auth.set = 'set_user';
ReducerAction.auth.unset = 'unset_user';

// for user
ReducerAction.user = {};
ReducerAction.user.set = 'update_user';


export default ReducerAction;
