import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticate } from '../../auth'

const PrivateRoute = ({ children }) => {
    return (
        <Route render={() => {
            return isAuthenticate() && isAuthenticate().user.role === 0 ? children : <Redirect to={'/signin'} />
        }} />

    )
}

export default PrivateRoute
