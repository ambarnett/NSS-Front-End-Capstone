import React, { useState, createContext } from 'react'

export const CommandsContext = createContext()

export const CommandProvider = (props) => {
    const [commands, setCommands] = useState([])

    const getCommands = () => {
        return fetch("http://localhost:8088/commands?_embed=knownCommands")
        .then(res => res.json())
        .then(setCommands)
    }

    const addCommand = (cmdObj) => {
        return fetch("http://localhost:8088/commands", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cmdObj)
        })
        .then(getCommands)
    }

    const getCommandById = (id) => {
        return fetch(`http://localhost:8088/commands/${id}`)
        .then(res => res.json())
    }

    const removeCommand = (commandId) => {
        return fetch(`http://localhost:8088/commands/${commandId}`, {
            method: "DELETE"
        })
            .then(getCommands)
    }

    return (
        <CommandsContext.Provider value={{
            commands, getCommands, addCommand, getCommandById, removeCommand
        }}>
            {props.children}
        </CommandsContext.Provider>
    )
}