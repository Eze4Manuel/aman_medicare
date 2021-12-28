import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Overview from './overview';
import { routes } from './config';


const App = (props) => {

  const renderedRoutes = routes.map(AppRoute =>
    <Route key={AppRoute.link} path={AppRoute.link} element={<AppRoute.Component />}> </Route>
  )
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path='/' element={<Overview />} />
          {renderedRoutes}
        </Routes>
      </Fragment>
    </Router>
  );
}
export default App;
