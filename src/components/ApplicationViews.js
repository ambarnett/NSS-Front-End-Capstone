import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { DogList } from './dog/DogList'
import { DogProvider } from './dog/DogProvider'
import { DogForm } from './dog/DogForm'
import { DogDetail } from './dog/DogDetail'
import { DogPicForm } from './dog/DogPicForm'
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
                            <KnownHabitsProvider>
                                <KnownCommandsProvider>
                                    <KnownTricksProvider>
                                        <Route exact path="/home">
                                            <Home />
                                            <DogList />
                                        </Route>
                                        <Route exact path="/dogs/image/:dogId(\d+)">
                                            <DogPicForm />
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
                                    </KnownTricksProvider>
                                </KnownCommandsProvider>
                            </KnownHabitsProvider>
                        </TrickProvider>
                    </CommandProvider>
                </HabitProvider>
            </DogProvider>
        </>
    )
}