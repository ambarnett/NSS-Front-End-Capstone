import React, { useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import './Habits.css'
import { HabitContext } from './HabitProvider';
//need to have this have access to habits 
//the first time it will give checkboxes (or something that will allow for multiple selections at once) within the first box
// it will also have another button that will send the user to the add habit form
export const PopupExample = () => {
    const { habits } = useContext(HabitContext)
    const [habit, setHabit] = useState({})

    const habitInputChange = (evt) => {
        const newHabit = {...habit}
        newHabit[evt.target.id] = evt.target.value
        setHabit(newHabit)
    }
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
                    <div className="header"> Modal Title </div>
                    <div className="content">
                        {habits.map(habit => {
                            return habit.name 
                        })}
                    </div>
                    <div className="actions">
                        <Popup
                            trigger={<button className="button"> Trigger </button>}
                            position="top center"
                            nested
                        >
                            <span>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                                magni omnis delectus nemo, maxime molestiae dolorem numquam
                                mollitia, voluptate ea, accusamus excepturi deleniti ratione
                                sapiente! Laudantium, aperiam doloribus. Odit, aut.
                            </span>
                        </Popup>
                        <button
                            className="button"
                            onClick={() => {
                                console.log('modal closed ');
                                close();
                            }}
                        >
                            close modal
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}