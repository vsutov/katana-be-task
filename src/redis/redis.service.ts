import { type DeckTypeEnum } from '../deck/deck.enums'
import { type CardCode } from '../deck/deck.types'
import { throwCustomError } from '../errors'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import Redis from 'ioredis'
import { v4 } from 'uuid'

export class RedisService {
  private readonly client: Redis

  constructor () {
    this.client = new Redis({ host: 'redis' })
  }

  public setDeck = async (cardCodes: CardCode[], type: DeckTypeEnum, shuffled: boolean): Promise<string> => { // TODO: reuse for update? pass deckId?
    const cacheKey = v4()
    const deckString = JSON.stringify({
      type,
      shuffled,
      cardCodes
    })

    try {
      await this.client.set(cacheKey, deckString, 'EX', 3600)

      return cacheKey
    } catch (e) {
      const error = e as Error

      return throwCustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public getDeck = async (deckId: string): Promise<unknown> => { // TODO: type!
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

  public deleteDeck = async (deckId: string): Promise<void> => { // TODO: maybe not needed?
    try {
      await this.client.del(deckId)
    } catch (e) {
      const error = e as Error

      return throwCustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}
