import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Home } from './home'
import { About } from './about'
import { AuthPage } from './AuthPage'

export const Routes = isAuthenticated => {
    /*if (isAuthenticated) {*/
        return (
            <>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Redirect to="/auth" component={ AuthPage } />
                </Switch>
            </>
        )
    //}
    //return (
        //<Switch>
        //    <Route exact path="/auth" component={AuthPage} />
        //    <Redirect to="/" component={Home} />
        //</Switch>
    /*)*/
}