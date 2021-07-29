import React, { useState, createContext } from 'react'

export const HabitContext = createContext()

export const HabitProvider = (props) => {
    const [habits, setHabits] = useState ([])

    const getHabits = () => {
        return fetch("http://localhost:8088/habits?_embed=knownHabits")
        .then(res => res.json())
        .then(setHabits)
    }

    const addHabit = (habitObj) => {
        return fetch("http://localhost:8088/habits", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(habitObj)
        })
        .then(getHabits)
    }

    const getHabitById = (id) => {
        return fetch(`http://localhost:8088/habits/${id}`)
        .then(res => res.json())
    }

    return (
        <HabitContext.Provider value={{
            habits, getHabits, addHabit, getHabitById
        }}>
            {props.children}
        </HabitContext.Provider>
    )
}