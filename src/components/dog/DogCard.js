import React from 'react'
import "./Dog.css"
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const DogCard = ({ dog }) => {
    const history = useHistory()
    return (
        <section className="dog">
            //import thumbnail image of dog here
            <div className="dog_thumbnail_img"></div>
            <h3 className="dog__name">
                <Link to={`/dogs/detail/${dog.id}`}>
                    {dog.name}
                </Link>
                <button className="edit__dog__button" onClick={() => { history.push(`/dogs/edit/${dog.id}`) }}>Edit Dog</button>
                <button className="add__dog__pic__button" onClick={() => { history.push(`/dogs/image/${dog.id}`)}}>Add picture</button>
            </h3>
        </section>
    )
}