import React, { useContext, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import './Commands.css'
import { CommandsContext } from './CommandProvider';
import { CommandModalForm } from './CommandModalForm';
import { KnownCommandsContext } from '../knownCmds/KnownCommandsProvider';
import { DogContext } from '../dog/DogProvider';
import { useHistory, useParams } from 'react-router-dom';

export const AddCommandModal = () => {
    const { commands, getCommands, removeCommand } = useContext(CommandsContext)
    const { knownCommands, addKnownCommands, removeKnownCommand } = useContext(KnownCommandsContext)
    const { dogs, getDogById } = useContext(DogContext)
    const [dog, setDog] = useState({})
    const [checkedCommandId, setCheckedCommandId] = useState({})
    const [checkedKnownCommandId, setCheckedKnownCommandId] = useState({})
    const history = useHistory()
    const { dogId } = useParams()

    useEffect(() => {
        getDogById(dogId)
            .then((res) => {
                setDog(res)
            })
    }, [])

    const handleAddKnownCommand = () => {
            if(isNaN(checkedCommandId)) {
            window.alert("please make a selection")
        } else {
            addKnownCommands({
                dogId: parseInt(dogId),
                commandId: checkedCommandId
            })
            .then(refreshPage)
            console.log(dogId)
        }
    }

    const handleRemoveKnownCommand = () => {
        removeKnownCommand(checkedKnownCommandId)
    }

    const handleRemoveCommand = () => {
        removeCommand(checkedCommandId)
    }

    const refreshPage = () => {
        window.location.reload()
    }

    useEffect(() => {
        getCommands()
    }, [])

    return (
        <Popup
            trigger={<button className="button"> Add/Remove Command </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Select command from list or click below to create a new command </div>
                    <div className="content" value={commands.id}>
                        {commands.map(command => {
                            return <div>
                                <input type="radio" name="radio" key={command.id} command={command} value={command.id} onChange={() => setCheckedCommandId(command.id)} />
                                <label htmlFor="radio">{command.name}</label>
                                <button className="close" onClick={() => {
                                    removeCommand(command.id);
                                    refreshPage()
                                }}>
                                    &times;
                                </button>
                            </div>
                        })}
                    </div>
                    <div className="actions">
                        <button className="addCommand" onClick={() => {
                            handleAddKnownCommand();
                        }}>
                            Add Selected Command(s)
                        </button>
                        <Popup trigger={<button className="button">Remove Known Command</button>} nested position="top center">
                            {knownCommands.map(kc => {
                                return (
                                    (parseInt(dogId) === kc.dogId) ?
                                        <div>
                                            <input type="radio" name="radio" key={kc.id} kc={kc} value={kc.id} onChange={() => setCheckedKnownCommandId(kc.id)} />
                                            <label htmlFor="radio">{kc?.command?.name}</label>
                                        </div>
                                        : <></>)
                            })}
                            <button className="removeCommand" onClick={() => {
                                handleRemoveKnownCommand();
                                refreshPage()
                            }}>
                                Remove Command(s)
                            </button>
                        </Popup>
                        <Popup
                            trigger={<button className="button"> Create New Command </button>}
                            position="top center"
                            nested
                        >
                            {CommandModalForm}
                        </Popup>
                        <button
                            className="button"
                            onClick={() => {
                                console.log('modal closed ');
                                close();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}