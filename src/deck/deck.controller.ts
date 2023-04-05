import { type NextFunction, type Request, type Response } from 'express'
import { schemas, validateUsingSchema } from './deck.validators'
import { type CardCode, type DeckBase } from './deck.types'
import { DeckService } from './deck.service'
import { RedisService } from '../redis/redis.service'

export class DeckController {
  private readonly deckService = new DeckService()
  private readonly redisService = new RedisService()

  public createDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { type, shuffled }: DeckBase = validateUsingSchema(req.body, schemas.createDeck.body)
      const cardCodes: CardCode[] = this.deckService.prepareCardCodes(type, shuffled)
      const deckId: string = await this.redisService.setDeck(cardCodes, type, shuffled)

      res.json({
        deckId,
        type,
        shuffled,
        remaining: cardCodes.length
      })
    } catch (e) {
      next(e)
    }
  }
}
