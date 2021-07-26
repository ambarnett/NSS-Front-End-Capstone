import React from 'react'
import { Route, Router } from 'react-router-dom'
import { DogList } from './dog/DogList'
import { DogProvider } from './dog/DogProvider'
import { Home } from './Home'

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <DogProvider>
                <Route exact path="/dogs">
                    <DogList />
                </Route>
            </DogProvider>
        </>
    )
}