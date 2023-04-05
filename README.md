
  

#  Katana Backend Programming Test
### Vladislav Šutov

Dockerized REST API simulation of a card deck

## Important notes
- Deck is generated in accordance with [this information](https://ambitiouswithcards.com/new-deck-order/)
- Drawing happens from a deck that has it's cards shirts facing up. First card to draw from an unshuffled full deck would always be an Ace of Hearts
- Author assumes that drawing the last card from the deck renders it unusable, therefore deletion of the deck is to happen
- A potential (intentional?) typo has been made in the assignment: short deck of cards consists of 36 cards, meaning that cards from 2 to 5 should be excluded, not 2 to 6. Solution provided in accordance to AC yet it is still worth mentioned

## Doc

### 1. Create a new deck
```
POST /deck

Request:
	- body: 
		- type: required, string, one of ("FULL", "SHORT")
		- shuffled: required, boolean

Response:
	- body:
		- deckId: string (uuid v4)
		- type: string, one of ("FULL", "SHORT")
		- shuffled: boolean
		- remaining: number

HTTP statuses:
	- 200 ok
	- 422 request validation error
	- 500 internal server error
```

### 2. Open a deck

```
GET /deck/:deckId

Request:
	- params:
		- deckId: required, string (uuid v4)

Response:
	- body:
		- deckId: string (uuid v4)
		- type: string, one of ("FULL", "SHORT")
		- shuffled: boolean
		- remaining: number,
		- cards: array

HTTP statuses:
	- 200 ok
	- 404 deck not found
	- 422 request validation error
	- 500 internal server error
```

### 3. Draw from a deck

```
PATCH /deck/:deckId

Request:
	- params:
		- deckId: required, string (uuid v4)
	- body: 
		- count: required, number, >1 and <remaining cards

Response:
	- body:
		- cards: array

HTTP statuses:
	- 200 ok
	- 404 deck not found
	- 422 request validation error
	- 500 internal server error
```

##  Technologies used

- Node 18 + Express 4

- Typescript 5

- Redis

- Jest + Supertest

- Yup

  

##  Docker

###  Build

`docker-compose build`

  

###  Run

`docker-compose run -p 3000:3000 app`

  

###  Tests

`docker-compose run tests`