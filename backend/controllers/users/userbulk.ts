import { type Request, type Response } from 'express'
import UsersModel from '../../models/Users'

const userbulk = async (req: Request, res: Response): Promise<void> => {
  try {

    const filter = req.query.filter || '';

    const UserData = await UsersModel.find({
      $or: [{
        firstName: {
          $regex: filter
        }
      },
      {
        username: {
          $regex: filter
        }
      }]
    }).exec()

    if (UserData === undefined || UserData === null) {
      res.status(404).json({ message: 'User Not Found' })
      return
    }


    res
      .status(200)
      .json({
        user: UserData.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))})

  } catch (err) {
    console.log('error: ', err)
    res.status(500)
  }
}

export default userbulk
