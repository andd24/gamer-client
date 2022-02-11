import React, { useState, useEffect, useRef } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getCategories, getGameById, updateGame } from './GameManager.js'


export const GameUpdate = () => {
    const title = useRef(null)
    const designer = useRef(null)
    const description = useRef(null)
    const yearReleased = useRef(null)
    const estimatedTimeToPlay = useRef(null)
    const numberOfPlayers = useRef(null)
    const ageRecommendation = useRef(null)
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [game, setGame] = useState({})
    const { gameId } = useParams()
    const parsedId = parseInt(gameId)

    useEffect(() => {
        getCategories().then(data => setCategories(data))
        getGameById(parsedId).then(data => setGame(data))
    }, [])

    const editGame = () => {
            updateGame({
                id: gameId,
                title: title.current.value,
                description: description.current.value,
                year_released: yearReleased.current.value,
                designer: designer.current.value,
                estimated_time_to_play: parseInt(estimatedTimeToPlay.current.value),
                number_of_players: parseInt(numberOfPlayers.current.value),
                age_recommendation: parseInt(ageRecommendation.current.value),
                category: game.category
            })
            .then(() => history.push("/games"))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" ref={title} required autoFocus className="form-control" defaultValue={game.title}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" id="designer" ref={designer} required autoFocus className="form-control" defaultValue={game.designer}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" ref={description} required autoFocus className="form-control" defaultValue={game.description}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="text" id="yearReleased" ref={yearReleased} required autoFocus className="form-control" defaultValue={game.year_released}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Estimated Time to Play: </label>
                    <input type="text" id="estimatedTimeToPlay" ref={estimatedTimeToPlay} required autoFocus className="form-control" defaultValue={game.estimated_time_to_play}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="text" id="players" ref={numberOfPlayers} required autoFocus className="form-control" defaultValue={game.number_of_players}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Age Recommendation: </label>
                    <input type="text" id="ageRecommendation" ref={ageRecommendation} required autoFocus className="form-control" defaultValue={game.age_recommendation}/>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    editGame()
                }}
                className="btn btn-primary">
                Save Update
            </button>
        </form>
    )
}