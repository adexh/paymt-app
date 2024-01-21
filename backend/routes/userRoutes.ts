import express, { type RequestHandler, Request, Response } from 'express'
import auth from '../middlewares/userAuth'

import Register from '../controllers/users/register'
import Login from '../controllers/users/login'
import Logout from '../controllers/users/logout'
import Update from '../controllers/users/update'
import Userbulk from '../controllers/users/userbulk'
const Route = express.Router()

Route.post('/signup', Register as RequestHandler)
Route.get('/signin', Login as RequestHandler)
Route.get('/logout', Logout as RequestHandler)
Route.put('/update',auth, Update as RequestHandler)
Route.get('/bulk', auth, Userbulk as RequestHandler)

Route.get('/auth', auth, (res: Response) => {
  res.sendStatus(200)
})
export default Route