export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameById = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(game)
     })
        .then(getGames)
}

export const updateGame = game => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(game)
    })
        .then(getGames)
}

export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
     })
        .then(response => response.json())
}

export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(getGames)
}

export const getReviews = () => {
    return fetch("http://localhost:8000/reviews", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const createReview = (review) => {
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(review)
     })
        .then(getGames)
}

