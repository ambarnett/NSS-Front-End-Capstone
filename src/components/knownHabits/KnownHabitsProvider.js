import React, { useState, createContext } from "react"

export const KnownHabitsContext = createContext()

export const KnownHabitsProvider = (props) => {
    const [knownHabits, setKnownHabits] = useState([])

    const getKnownHabits = () => {
        return fetch("http://localhost:8088/knownHabits?_expand=dog&_expand=habit")
        .then(res => res.json())
        .then(setKnownHabits)
    }

    const addKnownHabits = noHabObj => {
        return fetch("http://localhost:8088/knownHabits", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(noHabObj)
        })
        .then(res => res.json())
    }

    const getKnownHabitsById = id => {
        return fetch(`http://localhost:8088/knownHabits/${id}?_expand=dog&_expand=habit`)
        .then(res => res.json())
    }

    const removeKnownHabit = (knownHabitId) => {
        return fetch(`http://localhost:8088/knownHabits/${knownHabitId}`, {
            method: "DELETE"
        })
        .then(getKnownHabits)
    }

    return (
        <KnownHabitsContext.Provider value={{
            knownHabits, getKnownHabits, getKnownHabitsById, addKnownHabits, removeKnownHabit
        }}>
            {props.children}
        </KnownHabitsContext.Provider>
    )
}
