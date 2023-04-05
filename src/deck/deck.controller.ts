import { type NextFunction, type Request, type Response } from 'express'
import { schemas, validateUsingSchema } from './deck.validators'
import { type DeckBase } from './deck.types'

export class DeckController {
  public createDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { type, shuffled }: DeckBase = validateUsingSchema(req.body, schemas.createDeck.body)

      res.json()
    } catch (e) {
      next(e)
    }
  }
}
