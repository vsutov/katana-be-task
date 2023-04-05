import { type Request, type Response, type NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

interface CustomError extends Error {
  status?: StatusCodes
}

export const throwCustomError = (status: StatusCodes, message?: string): never => {
  const errorMessage = message ?? getReasonPhrase(status)
  const customError: CustomError = new Error(errorMessage)
  customError.status = status

  throw customError
}

export const errorHandler = (error: CustomError, _req: Request, res: Response, _next: NextFunction): void => {
  res.status(error.status ?? StatusCodes.INTERNAL_SERVER_ERROR)

  res.send({
    error: {
      message: error.message
    }
  })
}

export default errorHandler
