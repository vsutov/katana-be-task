import { DeckTypeEnum } from '../../deck.enums'
import { schemas, validateUsingSchema } from '../../deck.validators'
import { v4 } from 'uuid'

describe('validateUsingSchema', () => {
  it('should return the validated data when input is valid', () => {
    const input = {
      type: DeckTypeEnum.FULL,
      shuffled: true
    }
    const schema = schemas.createDeck.body
    const validatedData = validateUsingSchema(input, schema)
    expect(validatedData).toEqual(input)
  })

  it('should throw a custom error when input is invalid', () => {
    const input = {
      shuffled: true
    }
    const schema = schemas.createDeck.body
    expect(() => {
      validateUsingSchema(input, schema)
    }).toThrow('type is a required field')
  })
})

describe('createDeck.body schema', () => {
  it('should validate a valid request body', () => {
    const validBody = {
      type: DeckTypeEnum.SHORT,
      shuffled: false
    }

    const schema = schemas.createDeck.body
    expect(schema.isValidSync(validBody)).toBeTruthy()
  })

  it('should invalidate an invalid request body', () => {
    const invalidBody = {
      type: 'invalidType',
      shuffled: 'notABoolean'
    }
    const schema = schemas.createDeck.body
    expect(schema.isValidSync(invalidBody)).toBeFalsy()
  })
})

describe('openDeck.params schema', () => {
  it('should validate a valid parameter', () => {
    const validParam = {
      deckId: v4()
    }
    const schema = schemas.openDeck.params
    expect(schema.isValidSync(validParam)).toBeTruthy()
  })

  it('should invalidate an invalid parameter', () => {
    const invalidParam = {
      deckId: 'notAValidUuid'
    }
    const schema = schemas.openDeck.params
    expect(schema.isValidSync(invalidParam)).toBeFalsy()
  })
})

describe('drawCardsFromDeck.params schema', () => {
  it('should validate a valid parameter', () => {
    const validParam = {
      deckId: v4()
    }
    const schema = schemas.drawCardsFromDeck.params
    expect(schema.isValidSync(validParam)).toBeTruthy()
  })

  it('should invalidate an invalid parameter', () => {
    const invalidParam = {
      deckId: 'notAValidUuid'
    }
    const schema = schemas.drawCardsFromDeck.params
    expect(schema.isValidSync(invalidParam)).toBeFalsy()
  })
})

describe('drawCardsFromDeck.body schema', () => {
  it('should validate a valid request body with remaining context', () => {
    const validBody = {
      count: 5
    }
    const context = {
      remaining: 10
    }
    const schema = schemas.drawCardsFromDeck.body
    expect(schema.isValidSync(validBody, { context })).toBeTruthy()
  })

  it('should invalidate an invalid request body with remaining context', () => {
    const invalidBody = {
      count: 20
    }
    const context = {
      remaining: 10
    }
    const schema = schemas.drawCardsFromDeck.body
    expect(schema.isValidSync(invalidBody, { context })).toBeFalsy()
  })
})
