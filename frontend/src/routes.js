import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Login from "./components/Login";
import Menu from "./components/Menu";
import PageLayout from "./PageLayout";

export const history = createBrowserHistory();

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <PageLayout>
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Menu} />
                </PageLayout>
            </Switch>
        </Router>
    );
};

export default Routes;
