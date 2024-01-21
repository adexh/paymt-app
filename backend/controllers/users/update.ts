import { type Request, type Response } from 'express'
import user from '../../models/Users'
import bcrypt from 'bcryptjs'
import zod from 'zod'

const userUpdateSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  userName: zod.string(),
  email: zod.string(),
  password: zod.string()
})

const update = async (req: Request, res: Response): Promise<void> => {
  try {

    if (!userUpdateSchema.safeParse(req.body)) {
      res.status(411).json({
          message: "Incorrect inputs!"
      })
      return
    }
    
    const { firstName, lastName, email, password, username } = req.body // input from user

    const salt = bcrypt.genSaltSync(10)

    const hashedPassword = bcrypt.hashSync(password, salt) // created hashed Password for security
    {
      const Createduser = await user.updateOne({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword
      })

      if (Createduser !== undefined && Createduser !== null) {
        res.status(201)
          .json({ message: "Updated Successfully!" })
      } else {
        res.status(500).json({ msg: 'Internal Server Error' })
      }
    }
  } catch (err) {
    console.log('Error in Update route:', err.message)
    res.status(500)
  }
}

export default update
