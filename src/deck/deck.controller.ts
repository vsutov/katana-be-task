import { type NextFunction, type Request, type Response } from 'express'

export class DeckController {
  public createDeck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json()
  }
}
