import { type DeckTypeEnum } from '../deck/deck.enums'
import { type Deck, type CardCode } from '../deck/deck.types'
import { throwCustomError } from '../errors'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import Redis from 'ioredis'
import { v4 } from 'uuid'
import { REDIS_KEY_EXPIRATION_S } from './redis.constants'

export class RedisService {
  private readonly client: Redis

  constructor () {
    this.client = new Redis({ host: 'redis' })
  }

  public setDeck = async (cardCodes: CardCode[], type: DeckTypeEnum, shuffled: boolean, deckId?: string): Promise<string> => {
    const cacheKey = deckId ?? v4()
    const deckString = JSON.stringify({
      type,
      shuffled,
      cardCodes
    })

    try {
      await this.client.set(cacheKey, deckString, 'EX', REDIS_KEY_EXPIRATION_S)

      return cacheKey
    } catch (e) {
      const error = e as Error

      return throwCustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public getDeck = async (deckId: string): Promise<Deck> => {
    try {
      const deckString = await this.client.get(deckId)

      if (deckString === null) {
        throw new Error(ReasonPhrases.NOT_FOUND)
      }

      return JSON.parse(deckString)
    } catch (e) {
      const error = e as Error
      const errStatus =
        error.message === ReasonPhrases.NOT_FOUND ? StatusCodes.NOT_FOUND : StatusCodes.INTERNAL_SERVER_ERROR

      return throwCustomError(errStatus, error.message)
    }
  }

  public deleteDeck = async (deckId: string): Promise<void> => {
    try {
      await this.client.del(deckId)
    } catch (e) {
      const error = e as Error

      return throwCustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}
