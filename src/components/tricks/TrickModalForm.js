import React, { useContext, useEffect, useState } from 'react'
import { TrickContext } from './TrickProvider'
import { useHistory, useParams } from 'react-router-dom'

export const TrickModalForm = () => {
    const { addTrick, getTrickById, updateTrick } = useContext(TrickContext)
    const [trick, setTrick] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { trickId } = useParams()
    const history = useHistory()

    const handleTrickChange = (evt) => {
        const newTrick = { ...trick }
        newTrick[evt.target.id] = evt.target.value
        setTrick(newTrick)
    }

    const handleClickSaveTrick = () => {
        if (Object.entries(trick).length === 0) {
            window.alert("Please give the trick a name")
        } else {
            setIsLoading(true)
            if (trickId) {
                updateTrick({
                    id: trick.id,
                    name: trick.name
                })
                    .then(() => history.push(`/tricks/detail/${trick.id}`))
            } else {
                addTrick({
                    name: trick.name
                })
            }
        }
    }

    useEffect(() => {
        if (trickId) {
            getTrickById(trickId)
                .then(trick => {
                    setTrick(trick)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="trickForm">
            <h2 className="trickForm__title">{trickId ? <>Edit Trick</> : <>New Trick</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Trick name: </label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Trick name" value={trick.name} onChange={handleTrickChange} />
                </div>
            </fieldset>
            <button className="btn btn-primary" disabled={isLoading} onClick={(evt) => { evt.preventDefault(); handleClickSaveTrick() }}>
                {trickId ? <>Save Trick</> : <>Add Trick</>}
            </button>
        </form>
    )
}