import { CARD_SUITS, CARD_VALUES, SHORT_DECK_EXCLUDED_CARD_VALUES } from './deck.constants'
import { DeckTypeEnum } from './deck.enums'
import { type CardCode } from './deck.types'

export class DeckService {
  public prepareCardCodes (type: DeckTypeEnum, shuffled: boolean): CardCode[] {
    let cardCodes: CardCode[] = []

    for (const cardSuitCode of CARD_SUITS.keys()) {
      for (const cardValueCode of CARD_VALUES.keys()) {
        cardCodes.push(`${cardValueCode}${cardSuitCode}` as CardCode)
      }
    }

    if (type === DeckTypeEnum.SHORT) {
      cardCodes = cardCodes.filter(card => !SHORT_DECK_EXCLUDED_CARD_VALUES.includes(card[0]))
    }

    if (shuffled) {
      for (let i = (cardCodes.length - 1); i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [cardCodes[i], cardCodes[randomIndex]] = [cardCodes[randomIndex], cardCodes[i]]
      }
    }

    return cardCodes
  }

  public drawCards (cardCodes: CardCode[], drawnCount: number): CardCode[] {
    const cardsRemaining: number = cardCodes.length
    const cardsDrawingOffset = cardsRemaining - drawnCount

    const drawnCards: CardCode[] = cardCodes.slice(cardsDrawingOffset).reverse()

    return drawnCards
  }
}
