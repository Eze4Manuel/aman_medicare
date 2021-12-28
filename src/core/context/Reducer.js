import Actions from './ReducerAction';
import { updateUser } from './StoreManager';

export default function Reducer(state, action) {
   switch (action.type) {
      case Actions.user.set:
         return updateUser(action, state);
      default:
         return state;
   }
}