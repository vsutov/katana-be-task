import request from 'supertest'
import app from '../..'

describe('API', () => {
  describe('GET /', () => {
    it('should 200 on request', async () => {
      const response = await request(app)
        .get('/')

      const { status } = response

      expect(status).toEqual(200)
    })
  })
})
