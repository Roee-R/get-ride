import React from 'react';
import { Router, Route, Switch} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';

import AddNewRoutes from '../components/AddNewRoute';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import AddPassemgerPage from '../components/AddPassengerPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = ()=>(
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute exact path="/" component={LoginPage}/>
                <PrivateRoute exact path="/dashboard" component={DashboardPage}/>
                <PrivateRoute exact path="/newRoute" component={AddNewRoutes}/>
                <PrivateRoute exact path="/AddPassengerPage" component={AddPassemgerPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
)    

export default AppRouter;