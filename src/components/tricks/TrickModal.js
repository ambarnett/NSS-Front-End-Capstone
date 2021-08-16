import React, { useContext, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import './Tricks.css'
import '../../components/modal.css'
import { TrickContext } from './TrickProvider';
import { TrickModalForm } from './TrickModalForm';
import { KnownTricksContext } from '../knownTricks/KnownTricksProvider';
import { DogContext } from '../dog/DogProvider';
import { useHistory, useParams } from 'react-router-dom';

export const AddTrickModal = () => {
    const { tricks, getTricks, removeTrick } = useContext(TrickContext)
    const { knownTricks, addKnownTricks, removeKnownTrick, getKnownTricks } = useContext(KnownTricksContext)
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
        if (isNaN(checkedTrickId)) {
            window.alert("please make a selection")
        } else {
            addKnownTricks({
                dogId: parseInt(dogId),
                trickId: checkedTrickId
            })
                .then(getKnownTricks)
            console.log(dogId)
        }
    }

    const handleRemoveKnownTrick = () => {
        removeKnownTrick(checkedKnownTrickId)
        .then(getKnownTricks)
    }

    const handleRemoveTrick = () => {
        removeTrick(checkedTrickId)
        .then(getTricks)
    }

    useEffect(() => {
        getTricks()
    }, [])

    return (
        <Popup
            trigger={<button className="modal-button"> Add/Remove Trick </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="modal-button-inner" onClick={close}>
                        &times;
                    </button>
                    <div className="modal-header"> Select Trick from list or click below to create a new Trick </div>
                    <div className="modal-content" value={tricks.id}>
                        {tricks.map(trick => {
                            return <div>
                                <input type="radio" name="radio" key={trick.id} trick={trick} value={trick.id} onChange={() => setCheckedTrickId(trick.id)} />
                                <label htmlFor="radio">{trick.name}</label>
                                <button className="modal-button-close" onClick={
                                    handleRemoveTrick
                                }>
                                    &times;
                                </button>
                            </div>
                        })}
                    </div>
                    <div className="actions">
                        <button className="modal-button-inner" onClick={() => {
                            handleAddKnownTrick();
                        }}>
                            Add Selected Trick(s)
                        </button>
                        <Popup trigger={<button className="modal-button-close">Remove Known Trick</button>} nested position="top center">
                            {knownTricks.map(kt => {
                                return (
                                    (parseInt(dogId) === kt.dogId) ?
                                        <div>
                                            <input type="radio" name="radio" key={kt.id} kt={kt} value={kt.id} onChange={() => setCheckedKnownTrickId(kt.id)} />
                                            <label htmlFor="radio">{kt?.trick?.name}</label>
                                        </div>
                                        : <></>)
                            })}
                            <button className="modal-button-close" onClick={() => {
                                handleRemoveKnownTrick();
                            }}>
                                Remove Trick(s)
                            </button>
                        </Popup>
                        <Popup
                            trigger={<button className="modal-button-inner"> Create New Trick </button>}
                            position="top center"
                            nested
                        >
                            {TrickModalForm}
                        </Popup>
                        <button
                            className="modal-button-close"
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