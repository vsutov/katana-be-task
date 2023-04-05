import request from 'supertest'
import app from '../..'
import { DeckTypeEnum } from '../../deck/deck.enums'
import { v4 } from 'uuid'

describe('API', () => {
  const createDeck = async (payload: Record<string, any>) => {
    return await request(app)
      .post('/deck')
      .send(payload)
  }

  describe('POST /deck', () => {
    it('should create a new unshuffled full deck', async () => {
      const { status, body } = await createDeck({ shuffled: false, type: DeckTypeEnum.FULL })

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(52)
      expect(body.shuffled).toBeFalsy()
      expect(body.type).toEqual(DeckTypeEnum.FULL)
    })

    it('should create a new shuffled full deck', async () => {
      const { status, body } = await createDeck({ shuffled: true, type: DeckTypeEnum.FULL })

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(52)
      expect(body.shuffled).toBeTruthy()
      expect(body.type).toEqual(DeckTypeEnum.FULL)
    })

    it('should create a new unshuffled short deck', async () => {
      const { status, body } = await createDeck({ shuffled: false, type: DeckTypeEnum.SHORT })

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(32)
      expect(body.shuffled).toBeFalsy()
      expect(body.type).toEqual(DeckTypeEnum.SHORT)
    })

    it('should create a new shuffled short deck', async () => {
      const { status, body } = await createDeck({ shuffled: true, type: DeckTypeEnum.SHORT })

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(32)
      expect(body.shuffled).toBeTruthy()
      expect(body.type).toEqual(DeckTypeEnum.SHORT)
    })

    it('should 422 on invalid request', async () => {
      const { status, body } = await createDeck({ shuffled: true })

      expect(status).toEqual(422)
      expect(body.error.message).toEqual('type is a required field')
    })
  })

  describe('GET /deck/:deckId', () => {
    it('should open an existing deck', async () => {
      const { body: createDeckResponseBody } = await createDeck({ shuffled: false, type: DeckTypeEnum.FULL })

      const { deckId } = createDeckResponseBody

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

  describe('PATCH /deck/:deckId', () => {
    it('should draw from existing deck', async () => {
      const { body: createDeckResponseBody } = await createDeck({ shuffled: false, type: DeckTypeEnum.FULL })

      const { deckId } = createDeckResponseBody

      const response = await request(app)
        .patch(`/deck/${deckId as string}`)
        .send({
          count: 1
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.cards).toBeDefined()
      expect(body.cards[0]).toStrictEqual({
        code: 'KD',
        suit: 'DIAMONDS',
        value: 'KING'
      })
    })

    it('should 404 on non-existant deck', async () => {
      const randomUuidV4 = v4()

      const response = await request(app)
        .patch(`/deck/${randomUuidV4}`)
        .send({
          count: 1
        })

      expect(response.status).toEqual(404)
    })

    it('should 422 on invalid deckId in request', async () => {
      const deckId = 'some-invalid-uuid'

      const response = await request(app)
        .patch(`/deck/${deckId}`)
        .send({
          count: 1
        })

      const { status, body } = response

      expect(status).toEqual(422)
      expect(body.error.message).toEqual('deckId is not a valid UUID v4')
    })

    it('should 422 if count is over the amount of cards in deck', async () => {
      const { body: createDeckResponseBody } = await createDeck({ shuffled: false, type: DeckTypeEnum.FULL })

      const { deckId } = createDeckResponseBody

      const response = await request(app)
        .patch(`/deck/${deckId as string}`)
        .send({
          count: 1000
        })

      const { status, body } = response

      expect(status).toEqual(422)
      expect(body.error.message).toEqual('Count must be between 1 and the remaining amount of cards')
    })

    it('should 422 if count is less than 1', async () => {
      const { body: createDeckResponseBody } = await createDeck({ shuffled: false, type: DeckTypeEnum.FULL })

      const { deckId } = createDeckResponseBody

      const response = await request(app)
        .patch(`/deck/${deckId as string}`)
        .send({
          count: 0
        })

      const { status, body } = response

      expect(status).toEqual(422)
      expect(body.error.message).toEqual('Count must be between 1 and the remaining amount of cards')
    })
  })
})
