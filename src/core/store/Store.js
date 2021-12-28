import * as React from 'react';
import reducer from './reducer';

const AppContext = React.createContext();
//for dispatching action outside of the store
export let dispatcher; 
//for accessing the State/store outside
export let appState; 

// App initial State
export const initialState = {
  // the user data
  user: null,
  // the state of the app
  status: null
};

// React component to wrap the app
export const AppProvider = (props) => {
  //creating a state
  const [state, dispatch] = React.useReducer(reducer, initialState);

  appState = state;
  dispatcher = dispatch;
  return (
    <AppContext.Provider value={{state}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
