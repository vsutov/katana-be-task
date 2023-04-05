import { type NextFunction, type Request } from 'express'
import { schemas, validateUsingSchema } from './deck.validators'
import {
  type CustomResponse,
  type CardCode,
  type DeckBase, type CreateDeckResponse, type Deck, type OpenDeckResponse
} from './deck.types'
import { DeckService } from './deck.service'
import { RedisService } from '../redis/redis.service'
import { formatCardCodesIntoCards } from './deck.helpers'

export class DeckController {
  private readonly deckService = new DeckService()
  private readonly redisService = new RedisService()

  public createDeck = async (req: Request, res: CustomResponse<CreateDeckResponse>, next: NextFunction): Promise<void> => {
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

  public openDeck = async (req: Request, res: CustomResponse<OpenDeckResponse>, next: NextFunction): Promise<void> => {
    try {
      const { deckId }: { deckId: string } = validateUsingSchema(req.params, schemas.openDeck.params)
      const { shuffled, type, cardCodes }: Deck = await this.redisService.getDeck(deckId)

      res.json({
        deckId,
        type,
        shuffled,
        remaining: cardCodes.length,
        cards: formatCardCodesIntoCards(cardCodes)
      })
    } catch (e) {
      next(e)
    }
  }
}
