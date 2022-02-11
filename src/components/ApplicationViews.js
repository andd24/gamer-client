import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList.js"
import { GameDetails } from "./games/GameDetails.js"
import { GameForm } from "./games/GameForm.js"
import { ReviewForm } from "./games/ReviewForm.js"
import { GameUpdate } from "./games/GameUpdate.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/games/:gameId(\d+)/review">
                <ReviewForm />
            </Route>
            <Route exact path="/games/edit/:gameId(\d+)" >
                <GameUpdate />
            </Route>
        </main>
    </>
}