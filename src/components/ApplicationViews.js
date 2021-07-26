import React from 'react'
import { Route } from 'react-router-dom'
import { CharliesChecklist } from './CharliesChecklist'

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <CharliesChecklist />
            </Route>
        </>
    )
}