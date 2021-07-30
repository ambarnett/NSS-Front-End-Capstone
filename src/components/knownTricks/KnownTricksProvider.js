import React, { useState, createContext } from 'react'

export const KnownTricksContext = createContext()

export const KnownTricksProvider = (props) => {
    const [knownTricks, setKnownTricks] = useState([])

    const getKnownTricks = () => {
        return fetch(`http://localhost:8088/knownTricks?_expand=dog&_expand=trick`)
        .then(res => res.json())
        .then(setKnownTricks)
    }

    const addKnownTricks = noTrickObj => {
        return fetch(`http://localhost:8088/knownTricks`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(noTrickObj)
        })
        .then(res => res.json())
    }

    const getKnownTricksById = id => {
        return fetch(`http://localhost:8088/knownTricks/${id}?_expand=dog&_expand=trick`)
        .then(res => res.json())
    }

    return (
        <KnownTricksContext.Provider value={{
            knownTricks, getKnownTricks, getKnownTricksById, addKnownTricks
        }}>
            {props.children}
        </KnownTricksContext.Provider>
    )
}