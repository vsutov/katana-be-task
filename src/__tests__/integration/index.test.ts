import request from 'supertest'
import app from '../..'
import { DeckTypeEnum } from '../../deck/deck.enums'

describe('API', () => {
  describe('POST /deck', () => {
    it('should create a new unshuffled full deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: false,
          type: DeckTypeEnum.FULL
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(52)
      expect(body.shuffled).toBeFalsy()
      expect(body.type).toEqual(DeckTypeEnum.FULL)
    })

    it('should create a new shuffled full deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: true,
          type: DeckTypeEnum.FULL
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(52)
      expect(body.shuffled).toBeTruthy()
      expect(body.type).toEqual(DeckTypeEnum.FULL)
    })

    it('should create a new unshuffled short deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: false,
          type: DeckTypeEnum.SHORT
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(32)
      expect(body.shuffled).toBeFalsy()
      expect(body.type).toEqual(DeckTypeEnum.SHORT)
    })

    it('should create a new shuffled short deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: true,
          type: DeckTypeEnum.SHORT
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(32)
      expect(body.shuffled).toBeTruthy()
      expect(body.type).toEqual(DeckTypeEnum.SHORT)
    })

    it('should 422 on invalid request', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: true
        })

      const { status, body } = response

      expect(status).toEqual(422)
      expect(body.error.message).toEqual('type is a required field')
    })
  })
})
