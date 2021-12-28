import Action from './actions';

export default function Reducer(state, action) {
    switch (action.type) {
        case Action.status.loading:
            return {...state, status: Action.status.loading}
        default:
            return state;
    }
}