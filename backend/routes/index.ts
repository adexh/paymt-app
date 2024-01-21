import express, { type RequestHandler, Request, Response } from 'express'
import auth from '../middlewares/userAuth'

import User from './userRoutes'
const Route = express.Router()

Route.post('/user', User as RequestHandler)
Route.post('/account', User as RequestHandler)

Route.get('/auth', auth, (res: Response) => {
  res.sendStatus(200)
})
export default Route