
import React from 'react';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Authenticated from './pages/index';

//providers

import { AppProvider } from './core/context/Store';
import { AuthProvider } from './core/hooks/useAuth';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <NotificationsProvider position="top-right" zIndex={2077}>
          <AppProvider>
            <Authenticated />
          </AppProvider>
        </NotificationsProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}


export default App;
