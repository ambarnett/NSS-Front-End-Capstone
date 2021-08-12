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
    const { getDogById, deleteDog, dogImages, getDogImage, dogNotes, getDogNotes } = useContext(DogContext)
    const { getHabitById, habits } = useContext(HabitContext)
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
        <section className="dog">

            <h3 className="dog__name">{dog.name}</h3>
            <div className="dog__image">Dog Image Goes Here {
                dogImages.filter(dogImage => dogImage.dogId === parseInt(dogId)).map(filteredImage => (<img src={filteredImage.imgURL}/>))
            }</div>
            <div className="dog__breed">Breed: {dog.breed}</div>
            <div className="dog__age">Age: {dog.age}</div>
            <div className="dog__commands">Known Commands: {
                knownCommands.filter(knownCommand => knownCommand.dogId === parseInt(dogId)).map(filteredCommand => (<div>{filteredCommand.command?.name}</div>))
            }</div>
            <div className="dog__tricks">Known Tricks: {
                knownTricks.filter(knownTrick => knownTrick.dogId === parseInt(dogId)).map(filteredTrick => (<div>{filteredTrick.trick?.name}</div>))
            }</div>
            <div className="dog__habits">Known Habits: {
                knownHabits.filter(knownHabit => knownHabit.dogId === parseInt(dogId)).map(filteredHabit => (<div>{filteredHabit.habit?.name}</div>))
            }</div>
            <button className="bt" onClick={() => { history.push(`/dogs/image/${dog.id}`) }}>Add picture</button>
            <button className="delete__dog__button" onClick={handleDelete}>Remove Dog</button>
            <button className="edit__dog__button" onClick={() => { history.push(`/dogs/edit/${dog.id}`) }}>Edit Dog</button>
            <AddHabitModal />
            <AddCommandModal />
            <AddTrickModal />
            <DogNotes />
            <div className="dog__notes">Notes: {
                dogNotes.filter(dogNote => dogNote.dogId === parseInt(dogId)).map(filteredNote => (<div>{filteredNote.content}</div>))
            }</div>
        </section>
    )
}
