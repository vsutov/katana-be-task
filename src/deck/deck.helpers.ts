import { StatusCodes } from 'http-status-codes'
import { throwCustomError } from '../errors'
import { CARD_SUITS, CARD_VALUES } from './deck.constants'
import { type CardCode, type Card } from './deck.types'

export const formatCardCodesIntoCards = (cardCodes: CardCode[]): Card[] => {
  return cardCodes.map((code) => {
    const [cardValueCode, cardSuitCode] = [code.slice(0, -1), code.slice(-1)]

    const value = CARD_VALUES.get(cardValueCode)
    const suit = CARD_SUITS.get(cardSuitCode)

    if (value === undefined || suit === undefined) {
      return throwCustomError(StatusCodes.INTERNAL_SERVER_ERROR, `Invalid card code: ${code}`)
    }

    return {
      code,
      value,
      suit
    }
  })
}
