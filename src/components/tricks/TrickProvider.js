import React, { useState, createContext } from 'react'

export const TrickContext = createContext()

export const TrickProvider = (props) => {
    const [tricks, setTricks] = useState([])

    const getTricks = () => {
        return fetch("http://localhost:8088/tricks?_embed=knownTricks")
            .then(res => res.json())
            .then(setTricks)
    }

    const addTrick = (trickObj) => {
        return fetch("http://localhost:8088/tricks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trickObj)
        })
            .then(getTricks)
    }

    const getTrickById = (id) => {
        return fetch(`http://localhost:8088/tricks/${id}`)
            .then(res => res.json())
    }

    const removeTrick = (trickId) => {
        return fetch(`http://localhost:8088/commands/${trickId}`, {
            method: "DELETE"
        })
            .then(getTricks)
    }

    return (
        <TrickContext.Provider value={{
            tricks, getTricks, addTrick, getTrickById, removeTrick
        }}>
            {props.children}
        </TrickContext.Provider>
    )
}