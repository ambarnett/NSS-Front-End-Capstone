import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { DogList } from './dog/DogList'
import { DogProvider } from './dog/DogProvider'
import { DogForm } from './dog/DogForm'
import { DogDetail } from './dog/DogDetail'
import { HabitProvider } from './habits/HabitProvider'
import { KnownHabitsProvider } from './knownHabits/KnownHabitsProvider'
import { CommandProvider } from './cmds/CommandProvider'
import { TrickProvider } from './tricks/TrickProvider'
import { KnownTricksProvider } from './knownTricks/KnownTricksProvider'
import { KnownCommandsProvider } from './knownCmds/KnownCommandsProvider'

export const ApplicationViews = () => {
    return (
        <>
            <DogProvider>
                <HabitProvider>
                    <CommandProvider>
                        <TrickProvider>
                            <KnownTricksProvider>
                                <KnownCommandsProvider>
                                    <KnownHabitsProvider>
                                        <Route exact path="/">
                                            <Home />
                                            <DogList />
                                        </Route>
                                        <Route exact path="/dogs/detail/:dogId(\d+)">
                                            <DogDetail />
                                        </Route>
                                        <Route path="/dogs/edit/:dogId(\d+)">
                                            <DogForm />
                                        </Route>
                                        <Route exact path="/dogs/create">
                                            <DogForm />
                                        </Route>
                                    </KnownHabitsProvider>
                                </KnownCommandsProvider>
                            </KnownTricksProvider>
                        </TrickProvider>
                    </CommandProvider>
                </HabitProvider>
            </DogProvider>
        </>
    )
}