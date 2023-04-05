import { type NextFunction, type Request, type Response } from 'express'
import { schemas, validateUsingSchema } from './deck.validators'
import { type DeckBase } from './deck.types'
import { DeckService } from './deck.service'

export class DeckController {
  private readonly deckService = new DeckService()

  public createDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { type, shuffled }: DeckBase = validateUsingSchema(req.body, schemas.createDeck.body)
      const cardCodes: string[] = this.deckService.prepareCardCodes(type, shuffled)

      res.json()
    } catch (e) {
      next(e)
    }
  }
}
