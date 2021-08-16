import React, { useContext, useEffect, useState } from 'react'
import { CommandsContext } from './CommandProvider'
import { useHistory, useParams } from 'react-router-dom'
import '../../components/modal.css'

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
        if (Object.entries(command).length === 0) {
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
        <form className="modalForm">
            <h2 className="modalForm__title">{commandId ? <>Edit Command</> : <>New Command</>}</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="name" required className="modal-form-control" placeholder="Command name" value={command.name} onChange={handleCommandChange} />
                </div>
            </fieldset>
            <div className="modal-form-button-pos">
                <button className="modal-form-button" disabled={isLoading} onClick={(evt) => { evt.preventDefault(); handleClickSaveCommand() }}>
                    {commandId ? <>Save Command</> : <>Add Command</>}
                </button>
            </div>
        </form>
    )
}