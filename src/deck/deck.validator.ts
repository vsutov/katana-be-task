import { throwCustomError } from 'errors'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

export const schemas = {
  createDeck: {
    body: yup.object({
      type: yup.string().oneOf(['FULL, SHORT']).required(),
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
