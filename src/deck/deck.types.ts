import { type CARD_SUITS, type CARD_VALUES } from './deck.constants'
import { type DeckTypeEnum } from './deck.enums'
import { type Response } from 'express'

export interface DeckBase {
  type: DeckTypeEnum
  shuffled: boolean
}

export interface Deck extends DeckBase {
  cardCodes: CardCode[]
}

type CardCodeString<Suits extends Map<string, string>, Values extends Map<string, string>>
    = `${keyof Suits & string}${keyof Values & string}`

export type CardCode = CardCodeString<typeof CARD_SUITS, typeof CARD_VALUES>

type Send<ResBody = any, T = Response<ResBody>> = (body?: ResBody) => T

export interface CustomResponse<T> extends Response {
  json: Send<T, this>
}

export interface CreateDeckResponse {
  type: DeckTypeEnum
  shuffled: boolean
  deckId: string
  remaining: number
}
