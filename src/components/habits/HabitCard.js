import React from 'react'
import "./Habits.css"

export const HabitCard = ({ habit }) => (
    <div className="habit">
        <input id={habit} unchecked name="checkbox" type="checkbox" />
        <label htmlFor="checkbox">{habit.name}</label>
    </div>
)