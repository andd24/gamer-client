import React, { useState, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getCategories } from './GameManager.js'


export const GameForm = () => {
    const title = useRef(null)
    const designer = useRef(null)
    const description = useRef(null)
    const yearReleased = useRef(null)
    const estimatedTimeToPlay = useRef(null)
    const numberOfPlayers = useRef(null)
    const ageRecommendation = useRef(null)
    const category = useRef(null)

    const history = useHistory()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }, [])

    const constructNewGame = () => {
        /*
            The `location` and `animal` variables below are
            the references attached to the input fields. You
            can't just ask for the `.value` property directly,
            but rather `.current.value` now in React.
        */

            createGame({
                title: title.current.value,
                description: description.current.value,
                year_released: yearReleased.current.value,
                designer: designer.current.value,
                estimated_time_to_play: parseInt(estimatedTimeToPlay.current.value),
                number_of_players: parseInt(numberOfPlayers.current.value),
                age_recommendation: parseInt(ageRecommendation.current.value),
                category: parseInt(category.current.value)
            })
            .then(() => history.push("/games"))
    }
    // const changeGameState = (domEvent) => {
    //     // TODO: Complete the onChange function
    // }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" ref={title} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" id="designer" ref={designer} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" ref={description} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="text" id="yearReleased" ref={yearReleased} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Estimated Time to Play: </label>
                    <input type="text" id="estimatedTimeToPlay" ref={estimatedTimeToPlay} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="text" id="players" ref={numberOfPlayers} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Age Recommendation: </label>
                    <input type="text" id="ageRecommendation" ref={ageRecommendation} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>
                    <select defaultValue="" name="category" ref={category} id="category" className="form-control" >
                        <option value="0">Select a category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewGame()
                }}
                className="btn btn-primary">
                Save Game
            </button>
        </form>
    )
}