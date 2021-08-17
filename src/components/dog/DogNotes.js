import React, { useContext, useEffect, useState } from 'react'
import { DogContext } from './DogProvider'
import "./Dog.css"
import { useHistory, useParams } from 'react-router'

export const DogNotes = () => {
    const { getDogById, addDogNotes } = useContext(DogContext)
    const [note, setNote] = useState("")
    const [dog, setDog] = useState({})
    const { dogId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getDogById(dogId)
            .then((res) => {
                setDog(res)
            })
    }, [])

    
    const handleInputChange = (e) => {
        const newNote = { ...note }
        newNote[e.target.id] = e.target.value
        setNote(newNote)
    }
    
    const handleClickAddNote = (e) => {
        e.preventDefault()
        if (note.content === "") {
            window.alert("Cannot submit and empty note")
        } else {
            const newNote = {
                content: note.content,
                dogId: parseInt(dogId)
            }
            addDogNotes(newNote)
            .then(history.push(`/dogs/detail/${dogId}`))
        }
    }

    return (
        <>
            <form className="dog_notes">
                <input type="textarea" id="content" className="note-area" placeholder="Enter notes here..." value={note.content} onChange={handleInputChange} />
            </form>
            <button className="note__btn" onClick={handleClickAddNote}>Add Note</button>
        </>
    )
}