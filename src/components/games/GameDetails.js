import React, { useState, useEffect, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createRating, getGameById, getRatings, getReviews, updateRating } from "./GameManager"

export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] =  useState({})
    const [reviews, setReviews] = useState([])
    const history = useHistory()
    const rating = useRef(null)
    const userId = localStorage.getItem('user_id')
    const [ratings, setRatings] = useState([])

    useEffect(() => {
        getGameById(gameId).then(g => setGame(g))
        getReviews().then(r => setReviews(r))
        getRatings().then(n => setRatings(n))
    }, [gameId])

    let numbersArray = []
    numbersArray.push(1,2,3,4,5,6,7,8,9,10)

    const rated = () => {
        return ratings.find(r => r.player?.id === parseInt(userId) && r.game?.id === parseInt(gameId))
    }
    let foundRating = rated()

    const postRating = () => {
        if (rated()) {
        updateRating({
            id: rated().id,
            rating: parseInt(rating.current.value),
            game: parseInt(gameId)
        })
        .then(() => history.push(`/games/${gameId}`))
        }
        else {
        createRating({
            rating: parseInt(rating.current.value),
            game: parseInt(gameId)
        })
        .then(() => history.push(`/games/${gameId}`))
        }
    }


    return (
        <>
        <h2>{game.title}</h2>
        <div>Designed by {game.designer} and released in {game.year_released}</div>
        <div>Requires {game.number_of_players} people and ~{game.estimated_time_to_play} hours to play</div>
        <div>Recommended for ages {game.age_recommendation} and up</div>
        <div>Filed under {game.categories?.map(c => c.label)}</div>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: `/games/${game.id}/review` })
            }}
            >Post a Review</button>
        <div>Reviews: {reviews.map(r => 
                                    {if (r.game === game.id) {
                                        return <div>{r.review}</div>}})}</div>
        
         <form>
            <fieldset>
                <div className="form-group">
                    {rated() ?
                    <label htmlFor="rating">Change your rating:</label>
                    :
                    <label htmlFor="rating">Rate this Game: </label>
                    }
                    <select defaultValue="" name="rating" ref={rating} id="rating" className="form-control" >
                    <option value="0">Select a rating:</option>
                        {numbersArray.map(n => 
                        {if (foundRating?.rating === n) {
                            return  <option key={n} value={n} selected>{n}</option>
                        }
                        else {
                            return <option key={n} value={n} >{n}</option>
                        }
                        })}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
            onClick={evt => {
                evt.preventDefault() // Prevent browser from submitting the form
                postRating()
            }}
            className="btn btn-primary">
            Save Rating
            </button>
        </form>
        </>
    )
}