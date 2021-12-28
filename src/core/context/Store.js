import React from 'react';
import AppReducer from './Reducer';

const AppContext = React.createContext();
export let dispatcher; //for dispatching action outside of the store
export let appState; //for accessing the State/store outside
// App initial State
export const initialState = {
    msgs: [], // notifications
    user: null,
};

// React component to wrap the app
export const AppProvider = (props) => {
  //creating a state
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  appState = state;
  dispatcher = dispatch;
  return (
    <AppContext.Provider value={{state}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
