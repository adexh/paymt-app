import { type Request, type Response } from 'express'
import user from '../../models/Users'
import Account from '../../models/Account'
import bcrypt from 'bcryptjs'
import zod from 'zod'

const userRegisterSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  userName: zod.string(),
  email: zod.string(),
  password: zod.string()
})

const register = async (req: Request, res: Response): Promise<void> => {
  try {

    if (!userRegisterSchema.safeParse(req.body)) {
      res.status(411).json({
          message: "Email already taken / Incorrect inputs"
      })
      return
    }
    
    const { firstName, lastName, email, password, username } = req.body // input from user

    let oldUser = await user.findOne({  })
    if (oldUser !== undefined && oldUser !== null) {
      res.status(409).json({ message: 'Username exists!' })
      return
    }

    oldUser = await user.findOne({ email })
    if (oldUser !== undefined && oldUser !== null) {
      res.status(409).json({ message: 'Email exists!' })
      return
    }

    const salt = bcrypt.genSaltSync(10)

    const hashedPassword = bcrypt.hashSync(password, salt) // created hashed Password for security
    {
      const Createduser = await user.create({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword
      })

      await Account.create({
        userId : Createduser._id,
        balance: 1 + Math.random() * 10000
      })

      const token = Createduser.generateAuthToken()
      if (Createduser !== undefined && Createduser !== null) {
        res.status(201)
          .cookie('jwt', token, {
            maxAge: 900000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          .json({ firstName: Createduser.firstName, lastName:Createduser.lastName, username: Createduser.username, email: Createduser.email, id: Createduser._id })
      } else {
        res.status(500).json({ msg: 'Internal Server Error' })
      }
    }
  } catch (err) {
    console.log('Error in Register route:', err.message)
    res.status(500)
  }
}

export default register
