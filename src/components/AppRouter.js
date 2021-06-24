import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { useHistory } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'
import Login from './Login'
import Chat from './Chat'

export default function AppRouter() {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)
    console.log(user)
    const history = useHistory()

    return (user ?
        (
            <Switch>
                {privateRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact />
                )}
                {/* wtf redirects dont work in production????? */}
                {/* <Redirect to={CHAT_ROUTE} /> */}
                {(() => { history.push(CHAT_ROUTE) })()}
                {/* "rewrites": [
                {
                    "source": "**",
                "destination": "/index.html"
                }
                ]
                rewrites are really important */}
                <Route path={'/'} component={Chat} exact />
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact />
                )}
                {/* <Redirect to={LOGIN_ROUTE} /> */}
                {(() => { history.push(LOGIN_ROUTE) })()}
                <Route path={'/'} component={Login} exact />
            </Switch>
        ))
};
