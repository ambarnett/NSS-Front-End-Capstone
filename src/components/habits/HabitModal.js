import React, { useContext, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import './Habits.css'
import { HabitContext } from './HabitProvider';
import { HabitModalForm } from './HabitModalForm';
import { KnownHabitsContext } from '../knownHabits/KnownHabitsProvider';
import { DogContext } from '../dog/DogProvider';
import { useHistory, useParams } from 'react-router-dom';

export const AddHabitModal = () => {
    const { habits, getHabits, removeHabit } = useContext(HabitContext)
    const { knownHabits, addKnownHabits, removeKnownHabit } = useContext(KnownHabitsContext)
    const { dogs, getDogById } = useContext(DogContext)
    const [dog, setDog] = useState({})
    const [checkedHabitId, setCheckedHabitId] = useState({})
    const [checkedKnownHabitId, setCheckedKnownHabitId] = useState({})
    const history = useHistory()
    const { dogId } = useParams()

    useEffect(() => {
        getDogById(dogId)
            .then((res) => {
                setDog(res)
            })
    }, [])

    const handleAddKnownHabit = () => {
        if (isNaN(checkedHabitId)) {
            window.alert("please make a selection")
        } else {
            addKnownHabits({
                dogId: parseInt(dogId),
                habitId: checkedHabitId
            })
                .then(refreshPage)
            console.log(dogId)
        }
    }

    const handleRemoveKnownHabit = () => {
        removeKnownHabit(checkedKnownHabitId)
    }

    const handleRemoveHabit = () => {
        removeHabit(checkedHabitId)
    }

    const refreshPage = () => {
        window.location.reload()
    }

    useEffect(() => {
        getHabits()
    }, [])

    return (
        <Popup
            trigger={<button className="button"> Add/Remove Habit </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Select habit from list or click below to create a new habit </div>
                    <div className="content" value={habits.id}>
                        {habits.map(habit => {
                            return <div>
                                <input type="radio" required name="radio" key={habit.id} habit={habit} value={habit.id} onChange={() => setCheckedHabitId(habit.id)} />
                                <label htmlFor="radio">{habit.name}</label>
                                <button className="close" onClick={() => {
                                    removeHabit(habit.id)
                                }}>
                                    &times;
                                </button>
                            </div>
                        })}
                    </div>
                    <div className="actions">
                        <button className="addHabit" onClick={() => {
                            handleAddKnownHabit();
                            // refreshPage();
                        }}>
                            Add Selected Habit(s)
                        </button>
                        <Popup trigger={<button className="button">Remove Known Habit</button>} nested position="top center">
                            {knownHabits.map(kh => {
                                return (
                                    (parseInt(dogId) === kh.dogId) ?
                                        <div>
                                            <input type="radio" required name="radio" key={kh.id} kh={kh} value={kh.id} onChange={() => setCheckedKnownHabitId(kh.id)} />
                                            <label htmlFor="radio">{kh?.habit?.name}</label>
                                        </div>
                                        : <></>)
                            })}
                            <button className="removeHabit" onClick={() => {
                                handleRemoveKnownHabit();
                                refreshPage()
                            }}>
                                Remove Habit(s)
                            </button>
                        </Popup>
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