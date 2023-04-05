import express, { type Express } from 'express'
import { DeckController } from './deck/deck.controller'
import { errorHandler } from './errors'

const app: Express = express()
const deckController = new DeckController()

app.use(express.json())

app.post('/deck', deckController.createDeck)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('[server]: Server is running at http://localhost:3000')
})

export default app
