import React, { useState, createContext } from "react"

export const KnownCommandsContext = createContext()

export const KnownCommandsProvider = (props) => {
    const [knownCommands, setKnownCommands] = useState([])

    const getKnownCommands = () => {
        return fetch("http://localhost:8088/knownCommands?_expand=dog&_expand=command")
        .then(res => res.json())
        .then(setKnownCommands)
    }

    const addKnownCommands = noCmdObj => {
        return fetch("http://localhost:8088/knownCommands", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(noCmdObj)
        })
        .then(res => res.json())
    }

    const getKnownCommandsById = id => {
        return fetch(`http://localhost:8088/knownCommands/${id}?_expand=dog&_expand=command`)
        .then(res => res.json())
    }

    const removeKnownCommand = (knownCommandId) => {
        return fetch(`http://localhost:8088/knownCommands/${knownCommandId}`, {
            method: "DELETE"
        })
            .then(getKnownCommands)
    }

    return (
        <KnownCommandsContext.Provider value={{
            knownCommands, getKnownCommands, getKnownCommandsById, addKnownCommands, removeKnownCommand
        }}>
            {props.children}
        </KnownCommandsContext.Provider>
    )
}