import React, { useState, useEffect, useRef } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createReview } from './GameManager.js'


export const ReviewForm = () => {
    const review = useRef(null)
    const { gameId } = useParams()
    const history = useHistory()
    
    const postReview = () => {

            createReview({
                review: review.current.value,
                game: gameId
            })
            .then(() => history.push(`/games/${gameId}`))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Post a review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <input type="textarea" id="review" ref={review} required autoFocus className="form-control"/>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    postReview()
                }}
                className="btn btn-primary">
                Save Game
            </button>
        </form>
    )
}