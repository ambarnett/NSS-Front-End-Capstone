import React, { useContext, useEffect, useState } from 'react'
import { HabitContext } from './HabitProvider'
import { useHistory, useParams } from 'react-router-dom'
import '../../components/modal.css'

export const HabitModalForm = () => {
    const { addHabit, getHabitById, updateHabit } = useContext(HabitContext)
    const [habit, setHabit] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { habitId } = useParams()
    const { dogId } = useParams()
    const history = useHistory()

    const handleHabitChange = (evt) => {
        const newHabit = { ...habit }
        newHabit[evt.target.id] = evt.target.value
        setHabit(newHabit)
    }

    const handleClickSaveHabit = () => {
        if (Object.entries(habit).length === 0) {
            window.alert("Please give the habit a name")
        } else {
            setIsLoading(true)
            if (habitId) {
                updateHabit({
                    id: habit.id,
                    name: habit.name
                })
                    .then(() => history.push(`/habits/detail/${habit.id}`))
            } else {
                addHabit({
                    name: habit.name
                })
            }
        }
    }

    useEffect(() => {
        if (habitId) {
            getHabitById(habitId)
                .then(habit => {
                    setHabit(habit)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="modalForm">
            <h2 className="modalForm__title">{habitId ? <>Edit habit</> : <>New Habit</>}</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="name" required className="modal-form-control" placeholder="Habit name" value={habit.name} onChange={handleHabitChange} />
                </div>
            </fieldset>
            <div className="modal-form-button-pos">
                <button className="modal-form-button" disabled={isLoading} onClick={(evt) => { evt.preventDefault(); handleClickSaveHabit() }}>
                    {habitId ? <>Save Habit</> : <>Add Habit</>}
                </button>
            </div>
        </form>
    )
}