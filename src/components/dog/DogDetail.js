import React, { useContext, useEffect, useState } from 'react'
import { DogContext } from './DogProvider'
import { useParams, useHistory } from 'react-router-dom'
import './Dog.css'
import { HabitContext } from '../habits/HabitProvider'
import { KnownHabitsContext } from '../knownHabits/KnownHabitsProvider'
import { KnownCommandsContext } from '../knownCmds/KnownCommandsProvider'
import { KnownTricksContext } from '../knownTricks/KnownTricksProvider'

export const DogDetail = () => {
    const { getDogById, deleteDog } = useContext(DogContext)
    const { getHabitById, habits } = useContext(HabitContext)
    const { getKnownHabits, knownHabits } = useContext(KnownHabitsContext)
    const { getKnownCommands, knownCommands } = useContext(KnownCommandsContext)
    const { getKnownTricks, knownTricks } = useContext(KnownTricksContext)

    const history = useHistory()

    const [dog, setDog] = useState({})
    const [habit, setHabit] = useState({})
    const [knownHabit, setKnownHabit] = useState({})

    const { dogId } = useParams()
    const { habitId } = useParams()
    const { knownHabitId } = useParams()

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
        getHabitById(dogId)
            .then((res) => {
                setHabit(res)
            })
    }, [])

    const handleDelete = () => {
        deleteDog(dog.id)
            .then(() => {
                history.push("/dogs")
            })
    }
    console.log(dog?.id)
    return (
        <section className="dog">
            <h3 className="dog__name">{dog.name}</h3>
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
            <button className="delete__dog__button" onClick={handleDelete}>Remove Dog</button>
        </section>
    )
}
