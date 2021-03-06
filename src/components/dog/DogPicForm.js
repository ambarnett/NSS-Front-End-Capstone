import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { DogContext } from './DogProvider'
import axios from 'axios'
import './Dog.css'

export const DogPicForm = () => {
    const { getDogById, addDogImage } = useContext(DogContext)
    const [imageSelected, setImageSelected] = useState("")
    const [dog, setDog] = useState({})
    const { dogId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getDogById(dogId)
            .then((res) => {
                setDog(res)
            })
    })

    const handleAddFile = () => {
        if(imageSelected) {
        console.log("im here", imageSelected)
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "iyeycu2e")
        axios.post("https://api.cloudinary.com/v1_1/dygcp9hyj/image/upload", formData)
        .then((res) => {
            const dogImgObj = {
                imgURL: res.data.secure_url,
                dogId: parseInt(dogId)
            }
            addDogImage(dogImgObj)
        })
        .then(history.push(`/dogs/detail/${dogId}`))
    } else {
        window.alert("please select and image to upload")
    }
}

    return (
        <>
            <form className="form submit_pic">
                <h2>Choose Your Image to Upload</h2>
                <input
                    type="file"
                    onChange={(event) => {
                        setImageSelected(event.target.files[0]);
                    }}
                ></input>

                <button className="btn" onClick={handleAddFile}>
                    Upload Image
                </button>
                <button className="btn" onClick={() => {history.push(`/dogs/detail/${dogId}`)}}>Cancel
                </button>
            </form>
        </>
    )
}