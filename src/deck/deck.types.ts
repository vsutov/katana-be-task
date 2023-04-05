import { type DeckTypeEnum } from './deck.enums'

export interface DeckBase {
  type: DeckTypeEnum
  shuffled: boolean
}
