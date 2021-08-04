import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { DogContext } from "./DogProvider"
// import { HabitContext } from "../habits/HabitProvider"
import { DogCard } from './DogCard'
import './Dog.css'

export const DogList = () => {
    const { dogs, getDogs } = useContext(DogContext)

    const history = useHistory()

    useEffect(() => {
        getDogs()
    }, [])

    return (
        <>
            <h2>Dogs</h2>
            <button onClick={() => { history.push("/dogs/create") }}>
                Add Dog
            </button>
            <div className="dogs" key={dogs.id}>
                {
                    dogs.map(dog => {
                        return <DogCard key={dog.id} dog={dog} />
                    })
                }
            </div>
        </>
    )
}