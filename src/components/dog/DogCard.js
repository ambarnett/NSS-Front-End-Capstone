import React from 'react'
import "./Dog.css"
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import dogOutLine from '../images/dog-outline.png'

export const DogCard = ({ dog }) => {
    const history = useHistory()
    return (
        <section className="container">
            <img className="img" src={dogOutLine} alt="dog outline" />
            <h3 className="container__text">
                <Link className="dog__name" to={`/dogs/detail/${dog.id}`}>
                    {dog.name}
                </Link>
                <button className="btn-dog" onClick={() => { history.push(`/dogs/edit/${dog.id}`) }}>Edit Dog</button>
            </h3>
        </section>
    )
}