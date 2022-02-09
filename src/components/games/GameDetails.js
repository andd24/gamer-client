import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getGameById, getReviews } from "./GameManager"

export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] =  useState({})
    const [reviews, setReviews] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGameById(gameId).then(g => setGame(g))
        getReviews().then(r => setReviews(r))
    }, [gameId])

    const getReviewsByGame = (gameId) => {
        return reviews.filter(r => r.game === gameId)
    }

    let filteredReviews = getReviewsByGame(gameId)

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
        </>
    )
}