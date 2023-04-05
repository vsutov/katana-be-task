import request from 'supertest'
import app from '../..'
import { DeckTypeEnum } from '../../deck/deck.enums'
import { v4 } from 'uuid'

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

  describe('GET /deck/:deckId', () => {
    it('should open an existing deck', async () => {
      const createResponse = await request(app)
        .post('/deck')
        .send({
          shuffled: false,
          type: DeckTypeEnum.FULL
        })

      const { deckId } = createResponse.body

      const response = await request(app)
        .get(`/deck/${deckId as string}`)

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(52)
      expect(body.shuffled).toBeFalsy()
      expect(body.type).toEqual(DeckTypeEnum.FULL)
      expect(body.cards).toBeDefined()
      expect(body.cards[0]).toStrictEqual({
        code: 'AC',
        suit: 'CLUBS',
        value: 'ACE'
      })
    })

    it('should 404 on non-existant deck', async () => {
      const randomUuidV4 = v4()

      const response = await request(app)
        .get(`/deck/${randomUuidV4}`)

      expect(response.status).toEqual(404)
    })

    it('should 422 on invalid deckId in request', async () => {
      const deckId = 'some-invalid-uuid'

      const response = await request(app)
        .get(`/deck/${deckId}`)

      const { status, body } = response

      expect(status).toEqual(422)
      expect(body.error.message).toEqual('deckId is not a valid UUID v4')
    })
  })
})
