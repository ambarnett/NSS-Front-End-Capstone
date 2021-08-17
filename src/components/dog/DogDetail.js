import React, { useContext, useEffect, useState } from 'react'
import { DogContext } from './DogProvider'
import { useParams, useHistory } from 'react-router-dom'
import './Dog.css'
import { HabitContext } from '../habits/HabitProvider'
import { KnownHabitsContext } from '../knownHabits/KnownHabitsProvider'
import { KnownCommandsContext } from '../knownCmds/KnownCommandsProvider'
import { KnownTricksContext } from '../knownTricks/KnownTricksProvider'
import { AddHabitModal } from '../habits/HabitModal'
import { AddCommandModal } from '../cmds/CommandModal'
import { AddTrickModal } from '../tricks/TrickModal'
import { DogNotes } from './DogNotes'

export const DogDetail = () => {
    const { getDogById, deleteDog, dogImages, getDogImage, dogNotes, getDogNotes, removeNote, removeImage } = useContext(DogContext)
    const { getKnownHabits, knownHabits } = useContext(KnownHabitsContext)
    const { getKnownCommands, knownCommands } = useContext(KnownCommandsContext)
    const { getKnownTricks, knownTricks } = useContext(KnownTricksContext)

    const history = useHistory()

    const [dog, setDog] = useState({})

    const { dogId } = useParams()

    useEffect(() => {
        getDogById(dogId)
            .then((res) => {
                setDog(res)
            })
    }, [])

    useEffect(() => {
        getKnownHabits()
            .then(getKnownCommands)
            .then(getKnownTricks)
    }, [])

    useEffect(() => {
        getDogImage()
    }, [])

    useEffect(() => {
        getDogNotes()
    }, [])

    const handleDelete = () => {
        deleteDog(dog.id)
            .then(() => {
                history.push("/home")
            })
    }
    return (
        <section className="dog__detail">
            <div className="dog__detail__main__card">
                <div className="dog__detail__image">{
                    dogImages.filter(dogImage => dogImage.dogId === parseInt(dogId)).map(filteredImage => (<div className="image-and-remove-btn">
                        <img src={filteredImage.imgURL} />
                        <button className="remove-img-btn" onClick={() => removeImage(filteredImage.id)}>Remove picture</button>
                    </div>
                    ))
                }
                    <div className="main__buttons">
                        <button className="add__pic__btn" onClick={() => { history.push(`/dogs/image/${dog.id}`) }}>Add picture</button>
                        <button className="edit__dog__button" onClick={() => { history.push(`/dogs/edit/${dog.id}`) }}>Edit Dog</button>
                    </div>
                </div>
                <div className="dog__detail__info">
                    <h3 className="dog__detail__name">{dog.name}</h3>
                    <div className="dog__detail__breed">Breed: {dog.breed}</div>
                    <div className="dog__detail__age">Age: {dog.age}</div>
                </div>
            </div>
            <div className="dog__detail__second__cards">
                <ul className="dog__detail__commands"><h2 className="commands__title">Known Commands:</h2> {
                    knownCommands.filter(knownCommand => knownCommand.dogId === parseInt(dogId)).map(filteredCommand => (<li>{filteredCommand.command?.name}</li>))
                }
                    <AddCommandModal />
                </ul>
                <ul className="dog__detail__tricks"><h2 className="tricks__title">Known Tricks:</h2> {
                    knownTricks.filter(knownTrick => knownTrick.dogId === parseInt(dogId)).map(filteredTrick => (<li>{filteredTrick.trick?.name}</li>))
                }
                    <AddTrickModal />
                </ul>
                <ul className="dog__detail__habits"><h2 className="habits__title">Known Habits:</h2> {
                    knownHabits.filter(knownHabit => knownHabit.dogId === parseInt(dogId)).map(filteredHabit => (<li>{filteredHabit.habit?.name}</li>))
                }
                    <AddHabitModal />
                </ul>
            </div>
            <div className="dog__detail__third__card">
                <div className="dog__notes__form__and__button">
                    <DogNotes />
                </div>
                <div className="dog__detail__notes__display">
                    <div className="lines"></div>
                    <ul className="dog__detail__notes__notepad">{
                        dogNotes.filter(dogNote => dogNote.dogId === parseInt(dogId)).map(filteredNote => (
                            <div className="note-list">
                                <li>
                                    <button className="remove-note-btn" onClick={
                                        () => removeNote(filteredNote.id)
                                    }>&times;
                                    </button>
                                    {filteredNote.content}
                                </li>
                            </div>
                        ))
                    }</ul>
                </div>
            </div>
            <button className="delete__dog__button" onClick={handleDelete}>Remove Dog</button>
        </section>
    )
}
