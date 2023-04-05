import { CARD_SUITS, CARD_VALUES, SHORT_DECK_EXCLUDED_CARD_VALUES } from './deck.constants'
import { DeckTypeEnum } from './deck.enums'

export class DeckService {
  public prepareCardCodes (type: DeckTypeEnum, shuffled: boolean): string[] {
    let cardCodes: string[] = []

    for (const cardSuitCode of CARD_SUITS.keys()) {
      for (const cardValueCode of CARD_VALUES.keys()) {
        cardCodes.push(`${cardValueCode}${cardSuitCode}`)
      }
    }

    if (type === DeckTypeEnum.SHORT) {
      cardCodes = cardCodes.filter(card => !SHORT_DECK_EXCLUDED_CARD_VALUES.includes(card[0]))
    }

    if (shuffled) {
      cardCodes = cardCodes.sort(() => Math.random() - 0.5)
    }

    return cardCodes
  }
}
