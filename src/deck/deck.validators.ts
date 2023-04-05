import { throwCustomError } from '../errors'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { DeckTypeEnum } from './deck.enums'
import { validate as validateUuidv4 } from 'uuid'

export const schemas = {
  createDeck: {
    body: yup.object({
      type: yup.string().oneOf([DeckTypeEnum.FULL, DeckTypeEnum.SHORT]).required(),
      shuffled: yup.boolean().required()
    }).required()
  },
  openDeck: {
    params: yup
      .object({
        deckId: yup.string().required().trim().test('valid-uuid',
          'deckId is not a valid UUID v4', function (value) {
            return validateUuidv4(value)
          })
      }).required()
  },
  drawFromDeck: {
    params: yup
      .object({
        deckId: yup.string().required().trim().test('valid-uuid',
          'deckId is not a valid UUID v4', function (value) {
            return validateUuidv4(value)
          })
      }).required(),
    body: yup
      .object({
        count: yup.number().required().test('variable-count',
          'Count must be between 1 and the remaining amount of cards', function (value) {
            return value >= 1 && value <= this.options?.context?.remaining
          })
      }).required()
  }
}

export const validateUsingSchema = (input: any, schema: yup.Schema, context?: Record<string, any>) => { // TODO: type?
  try {
    return schema.validateSync(input, { stripUnknown: true, context })
  } catch (e) {
    const error = e as yup.ValidationError

    return throwCustomError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
}
