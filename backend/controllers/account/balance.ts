import { type Request, type Response } from 'express'
import Account from '../../models/Account'
import zod from 'zod'

const balanceSchema = zod.object({
  userId: zod.string()
})

const balance = async (req: Request, res: Response): Promise<void> => {
  try {

    if (!balanceSchema.safeParse(req.body)) {
      res.status(411).json({
        message: "Incorrect Inputs"
      })
      return
    }
    const account = await Account.findOne({
      userId: req.body.userId
    })
    if(!account) {
      res
        .status(404)
        .json({
          message: "Account not found"
        })
      return
    }

    res
      .status(200)
      .json({
        balance: account.balance
      })

  } catch (err) {
    console.log('error: ', err)
    res.status(500)
  }
}

export default balance