import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { DogContext } from "./DogProvider"
import { DogCard } from './DogCard'
import './Dog.css'

export const DogList = () => {
    const { dogs, getDogs } = useContext(DogContext)

    const history = useHistory()

    const currentUserId = parseInt(sessionStorage.getItem("charlies_user"))

    useEffect(() => {
        getDogs()
    }, [])

    return (
        <>
            <div className="title_text">
                <h2 className="dog-title">Dogs</h2>
                <button className="edit__dog__button" onClick={() => { history.push("/dogs/create") }}>
                    Add Dog
                </button>
            </div>
            <div className="dogs" key={dogs.id}>
                {
                    dogs.map(dog => {
                        if (currentUserId === dog.ownerId) {
                            return <DogCard key={dog.id} dog={dog} />
                        }
                    })
                }
            </div>
        </>
    )
}