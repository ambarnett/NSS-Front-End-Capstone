import React, { useContext, useEffect, useState } from 'react'
import { CommandsContext } from './CommandProvider'
import { useHistory, useParams } from 'react-router-dom'

export const CommandModalForm = () => {
    const { addCommand, getCommandById, updateCommand } = useContext(CommandsContext)
    const [command, setCommand] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { commandId } = useParams()
    const history = useHistory()

    const handleCommandChange = (evt) => {
        const newCommand = { ...command }
        newCommand[evt.target.id] = evt.target.value
        setCommand(newCommand)
    }

    const handleClickSaveCommand = () => {
        if (command.name === "") {
            window.alert("Please give the command a name")
        } else {
            setIsLoading(true)
            if (commandId) {
                updateCommand({
                    id: command.id,
                    name: command.name
                })
                    .then(() => history.push(`/commands/detail/${command.id}`))
            } else {
                addCommand({
                    name: command.name
                })
            }
        }
    }

    useEffect(() => {
        if (commandId) {
            getCommandById(commandId)
                .then(command => {
                    setCommand(command)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="commandForm">
            <h2 className="commandForm__title">{commandId ? <>Edit Command</> : <>New Command</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Command name: </label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Command name" value={command.name} onChange={handleCommandChange} />
                </div>
            </fieldset>
            <button className="btn btn-primary" disabled={isLoading} onClick={(evt) => { evt.preventDefault(); handleClickSaveCommand() }}>
                {commandId ? <>Save Command</> : <>Add Command</>}
            </button>
        </form>
    )
}