import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { DogContext, DogProvider } from './DogProvider'
import "./Dog.css"

export const DogForm = () => {
    const { addDog, getDogById, editDog } = useContext(DogContext)
    // const { commands, getCommands } = useContext(CommandContext)
    // const { tricks, getTricks } = useContext(TrickContext)
    // const { habits, getHabits } = useContext(HabitContext)

    const [dog, setDog] = useState({
        name: "",
        breed: "",
        age: null,
        // STRETCH GOAL = ADD PICTURE 
    })

    const [isLoading, setIsLoading] = useState(true)

    const { dogId } = useParams()

    const history = useHistory()

    const handleControlledInputChange = (evt) => {
        const newDog = { ...dog }
        newDog[evt.target.id] = evt.target.value
        setDog(newDog)
    }

    const handleClickSaveDog = (evt) => {
        evt.preventDefault()
        if (dog.name === "") {
            window.alert("FILL OUT THE FORM COMPLETELY!!! ALSO MAKE A BETTER MESSAGE")
        } else {
            if (dogId) {
                editDog({
                    id: dog.id,
                    name: dog.name,
                    breed: dog.breed,
                    age: dog.age,
                    knownCommandsId: dog.knownCommandsId,
                    knownTricksId: dog.knownTricksId,
                    knownHabitsId: dog.knownHabitsId
                })
                .then(() => history.push(`/dogs/detail/${dog.id}`))
            } else {
                const newDog = {
                    name: dog.name,
                    breed: dog.breed,
                    age: parseInt(dog.age),
                    ownerId: parseInt(sessionStorage.getItem("charlies_user")),
                    knownCommandsId: parseInt(dog.knownCommandsId),
                    knownTricksId: parseInt(dog.knownTricksId),
                    knownHabitsId: parseInt(dog.knownHabitsId)
                }
                addDog(newDog)
                    .then(() => history.push("/"))
            }
        }
    }

    useEffect(() => {
        if(dogId){
            getDogById(dogId)
            .then(dog => {
                setDog(dog)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="dogForm">
            <h2 className="dogForm__title">{dogId ? <>Edit Dog</> : <>New Dog</>}</h2>
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
            <button className="btn btn-primary" disabled={isLoading} onClick={handleClickSaveDog}>
                {dogId ? <>Update Dog</> : <>Save Dog</>}
            </button>
            <button className="btn btn-primary" onClick={ () => dogId ? history.push(`/dogs/detail/${dogId}`) : history.push('/home')}>
                Cancel
            </button>
        </form>
    )

}
