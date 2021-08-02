import React, { useContext, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import './Habits.css'
import { HabitContext } from './HabitProvider';
// import { HabitCard } from './HabitCard';
import { HabitModalForm } from './HabitModalForm';
import { KnownHabitsContext } from '../knownHabits/KnownHabitsProvider';
import { DogContext } from '../dog/DogProvider';
import { useHistory, useParams } from 'react-router-dom';
//need to have this have access to habits 
//the first time it will give checkboxes (or something that will allow for multiple selections at once) within the first box
// it will also have another button that will send the user to the add habit form
export const PopupExample = () => {
    const { habits, getHabits, getHabitById } = useContext(HabitContext)
    const [habit, setHabit] = useState({})
    const [dog, setDog] = useState({})
    const { knownHabits, addKnownHabits } = useContext(KnownHabitsContext)
    const { dogs, getDogById } = useContext(DogContext)
    const history = useHistory()
    const { dogId } = useParams()
    const { habitId } = useParams()

    const habitInputChange = (evt) => {
        const newHabit = { ...habit }
        newHabit[evt.target.id] = evt.target.value
        setHabit(newHabit)
    }

    useEffect(() => {
        getDogById(dogId)
            .then((res) => {
                setDog(res)
            })
    }, [])

    // useEffect(() => {
    //     getHabitById(habitId)
    //         .then(res => {
    //             setHabit(res)
    //         })
    // }, [])


    const handleAddKnownHabit = () => {
        addKnownHabits({
            dogId: parseInt(dogId),
            habitId: parseInt(habits.habitId)
        })
    }

    useEffect(() => {
        getHabits()
    }, [])

    return (
        <Popup
            trigger={<button className="button"> Open Modal - add habit </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Select habit from list or click below to create a new habit </div>
                    <div className="content" value={habitId}>
                        {habits.map(habit => {
                            return <div>
                                <input type="checkbox" name="checkbox" unchecked key={habit.id} habit={habit} value={habitId} />
                                <label htmlFor="checkbox">{habit.name}</label>
                            </div>
                        })}
                    </div>
                    {/* <select
                        name="habitId"
                        id="habitId"
                        className="form-control"
                        onChange={handleAddKnownHabit}
                    >
                        <option value='0'>Select a Habit</option>
                        {habits.map((h) => (
                            <option key={h.id} value={h.id}>
                                {h.name}
                            </option>
                        ))}
                    </select> */}

                    <div className="actions">
                        <button className="addHabit" onClick={handleAddKnownHabit}>Add Selected Habit(s)</button>
                        <Popup
                            trigger={<button className="button"> Create New Habit </button>}
                            position="top center"
                            nested
                        >
                            {HabitModalForm}
                        </Popup>
                        <button
                            className="button"
                            onClick={() => {
                                console.log('modal closed ');
                                close();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}