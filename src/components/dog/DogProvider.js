import React, { useState, createContext } from 'react'

export const DogContext = createContext()

export const DogProvider = (props) => {
    const [dogs, setDogs] = useState([])
    const [dogImages, setDogImages] = useState([])
    const [dogNotes, setDogNotes] = useState([])

    const getDogs = () => {
        return fetch("http://localhost:8088/dogs?_embed=knownHabits_embed=knownCommands_embed=knownTricks")
        .then(res => res.json())
        .then(setDogs)
    }

    const addDog = (dogObj) => {
        return fetch("http://localhost:8088/dogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogObj)
        })
        .then(getDogs)
    }

    const getDogById = (id) => {
        return fetch(`http://localhost:8088/dogs/${id}`)
        .then(res => res.json())
    }

    const deleteDog = (dogId) => {
        return fetch(`http://localhost:8088/dogs/${dogId}`, {
            method: "DELETE"
        })
        .then(getDogs)
    }

    const editDog = (dog) => {
        return fetch(`http://localhost:8088/dogs/${dog.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dog)
        })
        .then(getDogs)
    }

    const getDogImage = () => {
        return fetch("http://localhost:8088/dogImages?_expand=dog")
        .then(res => res.json())
        .then(setDogImages)
    }

    const addDogImage = (dogImgObj) => {
        return fetch("http://localhost:8088/dogImages", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dogImgObj)
        })
        .then(getDogImage)
    }

    const removeImage = (imgId) => {
        return fetch(`http://localhost:8088/dogImages/${imgId}`, {
            method: "DELETE"
        })
        .then(getDogImage)
    }

    const getDogNotes = () => {
        return fetch("http://localhost:8088/dogNotes?_expand=dog")
        .then(res => res.json())
        .then(setDogNotes)
    }

    const addDogNotes = (dogNoteObj) => {
        return fetch("http://localhost:8088/dogNotes", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dogNoteObj)
        })
        .then(getDogNotes)
    }
    const removeNote = (noteId) => {
        return fetch(`http://localhost:8088/dogNotes/${noteId}`, {
            method: "DELETE"
        })
            .then(getDogNotes)
    }
    return (
        <DogContext.Provider value={{
            dogs, getDogs, addDog, getDogById, deleteDog, editDog, getDogImage, addDogImage, dogImages, removeImage, dogNotes, getDogNotes, addDogNotes, removeNote
        }}>
            {props.children}
        </DogContext.Provider>
    )
} 