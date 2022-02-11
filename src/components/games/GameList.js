import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { getGames, deleteGame } from "./GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()
    const userId = localStorage.getItem("user_id")
    

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])
    

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/games/new" })
            }}
            >Register a new game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`games/${game.id}`} className="game__title">{game.title} </Link>
                        {parseInt(userId) === game.player?.id ? 
                        <button className="btn btn-2 btn-sep icon-create" 
                            onClick={() => {history.push({ pathname: `/games/edit/${game.id}` })}}>Edit Game</button>
                            :
                        ""}
                        <button className="btn btn-2 btn-sep icon-create" 
                            onClick={() => deleteGame(game.id).then(setGames)}>Delete Game</button>
                    </section>
                })
            }
        </article>
        </>
    )
}