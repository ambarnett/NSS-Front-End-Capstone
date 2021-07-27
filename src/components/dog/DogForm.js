import React, { useContext, useEffect, useState } from 'react'
import { DogContext, DogProvider } from './DogProvider'
import  "./Dog.css"
import { useHistory } from 'react-router-dom'
import { fireEvent } from '@testing-library/dom'
import { LVAL_TYPES } from '@babel/types'

export const DogForm = () => {
    const { addDog } = useContext(DogContext)
    // const { commands, getCommands } = useContext(CommandsContext)
    // const { tricks, getTricks } = useContext(TricksContext)
    // const { habits, getHabits } = useContext(HabitsContext)

    const [dog, setDog] = useState({
        name: "",
        breed: "",
        age: null,
        location: "",
        knownCommandsId: null,
        knownTricksId: null,
        knownHabitsId: null
        // STRETCH GOAL = ADD PICTURE 
    })

    const history = useHistory()

    // useEffect(() => {
    //     this will get the commands, tricks, and habits
    // })

    const handleControlledInputChange = (evt) => {
        const newDog = {...dog}
        newDog[evt.target.id] = evt.target.value
        setDog(newDog)
    }

    const handleClickSaveDog = (evt) => {
        evt.preventDefault()
        const knownCommandsId = parseInt(dog.knownCommandsId)
        const knownTricksId = parseInt(dog.knownTricksId)
        const knownHabitsId = parseInt(dog.knownHabitsId)
        if(dog.name === "") {
            window.alert("FILL OUT THE FORM COMPLETELY!!! ALSO MAKE A BETTER MESSAGE")
        } else {
            const newDog = {
                name: dog.name,
                breed: dog.breed,
                age: parseInt(dog.age),
                location: dog.location,
                knownCommandsId: knownCommandsId,
                knownTricksId: knownTricksId,
                knownHabitsId: knownHabitsId
            }
            addDog(newDog)
            .then(() => history.push("/dogs"))
        }
    }

    return (
        <form className="dogForm">
            <h2 className="dogForm__title">New Dog</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Dog name: </label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Name" value={dog.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Dog breed: </label>
                    <input type="text" id="breed" required autoFocus className="form-control" placeholder="Breed" value={dog.breed} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age">Dog age: </label>
                    <input type="number" id="age" min="0" max="999" required autoFocus className="form-control" placeholder="Age" value={dog.age} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" id="location" required autoFocus className="form-control" placeholder="Location" value={dog.location} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
        </form>
    )

}
