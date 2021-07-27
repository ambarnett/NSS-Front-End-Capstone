import React, { useState, createContext } from 'react'

export const CommandContext = createContext()

export const CommandProvider = (props) => {
    const [commands, setCommands] = useState([])

    const getCommands = () => {
        return fetch("http://localhost:8088/commands")
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

    return (
        <CommandContext.Provider value={{
            commands, getCommands, addCommand
        }}>
            {props.children}
        </CommandContext.Provider>
    )
}