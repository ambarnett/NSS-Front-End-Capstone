import React, { useContext, useEffect, useState } from 'react'
import { DogContext } from './DogProvider'
import { useParams, useHistory } from 'react-router-dom'
import './Dog.css'
import { HabitContext } from '../habits/HabitProvider'
import { KnownHabitsContext } from '../knownHabits/KnownHabitsProvider'

export const DogDetail = () => {
    const { getDogById, deleteDog } = useContext(DogContext)
    const { getHabits } = useContext(HabitContext)
    const { getKnownHabits } = useContext(KnownHabitsContext)

    const history = useHistory()

    const [dog, setDog] = useState({})
    const [habits, setHabit] = useState({})
    const [knownHabits, setKnownHabit] = useState({})

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
        getHabits(habitId)
            .then((res) => {
                setHabit(res)
            })
    }, [])

    useEffect(() => {
        getKnownHabits(knownHabitId)
            .then((res) => {
                setKnownHabit(res)
            })
    })

    const handleDelete = () => {
        deleteDog(dog.id)
            .then(() => {
                history.push("/dogs")
            })
    }

    return (
        <section className="dog">
            <h3 className="dog__name">{dog.name}</h3>
            <div className="dog__breed">{dog.breed}</div>
            <div className="dog__age">{dog.age}</div>
            {/* <div className="dog__commands">{dog.knownCommands?.name}</div> */}
            {/* <div className="dog__tricks">{dog.knownTricks?.name}</div> */}
            <div className="dog__habits">{() => {
                if (knownHabits.dogId === dog.id) { return (habits.name) }
            }}</div>
            <button className="delete__dog__button" onClick={handleDelete}>Remove Dog</button>
        </section>
    )
}