import React from 'react'
import "./Dog.css"

export const DogCard = ({ dog }) => (
    <section className="dog">
        <h3 className="dog__name">{dog.name}</h3>
    </section>
)