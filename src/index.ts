import express, { type Express } from 'express'
import { DeckController } from './deck/deck.controller'

const app: Express = express()
const deckController = new DeckController()

app.use(express.json())

app.post('/deck', deckController.createDeck)

app.listen(3000, () => {
  console.log('[server]: Server is running at http://localhost:3000')
})

export default app
