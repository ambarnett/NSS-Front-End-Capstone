import React, { useContext, useEffect, useState } from 'react'
import { DogContext } from './DogProvider'
import { useParams, useHistory } from 'react-router-dom'
import './Dog.css'

export const DogDetail = () => {
    const { getDogById, deleteDog } = useContext(DogContext)
    const history = useHistory()

    const [dog, setDog] = useState({})

    const {dogId} = useParams()

    useEffect(() => {
        getDogById(dogId)
        .then((res) => {
            setDog(res)
        })
    }, [])

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
            <div className="dog__commands">{dog.knownCommandsId?.name}</div>
            <div className="dog__tricks">{dog.knownTricksId?.name}</div>
            <div className="dog__habits">{dog.knowHabitsId?.name}</div>
            <button className="delete__dog__button" onClick={handleDelete}>Remove Dog</button>
        </section>
    )
}