import React, { useContext, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import './Tricks.css'
import { TrickContext } from './TrickProvider';
import { TrickModalForm } from './TrickModalForm';
import { KnownTricksContext } from '../knownTricks/KnownTricksProvider';
import { DogContext } from '../dog/DogProvider';
import { useHistory, useParams } from 'react-router-dom';

export const AddTrickModal = () => {
    const { tricks, getTricks, removeTrick } = useContext(TrickContext)
    const { knownTricks, addKnownTricks, removeKnownTrick } = useContext(KnownTricksContext)
    const { dogs, getDogById } = useContext(DogContext)
    const [dog, setDog] = useState({})
    const [checkedTrickId, setCheckedTrickId] = useState({})
    const [checkedKnownTrickId, setCheckedKnownTrickId] = useState({})
    const history = useHistory()
    const { dogId } = useParams()

    useEffect(() => {
        getDogById(dogId)
            .then((res) => {
                setDog(res)
            })
    }, [])

    const handleAddKnownTrick = () => {
        if (Object.entries(checkedTrickId).length === 0) {
            window.alert("please make a selection")
        } else {
            addKnownTricks({
                dogId: parseInt(dogId),
                trickId: checkedTrickId
            })
                .then(refreshPage)
            console.log(dogId)
        }
    }

    const handleRemoveKnownTrick = () => {
        removeKnownTrick(checkedKnownTrickId)
    }

    const handleRemoveTrick = () => {
        removeTrick(checkedTrickId)
    }

    const refreshPage = () => {
        window.location.reload()
    }

    useEffect(() => {
        getTricks()
    }, [])

    return (
        <Popup
            trigger={<button className="button"> Add/Remove Trick </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Select Trick from list or click below to create a new Trick </div>
                    <div className="content" value={tricks.id}>
                        {tricks.map(trick => {
                            return <div>
                                <input type="radio" name="radio" key={trick.id} trick={trick} value={trick.id} onChange={() => setCheckedTrickId(trick.id)} />
                                <label htmlFor="radio">{trick.name}</label>
                                <button className="close" onClick={() => {
                                    removeTrick(trick.id);
                                    refreshPage()
                                }}>
                                    &times;
                                </button>
                            </div>
                        })}
                    </div>
                    <div className="actions">
                        <button className="addTrick" onClick={() => {
                            handleAddKnownTrick();
                        }}>
                            Add Selected Trick(s)
                        </button>
                        <Popup trigger={<button className="button">Remove Known Trick</button>} nested position="top center">
                            {knownTricks.map(kt => {
                                return (
                                    (parseInt(dogId) === kt.dogId) ?
                                        <div>
                                            <input type="radio" name="radio" key={kt.id} kt={kt} value={kt.id} onChange={() => setCheckedKnownTrickId(kt.id)} />
                                            <label htmlFor="radio">{kt?.trick?.name}</label>
                                        </div>
                                        : <></>)
                            })}
                            <button className="removeTrick" onClick={() => {
                                handleRemoveKnownTrick();
                                removeKnownTrick(knownTricks.id);
                                refreshPage()
                            }}>
                                Remove Trick(s)
                            </button>
                        </Popup>
                        <Popup
                            trigger={<button className="button"> Create New Trick </button>}
                            position="top center"
                            nested
                        >
                            {TrickModalForm}
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