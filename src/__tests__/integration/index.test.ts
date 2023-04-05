import request from 'supertest'
import app from '../..'

describe('API', () => {
  describe('POST /deck', () => {
    it('should create a new unshuffled full deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: false,
          type: 'FULL'
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(52)
      expect(body.shuffled).toBeFalsy()
      expect(body.type).toEqual('FULL')
    })

    it('should create a new shuffled full deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: true,
          type: 'FULL'
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(52)
      expect(body.shuffled).toBeTruthy()
      expect(body.type).toEqual('FULL')
    })

    it('should create a new unshuffled short deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: false,
          type: 'SHORT'
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(32)
      expect(body.shuffled).toBeFalsy()
      expect(body.type).toEqual('SHORT')
    })

    it('should create a new shuffled short deck', async () => {
      const response = await request(app)
        .post('/deck')
        .send({
          shuffled: true,
          type: 'SHORT'
        })

      const { status, body } = response

      expect(status).toEqual(200)
      expect(body.deckId).toBeDefined()
      expect(body.remaining).toEqual(32)
      expect(body.shuffled).toBeTruthy()
      expect(body.type).toEqual('SHORT')
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
