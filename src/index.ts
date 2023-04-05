import express, { Express } from 'express'

const app: Express = express()

app.get('/', (_req, res) => {
  res.send('hello world')
})  

app.listen(3000, () => {
  console.log('[server]: Server is running at http://localhost:3000')
})