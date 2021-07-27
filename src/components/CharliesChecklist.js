import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Register } from './auth/Register'
import { Login } from './auth/Login'
import "./CharliesChecklist.css"
import { NavBar } from './nav/NavBar'
import { ApplicationViews } from './ApplicationViews'

export const CharliesChecklist = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("charlies_user")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    )
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)