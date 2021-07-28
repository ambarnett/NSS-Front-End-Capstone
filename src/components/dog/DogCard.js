import React from 'react'
import "./Dog.css"
import { Link } from 'react-router-dom'

export const DogCard = ({ dog }) => (
    <section className="dog">
        <h3 className="dog__name">
            <Link to={`/dogs/detail/${dog.id}`}>
                {dog.name}
            </Link>
        </h3>
    </section>
)