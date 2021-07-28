import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { DogList } from './dog/DogList'
import { DogProvider } from './dog/DogProvider'
import { DogForm } from './dog/DogForm'
import { DogDetail } from './dog/DogDetail'
import { HabitProvider } from './habits/HabitProvider'
import { KnownHabitsProvider } from './knownHabits/KnownHabitsProvider'

export const ApplicationViews = () => {
    return (
        <>
            <DogProvider>
                <HabitProvider>
                    <KnownHabitsProvider>
                        <Route exact path="/">
                            <Home />
                            <DogList />
                        </Route>
                        <Route exact path="/dogs/detail/:dogId(\d+)">
                            <DogDetail />
                        </Route>
                        <Route exact path="/dogs/create">
                            <DogForm />
                        </Route>
                    </KnownHabitsProvider>
                </HabitProvider>
            </DogProvider>
        </>
    )
}