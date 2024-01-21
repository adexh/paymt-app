import express, { type RequestHandler, type Response } from 'express'
import auth from '../middlewares/userAuth'

import Balance from '../controllers/account/balance'
import Transfer from '../controllers/account/transfer'

const Route = express.Router()

Route.post('/balance', auth, Balance as RequestHandler)
Route.get('/transfer', auth, Transfer as RequestHandler)

Route.get('/auth', auth, (res: Response) => {
  res.sendStatus(200)
})
export default Route