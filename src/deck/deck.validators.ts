import { throwCustomError } from '../errors'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { DeckTypeEnum } from './deck.enums'

export const schemas = {
  createDeck: {
    body: yup.object({
      type: yup.string().oneOf([DeckTypeEnum.FULL, DeckTypeEnum.SHORT]).required(),
      shuffled: yup.boolean().required()
    }).required()
  }
}

export const validateUsingSchema = (input: any, schema: yup.Schema) => {
  try {
    return schema.validateSync(input, { stripUnknown: true })
  } catch (e) {
    const error = e as yup.ValidationError

    return throwCustomError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
}
