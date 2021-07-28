import React, { useState, createContext } from 'react'

export const DogContext = createContext()

export const DogProvider = (props) => {
    const [dogs, setDogs] = useState([])

    const getDogs = () => {
        return fetch("http://localhost:8088/dogs?_expand=knownCommands&_expand=knownTricks&_expand=knownHabits")
        .then(res => res.json())
        .then(setDogs)
    }

    const addDog = (dogObj) => {
        return fetch("http://localhost:8088/dogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogObj)
        })
        .then(getDogs)
    }

    const getDogById = (id) => {
        return fetch(`http://localhost:8088/dogs/${id}?_expand=knownCommands&_expand=knownTricks&_expand=knownHabits`)
        .then(res => res.json())
    }

    const deleteDog = (dogId) => {
        return fetch(`http:localhost:8088/dogs/${dogId}`, {
            method: "DELETE"
        })
        .then(getDogs)
    }
    return (
        <DogContext.Provider value={{
            dogs, getDogs, addDog, getDogById, deleteDog
        }}>
            {props.children}
        </DogContext.Provider>
    )
} 