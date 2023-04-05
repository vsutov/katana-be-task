import { DeckService } from '../../deck.service'
import { DeckTypeEnum } from '../../deck.enums'

describe('DeckService', () => {
  describe('prepareCardCodes', () => {
    it('should return a standard deck of cards when called with DeckTypeEnum.FULL', () => {
      const deckService = new DeckService()
      const cardCodes = deckService.prepareCardCodes(DeckTypeEnum.FULL, false)
      expect(cardCodes).toHaveLength(52)
    })

    it('should return a short deck of cards when called with DeckTypeEnum.SHORT', () => {
      const deckService = new DeckService()
      const cardCodes = deckService.prepareCardCodes(DeckTypeEnum.SHORT, false)
      expect(cardCodes).toHaveLength(32)
      expect(cardCodes).not.toContain('2S')
      expect(cardCodes).not.toContain('2H')
      expect(cardCodes).not.toContain('2C')
      expect(cardCodes).not.toContain('2D')
    })

    it('should return a shuffled deck of cards when called with shuffled=true', () => {
      const deckService = new DeckService()
      const unshuffledCardCodes = deckService.prepareCardCodes(DeckTypeEnum.FULL, false)
      const shuffledCardCodes = deckService.prepareCardCodes(DeckTypeEnum.FULL, true)
      expect(shuffledCardCodes).not.toEqual(unshuffledCardCodes)
    })
  })

  describe('drawCards', () => {
    it('should return the correct number of drawn and remaining cards', () => {
      const deckService = new DeckService()
      const cardCodes = deckService.prepareCardCodes(DeckTypeEnum.FULL, false)
      const { drawnCards, remainingCards } = deckService.drawCards(cardCodes, 5)
      expect(drawnCards).toHaveLength(5)
      expect(remainingCards).toHaveLength(47)
    })

    it('should return an empty array for drawn cards when called with drawnCount=0', () => {
      const deckService = new DeckService()
      const cardCodes = deckService.prepareCardCodes(DeckTypeEnum.FULL, false)
      const { drawnCards, remainingCards } = deckService.drawCards(cardCodes, 0)
      expect(drawnCards).toEqual([])
      expect(remainingCards).toEqual(cardCodes)
    })
  })
})
