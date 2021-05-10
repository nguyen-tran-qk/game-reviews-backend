Game Reviews Forum project of SSSF21 course at Metropolia UAS: 
> A forum for video game enthusiasts, where members can create posts about the games they have played recently. Each post will include the game details (title, genre, price, studio, ...), provided by the forum's game database. If the game doesn't exist in database, it will be added when the post is published. In the post, author can put their own personal rating and review texts about the game, and other members can comment on the post as well.

This repo is the backend of the project. The frontend repo can be found at: https://github.com/nguyen-tran-qk/game-reviews-forum

---

### Frontend for testing: https://game-reviews-forums.vercel.app/

### Backend server to test in Postman: https://nguyentran-chargemap.jelastic.metropolia.fi/

### What has changed since the presentation?
Most of the changes are on the frontend. Checkout the frontend repo at: https://github.com/nguyen-tran-qk/game-reviews-forum. The only change on backend is the fix to add comment to review.

---

## Register an account
```
    mutation {
        register(username: "test", password: "123456") {
            id
            role
        }
    }
```

## Login to retrieve auth token
```
    query {
        login(username: "test", password:"123456") {
            username
            token
        }
    }
```

## Get all reviews
```
    query {
        getAllReviews {
            username,
            gameId {
            title,
            price
            },
            reviewText,
            rating,
            createdAt,
            comments
        }
    }
```

## Get all reviews of a game
```
    query {
        getReviewsByGame(gameId: "60906420757cc51654caa4ad") {
            username,
            gameId {
                title
            },
            reviewText,
            rating
        }
    }
```

## Add a review about a game
```
    mutation {
        addReviewToGame(gameId: "60906420757cc51654caa4ad", reviewText: "Exciting game!", rating: 7.5) {
            id,
            username,
            gameId {
                title,
                description
            },
            reviewText,
            rating
        }
    }
```

## Add a review with game title
Use this when user wants to add a review about a game that is not found in game database.
In this case, a new game will be created based on the title, along with the new review for that game.
```
    mutation {
        addReviewToNewGame(gameTitle: "Spiderman", reviewText: "Exciting game!", rating: 7.5) {
            id,
            username,
            gameId {
                title,
                description
            },
            reviewText,
            rating
        }
    }

```

## Modify a game review
```
    mutation {
        updateReview(id: "60906b50757cc51654caa4ae", reviewText: "Not as good as I expected", rating: 6) {
            username,
            gameId {
                title
            },
            reviewText,
            rating
        }
    }
```

## Delete a review
```
    mutation {
        deleteReview(id: "60906b50757cc51654caa4ae")
    }
```

## Get all games from database
```
    query {
        getAllGames {
            id,
            title,
            description,
            genres,
            price
        }
    }
```

## Get game information by ID
```
    query {
        getGameById(id: "60906420757cc51654caa4ad") {
            id,
            title,
            description,
            genres,
            price
        }
    }
```

## Find game by title
```
    query {
        findGameByTitle(title: "cry") {
            id,
            title,
            description,
            genres,
            price
        }
    }
```

## Add game
```
    mutation {
        addGame(
            title: "Far Cry 6", 
            description: "In Far Cry 6, play as a local Yaran and fight using over the top guerrilla tactics and weaponry to liberate your nation", 
            genres: [rpg, shooter, adventure], 
            studio: "Ubisoft",
            price: 69.99
        ) {
            id
            title
            genres
            studio
            price
        }
    }
```

## Modify game information
```
    mutation {
        modifyGame(
            id: "60906420757cc51654caa4ad",
            description: "New description",
            genres: [rpg, adventure],
        ) {
            description
            genres
            studio
            price
        }
    }
```

## Remove game from database
```
    mutation {
        removeGame(id: "60906420757cc51654caa4ad")
    }
```

## Comment on a review
```
    mutation {
        addCommentToReview(reviewId: "6090746c41a72e07e425e2e9", commentText: "I agree") {
            id,
            username,
            commentText,
            createdAt
        }
    }
```

## Edit a comment
```
    mutation {
        editComment(id: "60906e70757cc51654caa4af", commentText: "I think it's pretty good") {
            id,
            username,
            commentText
        }
    }
```

## Delete comment
```
    mutation {
        deleteComment(id: "60906e70757cc51654caa4af")
    }
```
