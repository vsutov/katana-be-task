import { type CARD_SUITS, type CARD_VALUES } from './deck.constants'
import { type DeckTypeEnum } from './deck.enums'

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
