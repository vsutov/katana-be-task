export const CARD_SUITS = new Map<string, string>([
  ['C', 'CLUBS'],
  ['H', 'HEARTS'],
  ['S', 'SPADES'],
  ['D', 'DIAMONDS']
])

export const CARD_VALUES = new Map<string, string>([
  ['A', 'ACE'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7'],
  ['8', '8'],
  ['9', '9'],
  ['10', '10'],
  ['J', 'JACK'],
  ['Q', 'QUEEN'],
  ['K', 'KING']
])

export const SHORT_DECK_EXCLUDED_CARD_VALUES: string[] = ['2', '3', '4', '5', '6']
