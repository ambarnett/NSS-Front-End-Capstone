import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { DogList } from './dog/DogList'
import { DogProvider } from './dog/DogProvider'
import { DogForm } from './dog/DogForm'

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
                <Route exact path="/dogs/create">
                    <DogForm />
                </Route>
            </DogProvider>
        </>
    )
}