import React from 'react'
import "./Habits.css"

export const HabitCard = ({ habit }) => (
    <section className="habit">
        <div className="habit__name">{habit.name}</div>
    </section>
)